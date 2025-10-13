import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const RedirectToUserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 10; // Maximum attempts to check auth state

  useEffect(() => {
    console.log('RedirectToUserProfile: isLoaded=', isLoaded, 'isSignedIn=', isSignedIn, 'attempts=', attempts);
    
    if (!isLoaded) return;

    // If we've tried too many times, redirect to login
    if (attempts >= maxAttempts) {
      console.log('RedirectToUserProfile: max attempts reached, redirecting to login');
      navigate('/login', { replace: true });
      return;
    }

    // If signed in, redirect to user profile
    if (isSignedIn) {
      console.log('RedirectToUserProfile: user is signed in, navigating to /user-profile');
      navigate('/user-profile', { replace: true });
      return;
    }

    // If not signed in yet, wait and try again
    const timer = setTimeout(() => {
      console.log('RedirectToUserProfile: not signed in yet, retrying...');
      setAttempts(prev => prev + 1);
    }, 500); // Check every 500ms

    return () => clearTimeout(timer);
  }, [isSignedIn, isLoaded, attempts, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '40vh', 
      flexDirection: 'column', 
      gap: 16,
      padding: '2rem'
    }}>
      <div 
        className="loading-spinner" 
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <p style={{ fontSize: '16px', color: '#666', margin: 0, textAlign: 'center' }}>
        Redirecting to your profile…
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RedirectToUserProfile;
