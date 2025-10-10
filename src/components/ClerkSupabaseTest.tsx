import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../hooks/use-toast';

const ClerkSupabaseTest: React.FC = () => {
  const { user, isSignedIn } = useUser();
  const { success, error } = useToast();
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAnonymousSubmission = async () => {
    setLoading(true);
    try {
      const payload = {
        clerk_user_id: null,
        name: 'Anonymous User',
        email: 'anonymous@example.com',
        message: 'Test message from anonymous user',
        subject: 'Anonymous Test',
        user_agent: navigator.userAgent,
      };

      const { data, error } = await supabase
        .from('contacts')
        .insert([payload])
        .select();

      if (error) throw error;

      success('Anonymous submission successful!');
      setTestResults({ type: 'anonymous', data });
    } catch (err) {
      console.error('Anonymous test error:', err);
      error(`Anonymous test failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testAuthenticatedSubmission = async () => {
    if (!isSignedIn || !user) {
      error('Please sign in first to test authenticated submission');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        clerk_user_id: user.id,
        name: user.fullName || 'Test User',
        email: user.primaryEmailAddress?.emailAddress || 'test@example.com',
        message: `Test message from authenticated user: ${user.firstName}`,
        subject: 'Authentication Test',
        user_agent: navigator.userAgent,
      };

      const { data, error } = await supabase
        .from('contacts')
        .insert([payload])
        .select();

      if (error) throw error;

      success('Authenticated submission successful!');
      setTestResults({ type: 'submission', data });
    } catch (err) {
      console.error('Test submission error:', err);
      error(`Test failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h2 style={{ color: '#0a2472', marginBottom: '2rem' }}>
        Clerk + Supabase Integration Test
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Authentication Status:</h3>
        <p><strong>Signed In:</strong> {isSignedIn ? '✅ Yes' : '❌ No'}</p>
        {isSignedIn && user && (
          <div>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}</p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          onClick={testAnonymousSubmission}
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Testing...' : 'Test Anonymous Submission'}
        </button>

        {isSignedIn && (
          <button
            onClick={testAuthenticatedSubmission}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0a2472',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Testing...' : 'Test Authenticated Submission'}
          </button>
        )}
      </div>

      {testResults && (
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e8edf5'
        }}>
          <h3>Test Results:</h3>
          <pre style={{
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '1rem',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '0.875rem'
          }}>
            {JSON.stringify(testResults, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
        <h4>What to Test:</h4>
        <ul>
          <li><strong>Anonymous Submission:</strong> Should work without signing in</li>
          <li><strong>Authenticated Submission:</strong> Should include your Clerk user ID</li>
        </ul>
      </div>
    </div>
  );
};

export default ClerkSupabaseTest;