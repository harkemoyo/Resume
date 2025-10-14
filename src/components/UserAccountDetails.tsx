import React from 'react';
import { UserProfile } from '@clerk/clerk-react';
import { clerkAppearance } from '../styles/clerkAppearance';

const UserAccountDetails: React.FC = () => {
  return (
    <div style={{ padding: '2rem 1rem', minHeight: '400px' }}>
      <h1 style={{ marginBottom: '1rem', color: '#0f172a' }}>Account Settings</h1>
      <UserProfile 
        appearance={{
          ...clerkAppearance,
          elements: {
            ...clerkAppearance.elements,
            // Ensure the main content is visible
            rootBox: {
              ...clerkAppearance.elements?.rootBox,
              display: 'block',
              visibility: 'visible',
              opacity: '1',
              height: 'auto',
              width: 'auto',
            },
            card: {
              ...clerkAppearance.elements?.card,
              display: 'block',
              visibility: 'visible',
              opacity: '1',
            },
            main: {
              ...clerkAppearance.elements?.main,
              display: 'block',
              visibility: 'visible',
              opacity: '1',
            },
            sidebar: {
              ...clerkAppearance.elements?.sidebar,
              display: 'block',
              visibility: 'visible',
              opacity: '1',
            },
          }
        }}
      />
    </div>
  );
};

export default UserAccountDetails;
