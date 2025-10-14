// Clerk Appearance Configuration
// This file demonstrates all available customization options for Clerk components

export const clerkAppearance = {
  // Color variables
  variables: {
    // Primary brand colors
    colorPrimary: '#0ea5e9',
    colorPrimaryHover: '#0284c7',
    colorPrimaryActive: '#0369a1',
    
    // Background colors
    colorBackground: '#ffffff',
    colorBackgroundSecondary: '#f8fafc',
    colorBackgroundTertiary: '#f1f5f9',
    
    // Text colors
    colorText: '#0f172a',
    colorTextSecondary: '#64748b',
    colorTextTertiary: '#94a3b8',
    
    // Border and divider colors
    colorBorder: '#e2e8f0',
    colorBorderSecondary: '#e5e7eb',
    colorDivider: '#f1f5f9',
    
    // Status colors
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorDanger: '#ef4444',
    colorInfo: '#3b82f6',
    
    // Input colors
    colorInputBackground: '#ffffff',
    colorInputText: '#0f172a',
    colorInputBorder: '#d1d5db',
    colorInputFocus: '#0ea5e9',
    
    // Button colors
    colorButtonPrimary: '#0ea5e9',
    colorButtonPrimaryHover: '#0284c7',
    colorButtonSecondary: '#6b7280',
    colorButtonSecondaryHover: '#4b5563',
    
    // Typography
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontFamilyButtons: 'Inter, system-ui, -apple-system, sans-serif',
    fontFamilyInputs: 'Inter, system-ui, -apple-system, sans-serif',
    
    // Spacing and sizing
    spacingUnit: '1rem',
    borderRadius: '8px',
    borderRadiusButton: '6px',
    borderRadiusInput: '6px',
    
    // Shadows
    shadowShallow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    shadowSmall: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    shadowMedium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    shadowLarge: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    
    // Animation
    animationDuration: '200ms',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Layout configuration
  layout: {
    // Logo placement
    logoPlacement: 'none' as any, // 'none' | 'inside' | 'outside'
    
    // Social button placement
    socialButtonsPlacement: 'bottom' as any, // 'top' | 'bottom' | 'both'
    
    // Social button variant
    socialButtonsVariant: 'iconButton' as any, // 'iconButton' | 'blockButton'
    
    // Show optional fields
    showOptionalFields: true,
    
    // Help text placement
    helpTextPlacement: 'bottom' as any, // 'top' | 'bottom'
    
    // Privacy and terms placement
    privacyPageUrl: '/privacy',
    termsPageUrl: '/terms',
  },
  
  // Element-specific styling
  elements: {
    // Hide unwanted elements
    footer: 'hidden',
    footerAction: 'hidden',
    footerActionLink: 'hidden',
    developerModeBadge: 'hidden',
    logoBox: 'hidden',
    logoImage: 'hidden',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    header: 'hidden',
    
    // Additional elements to hide
    socialButtonsBlockButton: 'hidden',
    socialButtonsBlockButtonText: 'hidden',
    socialButtonsBlockButtonArrow: 'hidden',
    socialButtonsBlockButtonIcon: 'hidden',
    
    // Root container
    rootBox: {
      width: '100%',
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '1.5rem',
      // Force hide any remaining Clerk branding
      '--cl-footer-display': 'none',
      '--cl-footerAction-display': 'none',
      '--cl-developerModeBadge-display': 'none',
      '--cl-logoBox-display': 'none',
      '--cl-logoImage-display': 'none',
    },
    
    // Card styling
    card: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    },
    
    // Header styling removed since we're hiding these elements
    
    // Sidebar styling
    sidebar: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
    },
    
    // Main content styling
    main: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
    },
    
    // Navigation styling
    sidebarNavButton: {
      borderRadius: '6px',
      padding: '0.75rem 0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    
    sidebarNavButtonActive: {
      background: '#e0f2fe',
      color: '#0ea5e9',
    },
    
    // Form styling
    formFieldInput: {
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      padding: '0.75rem',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
    },
    
    formFieldInputFocus: {
      borderColor: '#0ea5e9',
      boxShadow: '0 0 0 3px rgb(14 165 233 / 0.1)',
    },
    
    // Button styling
    formButtonPrimary: {
      background: '#0ea5e9',
      borderRadius: '6px',
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    
    formButtonPrimaryHover: {
      background: '#0284c7',
    },
    
    formButtonSecondary: {
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      color: '#374151',
      borderRadius: '6px',
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    
    formButtonSecondaryHover: {
      background: '#f1f5f9',
      borderColor: '#cbd5e1',
    },
    
    // Alert styling
    alert: {
      borderRadius: '8px',
      padding: '1rem',
      fontSize: '0.875rem',
    },
    
    alertError: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
    },
    
    alertSuccess: {
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      color: '#16a34a',
    },
    
    alertWarning: {
      background: '#fffbeb',
      border: '1px solid #fed7aa',
      color: '#d97706',
    },
    
    // Loading spinner
    spinner: {
      color: '#0ea5e9',
    },
  },
};

// Alternative minimal appearance for simple customization
export const minimalClerkAppearance = {
  variables: {
    colorPrimary: '#0ea5e9',
    colorBackground: '#ffffff',
    colorText: '#0f172a',
    fontFamily: 'Inter, sans-serif',
    borderRadius: '8px',
  },
  elements: {
    footer: 'hidden',
    footerAction: 'hidden',
    footerActionLink: 'hidden',
    developerModeBadge: 'hidden',
  },
};