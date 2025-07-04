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
                <span className={styles['badge-text']}>Full-Stack Developer</span>
                <div className={styles['badge-dot']}></div>
              </div>
              
              <h1 className={styles['hero-heading']}>
                Building Digital Experiences
                <span className={styles['text-gradient']}> That Matter</span>
              </h1>
              
              <p className={styles['hero-description']}>
                I'm {name}, a passionate software developer creating elegant solutions to complex problems. 
                I specialize in building responsive, accessible, and performant web applications.
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
              
              <div className={styles['hero-social']}>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
                  <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a href="mailto:your.email@example.com" aria-label="Email">
                  <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
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
            
            <div className={styles['hero-location']}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Nairobi, Kenya</span>
            </div>
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