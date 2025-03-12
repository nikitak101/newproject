import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS for styling

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to College Portal</h1>
        <p className="home-description">
          Your one-stop solution for managing assignments, attendance, and notices.
        </p>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
