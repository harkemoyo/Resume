import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import PrivacyPolicy from './components/sections/PrivacyPolicy';
import TermsOfService from './components/sections/TermsOfService';

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

// Component to handle scrolling to top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout component to wrap all pages with consistent header and footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const activeTab = location.pathname === '/' ? 'bio' : location.pathname.substring(1);
  
  return (
    <div className="app">
      <Header 
        profileImage="/images/passport.jpg" 
        name="Hark" 
      >
        <Navigation activeTab={activeTab} />
      </Header>
      <ScrollToTop />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <ProfessionalBio />
            </Layout>
          } />
          <Route path="/work" element={
            <Layout>
              <Experience />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout>
              <Contact />
            </Layout>
          } />
          <Route path="/company" element={
            <Layout>
              <CompanyValue />
            </Layout>
          } />
          <Route path="/freelance" element={
            <Layout>
              <FreelanceIntro />
            </Layout>
          } />
          <Route path="/ai-chat" element={
            <Layout>
              <AIChat />
            </Layout>
          } />
          <Route path="/privacy-policy" element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          } />
          <Route path="/terms" element={
            <Layout>
              <TermsOfService />
            </Layout>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;