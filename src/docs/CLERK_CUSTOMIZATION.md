# Clerk UserProfile Customization Guide

This guide demonstrates how to customize Clerk's `<UserProfile />` component with custom pages, links, and styling.

## 🎨 Basic Customization

### 1. Appearance Customization

```tsx
import { UserProfile } from '@clerk/clerk-react';
import { clerkAppearance } from '../styles/clerkAppearance';

<UserProfile appearance={clerkAppearance} />
```

### 2. Hide Clerk Branding

```tsx
<UserProfile
  appearance={{
    elements: {
      footer: 'hidden',
      footerAction: 'hidden',
      footerActionLink: 'hidden',
      developerModeBadge: 'hidden',
    }
  }}
/>
```

## 📄 Custom Pages

### Adding Custom Pages

```tsx
import { UserProfile } from '@clerk/clerk-react';

// Custom page component
const CustomBillingPage = () => (
  <div>
    <h2>Billing Information</h2>
    <p>Manage your subscription and payment methods.</p>
  </div>
);

// Add to UserProfile
<UserProfile>
  <UserProfile.Page 
    label="Billing" 
    url="billing"
    labelIcon={<span>💳</span>}
  >
    <CustomBillingPage />
  </UserProfile.Page>
  
  {/* Include default pages */}
  <UserProfile.Page label="account" />
  <UserProfile.Page label="security" />
</UserProfile>
```

### Custom Page Examples

#### Billing Page
```tsx
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
```

#### Preferences Page
```tsx
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
```

## 🔗 External Links

### Adding External Links

```tsx
<UserProfile>
  {/* External links */}
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
  
  <UserProfile.Link 
    label="Support" 
    url="mailto:support@example.com" 
    labelIcon={<span>📧</span>}
  />
</UserProfile>
```

## 🎨 Advanced Styling

### Complete Appearance Configuration

```tsx
const customAppearance = {
  variables: {
    // Colors
    colorPrimary: '#0ea5e9',
    colorBackground: '#ffffff',
    colorText: '#0f172a',
    colorTextSecondary: '#64748b',
    
    // Typography
    fontFamily: 'Inter, system-ui, sans-serif',
    
    // Spacing
    spacingUnit: '1rem',
    borderRadius: '8px',
  },
  
  layout: {
    logoPlacement: 'none',
    socialButtonsPlacement: 'bottom',
    showOptionalFields: true,
  },
  
  elements: {
    // Hide branding
    footer: 'hidden',
    footerAction: 'hidden',
    footerActionLink: 'hidden',
    developerModeBadge: 'hidden',
    
    // Custom styling
    card: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    },
    
    sidebar: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
    },
    
    main: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
    },
  }
};
```

## 📱 Responsive Design

### Mobile-First Approach

```css
/* Custom CSS for responsive design */
.cup-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .cup-container {
    padding: 1rem;
  }
  
  .cup-shell {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .cup-aside {
    position: static;
  }
}
```

## 🔧 Implementation Examples

### 1. Basic Custom UserProfile

```tsx
import React from 'react';
import { UserProfile } from '@clerk/clerk-react';

const CustomUserProfile = () => {
  return (
    <UserProfile
      appearance={{
        variables: { colorPrimary: '#0ea5e9' },
        elements: {
          footer: 'hidden',
          developerModeBadge: 'hidden',
        }
      }}
    />
  );
};
```

### 2. Advanced Custom UserProfile with Pages

```tsx
import React from 'react';
import { UserProfile } from '@clerk/clerk-react';
import { clerkAppearance } from '../styles/clerkAppearance';

const CustomUserProfile = () => {
  return (
    <UserProfile appearance={clerkAppearance}>
      {/* Custom pages */}
      <UserProfile.Page label="Billing" url="billing" labelIcon={<span>💳</span>}>
        <CustomBillingPage />
      </UserProfile.Page>
      
      <UserProfile.Page label="Preferences" url="preferences" labelIcon={<span>⚙️</span>}>
        <CustomPreferencesPage />
      </UserProfile.Page>
      
      {/* External links */}
      <UserProfile.Link label="Help" url="/help" labelIcon={<span>❓</span>} />
      <UserProfile.Link label="Docs" url="/docs" labelIcon={<span>📚</span>} />
      
      {/* Default pages */}
      <UserProfile.Page label="account" />
      <UserProfile.Page label="security" />
    </UserProfile>
  );
};
```

## 🎯 Best Practices

### 1. Consistent Styling
- Use consistent color schemes across all custom pages
- Maintain the same spacing and typography as your main app
- Ensure proper contrast ratios for accessibility

### 2. User Experience
- Keep custom pages focused and simple
- Use clear, descriptive labels for navigation
- Provide helpful icons for visual recognition

### 3. Performance
- Lazy load custom page components when possible
- Minimize bundle size by importing only needed Clerk components
- Use efficient state management for custom functionality

### 4. Accessibility
- Ensure proper ARIA labels and roles
- Maintain keyboard navigation support
- Test with screen readers

## 🚀 Advanced Features

### Custom Hooks Integration

```tsx
import { useUser } from '@clerk/clerk-react';

const CustomBillingPage = () => {
  const { user } = useUser();
  
  // Use Clerk user data in custom pages
  return (
    <div>
      <h2>Billing for {user?.fullName}</h2>
      {/* Custom billing logic */}
    </div>
  );
};
```

### State Management

```tsx
import { useState, useEffect } from 'react';

const CustomPreferencesPage = () => {
  const [preferences, setPreferences] = useState({});
  
  useEffect(() => {
    // Load user preferences
  }, []);
  
  return (
    <div>
      {/* Preference management UI */}
    </div>
  );
};
```

## 📚 Resources

- [Clerk Customization Documentation](https://clerk.com/docs/customization)
- [Clerk Appearance API Reference](https://clerk.com/docs/customization/appearance)
- [Clerk Custom Pages Guide](https://clerk.com/docs/customization/custom-pages)
- [Clerk Theming Examples](https://clerk.com/docs/customization/theming)
