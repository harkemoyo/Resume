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
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">💻</span> GitHub
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">🔗</span> LinkedIn
          </a>
          <a href="mailto:your.email@example.com" target="_blank" rel="noopener noreferrer">
            <span className="social-icon">✉️</span> Email
          </a>
        </div>
      </div>
      
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul className="footer-links">
          <li><a href="#bio">Professional Bio</a></li>
          <li><a href="#company">What I Bring</a></li>
          <li><a href="#freelance">Freelance Services</a></li>
          <li><a href="#contact">Contact Me</a></li>
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
