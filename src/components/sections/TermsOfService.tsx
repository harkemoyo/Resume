import React from 'react';
import styles from './TermsOfService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles['terms-of-service']}>
      <h1>Terms of Service</h1>
      <p>Last updated: July 11, 2025</p>
      
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using this website, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, you must not use this website.</p>
      </section>

      <section>
        <h2>2. Website Content</h2>
        <p>All content on this website, including text, graphics, logos, images, and software, is the property of Hark and is protected by copyright laws.</p>
      </section>

      <section>
        <h2>3. Website Use</h2>
        <p>You may use this website for your personal, non-commercial use, provided that you comply with these Terms of Service.</p>
      </section>

      <section>
        <h2>4. Prohibited Activities</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website in any way that could damage or impair the website</li>
          <li>Attempt to gain unauthorized access to the website or its related systems</li>
          <li>Copy, modify, or distribute any content from the website without permission</li>
          <li>Use the website for any illegal or unauthorized purposes</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>All content on this website, including but not limited to text, graphics, logos, and software, is the property of Hark and is protected by copyright laws.</p>
      </section>

      <section>
        <h2>6. Disclaimer of Warranty</h2>
        <p>The website is provided "as is" without warranty of any kind. We do not warrant that the website will be error-free or that access will be uninterrupted.</p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>We will not be liable for any damages of any kind arising from the use of this website.</p>
      </section>

      <section>
        <h2>8. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms of Service at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.</p>
      </section>

      <section>
        <h2>9. Contact Information</h2>
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
        <p>Email: contact@hark.dev</p>
      </section>
    </div>
  );
};

export default TermsOfService;
