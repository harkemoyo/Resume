import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

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
    <div className="bio-card">
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
      </div>
    </div>
  </div>
);

export default ProfessionalBio;