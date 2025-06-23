import React from 'react';

/**
 * FreelanceIntro Component
 * 
 * Displays information about freelance services and approach.
 * 
 * @component
 * @returns {JSX.Element} Rendered FreelanceIntro component
 */

const FreelanceIntro: React.FC = () => {
  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Freelance Services</h2>
        <p className="section-subtitle">Custom Shopify Solutions & Development</p>
      </div>

      <div className="freelance-content">
        <div className="service-intro">
          <h3>What I Offer</h3>
          <p>
            As a Shopify Partner with 3+ years of experience, I provide comprehensive 
            eCommerce solutions that help businesses grow and succeed online.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <h4>Theme Customization</h4>
            <p>Custom Shopify theme modifications and optimizations tailored to your brand.</p>
          </div>

          <div className="service-card">
            <h4>API Integration</h4>
            <p>Seamless integration with Shopify APIs and third-party services.</p>
          </div>

          <div className="service-card">
            <h4>Performance Optimization</h4>
            <p>Speed optimization and conversion rate improvements for your store.</p>
          </div>

          <div className="service-card">
            <h4>Custom Apps</h4>
            <p>Bespoke Shopify applications to extend your store's functionality.</p>
          </div>
        </div>

        <div className="cta-section">
          <h3>Ready to Start Your Project?</h3>
          <p>Let's discuss how I can help bring your eCommerce vision to life.</p>
          <button className="cta-button" onClick={() => document.querySelector('[data-tab="contact"]')?.click()}>
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelanceIntro;