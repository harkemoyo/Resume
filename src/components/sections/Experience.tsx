import React, { useState, useEffect } from 'react';

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
    description: 'Leading frontend development and Shopify integrations for multiple client projects. Built custom e-commerce solutions including CC Resorts booking system, AOS Magazine subscription platform, and Counterpart Store multi-vendor marketplace. Specialized in creating responsive, conversion-optimized user interfaces and custom Shopify theme development.',
    skills: ['React', 'TypeScript', 'Shopify', 'Liquid', 'CSS3', 'HTML5', 'API Integration', 'E-commerce'],
    achievements: [
      'Developed CC Resorts booking and reservation system',
      'Built AOS Magazine subscription and content management platform',
      'Created Counterpart Store multi-vendor marketplace',
      'Implemented custom Shopify theme modifications for 10+ clients'
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchExperiences = async () => {
      try {
        // In a real implementation, this would be the GraphQL query
        // const { data } = await client.query({ query: EXPERIENCE_QUERY });
        // const experiences = data?.metaobjects?.edges?.map(/* ... */) || [];
        
        // For now, use mock data
        setTimeout(() => {
          setExperiences(mockExperiences);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load experience data');
        setLoading(false);
        console.error('Error fetching experience data:', err);
      }
    };

    fetchExperiences();
  }, []);

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
      <div className="error-message">{error}</div>
    </div>
  );

  return (
    <div className="content-section">
      <div className="section-header">
        <h2>Experience</h2>
        <p className="section-subtitle">Professional Journey</p>
      </div>
      
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
