
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

type CorruptionContextType = {
  corruptionLevel: number;
  setCorruptionLevel: (level: number) => void;
  increaseCorruption: (amount: number) => void;
  resetCorruption: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  isDevMode: boolean;
  setDevMode: (active: boolean) => void;
  badAnonActive: boolean;
  setBadAnonActive: (active: boolean) => void;
  titleClickCount: number;
  handleTitleClick: () => void;
  selectedWorld: string | null;
  setSelectedWorld: (world: string | null) => void;
  repairComplete: boolean;
  setRepairComplete: (status: boolean) => void;
};

const CorruptionContext = createContext<CorruptionContextType | undefined>(undefined);

export function CorruptionProvider({ children }: { children: ReactNode }) {
  const [corruptionLevel, setCorruptionLevel] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isDevMode, setDevMode] = useState(false);
  const [badAnonActive, setBadAnonActive] = useState(false);
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  const [repairComplete, setRepairComplete] = useState(false);

  // Clamped state update to prevent UI breakage
  const setClampedCorruption = useCallback((val: number | ((prev: number) => number)) => {
    setCorruptionLevel((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      return Math.min(Math.max(next, 0), 100);
    });
  }, []);

  const increaseCorruption = useCallback((amount: number) => {
    setClampedCorruption(prev => prev + amount);
  }, [setClampedCorruption]);

  const resetCorruption = useCallback(() => {
    setCorruptionLevel(0);
    setDevMode(false);
    setBadAnonActive(false);
    setRepairComplete(false);
    setSelectedWorld(null);
  }, []);

  const toggleSound = () => setSoundEnabled(prev => !prev);

  const handleTitleClick = () => {
    setTitleClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setBadAnonActive(true);
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--corruption-intensity', (corruptionLevel / 100).toString());
    document.documentElement.style.setProperty('--glitch-speed', `${Math.max(0.1, 1 - (corruptionLevel / 100))}s`);
    
    if (isDevMode) {
      document.documentElement.classList.add('dev-mode');
    } else {
      document.documentElement.classList.remove('dev-mode');
    }
  }, [corruptionLevel, isDevMode]);

  return (
    <CorruptionContext.Provider value={{ 
      corruptionLevel, 
      setCorruptionLevel: setClampedCorruption, 
      increaseCorruption, 
      resetCorruption,
      soundEnabled,
      toggleSound,
      isDevMode,
      setDevMode,
      badAnonActive,
      setBadAnonActive,
      titleClickCount,
      handleTitleClick,
      selectedWorld,
      setSelectedWorld,
      repairComplete,
      setRepairComplete
    }}>
      {children}
    </CorruptionContext.Provider>
  );
}

export function useCorruption() {
  const context = useContext(CorruptionContext);
  if (context === undefined) {
    throw new Error('useCorruption must be used within a CorruptionProvider');
  }
  return context;
}
