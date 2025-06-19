import React, { ReactNode, useState } from 'react';

interface HeaderProps {
  profileImage?: string;
  name?: string;
  children?: ReactNode;
  onContactClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  profileImage = '/images/passport.jpg', 
  name = 'Hark',
  children,
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
              {!imageError ? (
                <img 
                  src={profileImage} 
                  alt={`${name}'s profile`} 
                  className={`avatar-image ${imageLoaded ? 'loaded' : ''}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <span className="avatar-initial">{initial}</span>
              )}
            </div>
          </div>
          <div className="header-info">
            <h1 className="header-name">{name}</h1>
            <p className="header-title">Software Developer</p>
            <div className="header-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;