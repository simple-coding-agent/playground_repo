# backend/agent.py -- Flask API for Coding Agent using E2B Python SDK (with SSE log streaming)
from flask import Flask, request, jsonify, Response
from e2b import Session
import os
import time
import threading

app = Flask(__name__)

# --- Simple in-memory logs per session/request ---
logs = []
subscribers = set()
log_lock = threading.Lock()


def log(message):
    with log_lock:
        logs.append(message)
        # Notify SSE subscribers
        for queue in list(subscribers):
            queue.append(message)
    print(message)

def clear_logs():
    with log_lock:
        logs.clear()

# --- CodingAgent Implementation ---
class CodingAgent:
    def __init__(self):
        self.session = Session()
        log('E2B coding session started.')

    def clone_repo(self, repo_url):
        log(f'[Tool] Cloning repo: {repo_url}')
        out = self.session.run_in_shell(f'git clone {repo_url}')
        log(f'[Result] {out}')
        return out

    def run_cmd(self, cmd, cwd=None):
        log(f'[Tool] Shell: {cmd}')
        if cwd:
            out = self.session.run_in_shell(f'cd {cwd} && {cmd}')
        else:
            out = self.session.run_in_shell(cmd)
        log(f'[Result] {out}')
        return out

    def write_file(self, path, content):
        log(f'[Tool] Write to {path}')
        file_dir = os.path.dirname(path)
        if file_dir and not os.path.exists(file_dir):
            os.makedirs(file_dir, exist_ok=True)
        with open(path, 'w') as f:
            f.write(content)
        log(f'[Result] Write complete.')
        return 'ok'

    def install_package(self, pkg, use_pip=True):
        if use_pip:
            cmd = f'pip install {pkg}'
        else:
            cmd = f'npm install {pkg}'
        return self.run_cmd(cmd)

@app.route('/agent/task', methods=['POST'])
def agent_task():
    data = request.get_json()
    instruction = data.get('instruction', '')
    repo_url = data.get('repo_url', '')
    clear_logs()

    if not instruction or not repo_url:
        return jsonify({'error': 'Provide both instruction and repo_url'}), 400

    agent = CodingAgent()
    # Step 1: Clone repository
    agent.clone_repo(repo_url)
    # Step 2: Interpret instruction (mock planning for now, improve later)
    agent.run_cmd('ls')
    # Step 3: Respond with logs
    result = {
        'logs': logs,
        'final_message': 'Task completed (demo only; not running actual LLM/plan yet)'
    }
    return jsonify(result)

@app.route('/agent/stream_logs')
def stream_logs():
    def event_stream():
        q = []
        subscribers.add(q)
        idx = 0
        try:
            while True:
                # Send all new log lines
                with log_lock:
                    while idx < len(logs):
                        data = logs[idx]
                        yield f'data: {data}\n\n'
                        idx += 1
                # Send new logs in real time
                while q:
                    data = q.pop(0)
                    yield f'data: {data}\n\n'
                time.sleep(0.1)
        except GeneratorExit:
            subscribers.discard(q)
    headers = {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache'}
    return Response(event_stream(), headers=headers)

@app.route('/agent/logs', methods=['GET'])
def return_logs():
    with log_lock:
        return jsonify({'logs': logs})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
