import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { doc, onSnapshot, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import { PlanType, UserProfile, UserUsage } from '../types';

interface PlanContextType {
  plan: PlanType;
  isPro: boolean;
  isSchool: boolean;
  isGov: boolean;
  usage: UserUsage | null;
  canOpenLab: boolean;
  canQueryAI: boolean;
  incrementLabUsage: () => Promise<void>;
  incrementAIUsage: () => Promise<void>;
  updateExamDate: (date: Date) => Promise<void>;
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  paywallReason: 'lab' | 'ai' | 'pro' | null;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallReason, setPaywallReason] = useState<'lab' | 'ai' | 'pro' | null>(null);

  useEffect(() => {
    if (!authUser) {
      setProfile(null);
      return;
    }

    const unsub = onSnapshot(doc(db, 'users', authUser.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as UserProfile;
        setProfile(data);
      }
    });

    return () => unsub();
  }, [authUser]);

  const plan = profile?.plan || 'FREE';
  const isPro = plan === 'STUDENT_PRO' || plan === 'SCHOOL_PLAN' || plan === 'GOV_PARTNER';
  const isSchool = plan === 'SCHOOL_PLAN' || (profile?.role === 'school_admin');
  const isGov = plan === 'GOV_PARTNER' || !!profile?.isGovSchool || (profile?.role === 'gov_admin');
  const usage = profile?.usage || null;

  const canOpenLab = useMemo(() => {
    if (isPro || isGov) return true;
    return (usage?.labsOpenedToday || 0) < 3;
  }, [isPro, isGov, usage?.labsOpenedToday]);

  const canQueryAI = useMemo(() => {
    if (isPro || isGov) return true;
    return (usage?.aiQueriesUsedToday || 0) < 10;
  }, [isPro, isGov, usage?.aiQueriesUsedToday]);

  const incrementLabUsage = useCallback(async () => {
    if (!authUser) return;
    if (!canOpenLab && !isPro && !isGov) {
      setPaywallReason('lab');
      setShowPaywall(true);
      return;
    }
    const userRef = doc(db, 'users', authUser.uid);
    await updateDoc(userRef, {
      'usage.labsOpenedToday': increment(1),
      'usage.lastActiveDate': serverTimestamp(),
    });
  }, [authUser, canOpenLab, isPro, isGov]);

  const incrementAIUsage = useCallback(async () => {
    if (!authUser) return;
    if (!canQueryAI && !isPro && !isGov) {
      setPaywallReason('ai');
      setShowPaywall(true);
      return;
    }
    const userRef = doc(db, 'users', authUser.uid);
    await updateDoc(userRef, {
      'usage.aiQueriesUsedToday': increment(1),
      'usage.lastActiveDate': serverTimestamp(),
    });
  }, [authUser, canQueryAI, isPro, isGov]);

  const updateExamDate = useCallback(async (date: Date) => {
    if (!authUser) return;
    const userRef = doc(db, 'users', authUser.uid);
    await updateDoc(userRef, {
      'usage.examDate': date,
    });
  }, [authUser]);

  const providerValue = useMemo(() => ({
    plan: isGov ? 'GOV_PARTNER' : (plan as PlanType),
    isPro: isPro || isGov,
    isSchool,
    isGov,
    usage,
    canOpenLab,
    canQueryAI,
    incrementLabUsage,
    incrementAIUsage,
    updateExamDate,
    showPaywall,
    setShowPaywall,
    paywallReason
  }), [plan, isPro, isSchool, isGov, usage, canOpenLab, canQueryAI, incrementLabUsage, incrementAIUsage, updateExamDate, showPaywall, paywallReason]);

  return (
    <PlanContext.Provider value={providerValue}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within a PlanProvider');
  return {
    plan: context.plan,
    isPro: context.isPro,
    isSchool: context.isSchool,
    isGov: context.isGov
  };
};

export const useUsageTracker = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error('useUsageTracker must be used within a PlanProvider');
  return {
    canOpenLab: context.canOpenLab,
    canQueryAI: context.canQueryAI,
    usageStats: context.usage,
    incrementLabUsage: context.incrementLabUsage,
    incrementAIUsage: context.incrementAIUsage,
    showPaywall: context.showPaywall,
    setShowPaywall: context.setShowPaywall,
    paywallReason: context.paywallReason
  };
};
