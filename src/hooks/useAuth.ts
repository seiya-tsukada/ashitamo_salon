import { useCallback, useEffect, useState } from 'react';
import { AuthUser, fetchMe, getStoredToken, isAuthConfigured, signIn, signOut, signUp } from '../lib/auth';

const hasStoredSession = () => isAuthConfigured && getStoredToken() !== null;

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  // Restoring a stored session needs one round trip before we know who is logged in
  const [isRestoring, setIsRestoring] = useState(hasStoredSession);

  useEffect(() => {
    if (!hasStoredSession()) return;
    fetchMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsRestoring(false));
  }, []);

  const handleSignUp = useCallback(async (email: string, password: string, displayName: string) => {
    setUser(await signUp(email, password, displayName));
  }, []);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    const signedIn = await signIn(email, password);
    setUser(signedIn);
    return signedIn;
  }, []);

  const handleSignOut = useCallback(async () => {
    setUser(null);
    await signOut();
  }, []);

  return { user, isRestoring, signUp: handleSignUp, signIn: handleSignIn, signOut: handleSignOut };
};
