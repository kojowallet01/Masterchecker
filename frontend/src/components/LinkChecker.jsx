import React, { useState } from 'react';
import { linkService } from '../services/api';

export default function LinkChecker() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await linkService.checkLink(url);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error checking link');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'suspicious':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'dangerous':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe':
        return '✓';
      case 'suspicious':
        return '!';
      case 'dangerous':
        return '✕';
      default:
        return '?';
    }
  };

  return (
    <div className="w-full">
      <div className="card max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Check Link Safety
        </h2>

        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <input
              type="url"
              placeholder="Enter URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input-field"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check Link'}
          </button>
        </form>

        {result && (
          <div className={`mt-6 p-4 rounded-lg border-2 ${getStatusColor(result.status)}`}>
            <div className="flex items-start gap-4">
              <div className={`text-4xl font-bold ${result.status === 'safe' ? 'text-green-600' : result.status === 'suspicious' ? 'text-yellow-600' : 'text-red-600'}`}>
                {getStatusIcon(result.status)}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold capitalize mb-2">
                  {result.status === 'safe' ? 'Safe Link' : result.status === 'suspicious' ? 'Suspicious Link' : 'Dangerous Link'}
                </h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Risk Score:</span> {result.riskScore}/100
                  </p>
                  <p>
                    <span className="font-semibold">URL:</span> {result.url}
                  </p>
                  <p>
                    <span className="font-semibold">Domain:</span> {result.domain}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span> {result.category || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Reason:</span> {result.reason}
                  </p>
                  {result.reportCount > 0 && (
                    <p>
                      <span className="font-semibold">Reports:</span> {result.reportCount} user(s) reported this link
                    </p>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`/report?url=${encodeURIComponent(result.url)}`}
                    className="btn-secondary text-sm"
                  >
                    Report Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
