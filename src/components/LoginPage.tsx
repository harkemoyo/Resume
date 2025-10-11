import React, { useState, useEffect } from 'react';
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate('/my-submissions');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome to Hark's Portfolio</h1>
          <p>Sign in to manage your contact submissions or create a new account.</p>
        </div>

        <div className="login-content">
          <div className="login-tabs">
            <button 
              className={`tab-button ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button 
              className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          <div className="login-form">
            {activeTab === 'signin' ? (
              <div className="auth-section">
                <h2>Sign In to Your Account</h2>
                <p>Access your contact submissions and manage your profile.</p>
                
                <div className="auth-options">
                  <SignInButton>
                    <button className="auth-button signin-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10,17 15,12 10,7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                      Sign In with Clerk
                    </button>
                  </SignInButton>
                </div>

                <div className="login-features">
                  <h3>What you can do:</h3>
                  <ul>
                    <li>View your contact form submissions</li>
                    <li>Edit or delete your messages</li>
                    <li>Track your communication history</li>
                    <li>Manage your profile settings</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="auth-section">
                <h2>Create Your Account</h2>
                <p>Join to track your contact submissions and manage your profile.</p>
                
                <div className="auth-options">
                  <SignUpButton>
                    <button className="auth-button signup-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                      Sign Up with Clerk
                    </button>
                  </SignUpButton>
                </div>

                <div className="signup-benefits">
                  <h3>Why create an account?</h3>
                  <ul>
                    <li>Track all your contact form submissions</li>
                    <li>Edit or update your messages anytime</li>
                    <li>Get notifications about responses</li>
                    <li>Access exclusive content and updates</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="login-footer">
            <p>
              By continuing, you agree to our{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
            </p>
            <button 
              className="back-to-home"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
