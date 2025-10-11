# Clerk Authentication Migration Guide

This document explains how the application has been migrated to use Clerk's client-side SDK properly with custom UI components.

## What Changed

### 1. Proper Clerk Integration
- Uses `@clerk/clerk-react` package with publishable key (not secret key)
- Custom UI components instead of Clerk's default components
- No more `<UserButton />`, `<SignIn />`, `<SignUp />` components
- Proper ClerkProvider wrapper with publishable key

### 2. Custom Authentication Implementation
- Created `src/lib/clerkAuth.ts` - Custom wrapper around Clerk's hooks
- Updated `src/contexts/AuthContext.tsx` - Uses Clerk's client-side SDK properly
- Custom user dropdown in navigation
- Email-only authentication (no passwords for sign-in)

### 3. New Authentication Flow
1. **Sign In**: User enters email → receives verification code → enters code
2. **Sign Up**: User enters email, password, name → receives verification code → enters code
3. **Session Management**: Handled by Clerk automatically
4. **User Data**: Managed by Clerk's client-side SDK

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in your project root with:

```env
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

**Important**: Use your Clerk **Publishable Key** (starts with `pk_test_` or `pk_live_`) for client-side authentication.

### 2. Install Dependencies
```bash
npm install
```

### 3. Clerk Dashboard Configuration
1. Go to your Clerk Dashboard
2. Navigate to "API Keys"
3. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
4. Add it to your `.env` file

## Clerk SDK Methods Used

The custom implementation uses these Clerk client-side SDK methods:

- `signIn.create()` - Start email sign-in
- `signIn.attemptFirstFactor()` - Verify email code
- `signUp.create()` - Create new user (sign-up)
- `signUp.attemptEmailAddressVerification()` - Verify email for sign-up
- `useUser()` - Get user data and authentication state
- `useSignIn()` - Access sign-in methods
- `useSignUp()` - Access sign-up methods
- `signOut()` - Sign out user

## Key Features

### 1. Email-Only Sign-In
- Users only need to enter their email address
- Verification code sent to email
- No password required for sign-in

### 2. Custom User Dropdown
- Shows user avatar, name, and email
- "Manage Account" button (currently links to submissions page)
- "Sign Out" button
- Custom branding instead of Clerk branding

### 3. Session Management
- Handled automatically by Clerk's client-side SDK
- Secure session storage
- Automatic session validation
- Built-in session expiration handling

### 4. User Data Management
- Managed by Clerk's client-side SDK
- Automatic user data synchronization
- Real-time updates
- Built-in caching and optimization

## File Structure

```
src/
├── lib/
│   └── clerkAuth.ts         # Custom Clerk SDK wrapper
├── contexts/
│   └── AuthContext.tsx      # Updated to use Clerk SDK
├── components/
│   ├── LoginPage.tsx        # Updated for email-only auth
│   └── sections/
│       └── Navigation.tsx   # Custom user dropdown
├── index.js                 # ClerkProvider wrapper
└── App.tsx                  # Main app component
```

## Usage Examples

### Sign In
```typescript
const { signIn } = useAuth();

const handleSignIn = async (email: string) => {
  const result = await signIn(email);
  if (result.success && result.needsVerification) {
    // Show verification code input
  }
};
```

### Sign Up
```typescript
const { signUp } = useAuth();

const handleSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
  const result = await signUp(email, password, firstName, lastName);
  if (result.success && result.needsVerification) {
    // Show verification code input
  }
};
```

### Verify Code
```typescript
const { verifyCode } = useAuth();

const handleVerifyCode = async (code: string) => {
  const result = await verifyCode(code);
  if (result.success) {
    // User is now signed in
  }
};
```

### Sign Out
```typescript
const { signOut } = useAuth();

const handleSignOut = async () => {
  await signOut();
  // User is now signed out
};
```

## Security Considerations

1. **Publishable Key**: Safe to use in client-side code (designed for this purpose)
2. **Session Storage**: Handled securely by Clerk's SDK
3. **Session Validation**: Automatic validation by Clerk
4. **Error Handling**: All authentication errors are properly caught and handled

## Troubleshooting

### Common Issues

1. **"REACT_APP_CLERK_PUBLISHABLE_KEY is not set"**
   - Make sure your `.env` file exists and contains the publishable key
   - Restart your development server after adding the environment variable

2. **"Sign in failed"**
   - Check that your Clerk publishable key is correct
   - Verify the user exists in your Clerk dashboard
   - Check browser console for detailed error messages

3. **"Session verification failed"**
   - Clerk handles session management automatically
   - Check your internet connection
   - Verify your Clerk dashboard configuration

### Debug Mode

Enable debug logging by adding this to your browser console:
```javascript
localStorage.setItem('clerk_debug', 'true');
```

## Migration Benefits

1. **Full Control**: Complete control over authentication UI/UX
2. **Custom Branding**: No Clerk branding in your app
3. **Performance**: Smaller bundle size without Clerk React components
4. **Flexibility**: Easy to customize authentication flow
5. **Consistency**: Authentication UI matches your app's design system

## Next Steps

1. Test the authentication flow thoroughly
2. Customize the user dropdown styling
3. Add account management features
4. Consider adding password reset functionality
5. Implement proper error boundaries for authentication errors
