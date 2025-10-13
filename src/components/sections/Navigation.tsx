import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import AccountModal from '../AccountModal';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserDropdownOpen(false);
  };

  const handleAccountDetails = () => {
    setIsAccountModalOpen(true);
    setIsUserDropdownOpen(false);
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
            <li className="auth-buttons">
              {!isAuthenticated ? (
                <Link 
                  to="/login"
                  className="user-avatar-button"
                  title="Sign In / Sign Up"
                >
                  <FontAwesomeIcon 
                    icon={faUser} 
                    className="user-icon"
                  />
                </Link>
              ) : (
                <div className="user-dropdown-container" ref={dropdownRef}>
                  <button 
                    className="user-avatar-button"
                    onClick={toggleUserDropdown}
                    aria-label="User menu"
                  >
                    <img 
                      src={user?.imageUrl || '/images/passport.webp'} 
                      alt={user?.fullName || 'User'} 
                      className="user-avatar"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="user-avatar-fallback" style={{ display: 'none' }}>
                      <FontAwesomeIcon 
                        icon={faUser} 
                        className="user-icon-fallback"
                      />
                    </div>
                  </button>

                  {isUserDropdownOpen && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <img 
                          src={user?.imageUrl || '/images/passport.webp'} 
                          alt={user?.fullName || 'User'} 
                          className="dropdown-avatar"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="dropdown-avatar-fallback" style={{ display: 'none' }}>
                          <FontAwesomeIcon 
                            icon={faUser} 
                            className="user-icon-fallback"
                          />
                        </div>
                        <div className="user-details">
                          <div className="user-name">{user?.fullName || 'User'}</div>
                          <div className="user-email">{user?.primaryEmailAddress?.emailAddress || 'user@example.com'}</div>
                        </div>
                      </div>
                      
                      <div className="dropdown-divider"></div>
                      
                      <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={handleAccountDetails}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                          </svg>
                          Account Details
                        </button>
                        <button className="dropdown-item" onClick={() => navigate('/my-submissions')}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10,9 9,9 8,9"></polyline>
                          </svg>
                          My Submissions
                        </button>
                        <button className="dropdown-item" onClick={handleSignOut}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16,17 21,12 16,7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                          </svg>
                          Sign out
                        </button>
                      </div>
                      
                      <div className="dropdown-footer">
                        <div className="app-branding">
                          <span>Hark's Portfolio</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
      />
    </nav>
  );
};

export default Navigation;
