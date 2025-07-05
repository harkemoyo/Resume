import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';


interface HeaderProps {
  profileImage?: string;
  name?: string;
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  profileImage = '/images/passport.jpg', 
  name = 'Hark',
  children
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

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Scroll to top function for page navigation
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <header className={isHomePage ? styles['hero-section'] : styles['app-header']}>
      <div className={isHomePage ? styles['hero-container'] : styles['header-container']}>
        <div className={isHomePage ? styles['hero-left'] : styles['header-left']}>
          {isHomePage ? (
            <>
              <div className={styles['hero-badge']}>
                <span className={styles['badge-text']}>Frontend Developer</span>
                <div className={styles['badge-dot']}></div>
              </div>
              
              <h1 className={styles['hero-heading']}>
                Building Digital Experiences
                <span className={styles['text-gradient']}> That Matter</span>
              </h1>
              
              <p className={styles['hero-description']}>
                Hi, I'm {name} a passionate Frontend Developer based in Nairobi, Kenya. I specialize in building responsive, accessible, and performant web applications. With hands-on experience in JavaScript, Shopify theme customization, and frontend best practices, I create clean, elegant solutions to complex problems. I'm dedicated to crafting user-friendly interfaces that bring digital experiences to life.
              </p>
              
              <div className={styles['hero-cta']}>
                <Link 
                  to="/work" 
                  className={styles['cta-primary']}
                  onClick={scrollToTop}
                >
                  View My Work
                </Link>
                <Link 
                  to="/contact" 
                  className={styles['cta-secondary']}
                  onClick={scrollToTop}
                >
                  Get in Touch
                </Link>
              </div>
            </>
          ) : (
            <div className={styles['header-content']}>
              <div className={styles['header-avatar']}>
                {!imageError ? (
                  <img 
                    src={profileImage} 
                    alt={name}
                    onError={handleImageError}
                    className={styles['avatar-image']}
                  />
                ) : (
                  <div className={styles['avatar-fallback']}>
                    {name.charAt(0)}
                  </div>
                )}
              </div>
              <div className={styles['header-info']}>
                <h1 className={styles['header-name']}>{name}</h1>
                <p className={styles['header-title']}>Software Developer</p>
              </div>
            </div>
          )}
        </div>
        
        {isHomePage && (
          <div className={styles['hero-right']}>
            <div className={styles['avatar-container']}>
              <div className={styles['avatar-gradient']}>
                {!imageError ? (
                  <img 
                    src={profileImage} 
                    alt={name}
                    onError={handleImageError}
                    className={styles['avatar-image']}
                  />
                ) : (
                  <span className={styles['avatar-initial']}>{name.charAt(0)}</span>
                )}
              </div>
              <div className={styles['avatar-decoration']}></div>
            </div>
            
            <a 
              href="https://www.google.com/maps/place/Nairobi,+Kenya" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles['hero-location']}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Nairobi, Kenya</span>
            </a>
          </div>
        )}
        
        {!isHomePage && (
          <div className={styles['header-right']}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;