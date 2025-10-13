import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from './lib/clerkAuth';
import './index.css';
import App from './App';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing REACT_APP_CLERK_PUBLISHABLE_KEY');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    // SPA navigation handlers (React Router handled outside; these keep Clerk in sync)
    routerPush={(to) => window.history.pushState(null, '', to)}
    routerReplace={(to) => window.history.replaceState(null, '', to)}
    // Auth URLs per Clerk React docs
    signInUrl="/login"
    signUpUrl="/login?tab=signup"
    signInFallbackRedirectUrl="/user-profile"
    signUpFallbackRedirectUrl="/user-profile"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ClerkProvider>
);