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
}

// Mock data for demonstration
const mockExperiences = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Vazi App',
    location: 'Nairobi, Kenya',
    startDate: '2023-01-01',
    endDate: 'Present',
    description: 'Building modern web applications with React, TypeScript, and Shopify integrations. Focused on creating responsive and accessible user interfaces.',
    skills: ['React', 'TypeScript', 'Shopify', 'CSS3', 'HTML5']
  },
  {
    id: '2',
    title: 'JavaScript Developer',
    company: 'Freelance',
    location: 'Remote',
    startDate: '2021-01-01',
    endDate: '2022-12-31',
    description: 'Developed custom e-commerce solutions and web applications for various clients. Specialized in Shopify theme development and custom app integrations.',
    skills: ['JavaScript', 'Shopify', 'Liquid', 'CSS3', 'HTML5']
  },
  {
    id: '3',
    title: 'Junior Developer',
    company: 'Tech Startup',
    location: 'Nairobi, Kenya',
    startDate: '2020-06-01',
    endDate: '2020-12-31',
    description: 'Worked as part of a small team to develop and maintain web applications. Gained experience in full-stack development and agile methodologies.',
    skills: ['JavaScript', 'Node.js', 'MongoDB', 'Express', 'React']
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
