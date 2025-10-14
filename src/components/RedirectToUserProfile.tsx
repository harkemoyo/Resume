import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const RedirectToUserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      console.log('RedirectToUserProfile: signed in, navigating to /user-profile');
      navigate('/user-profile', { replace: true });
    } else {
      console.log('RedirectToUserProfile: not signed in, redirecting to /login');
      navigate('/login', { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

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
        Redirecting…
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
