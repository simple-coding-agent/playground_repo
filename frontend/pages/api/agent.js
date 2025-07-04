import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { instruction, repo_url } = req.body;
  if (!instruction || !repo_url) {
    return res.status(400).json({ error: 'Missing instruction or repo_url.' });
  }

  try {
    // Forward the POST request to the agent backend
    const response = await fetch('http://localhost:8000/agent/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instruction, repo_url })
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to connect to backend agent.', details: error.message });
  }
}
