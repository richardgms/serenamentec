'use client';

import { useUser as useClerkUser } from '@clerk/nextjs';
import { useEffect, useState, useCallback } from 'react';

export interface AppUser {
  id: string;
  clerkUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  diagnosisType: 'TEA' | 'TDAH' | 'BOTH' | 'EXPLORING' | null;
  profilePicture: string | null;
  onboardingCompleted: boolean;
}

interface UseUserReturn {
  user: AppUser | null;
  isLoading: boolean;
  isSignedIn: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useUser(): UseUserReturn {
  const { user: clerkUser, isLoaded, isSignedIn } = useClerkUser();
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    console.log('🔄 [useUser] fetchUser called - isSignedIn:', isSignedIn, 'clerkUserId:', clerkUser?.id);

    // If user is not signed in, clear the app user state
    if (!isSignedIn || !clerkUser?.id) {
      console.log('❌ [useUser] User not signed in or no clerk ID, clearing state');
      setAppUser(null);
      setIsLoading(false);
      setError(null); // Clear error when not signed in
      return;
    }

    try {
      setIsLoading(true);
      console.log('📡 [useUser] Fetching user data from /api/user');
      const response = await fetch('/api/user');

      if (!response.ok) {
        if (response.status === 404) {
          // User doesn't exist in our database yet
          console.log('⚠️ [useUser] User not found in database (404)');
          setAppUser(null);
          setError(null); // 404 is not an error state
          return;
        }
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log('✅ [useUser] User data fetched successfully:', data.user?.firstName, data.user?.onboardingCompleted);
      setAppUser(data.user);
      setError(null);
    } catch (err) {
      console.error('❌ [useUser] Error fetching user:', err);
      // Don't throw error, just set error state
      setError(err as Error);
      setAppUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [clerkUser?.id, isSignedIn]);

  useEffect(() => {
    if (isLoaded) {
      console.log('🚀 [useUser] useEffect triggered - isLoaded:', isLoaded, 'isSignedIn:', isSignedIn);
      fetchUser();
    }
  }, [isLoaded, isSignedIn, fetchUser]);

  return {
    user: appUser,
    isLoading: isLoading || !isLoaded,
    isSignedIn: isSignedIn ?? false,
    error,
    refetch: fetchUser,
  };
}
