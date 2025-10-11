import React, { createContext, useContext, useState, ReactNode } from 'react';
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

  const value: AuthContextType = {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
