// filepath: /react-resume-app/src/components/Navigation.tsx
import React from 'react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'bio', label: 'Professional Bio' },
    { id: 'company', label: 'What I Bring' },
    { id: 'freelance', label: 'Freelance' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;