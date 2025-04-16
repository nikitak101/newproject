import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-6">
      <div className="text-center bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/30">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-dark mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn’t exist.</p>

        <Link to="/">
          <button className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
