import React from 'react';

/**
 * Header Component
 * 
 * Displays the main header section of the application, including:
 * - Profile avatar with initial
 * - Name display
 * - Location information
 * - Social media links (currently using placeholder emojis)
 * 
 * @component
 * @returns {JSX.Element} Rendered Header component
 */

const Header: React.FC = () => (
  // The header contains a profile section with avatar and basic information
  <header className="header">
    <div className="profile-section">
      <div className="profile-avatar">
        <span>H</span>
      </div>
      <div className="profile-info">
        <h1>Hark</h1>
        <p className="location">📍 Kenya</p>
        <div className="social-links">
          <span>🔗</span>
          <span>💼</span>
          <span>✉️</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;