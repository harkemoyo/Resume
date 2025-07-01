
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODEN_FEATURES } from '../../graphql/queries';
import ProjectGallery from './ProjectGallery';

interface TodenFeature {
  id: string;
  title: string;
  description: string;
  loadCapacity: string;
  tabs: {
    benefits: string;
    advantages: string;
    sustainability: string;
  };
  featureImage?: string;
}

const TodenIndustries: React.FC = () => {
  const [activeTab, setActiveTab] = useState('benefits');
  const { data, loading, error } = useQuery(GET_TODEN_FEATURES);
  const [features, setFeatures] = useState<TodenFeature[]>([]);

  useEffect(() => {
    if (data?.metaobjects?.edges) {
      const todenFeatures = data.metaobjects.edges.map((edge: any) => {
        const fields = edge.node.fields;
        const feature: any = { id: edge.node.id };

        fields.forEach((field: any) => {
          switch (field.key) {
            case 'title':
              feature.title = field.value;
              break;
            case 'description':
              feature.description = field.value;
              break;
            case 'load_capacity':
              feature.loadCapacity = field.value;
              break;
            case 'benefits_content':
              feature.tabs = { ...feature.tabs, benefits: field.value };
              break;
            case 'advantages_content':
              feature.tabs = { ...feature.tabs, advantages: field.value };
              break;
            case 'sustainability_content':
              feature.tabs = { ...feature.tabs, sustainability: field.value };
              break;
            case 'feature_image':
              feature.featureImage = field.reference?.url;
              break;
          }
        });

        return feature;
      });

      setFeatures(todenFeatures);
    }
  }, [data]);

  // Toden Industries project images
  const todenImages = [
    {
      id: 'toden-1',
      src: '/images/toden.png',
      alt: 'Toden Industries Heavy-Duty Storage Solutions',
      title: 'Toden Industries',
      category: 'E-commerce Platform'
    },
    {
      id: 'toden-2',
      src: '/images/found.png',
      alt: 'Found Image',
      title: 'Found',
      category: 'Additional Image'
    }
  ];

  if (loading) return <div className="loading-spinner">Loading Toden Industries data...</div>;
  if (error) return <div className="error-message">Error loading Toden Industries features. Showing static content.</div>;

  return (
    <div className="toden-industries-section">
      <div className="section-header">
        <h2>Toden Industries</h2>
        <p className="section-subtitle">Heavy-Duty Storage Solutions</p>
      </div>
      
      {/* Toden Industries Project Gallery */}
      <ProjectGallery images={todenImages} projectTitle="Toden Industries" />

      {features.map((feature) => (
        <div key={feature.id} className="toden-feature-card">
          <div className="toden-content-wrapper">
            <div className="toden-tabs">
              <button 
                className={`tab-button ${activeTab === 'benefits' ? 'active' : ''}`}
                onClick={() => setActiveTab('benefits')}
              >
                Benefits
              </button>
              <button 
                className={`tab-button ${activeTab === 'advantages' ? 'active' : ''}`}
                onClick={() => setActiveTab('advantages')}
              >
                Advantages
              </button>
              <button 
                className={`tab-button ${activeTab === 'sustainability' ? 'active' : ''}`}
                onClick={() => setActiveTab('sustainability')}
              >
                Sustainability
              </button>
            </div>

            <div className="toden-main-content">
              <div className="toden-text-content">
                <h3>{feature.title}</h3>
                <p className="toden-description">{feature.description}</p>
                
                <div className="tab-content">
                  {activeTab === 'benefits' && (
                    <div className="tab-panel">
                      <p>{feature.tabs?.benefits}</p>
                    </div>
                  )}
                  {activeTab === 'advantages' && (
                    <div className="tab-panel">
                      <p>{feature.tabs?.advantages}</p>
                    </div>
                  )}
                  {activeTab === 'sustainability' && (
                    <div className="tab-panel">
                      <p>{feature.tabs?.sustainability}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="toden-visual-content">
                <div className="load-capacity-display">
                  <div className="weight-icon">
                    <svg viewBox="0 0 100 60" className="weight-svg">
                      <path d="M20 50 L80 50 L85 40 L75 25 L25 25 L15 40 Z" fill="#666"/>
                      <circle cx="50" cy="20" r="8" fill="#666"/>
                      <rect x="48" y="12" width="4" height="16" fill="#666"/>
                    </svg>
                  </div>
                  <div className="capacity-text">
                    <span className="capacity-number">{feature.loadCapacity}</span>
                    <span className="capacity-unit">lbs</span>
                  </div>
                </div>
                {feature.featureImage && (
                  <img 
                    src={feature.featureImage} 
                    alt="Toden Industries Storage Solution"
                    className="toden-feature-image"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodenIndustries;
