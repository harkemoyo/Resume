import React from 'react';

interface CompanyValueProps {}

const CompanyValue: React.FC<CompanyValueProps> = () => (
  <div className="content-section">
    <div className="section-header">
      <h2>What I Bring to a Company</h2>
      <p className="section-subtitle">Value Proposition</p>
    </div>
    
    <div className="value-card">
      <h3>Why Hire Me?</h3>
      <p className="highlight">
        I combine technical expertise in Shopify development with a passion for creating seamless 
        eCommerce experiences that drive results.
      </p>
      
      <div className="value-points">
        <div className="value-point">
          <div className="value-icon">🚀</div>
          <div>
            <h4>Proven Track Record</h4>
            <p>
              3+ years of experience building and optimizing Shopify stores that convert. 
              I've helped businesses increase their online sales by an average of 40% through 
              custom theme development and performance optimization.
            </p>
          </div>
        </div>
        
        <div className="value-point">
          <div className="value-icon">💡</div>
          <div>
            <h4>Problem-Solving Mindset</h4>
            <p>
              I thrive on tackling complex challenges and finding innovative solutions. 
              Whether it's integrating third-party apps or building custom functionality, 
              I approach each problem with creativity and determination.
            </p>
          </div>
        </div>
        
        <div className="value-point">
          <div className="value-icon">🤝</div>
          <div>
            <h4>Team Player</h4>
            <p>
              I believe in the power of collaboration and continuous learning. 
              I actively contribute to team knowledge sharing and enjoy mentoring others 
              while being open to learning from my colleagues.
            </p>
          </div>
        </div>
        
        <div className="value-point">
          <div className="value-icon">📈</div>
          <div>
            <h4>Business-Focused Development</h4>
            <p>
              I understand that technology serves business goals. I focus on delivering 
              solutions that not only look great but also drive real business results, 
              whether that's increased conversions, better user experience, or improved performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyValue;