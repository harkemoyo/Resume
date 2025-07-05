import React from 'react';

/**
 * Footer Component
 * 
 * Displays the application footer with the following sections:
 * - Connect section with social links
 * - Quick navigation links
 * - Availability status and contact button
 * - Copyright and legal links
 * 
 * The footer is fully responsive and includes interactive elements.
 * 
 * @component
 * @returns {JSX.Element} Rendered Footer component
 */

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>Let's Connect</h3>
        <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
        <div className="social-links">
          <a href="https://github.com/harkemoyo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
            <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/hark-ndeche-09271a25a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
            <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://x.com/harkemoyo" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="social-link">
            <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"></path>
            </svg>
          </a>
          <a href="mailto:markndeche91@gmail.com" aria-label="Email" className="social-link">
            <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>
      
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul className="footer-links">
          <li><a href="/bio" className={`footer-link ${window.location.pathname === '/' || window.location.pathname === '/bio' ? 'active' : ''}`}>Home</a></li>
          <li><a href="/company" className={`footer-link ${window.location.pathname === '/company' ? 'active' : ''}`}>What I Bring</a></li>
          <li><a href="/freelance" className={`footer-link ${window.location.pathname === '/freelance' ? 'active' : ''}`}>Freelance Services</a></li>
          <li><a href="/contact" className={`footer-link ${window.location.pathname === '/contact' ? 'active' : ''}`}>Contact Me</a></li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h3>Availability</h3>
        <p>
          <span className="availability">Available for freelance work</span>
          <span className="availability-dot"></span>
          <span className="availability-text">Currently accepting new projects</span>
        </p>
        <button className="contact-button">Get in Touch</button>
      </div>
    </div>
    
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Hark. All rights reserved.</p>
      <div className="footer-legal">
        <a href="#privacy">Privacy Policy</a>
        <span className="divider">|</span>
        <a href="#terms">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
