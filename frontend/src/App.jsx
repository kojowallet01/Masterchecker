import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReportLink from './pages/ReportLink';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import './styles/index.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<ReportLink />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
            <Route
              path="/admin"
              element={
                isAuthenticated && isAdmin ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center py-6 mt-12">
          <p>&copy; 2026 LinkShield. Protecting Ghana from scams. Made with ❤️</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
