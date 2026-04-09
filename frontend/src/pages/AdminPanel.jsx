import React, { useState, useEffect } from 'react';
import { reportService } from '../services/api';

export default function AdminPanel() {
  const [pendingReports, setPendingReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [categoryOverride, setCategoryOverride] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reportsRes, statsRes] = await Promise.all([
        reportService.getPendingReports(),
        reportService.getReportStats(),
      ]);
      setPendingReports(reportsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reportId) => {
    try {
      await reportService.approveReport(
        reportId,
        categoryOverride || selectedReport.category,
        adminNotes
      );
      setPendingReports(pendingReports.filter((r) => r._id !== reportId));
      setSelectedReport(null);
      setAdminNotes('');
      setCategoryOverride('');
      alert('Report approved!');
    } catch (error) {
      alert('Error approving report: ' + error.message);
    }
  };

  const handleReject = async (reportId) => {
    try {
      await reportService.rejectReport(reportId, adminNotes);
      setPendingReports(pendingReports.filter((r) => r._id !== reportId));
      setSelectedReport(null);
      setAdminNotes('');
      alert('Report rejected!');
    } catch (error) {
      alert('Error rejecting report: ' + error.message);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading admin panel...</div>;
  }

  const categories = [
    'momo-scam',
    'fake-job',
    'phishing',
    'malware',
    'dating-scam',
    'lottery-scam',
    'investment-scam',
    'other',
  ];

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Panel</h1>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <div className="text-3xl font-bold text-blue-600">
              {stats.totalReports}
            </div>
            <p className="text-gray-600">Total Reports</p>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-yellow-600">
              {stats.pendingReports}
            </div>
            <p className="text-gray-600">Pending Review</p>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-green-600">
              {stats.approvedReports}
            </div>
            <p className="text-gray-600">Approved</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Reports List */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Pending Reports ({pendingReports.length})</h2>

            {pendingReports.length === 0 ? (
              <p className="text-gray-600">No pending reports.</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {pendingReports.map((report) => (
                  <div
                    key={report._id}
                    onClick={() => setSelectedReport(report)}
                    className={`p-3 rounded cursor-pointer transition border-l-4 ${
                      selectedReport?._id === report._id
                        ? 'bg-blue-50 border-blue-400'
                        : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-blue-600 break-all">
                          {report.url}
                        </p>
                        <p className="text-sm text-gray-600">
                          Category: {report.category}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Report Details */}
        <div>
          {selectedReport ? (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Report Details</h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-600">URL</p>
                  <p className="font-semibold break-all">{selectedReport.url}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold capitalize">
                    {selectedReport.category}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {selectedReport.description}
                  </p>
                </div>

                {selectedReport.email && (
                  <div>
                    <p className="text-sm text-gray-600">Reporter Email</p>
                    <p className="font-semibold">{selectedReport.email}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Override Category (optional)
                  </label>
                  <select
                    value={categoryOverride}
                    onChange={(e) => setCategoryOverride(e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="">Use reported category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes..."
                    rows="3"
                    className="input-field text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(selectedReport._id)}
                    className="flex-1 btn-success text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedReport._id)}
                    className="flex-1 btn-danger text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center text-gray-600">
              Select a report to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
