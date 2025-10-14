import React from 'react';
import { useUser, UserProfile } from '@clerk/clerk-react';
import { clerkAppearance } from '../styles/clerkAppearance';
import '../styles/CustomUserProfile.css';

// Custom page components
const CustomBillingPage: React.FC = () => {
  return (
    <div className="cup-content">
      <div className="cup-section">
        <div className="cup-section-label">Billing Information</div>
        <div className="cup-billing-info">
          <p>Manage your subscription and billing details here.</p>
          <button className="cup-add-btn">Update Payment Method</button>
        </div>
      </div>
    </div>
  );
};

const CustomPreferencesPage: React.FC = () => {
  return (
    <div className="cup-content">
      <div className="cup-section">
        <div className="cup-section-label">Notification Preferences</div>
        <div className="cup-preferences-info">
          <p>Customize how you receive notifications.</p>
          <button className="cup-add-btn">Configure Notifications</button>
        </div>
      </div>
    </div>
  );
};

const CustomUserProfile: React.FC = () => {
  const { user, isLoaded } = useUser();

  // Debug logging
  console.log('CustomUserProfile - isLoaded:', isLoaded, 'user:', user);
  console.log('CustomUserProfile - Component rendered');

  if (!isLoaded) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ width: 24, height: 24, border: '3px solid #eee', borderTop: '3px solid #007bff', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
        <p>Loading profile...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px', margin: '2rem' }}>
        <h2>Authentication Required</h2>
        <p>You must be signed in to view this page.</p>
        <p>User: {user ? 'Present' : 'Not found'}</p>
        <p>IsLoaded: {isLoaded ? 'Yes' : 'No'}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', minHeight: '400px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <h1 style={{ marginBottom: '1rem', color: '#0f172a' }}>Account Settings</h1>
      <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <p><strong>Debug Info:</strong></p>
        <p>User ID: {user.id}</p>
        <p>Name: {user.fullName}</p>
        <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      </div>
      
      <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <h3>UserProfile Component Test</h3>
        <p>If you can see this, the component is rendering correctly.</p>
        <p>Now testing UserProfile component below...</p>
      </div>
      
      <UserProfile
        appearance={{
          variables: {
            colorPrimary: '#0ea5e9',
            colorBackground: '#ffffff',
            colorText: '#0f172a',
            borderRadius: '8px',
          },
          elements: {
            footer: 'hidden',
            developerModeBadge: 'hidden',
            backButton: 'hidden',
            rootBox: {
              width: '100%',
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '1rem',
              border: '2px solid #0ea5e9', // Add visible border to see if it renders
            },
          }
        }}
      >
        {/* Add custom pages */}
        <UserProfile.Page 
          label="Billing" 
          url="billing"
          labelIcon={<span>💳</span>}
        >
          <CustomBillingPage />
        </UserProfile.Page>

        <UserProfile.Page 
          label="Preferences" 
          url="preferences"
          labelIcon={<span>⚙️</span>}
        >
          <CustomPreferencesPage />
        </UserProfile.Page>

        {/* Add external links */}
        <UserProfile.Link 
          label="Help Center" 
          url="/help" 
          labelIcon={<span>❓</span>}
        />
        
        <UserProfile.Link 
          label="Documentation" 
          url="/docs" 
          labelIcon={<span>📚</span>}
        />

        {/* Include default Clerk pages */}
        <UserProfile.Page label="account" />
        <UserProfile.Page label="security" />
      </UserProfile>
    </div>
  );
};

export default CustomUserProfile;
