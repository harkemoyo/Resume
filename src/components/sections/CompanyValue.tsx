import React from 'react';
import './CompanyValue.css';

interface ValuePointProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const ValuePoint: React.FC<ValuePointProps> = ({ icon, title, children }) => (
  <div className="value-point">
    <div className="value-icon">{icon}</div>
    <div>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  </div>
);

const CompanyValue: React.FC = () => {
  return (
    <section id="company-value" className="company-value-section">
      <div className="content-section">
        <div className="section-header">
          <h2>What I Bring to a Company</h2>
          <p className="section-subtitle">Value Proposition</p>
        </div>
        
        <div className="value-card">
          <h3>Why Hire Me?</h3>
          <p className="highlight">
            I combine technical expertise in Shopify development with a passion for creating 
            seamless eCommerce experiences that drive results.
          </p>
          
          <div className="value-points">
            <ValuePoint 
              icon="🚀" 
              title="Proven Track Record"
            >
              3+ years of experience building and optimizing Shopify stores that convert. 
              I've helped businesses increase their online sales by an average of 40% through 
              custom theme development and performance optimization.
            </ValuePoint>
            
            <ValuePoint 
              icon="💡" 
              title="Problem-Solving Mindset"
            >
              I thrive on tackling complex challenges and finding innovative solutions. 
              Whether it's integrating third-party apps or building custom functionality, 
              I approach each problem with creativity and determination.
            </ValuePoint>
            
            <ValuePoint 
              icon="🤝" 
              title="Team Player"
            >
              I believe in the power of collaboration and continuous learning. 
              I actively contribute to team knowledge sharing and enjoy mentoring others 
              while being open to learning from my colleagues.
            </ValuePoint>
            
            <ValuePoint 
              icon="📈" 
              title="Business-Focused Development"
            >
              I understand that technology serves business goals. I focus on delivering 
              solutions that not only look great but also drive real business results, 
              whether that's increased conversions, better user experience, or improved performance.
            </ValuePoint>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyValue;