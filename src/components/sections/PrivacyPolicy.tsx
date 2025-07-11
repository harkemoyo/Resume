import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles['privacy-policy']}>
      <h1>Privacy Policy</h1>
      <p>Last updated: July 11, 2025</p>
      
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to my personal portfolio website. This Privacy Policy explains how your information is collected, used, and protected when you visit my site. As a portfolio, I value your privacy and am committed to being transparent about the data I collect.</p>
      </section>

      <section>
        <h2>2. Information I Collect</h2>
        <p>This website is primarily informational, but some interactions may collect:</p>
        <ul>
          <li><strong>Contact Information</strong>: If you choose to contact me through the provided email or contact form</li>
          <li><strong>Usage Data</strong>: Basic analytics about how visitors use my site (pages visited, time spent)</li>
          <li><strong>Cookies</strong>: This site may use cookies for functionality and analytics</li>
        </ul>
      </section>

      <section>
        <h2>3. How I Use Your Information</h2>
        <p>Any information collected is used to:</p>
        <ul>
          <li>Respond to your inquiries and messages</li>
          <li>Improve the website's content and user experience</li>
          <li>Understand how visitors interact with my portfolio</li>
        </ul>
      </section>

      <section>
        <h2>4. Third-Party Services</h2>
        <p>This portfolio may use the following third-party services:</p>
        <ul>
          <li><strong>Vercel</strong>: For website hosting and analytics</li>
          <li><strong>Google Analytics</strong>: To understand site traffic and usage patterns</li>
          <li><strong>Email Service</strong>: For handling contact form submissions</li>
        </ul>
      </section>

      <section>
        <h2>5. Your Data Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to any personal information I hold about you</li>
          <li>Ask for corrections to any incorrect information</li>
          <li>Request deletion of your personal data</li>
          <li>Opt-out of any communications</li>
        </ul>
      </section>

      <section>
        <h2>6. Contact Me</h2>
        <p>If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact me at:</p>
        <p>Email: markndeche91@gmail.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
