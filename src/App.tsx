import React, { useState } from 'react';
// Importing components
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProfessionalBio from './components/sections/ProfessionalBio';
import CompanyValue from './components/sections/CompanyValue';
import FreelanceIntro from './components/sections/FreelanceIntro';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

/**
 * Main App Component
 * 
 * This is the root component of the application that manages:
 * - Active tab state management
 * - Routing between different content sections
 * - Overall layout structure
 * 
 * @component
 * @returns {JSX.Element} The main application component
 */

const App: React.FC = () => {
  // State to track the currently active tab
  // Possible values: 'bio', 'company', 'freelance'
  const [activeTab, setActiveTab] = useState('bio');

  /**
   * Renders the appropriate content component based on the active tab
   * @returns {JSX.Element} The component corresponding to the active tab
   */

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return <CompanyValue />;
      case 'freelance':
        return <FreelanceIntro />;
      case 'contact':
        return <Contact />;
      case 'bio':
      default:
        return <ProfessionalBio />;
    }
  };

  /**
   * Handle contact button click
   * Sets the active tab to 'contact' and scrolls to the content area
   */
  const handleContactClick = () => {
    setActiveTab('contact');
    // Scroll to the content area with a smooth animation
    document.querySelector('.main-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Main application layout with header, navigation, content area, and footer
  return (
    <div className="app">
      <Header 
        profileImage="/images/passport.jpg" 
        name="Hark" 
        onContactClick={handleContactClick} 
      />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;