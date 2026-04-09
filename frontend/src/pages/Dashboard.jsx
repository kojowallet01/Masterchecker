import React, { useState, useEffect } from 'react';
import { linkService } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, trendingRes] = await Promise.all([
        linkService.getStatistics(),
        linkService.getTrendingScams(10),
      ]);
      setStats(statsRes.data);
      setTrending(trendingRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  const getStatusBadge = (status) => {
    const colors = {
      safe: 'bg-green-100 text-green-800',
      suspicious: 'bg-yellow-100 text-yellow-800',
      dangerous: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Community Dashboard</h1>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalLinks}
              </div>
              <p className="text-gray-600">Total Links Checked</p>
            </div>
            <div className="card">
              <div className="text-2xl font-bold text-red-600">
                {stats.dangerousLinks}
              </div>
              <p className="text-gray-600">Dangerous Links</p>
            </div>
            <div className="card">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.suspiciousLinks}
              </div>
              <p className="text-gray-600">Suspicious Links</p>
            </div>
            <div className="card">
              <div className="text-2xl font-bold text-green-600">
                {stats.safeLinks}
              </div>
              <p className="text-gray-600">Safe Links</p>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        {stats?.categories && stats.categories.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">Scams by Category</h2>
            <div className="space-y-2">
              {stats.categories.map((cat) => (
                <div key={cat._id} className="flex items-center justify-between">
                  <span className="capitalize">{cat._id || 'Unknown'}</span>
                  <div className="w-full ml-4 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(cat.count / stats.totalLinks) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="ml-4 font-semibold">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending Scams */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Trending Scam Links in Ghana
        </h2>
        <div className="space-y-3">
          {trending.length > 0 ? (
            trending.map((link, idx) => (
              <div key={idx} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`status-badge ${getStatusBadge(
                          link.status
                        )}`}
                      >
                        {link.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        Risk Score: {link.riskScore}
                      </span>
                    </div>
                    <p className="font-semibold text-blue-600 break-all">
                      {link.domain}
                    </p>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-semibold">Category:</span>{' '}
                        {link.category || 'Unknown'}
                      </p>
                      <p>
                        <span className="font-semibold">Reports:</span>{' '}
                        {link.reportCount} user(s)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No trending scams found yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
