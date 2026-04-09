import React from 'react';

export default function NotFound() {
  return (
    <div className="container py-12 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
      <a href="/" className="btn-primary">
        Back to Home
      </a>
    </div>
  );
}
