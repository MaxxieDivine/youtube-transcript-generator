import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchTranscript = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else setTranscript(data.transcript);
    } catch (err) {
      setError('Something went wrong fetching the transcript.');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transcript.txt';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">YouTube Transcript Extractor</h1>

        <input
          type="text"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleFetchTranscript}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
          disabled={loading || !url.trim()}
        >
          {loading ? 'Fetching...' : 'Get Transcript'}
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {transcript && (
          <div className="space-y-2">
            <textarea
              readOnly
              className="w-full h-96 p-3 bg-gray-800 rounded resize-none text-sm"
              value={transcript}
            />
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Download .txt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
