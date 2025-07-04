import { useState, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);
  const eventSourceRef = useRef(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setLogs([]);
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Start log streaming
    const es = new window.EventSource('http://localhost:8000/agent/stream_logs');
    eventSourceRef.current = es;
    es.onmessage = (e) => {
      setLogs(prev => [...prev, e.data]);
    };
    es.onerror = () => {
      es.close();
    };

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: input, repo_url: repoUrl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error from agent');
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => eventSourceRef.current && eventSourceRef.current.close(), 1000);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '2em auto', fontFamily: 'monospace' }}>
      <h1>Autonomous Coding Agent Interface</h1>
      <label style={{ display: 'block', margin: '1em 0 0.5em' }}>Repository URL:</label>
      <input
        type="text"
        value={repoUrl}
        onChange={e => setRepoUrl(e.target.value)}
        placeholder="https://github.com/user/repo.git"
        style={{ width: '100%' }}
      />
      <label style={{ display: 'block', margin: '1em 0 0.5em' }}>Instruction:</label>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={5}
        style={{ width: '100%' }}
        placeholder="e.g. Add a test, create a README, etc..."
      />
      <button onClick={handleSubmit} disabled={loading || !input.trim() || !repoUrl.trim()} style={{ margin: '1em 0' }}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <div>
        <h3>Agent Log</h3>
        <pre style={{ background: '#222', color: '#afe', padding: 16, minHeight: 160, maxHeight: 300, overflowY: 'scroll', borderRadius: 6 }}>
          {logs.join('\n')}
        </pre>
      </div>
      {response && (
        <div>
          <h3>Agent Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
