import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export type ProfileData = {
  name: string;
  email: string;
  role: string;
  grade: string;
  syllabus: string;
  institution: string;
  language: string;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  role: string | null;
  loading: boolean;
  roleError: boolean;
  profileData: ProfileData | null;
  refreshProfile: () => Promise<void>;
};

const PROFILE_CACHE_KEY = 'vl_profile_cache';
const ROLE_CACHE_KEY = 'vl_role_cache';

// Instantly read cached profile so loading can start as false
const getCachedProfile = (): ProfileData | null => {
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getCachedRole = (): string | null => {
  try {
    return localStorage.getItem(ROLE_CACHE_KEY);
  } catch {
    return null;
  }
};

const cacheProfile = (profile: ProfileData) => {
  try {
    localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
    localStorage.setItem(ROLE_CACHE_KEY, profile.role);
  } catch {
    // localStorage full or unavailable — silently ignore
  }
};

const clearProfileCache = () => {
  try {
    localStorage.removeItem(PROFILE_CACHE_KEY);
    localStorage.removeItem(ROLE_CACHE_KEY);
  } catch {
    // ignore
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  roleError: false,
  profileData: null,
  refreshProfile: async () => {},
});

// Retry utility for robustness against network drops
async function withRetry<T>(fn: () => Promise<T>, attempts = 3, baseDelayMs = 800): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await new Promise(r => setTimeout(r, baseDelayMs * Math.pow(2, i)));
      }
    }
  }
  throw lastError;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Hydrate immediately from cache — no spinner needed if cache exists
  const cachedProfile = useRef(getCachedProfile());
  const cachedRole = useRef(getCachedRole());
  const hasCachedData = cachedProfile.current !== null;

  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(cachedRole.current);
  const [loading, setLoading] = useState(!hasCachedData);
  const [roleError, setRoleError] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(cachedProfile.current);

  const lastKnownRole = useRef<string | null>(cachedRole.current);

  const resolveProfile = async (firebaseUser: User): Promise<{ role: string, profile: ProfileData | null }> => {
    // 1. Check Custom Claims first
    const tokenResult = await firebaseUser.getIdTokenResult();
    const claimRole = tokenResult.claims['role'] as string | undefined;

    // 2. Fetch Firestore data
    const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    let resolvedRole = claimRole ? claimRole.toLowerCase() : 'student';
    let profile: ProfileData | null = null;

    if (snap.exists()) {
      const data = snap.data();
      resolvedRole = claimRole ? claimRole.toLowerCase() : (data.role || 'student').toLowerCase();
      profile = {
        name: data.name || '',
        email: data.email || '',
        role: resolvedRole,
        grade: data.grade || '',
        syllabus: data.syllabus || '',
        institution: data.institution || '',
        language: data.language || 'English',
        avatar: data.avatar || '',
      };
    } else if (!claimRole) {
      resolvedRole = 'student';
    }

    return { role: resolvedRole, profile };
  };

  const fetchProfile = useCallback(async (firebaseUser: User) => {
    setRoleError(false);
    try {
      const { role: resolvedRole, profile } = await withRetry(() => resolveProfile(firebaseUser), 3, 800);
      
      lastKnownRole.current = resolvedRole;
      setRole(resolvedRole);
      setProfileData(profile);
      setRoleError(false);
      
      if (profile) cacheProfile(profile);
      else clearProfileCache();

    } catch (error) {
      console.error("Auth context error after retries:", error);
      // On network error, keep cached data if available — don't wipe it
      if (lastKnownRole.current) {
        setRole(lastKnownRole.current);
      } else if (!cachedProfile.current) {
        setRole(null);
        setProfileData(null);
        setRoleError(true);
      }
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          await fetchProfile(currentUser);
        } else {
          setUser(null);
          setRole(null);
          setProfileData(null);
          setRoleError(false);
          lastKnownRole.current = null;
          clearProfileCache();
        }
      } catch (error) {
         console.error("Auth context event error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider value={{ user, role, loading, roleError, profileData, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
 
