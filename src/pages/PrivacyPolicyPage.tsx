import React from 'react';
import PrivacyPolicy from '../components/sections/PrivacyPolicy';

/**
 * PrivacyPolicyPage
 *
 * Dedicated page for the Privacy Policy, reusing the main PrivacyPolicy component.
 */
const PrivacyPolicyPage: React.FC = () => {
  return (
    <main className="single-page-content">
      <section id="privacy-policy">
        <PrivacyPolicy />
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
