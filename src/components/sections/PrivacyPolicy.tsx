import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles['privacy-policy']}>
      <h1>Privacy Policy</h1>
      <p>Last updated: July 11, 2025</p>
      
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to Hark's Portfolio. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li>Device information (browser type, operating system)</li>
          <li>Usage data (pages visited, time spent on site)</li>
          <li>IP address and location data</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Improve our website and user experience</li>
          <li>Monitor and analyze website usage</li>
          <li>Ensure website security</li>
        </ul>
      </section>

      <section>
        <h2>4. Third-Party Services</h2>
        <p>We may use third-party services that collect information used to identify you. These services include:</p>
        <ul>
          <li>Google Analytics (for website analytics)</li>
          <li>CDN services</li>
        </ul>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Request correction of your personal information</li>
          <li>Request deletion of your personal information</li>
        </ul>
      </section>

      <section>
        <h2>6. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>Email: contact@hark.dev</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
