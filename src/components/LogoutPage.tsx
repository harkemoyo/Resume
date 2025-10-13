import React from 'react';
import { Link } from 'react-router-dom';
import './LogoutPage.css';

const LogoutPage: React.FC = () => {
  return (
    <div className="logout-page">
      <div className="logout-card">
        <h2>You have been signed out</h2>
        <p>Your session has ended successfully.</p>
        <Link to="/login" className="signin-button">Sign in</Link>
      </div>
    </div>
  );
};

export default LogoutPage;



