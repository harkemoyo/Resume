import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ProjectGallery from './ProjectGallery';
import TodenIndustries from './TodenIndustries';
import { GET_EXPERIENCE_METAOBJECTS, GET_PROJECT_METAOBJECTS } from '../../graphql/queries';

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
    title: 'Shopify Developer & Consultant',
    company: 'Freelance',
    location: 'Remote',
    startDate: '2021-01-01',
    endDate: '2022-12-31',
    description: 'Provided comprehensive Shopify development services including custom theme development, app integrations, and performance optimization. Specialized in creating unique e-commerce experiences for businesses across various industries including healthcare (Gentle Jaw), funeral services (Houston Funeral Homes), and image management solutions (Found Image).',
    skills: ['JavaScript', 'Shopify', 'Liquid', 'CSS3', 'HTML5', 'Shopify API', 'Performance Optimization', 'SEO'],
    achievements: [
      'Developed Gentle Jaw dental practice management system',
      'Created Houston Funeral Homes review and consultation platform',
      'Built Found Image documentation and link management system',
      'Implemented Segment Extensions for enhanced analytics tracking',
      'Improved client store performance by 40% on average'
    ],
    projectImages: [
      {
        id: 'gentle-jaw-1',
        src: '/images/gentle-jaw-interface.jpg',
        alt: 'Gentle Jaw Practice Management Interface',
        title: 'Gentle Jaw System',
        category: 'Healthcare Management'
      },
      {
        id: 'houston-funeral-1',
        src: '/images/houston-funeral-reviews.jpg',
        alt: 'Houston Funeral Homes Review System',
        title: 'Review Platform',
        category: 'Service Platform'
      },
      {
        id: 'found-image-1',
        src: '/images/found-image-dashboard.jpg',
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
  const [experiences, setExperiences] = useState<any[]>([]);
  const { data: experienceData, loading: expLoading, error: expError } = useQuery(GET_EXPERIENCE_METAOBJECTS);
  const { data: projectData, loading: projLoading, error: projError } = useQuery(GET_PROJECT_METAOBJECTS);

  const loading = expLoading || projLoading;
  const error = expError || projError;

  useEffect(() => {
    if (experienceData?.metaobjects?.edges) {
      // Transform Shopify metaobjects to experience format
      const shopifyExperiences = experienceData.metaobjects.edges.map((edge: any) => {
        const fields = edge.node.fields;
        const experience: any = { id: edge.node.id };
        
        fields.forEach((field: any) => {
          switch (field.key) {
            case 'title':
              experience.title = field.value;
              break;
            case 'company':
              experience.company = field.value;
              break;
            case 'location':
              experience.location = field.value;
              break;
            case 'start_date':
              experience.startDate = field.value;
              break;
            case 'end_date':
              experience.endDate = field.value;
              break;
            case 'description':
              experience.description = field.value;
              break;
            case 'skills':
              experience.skills = field.value ? field.value.split(',').map((s: string) => s.trim()) : [];
              break;
            case 'achievements':
              experience.achievements = field.value ? field.value.split('\n').filter((a: string) => a.trim()) : [];
              break;
          }
        });

        return experience;
      });

      // Combine with project images if available
      if (projectData?.metaobjects?.edges) {
        const projectImages = projectData.metaobjects.edges.map((edge: any) => {
          const fields = edge.node.fields;
          const project: any = { id: edge.node.id };
          
          fields.forEach((field: any) => {
            switch (field.key) {
              case 'title':
                project.title = field.value;
                break;
              case 'category':
                project.category = field.value;
                break;
              case 'image_url':
                project.src = field.reference?.url || field.value;
                break;
              case 'alt_text':
                project.alt = field.value;
                break;
              case 'experience_id':
                project.experienceId = field.value;
                break;
            }
          });
          
          return project;
        });

        // Attach project images to experiences
        shopifyExperiences.forEach((exp: any) => {
          exp.projectImages = projectImages.filter((img: any) => img.experienceId === exp.id);
        });
      }

      setExperiences([...shopifyExperiences, ...mockExperiences]);
    } else {
      // Fallback to mock data if no metaobjects
      setExperiences(mockExperiences);
    }
  }, [experienceData, projectData]);

  if (loading) return (
    <div className="content-section">
      <div className="section-header">
        <h2>Experience</h2>
        <p className="section-subtitle">Loading professional journey...</p>
      </div>
      <div className="loading-spinner">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="content-section">
      <div className="section-header">
        <h2>Experience</h2>
        <p className="section-subtitle">Professional Journey</p>
      </div>
      <div className="error-message">Error loading experience data: {error.message}</div>
    </div>
  );

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
