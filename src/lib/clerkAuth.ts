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
  const authCtx: any = useClerkAuth() as any;
  const { signOut: clerkSignOut } = authCtx;
  const setActive: undefined | ((opts: { session: string }) => Promise<void>) = authCtx?.setActive;
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
        // If Clerk returned a complete sign-in with a session, activate it
        try { if (result.createdSessionId) await setActive?.({ session: result.createdSessionId }); } catch {}
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
        // For email code verification, we need to prepare the email verification
        await clerkSignUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });
        return { success: true, needsVerification: true };
      } else {
        return { success: false, error: 'Sign up failed. Please try again.' };
      }
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Sign up failed. Please try again.' };
    }
  };

  const verifyCode = async (code: string) => {
    try {
      // Try sign-in verification first
      if (clerkSignIn && clerkSignIn.status === 'needs_first_factor') {
        const result = await clerkSignIn.attemptFirstFactor({
          strategy: 'email_code',
          code: code,
        });

        if (result.status === 'complete') {
          console.log('Sign-in verification complete, activating session:', result.createdSessionId);
          try { 
            if (result.createdSessionId && setActive) {
              await setActive({ session: result.createdSessionId });
              console.log('Session activated successfully');
              // Add a small delay to ensure session is fully activated
              await new Promise(resolve => setTimeout(resolve, 300));
              console.log('Session activation delay completed');
            }
          } catch (sessionError) {
            console.error('Session activation error:', sessionError);
          }
          return { success: true };
        }
      }

      // Try sign-up verification
      if (clerkSignUp && clerkSignUp.status === 'missing_requirements') {
        const result = await clerkSignUp.attemptEmailAddressVerification({
          code: code,
        });

        if (result.status === 'complete') {
          console.log('Sign-up verification complete, activating session:', result.createdSessionId);
          try { 
            if (result.createdSessionId && setActive) {
              await setActive({ session: result.createdSessionId });
              console.log('Session activated successfully');
              // Add a small delay to ensure session is fully activated
              await new Promise(resolve => setTimeout(resolve, 300));
              console.log('Session activation delay completed');
            }
          } catch (sessionError) {
            console.error('Session activation error:', sessionError);
          }
          return { success: true };
        }
      }

      return { success: false, error: 'Invalid verification code. Please try again.' };
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Verification failed. Please try again.' };
    }
  };

  const resendCode = async () => {
    try {
      // Try sign-in resend first
      if (clerkSignIn && clerkSignIn.status === 'needs_first_factor') {
        const firstFactor = clerkSignIn.supportedFirstFactors?.find(
          factor => factor.strategy === 'email_code'
        ) as any;
        
        if (firstFactor && firstFactor.emailAddressId) {
          await clerkSignIn.prepareFirstFactor({
            strategy: 'email_code',
            emailAddressId: firstFactor.emailAddressId,
          });
          return { success: true };
        }
      }

      // Try sign-up resend
      if (clerkSignUp && clerkSignUp.status === 'missing_requirements') {
        await clerkSignUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });
        return { success: true };
      }

      return { success: false, error: 'Email verification not available' };
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

  const updateUserProfile = async (updates: { firstName?: string; lastName?: string; imageUrl?: string }) => {
    if (!user) return { success: false, error: 'No signed-in user' };
    try {
      // Clerk's user resource supports update on profile fields
      const clerkUser: any = user as any;
      await clerkUser.update({
        firstName: updates.firstName,
        lastName: updates.lastName,
        // imageUrl updates typically require upload APIs; keeping placeholder here
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Failed to update profile' };
    }
  };

  // Email update helpers
  const startEmailUpdate = async (newEmail: string) => {
    if (!user) return { success: false, error: 'No signed-in user' };
    try {
      const clerkUser: any = user as any;
      const created = await clerkUser.createEmailAddress({ email: newEmail });
      await created.prepareVerification({ strategy: 'email_code' });
      return { success: true, emailId: created.id } as const;
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Failed to start email update' };
    }
  };

  const verifyNewEmail = async (emailId: string, code: string) => {
    if (!user) return { success: false, error: 'No signed-in user' };
    try {
      const clerkUser: any = user as any;
      const email = clerkUser.emailAddresses?.find((e: any) => e.id === emailId);
      if (!email) return { success: false, error: 'Email not found' };
      await email.attemptVerification({ code });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Verification failed' };
    }
  };

  const makePrimaryAndCleanup = async (emailId: string, removeOld: boolean = true) => {
    if (!user) return { success: false, error: 'No signed-in user' };
    try {
      const clerkUser: any = user as any;
      await clerkUser.update({ primaryEmailAddressId: emailId });
      if (removeOld) {
        const emails: any[] = clerkUser.emailAddresses || [];
        for (const e of emails) {
          if (e.id !== emailId) {
            try { await e.destroy(); } catch {}
          }
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.errors?.[0]?.message || 'Failed to set primary email' };
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
    updateUserProfile,
    startEmailUpdate,
    verifyNewEmail,
    makePrimaryAndCleanup,
  };
};

// Export the ClerkProvider for wrapping the app
export { ClerkProvider };
