import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// Importing components
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProfessionalBio from './components/sections/ProfessionalBio';
import CompanyValue from './components/sections/CompanyValue';
import FreelanceIntro from './components/sections/FreelanceIntro';
import Experience from './components/sections/Experience';
import AIChat from './components/sections/AIChat';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

// Initialize Apollo Client with Shopify Admin API
const httpLink = createHttpLink({
  uri: 'https://your-store.myshopify.com/admin/api/2023-07/graphql.json',
});

const authLink = setContext((_, { headers }) => {
  // Replace with your actual Shopify Admin API access token
  const token = process.env.REACT_APP_SHOPIFY_ADMIN_API_TOKEN;
  
  return {
    headers: {
      ...headers,
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
  const activeTab = window.location.pathname === '/' ? 'bio' : window.location.pathname.substring(1);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Header 
            profileImage="/images/passport.jpg" 
            name="Hark" 
          >
            <Navigation activeTab={activeTab} />
          </Header>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProfessionalBio />} />
              <Route path="/work" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/company" element={<CompanyValue />} />
              <Route path="/freelance" element={<FreelanceIntro />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;