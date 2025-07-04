import { useState } from 'react';

export default function Home() {
  const [digit, setDigit] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const n = parseInt(digit, 10);
      const res = await fetch(`http://localhost:8000/pi/${n}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error fetching Pi data');
      setResult(data.digit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '2em auto', fontFamily: 'monospace' }}>
      <h1>Pi Digit Explorer</h1>
      <label style={{ display: 'block', margin: '1em 0 0.5em' }}>Enter a digit position:</label>
      <input
        type="number"
        value={digit}
        onChange={e => setDigit(e.target.value)}
        placeholder="e.g. 5"
        style={{ width: '100%' }}
      />
      <button onClick={handleSubmit} disabled={loading || !digit.trim()} style={{ margin: '1em 0' }}>
        {loading ? 'Fetching...' : 'Get Digit'}
      </button>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {result !== null && (
        <div>
          <h3>Result</h3>
          <pre>{`The digit at position ${digit} is: ${result}`}</pre>
        </div>
      )}
    </div>
  );
}
