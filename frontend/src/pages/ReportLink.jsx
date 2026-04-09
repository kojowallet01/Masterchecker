import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { linkService } from '../services/api';

export default function ReportLink() {
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get('url') || '';

  const [formData, setFormData] = useState({
    url: initialUrl,
    category: 'phishing',
    description: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      await linkService.reportLink(
        formData.url,
        formData.category,
        formData.description,
        formData.email
      );
      setSuccess(true);
      setMessage('✓ Thank you! Your report has been submitted and will be reviewed by our team.');
      setFormData({ url: '', category: 'phishing', description: '', email: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error submitting report');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'momo-scam', label: '💰 Mobile Money (MoMo) Scam' },
    { value: 'fake-job', label: '💼 Fake Job Offer' },
    { value: 'phishing', label: '🎣 Phishing Link' },
    { value: 'malware', label: '🦠 Malware/Virus' },
    { value: 'dating-scam', label: '💔 Dating/Romance Scam' },
    { value: 'lottery-scam', label: '🎰 Lottery/Prize Scam' },
    { value: 'investment-scam', label: '📈 Investment Scam' },
    { value: 'other', label: '❓ Other Scam' },
  ];

  return (
    <div className="container py-8">
      <div className="card max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Report a Scam Link</h1>
        <p className="text-gray-600 mb-6">
          Help protect other Ghanaians by reporting suspicious or dangerous links.
        </p>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              success
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              URL *
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Scam Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain how you encountered this link and why you believe it's a scam..."
              required
              rows="5"
              maxLength="1000"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/1000 characters
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Your Email (optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll only contact you if we need more information.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📋 About Scam Categories:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>MoMo Scams:</strong> Fake MTN Mobile Money, Vodafone Cash, etc.</li>
            <li>• <strong>Fake Jobs:</strong> Too-good-to-be-true job offers</li>
            <li>• <strong>Phishing:</strong> Links that steal personal/banking info</li>
            <li>• <strong>Dating Scams:</strong> Romance scams and catfishing</li>
            <li>• <strong>Investment Scams:</strong> Fraudulent cryptocurrency or investment schemes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
