import React from 'react';

interface FreelanceIntroProps {
  // Add any props that the component might receive
}

const FreelanceIntro: React.FC<FreelanceIntroProps> = () => (
  <div className="content-section">
    <div className="section-header">
      <h2>Freelance Introduction</h2>
      <p className="section-subtitle">How I Can Help Your Business</p>
    </div>
    
    <div className="freelance-card">
      <div className="freelance-intro">
        <p>
          I'm currently available for freelance Shopify development projects. Whether you're a business 
          looking to launch a new online store, need custom theme development, or require specific 
          functionality for your Shopify store, I can help bring your vision to life.
        </p>
        
        <div className="services-grid">
          <div className="service-card">
            <h3>Custom Theme Development</h3>
            <p>
              Need a unique, responsive Shopify theme that stands out? I create custom themes 
              tailored to your brand identity and business needs.
            </p>
            <ul className="service-features">
              <li>Mobile-first, responsive design</li>
              <li>Custom sections and templates</li>
              <li>Performance optimization</li>
              <li>SEO best practices</li>
            </ul>
          </div>
          
          <div className="service-card">
            <h3>Theme Customization</h3>
            <p>
              Already have a theme but need adjustments? I can customize existing themes to 
              match your specific requirements.
            </p>
            <ul className="service-features">
              <li>Custom features and functionality</li>
              <li>Third-party app integrations</li>
              <li>Performance improvements</li>
              <li>Bug fixes and updates</li>
            </ul>
          </div>
          
          <div className="service-card">
            <h3>Shopify Apps</h3>
            <p>
              Need custom functionality that doesn't exist in the app store? I can develop 
              private apps tailored to your specific business needs.
            </p>
            <ul className="service-features">
              <li>Custom app development</li>
              <li>API integrations</li>
              <li>Workflow automation</li>
              <li>Data import/export solutions</li>
            </ul>
          </div>
        </div>
        
        <div className="cta-section">
          <p className="cta-text">
            Ready to take your Shopify store to the next level? Let's discuss how I can help 
            you achieve your business goals.
          </p>
          <button className="cta-button">Get in Touch</button>
        </div>
      </div>
    </div>
  </div>
);

export default FreelanceIntro;