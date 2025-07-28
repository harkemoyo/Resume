import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

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
  };

  return (
    <nav className="header-navigation">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem', background: 'transparent' }}>
        <div className="logo">
          <Link to="/">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#0a2472"/>
              <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">HN</text>
            </svg>
          </Link>
        </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/experience"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            id="nav-experience"
          >
            Experience
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'}
          >
            Contact Me
          </NavLink>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default Navigation;
