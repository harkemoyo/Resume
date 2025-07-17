import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

interface TabType {
  id: string;
  label: string;
}

interface NavigationProps {
  activeTab: string;
}

const tabs: TabType[] = [
  { id: 'bio', label: 'Home' },
  { id: 'work', label: 'Experience' },
  { id: 'product-showcase', label: 'Product Showcase' },
  { id: 'contact', label: 'Contact' }
];

const Navigation: React.FC<NavigationProps> = ({ activeTab }) => {
  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={`/${tab.id === 'bio' ? '' : tab.id}`}
            className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
          >
            {tab.label}
          </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
