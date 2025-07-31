import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const experienceSection = document.getElementById('experience');
      if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection('experience');
        } else {
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu after navigation on mobile
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="header-navigation">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#0a2472"/>
              <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">HN</text>
            </svg>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'is-active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links-container ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/experience"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => scrollToSection('experience')}
              >
                Experience
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
