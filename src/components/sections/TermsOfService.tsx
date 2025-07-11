import React from 'react';
import styles from './TermsOfService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles['terms-of-service']}>
      <h1>Terms of Service</h1>
      <p>Last updated: July 11, 2025</p>
      
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to my personal portfolio website. These Terms of Service outline the rules and guidelines for using my portfolio. By accessing or using this website, you agree to these terms.</p>
      </section>

      <section>
        <h2>2. Portfolio Content</h2>
        <p>All content on this website, including but not limited to text, graphics, images, and code samples, is my intellectual property and is protected by copyright laws. You may view and interact with the content for personal, non-commercial use only.</p>
      </section>

      <section>
        <h2>3. Permitted Use</h2>
        <p>You are welcome to:</p>
        <ul>
          <li>View and interact with the portfolio content</li>
          <li>Contact me through the provided channels</li>
          <li>Share links to my portfolio with proper attribution</li>
        </ul>
      </section>

      <section>
        <h2>4. Prohibited Activities</h2>
        <p>When using this portfolio, you agree not to:</p>
        <ul>
          <li>Copy, reproduce, or distribute my work without permission</li>
          <li>Use my work for commercial purposes without explicit consent</li>
          <li>Attempt to access restricted areas of the website</li>
          <li>Use the site in any way that could damage or impair its functionality</li>
        </ul>
      </section>

      <section>
        <h2>5. Project Showcase</h2>
        <p>The projects displayed in my portfolio are for demonstration purposes. Some projects may be proprietary to previous employers or clients and are shown with permission. These projects remain the intellectual property of their respective owners.</p>
      </section>

      <section>
        <h2>6. No Warranty</h2>
        <p>This portfolio is provided "as is" without any warranties, express or implied. I make no representations or warranties regarding the accuracy, reliability, or availability of the website.</p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, I will not be liable for any damages arising from the use or inability to use this portfolio, including but not limited to direct, indirect, incidental, or consequential damages.</p>
      </section>

      <section>
        <h2>8. Changes to These Terms</h2>
        <p>I may update these Terms of Service from time to time. The updated version will be indicated by the "Last updated" date at the top of this page. Your continued use of the portfolio after any changes constitutes acceptance of the new terms.</p>
      </section>

      <section>
        <h2>9. Contact Me</h2>
        <p>If you have any questions about these Terms of Service, please contact me at:</p>
        <p>Email: markndeche91@gmail.com</p>
      </section>
    </div>
  );
};

export default TermsOfService;
