import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Importing components
import './App.css';
import Header from './components/Header';
import Navigation from './components/sections/Navigation';
import CompanyValue from './components/sections/CompanyValue';
import FreelanceIntro from './components/sections/FreelanceIntro';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import ExperiencePage from './pages/ExperiencePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
 * This is the root component of the application that renders all content
 * sequentially on a single page.
 * 
 * @component
 */
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="single-page-app">
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section id="hero">
                    <Header
                      profileImage="/images/passport.jpg"
                      name="Hark Ndeche"
                      title="Frontend Developer"
                      description="Building Digital Experiences That Matter. Hi, I'm Hark—a passionate Frontend Developer based in Nairobi, Kenya. I specialize in building responsive, accessible, and performant web applications. With hands-on experience in JavaScript, Shopify theme customization, and frontend best practices, I create clean, elegant solutions to complex problems. I'm dedicated to crafting user-friendly interfaces that bring digital experiences to life."
                    />
                  </section>
                  <main className="single-page-content">
                    <section id="company-value">
                      <CompanyValue />
                    </section>
                    <section id="freelance">
                      <FreelanceIntro />
                    </section>
                    
                  </main>
                </>
              }
            />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;