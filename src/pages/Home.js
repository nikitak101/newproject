import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeStyles.css';

function Home() {
  const quotes = [
    "Education is the key to unlocking the world, a passport to freedom.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Knowledge is power. Information is liberating. Education is the premise of progress.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="background-overlay"></div>
      <div className="home-content">
        <h1 className="home-title">Welcome to the College Portal</h1>
        <p className="home-description">
          Your one-stop solution for managing assignments, attendance, and notices.
        </p>
        <p className="home-quote">"{quotes[quoteIndex]}"</p>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
