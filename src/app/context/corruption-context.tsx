
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type CorruptionContextType = {
  corruptionLevel: number;
  setCorruptionLevel: (level: number) => void;
  increaseCorruption: (amount: number) => void;
  resetCorruption: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
};

const CorruptionContext = createContext<CorruptionContextType | undefined>(undefined);

export function CorruptionProvider({ children }: { children: ReactNode }) {
  const [corruptionLevel, setCorruptionLevel] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const increaseCorruption = (amount: number) => {
    setCorruptionLevel((prev) => Math.min(prev + amount, 100));
  };

  const resetCorruption = () => setCorruptionLevel(0);

  const toggleSound = () => setSoundEnabled(prev => !prev);

  // Sync with CSS variables for global visual effects
  useEffect(() => {
    document.documentElement.style.setProperty('--corruption-intensity', (corruptionLevel / 100).toString());
    document.documentElement.style.setProperty('--glitch-speed', `${Math.max(0.1, 1 - (corruptionLevel / 100))}s`);
  }, [corruptionLevel]);

  return (
    <CorruptionContext.Provider value={{ 
      corruptionLevel, 
      setCorruptionLevel, 
      increaseCorruption, 
      resetCorruption,
      soundEnabled,
      toggleSound
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
