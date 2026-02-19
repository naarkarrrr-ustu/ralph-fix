
"use client";

import React, { useEffect, useState } from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { GlitchText } from './GlitchText';

export function KonamiOverlay() {
  const { isDevMode } = useCorruption();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isDevMode) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isDevMode]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[10005] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
      <div className="text-center p-12 border-4 border-primary arcade-glow bg-background">
        <GlitchText text="DEVELOPER MODE UNLOCKED" className="text-6xl font-black text-primary italic mb-4" />
        <p className="text-primary font-mono animate-pulse uppercase tracking-[0.5em]">Bonus Level Activated</p>
        <div className="mt-8 grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-2 bg-primary animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
