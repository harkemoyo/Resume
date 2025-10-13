import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useClerkAuthWrapper, ClerkUser } from '../lib/clerkAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: ClerkUser | null;
  isLoading: boolean;
  signIn: (email: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  verifyCode: (code: string) => Promise<{ success: boolean; error?: string }>;
  resendCode: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  setPendingVerification: (pending: boolean) => void;
  pendingVerification: boolean;
  refreshUser: () => Promise<void>;
  updateUserProfile: (updates: { firstName?: string; lastName?: string; imageUrl?: string }) => Promise<{ success: boolean; error?: string }>;
  startEmailUpdate: (newEmail: string) => Promise<{ success: boolean; error?: string; emailId?: string }>;
  verifyNewEmail: (emailId: string, code: string) => Promise<{ success: boolean; error?: string }>;
  makePrimaryAndCleanup: (emailId: string, removeOld?: boolean) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const clerkAuth = useClerkAuthWrapper();

  // Debug auth state changes
  React.useEffect(() => {
    console.log('AuthContext: Auth state changed - isAuthenticated:', clerkAuth.isAuthenticated, 'isLoading:', clerkAuth.isLoading);
  }, [clerkAuth.isAuthenticated, clerkAuth.isLoading]);

  const signIn = async (email: string) => {
    const result = await clerkAuth.signIn(email);
    if (result.success && result.needsVerification) {
      setPendingVerification(true);
    }
    return result;
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const result = await clerkAuth.signUp(email, password, firstName, lastName);
    if (result.success && result.needsVerification) {
      setPendingVerification(true);
    }
    return result;
  };

  const verifyCode = async (code: string) => {
    const result = await clerkAuth.verifyCode(code);
    if (result.success) {
      setPendingVerification(false);
    }
    return result;
  };

  const resendCode = async () => {
    return await clerkAuth.resendCode();
  };

  const signOut = async () => {
    await clerkAuth.signOut();
    setPendingVerification(false);
  };

  const refreshUser = async () => {
    // Clerk handles user refresh automatically
    return Promise.resolve();
  };

  const updateUserProfile = async (updates: { firstName?: string; lastName?: string; imageUrl?: string }) => {
    const result = await (clerkAuth as any).updateUserProfile?.(updates);
    return result || { success: false, error: 'Update not available' };
  };

  const startEmailUpdate = async (newEmail: string) => {
    return await (clerkAuth as any).startEmailUpdate?.(newEmail) || { success: false, error: 'Start email update not available' };
  };

  const verifyNewEmail = async (emailId: string, code: string) => {
    return await (clerkAuth as any).verifyNewEmail?.(emailId, code) || { success: false, error: 'Verify email not available' };
  };

  const makePrimaryAndCleanup = async (emailId: string, removeOld: boolean = true) => {
    return await (clerkAuth as any).makePrimaryAndCleanup?.(emailId, removeOld) || { success: false, error: 'Make primary not available' };
  };

  const value: AuthContextType = useMemo(() => ({
    isAuthenticated: clerkAuth.isAuthenticated,
    user: clerkAuth.user,
    isLoading: clerkAuth.isLoading,
    signIn,
    signUp,
    verifyCode,
    resendCode,
    signOut,
    setPendingVerification,
    pendingVerification,
    refreshUser,
    updateUserProfile,
    startEmailUpdate,
    verifyNewEmail,
    makePrimaryAndCleanup,
  }), [
    clerkAuth.isAuthenticated,
    clerkAuth.user,
    clerkAuth.isLoading,
    pendingVerification,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
