import React from 'react';
import './Navigation.css';

interface TabType {
  id: string;
  label: string;
}

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs: TabType[] = [
  { id: 'bio', label: 'Professional Bio' },
  { id: 'company', label: 'What I Bring' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'contact', label: 'Contact' }
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          tabIndex={activeTab === tab.id ? 0 : -1}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
