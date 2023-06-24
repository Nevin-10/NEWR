import React from 'react';
import { Link } from 'react-router-dom';
import './OpeningPage.css'; // Import the CSS file for styling

const OpeningPage = () => {
  return (
    <div className="opening-page">
      <h1 className="title">EXPENSES</h1>
      <div className="links">
        <Link className="link" to="/login">
          Login
        </Link>
        <Link className="link" to="/s">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default OpeningPage;
