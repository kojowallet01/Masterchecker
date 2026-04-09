import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const linkService = {
  checkLink: (url) => api.post('/links/check', { url }),
  getTrendingScams: (limit = 10) => api.get(`/links/trending?limit=${limit}`),
  getScamsByCategory: (category, limit = 10) =>
    api.get(`/links/category/${category}?limit=${limit}`),
  getStatistics: () => api.get('/links/statistics'),
  searchLinks: (query) => api.get(`/links/search?query=${query}`),
  reportLink: (url, category, description, email) =>
    api.post('/links/report', { url, category, description, email }),
  getLinkDetails: (url) => api.get(`/links/details/${encodeURIComponent(url)}`),
};

export const authService = {
  register: (email, password, firstName, lastName) =>
    api.post('/auth/register', { email, password, firstName, lastName }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  adminLogin: (email, password) =>
    api.post('/auth/admin-login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

export const reportService = {
  getPendingReports: () => api.get('/reports/pending'),
  approveReport: (reportId, category, adminNotes) =>
    api.post(`/reports/approve/${reportId}`, { category, adminNotes }),
  rejectReport: (reportId, adminNotes) =>
    api.post(`/reports/reject/${reportId}`, { adminNotes }),
  getReportStats: () => api.get('/reports/stats'),
};

export default api;
