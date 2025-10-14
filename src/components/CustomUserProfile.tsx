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
            colorTextSecondary: '#64748b',
            fontFamily: 'Inter, system-ui, sans-serif',
            borderRadius: '8px',
            spacingUnit: '1rem'
          },
          layout: {
            logoPlacement: 'none' as any,
          },
          elements: {
            // Hide only the branding elements, not the main content
            footer: 'hidden',
            footerAction: 'hidden',
            footerActionLink: 'hidden',
            developerModeBadge: 'hidden',
            logoBox: 'hidden',
            logoImage: 'hidden',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
            header: 'hidden',
            backButton: 'hidden',
            // Ensure main content is visible
            rootBox: {
              width: '100%',
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '1.5rem',
            },
            card: {
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            },
            main: {
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '1.5rem',
            },
            sidebar: {
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '1.5rem',
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
