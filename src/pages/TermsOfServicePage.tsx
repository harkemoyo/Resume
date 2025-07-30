import React from 'react';
import TermsOfService from '../components/sections/TermsOfService';

/**
 * TermsOfServicePage
 *
 * Dedicated page for the Terms of Service, reusing the main TermsOfService component.
 */
const TermsOfServicePage: React.FC = () => {
  return (
    <main className="single-page-content">
      <section id="terms-of-service">
        <TermsOfService />
      </section>
    </main>
  );
};

export default TermsOfServicePage;
