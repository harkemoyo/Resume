import React, { useState, useEffect } from 'react';
import ProjectGallery from './ProjectGallery';
import TodenIndustries from './TodenIndustries';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  achievements?: string[];
  projectImages?: {
    id: string;
    src: string;
    alt: string;
    title: string;
    category: string;
  }[];
}

// Enhanced experience data with detailed project information
const mockExperiences = [
  {
    id: '1',
    title: 'Frontend Developer & Shopify Specialist',
    company: 'Vazi App',
    location: 'Nairobi, Kenya',
    startDate: '2023-01-01',
    endDate: 'Present',
    description: 'Leading frontend development and Shopify integrations for multiple client projects. Built custom e-commerce solutions including CC Resorts product catalog with advanced color variant selectors, AOS Magazine subscription platform, and Counterpart Store multi-vendor marketplace. Specialized in creating responsive, conversion-optimized user interfaces and custom Shopify theme development.',
    skills: ['React', 'TypeScript', 'Shopify', 'Liquid', 'CSS3', 'HTML5', 'API Integration', 'E-commerce'],
    achievements: [
      'Developed CC Resorts product catalog with interactive color variant selectors and product options',
      'Built AOS Magazine subscription and content management platform',
      'Created Counterpart Store multi-vendor marketplace',
      'Implemented custom Shopify theme modifications for 10+ clients'
    ],
    projectImages: [
      {
        id: 'cc-resorts-1',
        src: '/images/cc-resorts-product.png',
        alt: 'CC Resorts Product Page with Color Variant Selector',
        title: 'CC Resorts Product Page',
        category: 'E-commerce Design'
      },
      {
        id: 'aos-magazine-1',
        src: '/images/aos-magazine-layout.jpg',
        alt: 'AOS Magazine Layout',
        title: 'AOS Magazine Platform',
        category: 'Content Management'
      },
      {
        id: 'counterpart-store-1',
        src: '/images/counterpart-store-dashboard.jpg',
        alt: 'Counterpart Store Dashboard',
        title: 'Multi-vendor Marketplace',
        category: 'E-commerce Platform'
      }
    ]
  },
  {
    id: '2',
    title: 'Shopify Developer & Web Solutions Specialist',
    company: 'Freelance',
    location: 'Remote',
    startDate: '2021-01-01',
    endDate: '2022-12-31',
    description: 'Developed custom e-commerce solutions with a focus on Shopify platform. Specialized in creating dynamic, data-driven experiences using Shopify metafields and metaobjects. Worked across various industries including healthcare (Gentle Jaw), industrial manufacturing (Toden Industries), and digital asset management (Found Image).',
    skills: ['Shopify', 'Liquid', 'Metafields', 'Metaobjects', 'JavaScript', 'HTML5', 'CSS3', 'GraphQL', 'REST API', 'Responsive Design'],
    achievements: [
      'Architected and implemented custom metaobjects for Toden Industries product catalog, enabling dynamic content management',
      'Developed a metafield-based configuration system for product variants and specifications',
      'Created reusable metaobject definitions for consistent data structures across the platform',
      'Built custom admin interfaces for managing complex product relationships using metafields',
      'Optimized GraphQL queries for efficient metaobject data retrieval and display'
    ],
    projectImages: [
      {
        id: 'gentle-jaw-1',
        src: '/images/gentle-jaw.png',
        alt: 'Gentle Jaw Practice Management Interface',
        title: 'Gentle Jaw System',
        category: 'Healthcare Management'
      },
      {
        id: 'toden-shopify',
        src: '/images/toden.png',
        alt: 'Toden Industries Shopify Implementation',
        title: 'Shopify E-commerce Platform',
        category: 'E-commerce Development'
      },
      {
        id: 'found-image-1',
        src: '/images/found.png',
        alt: 'Found Image Management Dashboard',
        title: 'Image Management System',
        category: 'Content Management'
      }
    ]
  },
  {
    id: '3',
    title: 'Junior Full-Stack Developer',
    company: 'Tech Startup',
    location: 'Nairobi, Kenya',
    startDate: '2020-06-01',
    endDate: '2020-12-31',
    description: 'Started as a junior developer in a supportive mentorship environment. Gained foundational experience in full-stack development, contributing to web applications and learning agile methodologies. Focused on building strong coding fundamentals and collaborative development practices.',
    skills: ['JavaScript', 'Node.js', 'MongoDB', 'Express', 'React', 'Git', 'Agile Methodology'],
    achievements: [
      'Completed 6-month mentorship program with senior developers',
      'Built binary arithmetic calculator demonstrating algorithmic thinking',
      'Contributed to team knowledge sharing sessions',
      'Developed problem-solving skills through diverse project challenges'
    ]
  }
];

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    // Use mock data directly
    setExperiences(mockExperiences);
  }, []);

  if (experiences.length === 0) {
    return (
      <div className="content-section">
        <div className="section-header">
          <h2>Experience</h2>
          <p className="section-subtitle">Loading professional journey...</p>
        </div>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Experience</h2>
        <p className="section-subtitle">Professional Journey</p>
      </div>
      
      {/* Featured Project: Toden Industries */}
      <TodenIndustries />
      
      <div className="experience-container">
        {experiences.map((exp: ExperienceItem) => (
          <div key={exp.id} className="experience-card">
            <div className="experience-header">
              <h3>{exp.title}</h3>
              <div className="experience-meta">
                <span className="company">{exp.company}</span>
                <span className="location">{exp.location}</span>
                <span className="date">
                  {new Date(exp.startDate).getFullYear()} - {exp.endDate === 'Present' ? 'Present' : new Date(exp.endDate).getFullYear()}
                </span>
              </div>
            </div>
            <div className="experience-description">
              {exp.description}
            </div>
            {exp.achievements && exp.achievements.length > 0 && (
              <div className="experience-achievements">
                <h4>Key Achievements:</h4>
                <ul>
                  {exp.achievements.map((achievement: string, index: number) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            {exp.projectImages && exp.projectImages.length > 0 && (
              <ProjectGallery images={exp.projectImages} projectTitle={exp.title} />
            )}
            {exp.skills && exp.skills.length > 0 && (
              <div className="experience-skills">
                {exp.skills.map((skill: string, index: number) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
