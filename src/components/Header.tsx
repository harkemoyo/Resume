import React, { useState, useEffect } from 'react';

/**
 * Header Component
 * 
 * Displays the main header section of the application, including:
 * - Profile avatar with image (falls back to initial if no image)
 * - Name display with title
 * - Location information with icon
 * - Social media links with proper icons
 * 
 * @component
 * @returns {JSX.Element} Rendered Header component
 */

interface HeaderProps {
  profileImage?: string;
  name?: string;
  onContactClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  profileImage = '/images/passport.jpg', 
  name = 'Hark',
  onContactClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Get the first letter of the name for the avatar fallback
  const initial = name.charAt(0);
  
  // Handle image load success
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-left">
          <div className="avatar-container">
            <div className="avatar-gradient">
              {profileImage && !imageError ? (
                <img 
                  src={profileImage} 
                  alt={`${name}'s profile`} 
                  className={`avatar-image ${imageLoaded ? 'loaded' : ''}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <span>{initial}</span>
              )}
            </div>
          </div>
          <div className="header-info">
            <h1 className="header-name">Hark</h1>
            <p className="header-title">Software Developer</p>
            <div className="header-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Kenya</span>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="social-links">
            <a href="#" aria-label="Website">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href="#" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
          <button 
            className="contact-button"
            onClick={onContactClick}
            aria-label="Navigate to contact form"
          >
            Contact Me
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;