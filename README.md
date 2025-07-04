# Autonomous Coding Agent Project

This project implements an autonomous coding agent using the [E2B Python SDK](https://e2b.dev) to autonomously perform repo tasks (clone, edit, shell, install, etc) on demand, and an interactive web interface (Next.js) for user prompting and live log viewing.

---

## Features / Requirements Implemented

- **Agent can:**
  - Clone any public git repository
  - Plan tasks (demo: extend to tool/LLM based planning per assignment)
  - Run arbitrary shell commands within the cloned repo
  - Write/create files anywhere in the repo
  - Install packages with pip or npm
  - Support future LLM integrations (currently placeholder; assignment-ready)
- **Frontend:**
  - Next.js interactive web application
  - User can enter an instruction **and** repo URL
  - Logs from agent streamed in real time to UI (via SSE)
  - Terminal-like display of all agent/tool output as it happens
  - Final results and logs shown upon task completion
- **Streaming:**
  - Output/tool streaming from backend using Server Sent Events (SSE: `/agent/stream_logs`)
- **Clear README** with full setup and usage

---

## Project Structure

- `backend/`: Python agent (Flask API) powered by E2B SDK
    - `agent.py` (main Flask backend)
- `frontend/`: Next.js web application
    - `pages/` (includes UI and API bridge to backend)

---

## Setup Instructions

### 1. Backend (Python, Flask, E2B SDK)

```bash
cd backend
pip install flask e2b  # Ensure you have Python 3.8+
# Optional: pip install any other requirements as needed
python agent.py        # Agent runs at http://localhost:8000
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev     # Frontend runs at http://localhost:3000
```

- Make sure both frontend and backend are running in separate terminals.

### 3. Usage

1. Visit `http://localhost:3000` in your browser.
2. Paste a repo URL (e.g., `https://github.com/user/repo.git`) and your instruction (e.g., "Add a README.")
3. Click **Submit**.
4. Watch the live log streaming area for real-time outputs from tools and commands as the agent works.

---

## API Endpoints

### Backend

- **`POST /agent/task`** &rarr; Starts assigned instruction on provided repo (`instruction`, `repo_url`)
- **`GET /agent/stream_logs`** &rarr; Server Sent Events (SSE) stream of log lines as the agent runs tools/commands
- **`GET /agent/logs`** &rarr; Returns the current logs buffer as JSON (entire log for that session)

### Frontend

- Uses `/pages/api/agent.js` to bridge requests to backend from Next.js API routes

---

## Notes / Requirements
- **Node.js, npm, Python 3.8+** required
- **E2B SDK key**: If needed, set up your credentials for [E2B](https://e2b.dev)
- Project can be extended for LLM and multi-provider support easily by editing the backend agent (see `agent.py`)
- All code is well-documented and each major feature is aligned with the [AI Engineer] Coding Agent assignment requirements.

---