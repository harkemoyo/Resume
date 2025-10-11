/**
 * Clerk Authentication Service
 * 
 * This service provides a clean interface for Clerk authentication
 * using the client-side SDK with publishable key.
 */

import { 
  ClerkProvider, 
  useAuth as useClerkAuth, 
  useUser, 
  useSignIn, 
  useSignUp 
} from '@clerk/clerk-react';

export interface ClerkUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddresses: Array<{
    id: string;
    emailAddress: string;
    verification: {
      status: string;
    };
  }>;
  imageUrl: string;
  primaryEmailAddress: {
    id: string;
    emailAddress: string;
  };
  publicMetadata?: {
    role?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

// Custom hook that wraps Clerk's hooks
export const useClerkAuthWrapper = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerkAuth();
  const { signIn: clerkSignIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp: clerkSignUp, isLoaded: signUpLoaded } = useSignUp();

  const signIn = async (email: string) => {
    if (!clerkSignIn) return { success: false, error: 'Sign in not available' };

    try {
      const result = await clerkSignIn.create({
        identifier: email,
        strategy: 'email_code',
      });

      if (result.status === 'complete') {
        return { success: true };
      } else if (result.status === 'needs_first_factor') {
        return { success: true, needsVerification: true };
      } else {
        return { success: false, error: 'Sign in failed. Please try again.' };
      }
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Sign in failed. Please try again.' };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    if (!clerkSignUp) return { success: false, error: 'Sign up not available' };

    try {
      const result = await clerkSignUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });

      if (result.status === 'complete') {
        return { success: true };
      } else if (result.status === 'missing_requirements') {
        return { success: true, needsVerification: true };
      } else {
        return { success: false, error: 'Sign up failed. Please try again.' };
      }
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Sign up failed. Please try again.' };
    }
  };

  const verifyCode = async (code: string) => {
    if (!clerkSignIn) return { success: false, error: 'Verification not available' };

    try {
      const result = await clerkSignIn.attemptFirstFactor({
        strategy: 'email_code',
        code: code,
      });

      if (result.status === 'complete') {
        return { success: true };
      } else {
        return { success: false, error: 'Invalid verification code. Please try again.' };
      }
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Verification failed. Please try again.' };
    }
  };

  const resendCode = async () => {
    if (!clerkSignIn) return { success: false, error: 'Resend not available' };

    try {
      const firstFactor = clerkSignIn.supportedFirstFactors?.find(
        factor => factor.strategy === 'email_code'
      ) as any;
      
      if (!firstFactor || !firstFactor.emailAddressId) {
        return { success: false, error: 'Email verification not available' };
      }

      await clerkSignIn.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId: firstFactor.emailAddressId,
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Failed to resend code. Please try again.' };
    }
  };

  const signOut = async () => {
    if (!clerkSignOut) return;
    try {
      await clerkSignOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return {
    isAuthenticated: isSignedIn || false,
    user: user as ClerkUser | null,
    isLoading: !isLoaded || !signInLoaded || !signUpLoaded,
    signIn,
    signUp,
    verifyCode,
    resendCode,
    signOut,
  };
};

// Export the ClerkProvider for wrapping the app
export { ClerkProvider };
