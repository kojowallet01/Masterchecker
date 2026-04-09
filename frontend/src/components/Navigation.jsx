import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">🛡️ LinkShield</div>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/report" className="text-gray-700 hover:text-blue-600">
              Report Link
            </Link>

            {token ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="btn-secondary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
