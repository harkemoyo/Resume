import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '@clerk/clerk-react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const { 
    isAuthenticated, 
    isLoading, 
    signIn, 
    signUp, 
    verifyCode, 
    resendCode, 
    pendingVerification, 
    setPendingVerification,
    getAvailableStrategies,
    switchVerificationStrategy
  } = useAuth();
  const navigate = useNavigate();
  const { isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStrategy, setCurrentStrategy] = useState('email_code');
  const [availableStrategies, setAvailableStrategies] = useState<Array<{ strategy: string; safeIdentifier?: string }>>([]);
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState('');

  // Redirect when either our context or Clerk confirms a signed-in session
  useEffect(() => {
    if (isAuthenticated || (clerkLoaded && clerkSignedIn)) {
      console.log('LoginPage: Signed in detected, redirecting to /user-profile');
      navigate('/user-profile', { replace: true });
    }
  }, [isAuthenticated, clerkLoaded, clerkSignedIn, navigate]);

  // Initialize tab from URL param (?tab=signup)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'signup') setActiveTab('signup');
  }, []);

  // Update available strategies when verification is needed
  useEffect(() => {
    if (pendingVerification) {
      const strategies = getAvailableStrategies();
      setAvailableStrategies(strategies);
      console.log('Available verification strategies:', strategies);
    }
  }, [pendingVerification, getAvailableStrategies]);

  // No session-task handling; Clerk will surface required tasks within its UI components if used

  // Render-time guard: if already authenticated, redirect immediately
  if (isAuthenticated && !pendingVerification) {
    return <Navigate to="/user-profile" replace />;
  }

  // Handle sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // If Clerk already has an active session, skip calling signIn
    if (clerkLoaded && clerkSignedIn) {
      navigate('/user-profile', { replace: true });
      return;
    }

    const result = await signIn(email);
    
    if (result.success) {
      if (result.needsVerification) {
        setSuccess('Please check your email for a verification code.');
      } else {
        // Let the auth state flip trigger the redirect effect
      }
    } else {
      setError(result.error || 'Sign in failed. Please try again.');
    }
  };

  // Handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // If already signed in, do not attempt sign up
    if (clerkLoaded && clerkSignedIn) {
      navigate('/user-profile', { replace: true });
      return;
    }

    const result = await signUp(email, password, firstName, lastName);
    
    if (result.success) {
      if (result.needsVerification) {
        setSuccess('Please check your email for a verification code.');
      } else {
        // Let the auth state flip trigger the redirect effect
      }
    } else {
      setError(result.error || 'Sign up failed. Please try again.');
    }
  };

  // Handle verification code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    setIsRedirecting(true);
    const result = await verifyCode(verificationCode);
    
    if (result.success) {
      setSuccess('Verification successful. Signing you in...');
      // Force a full reload to ensure post-verification state is fresh
      const base = process.env.PUBLIC_URL || '';
      setTimeout(() => {
        window.location.replace(`${base}/user-profile`);
      }, 300);
    } else {
      setError(result.error || 'Verification failed. Please try again.');
      setIsRedirecting(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    setError('');
    setSuccess('');

    const result = await resendCode();
    
    if (result.success) {
      const strategyName = currentStrategy === 'email_code' ? 'email' : 'SMS';
      setSuccess(`Verification code sent! Please check your ${strategyName}.`);
    } else {
      setError(result.error || 'Failed to resend code. Please try again.');
    }
  };

  // Handle strategy switching
  const handleStrategySwitch = async (strategy: string) => {
    setError('');
    setSuccess('');
    setCurrentStrategy(strategy);
    setRetryCount(0);

    const result = await switchVerificationStrategy(strategy);
    
    if (result.success) {
      const strategyName = strategy === 'email_code' ? 'email' : 'SMS';
      setSuccess(`Switched to ${strategyName} verification. Code sent!`);
    } else {
      setError(result.error || 'Failed to switch verification method.');
      setLastError(result.error || 'Failed to switch verification method.');
    }
  };

  // Handle retry with exponential backoff
  const handleRetry = async () => {
    setError('');
    setSuccess('');
    setRetryCount(prev => prev + 1);
    
    // Simple exponential backoff
    const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
    
    setTimeout(async () => {
      if (lastError.includes('verification') || lastError.includes('code')) {
        await handleResendCode();
      } else {
        // For other errors, try to restart the flow
        if (activeTab === 'signin') {
          await handleSignIn({ preventDefault: () => {} } as React.FormEvent);
        } else {
          await handleSignUp({ preventDefault: () => {} } as React.FormEvent);
        }
      }
    }, delay);
  };

  // Clear error state when user starts typing
  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) {
      setError('');
      setLastError('');
    }
  };

  // Clear form when switching tabs
  const switchTab = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setVerificationCode('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome to Hark's Portfolio</h1>
          <p>Sign in to manage your account or create a new account.</p>
        </div>

        <div className="login-content">
          <div className="login-tabs">
            <button 
              className={`tab-button ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => switchTab('signin')}
            >
              Sign In
            </button>
            <button 
              className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => switchTab('signup')}
            >
              Sign Up
            </button>
          </div>

          <div className="login-form">
            {error && (
              <div className="error-message">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  <span>{error}</span>
                </div>
                {retryCount < 3 && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="retry-button"
                    disabled={isLoading || isRedirecting}
                    style={{
                      marginTop: '0.5rem',
                      background: 'transparent',
                      border: '1px solid #ef4444',
                      color: '#ef4444',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isLoading ? 'Retrying...' : `Retry (${retryCount}/3)`}
                  </button>
                )}
              </div>
            )}

            {success && (
              <div className="success-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
                {success}
              </div>
            )}

          {pendingVerification ? (
              <div className="auth-section">
              {isRedirecting ? (
                <>
                  <h2>Signing you in</h2>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexDirection: 'column',
                    gap: 16,
                    padding: '1rem 0'
                  }}>
                    <div 
                      className="loading-spinner" 
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #007bff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}
                    />
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#666', 
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      {success || 'Verification successful. Signing you in...'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2>Verify Your {currentStrategy === 'email_code' ? 'Email' : 'Phone'}</h2>
                  <p>We've sent a verification code to <strong>{email}</strong>. Please enter it below.</p>
                  
                  {/* Strategy switching options */}
                  {availableStrategies.length > 1 && (
                    <div className="verification-strategies">
                      <p>Verification method:</p>
                      <div className="strategy-buttons">
                        {availableStrategies.map((strategy) => (
                          <button
                            key={strategy.strategy}
                            type="button"
                            className={`strategy-button ${currentStrategy === strategy.strategy ? 'active' : ''}`}
                            onClick={() => handleStrategySwitch(strategy.strategy)}
                            disabled={isLoading || isRedirecting}
                          >
                            {strategy.strategy === 'email_code' ? '📧 Email' : '📱 SMS'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
                
                <form onSubmit={handleVerifyCode} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="verification-code">Verification Code</label>
                    <input
                      type="text"
                      id="verification-code"
                      value={verificationCode}
                      onChange={handleInputChange(setVerificationCode)}
                      required
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      disabled={isRedirecting}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="auth-button signin-button"
                    disabled={isLoading || isRedirecting}
                  >
                    {isLoading || isRedirecting ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22,4 12,14.01 9,11.01"></polyline>
                        </svg>
                        Verify Code
                      </>
                    )}
                  </button>
                </form>

                <div className="verification-actions">
                  <button 
                    onClick={handleResendCode}
                  disabled={isLoading || isRedirecting}
                    className="resend-button"
                  >
                    {isLoading ? 'Sending...' : 'Resend Code'}
                  </button>
                  <button 
                    onClick={() => {
                      setVerificationCode('');
                      setSuccess('');
                      setError('');
                      setPendingVerification(false);
                    setIsRedirecting(false);
                    }}
                    className="back-button"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'signin' ? (
              <div className="auth-section">
                <h2>Sign In to Your Account</h2>
                <p>Enter your email address and we'll send you a verification code to sign in.</p>
                
                <form onSubmit={handleSignIn} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="signin-email">Email Address</label>
                    <input
                      type="email"
                      id="signin-email"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      required
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="auth-button signin-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                          <polyline points="10,17 15,12 10,7"></polyline>
                          <line x1="15" y1="12" x2="3" y2="12"></line>
                        </svg>
                        Send Verification Code
                      </>
                    )}
                  </button>
                </form>

                <div className="login-features">
                  <h3>What you can do:</h3>
                  <ul>
                    <li>Manage your profile settings</li>
                    <li>Update your account information</li>
                    <li>Access exclusive content and updates</li>
                    <li>Track your communication history</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="auth-section">
                <h2>Create Your Account</h2>
                <p>Join to manage your profile and access exclusive content.</p>
                
                <form onSubmit={handleSignUp} className="auth-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="signup-firstname">First Name</label>
                      <input
                        type="text"
                        id="signup-firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="First name"
                        autoComplete="given-name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="signup-lastname">Last Name</label>
                      <input
                        type="text"
                        id="signup-lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Last name"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signup-email">Email Address</label>
                    <input
                      type="email"
                      id="signup-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signup-password">Password</label>
                    <input
                      type="password"
                      id="signup-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Create a password"
                      minLength={8}
                      autoComplete="new-password"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="auth-button signup-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="20" y1="8" x2="20" y2="14"></line>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                <div className="signup-benefits">
                  <h3>Why create an account?</h3>
                  <ul>
                    <li>Manage your profile settings</li>
                    <li>Update your account information</li>
                    <li>Get notifications about responses</li>
                    <li>Access exclusive content and updates</li>
                  </ul>
                </div>
              </div>
                )}
              </>
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
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
