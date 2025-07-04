import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: input })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error from agent');
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome to the Autonomous Coding Agent Interface</h1>
      <p>Type your instructions for the coding agent below:</p>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit} disabled={loading || !input.trim()}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {response && (
        <div>
          <h3>Agent Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
