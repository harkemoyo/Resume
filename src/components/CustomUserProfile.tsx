import React from 'react';
import { useUser, UserProfile } from '@clerk/clerk-react';
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

  if (!isLoaded) {
    return (
      <div className="cup-loading">
        <div className="cup-spinner" />
        Loading profile…
      </div>
    );
  }

  if (!user) {
    return <div className="cup-card">You must be signed in to view this page.</div>;
  }

  return (
    <div className="cup-container">

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
            },
          }
        }}
      >
        
        {/* Include default Clerk pages */}
        <UserProfile.Page label="account" />
        <UserProfile.Page label="security" />
        
        {/* Add custom pages */}
        <UserProfile.Page 
          label="Billing" 
          url="billing"
          labelIcon={<span>💳</span>}
        >
          <CustomBillingPage />
        </UserProfile.Page>



      </UserProfile>
    </div>
  );
};

export default CustomUserProfile;
