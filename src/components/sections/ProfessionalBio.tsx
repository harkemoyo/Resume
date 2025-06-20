import React from 'react';

/**
 * ProfessionalBio Component
 * 
 * Displays a detailed professional biography section including:
 * - Profile header with avatar and title
 * - Professional summary paragraphs
 * - Skills tags section
 * 
 * This component is designed to showcase professional background,
 * experience, and technical skills in a clean, organized layout.
 * 
 * @component
 * @returns {JSX.Element} Rendered ProfessionalBio component
 */

const ProfessionalBio: React.FC = () => (
  <div className="content-section">
    <div className="section-header">
      <h2>Professional Bio</h2>
      <p className="section-subtitle">LinkedIn / Portfolio About Me</p>
    </div>
    
    <div className="bio-card">
      <div className="profile-avatar large">
        <span>H</span>
      </div>
      <h3>Hark</h3>
      <p className="title">Shopify Developer | Frontend Engineer | Problem-Solver</p>
      
      <div className="bio-text">
        <p>
          I'm a self-taught JavaScript developer and Shopify Partner in my third year of building custom solutions for 
          eCommerce businesses. With a strong foundation in Shopify theme customization, metafields, and Shopify 
          APIs, I specialize in turning design into code and creating tailored user experiences that convert.
        </p>
        <p>
          I work at a start-up in Kenya where I've grown from a junior developer into a dependable team player, thanks 
          to a supportive mentorship culture. I'm passionate about problem-solving and constantly deepening my skills 
          — from building binary arithmetic calculators to exploring AI-powered real-time transcription tools.
        </p>
        <p>
          When I'm not coding, I enjoy morning runs and building community with fellow developers. I'm working 
          toward becoming a top Shopify app developer and building a meaningful impact through technology.
        </p>
      </div>
      
      <div className="skills-tags">
        <a 
          href="https://vazi.app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="skill-tag"
          title="View Vazi.app - A project using JavaScript"
        >
          JavaScript
        </a>
        <a 
          href="https://www.shopify.com/partners" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="skill-tag"
          title="Shopify Partner Program"
        >
          Shopify Partner
        </a>
        <a 
          href="https://vazi.app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="skill-tag"
          title="View Vazi.app - A frontend development project"
        >
          Frontend Development
        </a>
        <a 
          href="https://github.com/harkemoyo?tab=repositories&q=java&type=source" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="skill-tag"
          title="View Java projects on GitHub"
        >
          Java
        </a>
        <a 
          href="https://github.com/harkemoyo?tab=repositories&q=electronics" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="skill-tag"
          title="View Digital Electronics projects"
        >
          Digital Electronics
        </a>
      </div>
    </div>
  </div>
);

export default ProfessionalBio;