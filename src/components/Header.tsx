import React, { ReactNode, useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

interface HeaderProps {
  profileImage?: string;
  name?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  profileImage = '/images/passport.jpg',
  name = 'Hark',
  title = 'Software Engineer & Developer',
  description = 'Experienced software engineer specializing in web development and AI integration',
  children
}) => {
  const [imageError, setImageError] = useState(false);
  const initial = name.charAt(0);

  const handleImageError = () => setImageError(true);

  return (
  <header className={styles['velstar-header']}>
    <div className={styles['header-content']}>
      <div className={styles['columns']}>
        {/* Left column: original hero content */}
        <div className={styles['left-col']}>
          <div className={styles['hero-badge']}>
            <span className={styles['badge-text']}>{title}</span>
            <div className={styles['badge-dot']}></div>
          </div>
          <h1 className={styles['hero-title']}>
            Building Digital Experiences That Matter
          </h1>
          <p className={styles['hero-description']}>
            Hi, I'm Hark—a passionate Frontend Developer based in Nairobi, Kenya. I specialize in building responsive, accessible, and performant web applications. With hands-on experience in JavaScript, Shopify theme customization, and frontend best practices, I create clean, elegant solutions to complex problems. I'm dedicated to crafting user-friendly interfaces that bring digital experiences to life.
          </p>
          <div className={styles['button-row']}>
          <Link to="/experience" className={styles['cta-btn']}>
            View My Work
          </Link>
          <Link to="/contact" className={styles['cta-btn-outline']}>
            Get in Touch
          </Link>
          </div>

        </div>
        {/* Right column: avatar and location */}
        <div className={styles['right-col']}>
          <div className={styles['avatar-card']}>
            {!imageError ? (
              <img 
                src={process.env.PUBLIC_URL + profileImage}
                alt={name}
                onError={handleImageError}
                className={styles['avatar-image']}
              />
            ) : (
              <div className={styles['avatar-fallback']}>
                {initial}
              </div>
            )}
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
      </div>
    </div>
  </header>
);
};

export default Header;