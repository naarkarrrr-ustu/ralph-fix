
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CorruptionContextType = {
  corruptionLevel: number;
  setCorruptionLevel: (level: number) => void;
  increaseCorruption: (amount: number) => void;
  resetCorruption: () => void;
};

const CorruptionContext = createContext<CorruptionContextType | undefined>(undefined);

export function CorruptionProvider({ children }: { children: ReactNode }) {
  const [corruptionLevel, setCorruptionLevel] = useState(0);

  const increaseCorruption = (amount: number) => {
    setCorruptionLevel((prev) => Math.min(prev + amount, 100));
  };

  const resetCorruption = () => setCorruptionLevel(0);

  return (
    <CorruptionContext.Provider value={{ corruptionLevel, setCorruptionLevel, increaseCorruption, resetCorruption }}>
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
