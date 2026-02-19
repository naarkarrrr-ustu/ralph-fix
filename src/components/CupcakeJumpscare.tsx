
"use client";

import React, { useEffect, useState } from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { Cake } from 'lucide-react';

export function CupcakeJumpscare() {
  const { corruptionLevel } = useCorruption();
  const { playSound } = useSoundEffect();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (corruptionLevel > 85 && Math.random() > 0.95 && !active) {
      setActive(true);
      playSound('alert');
      const timer = setTimeout(() => setActive(false), 800);
      return () => clearTimeout(timer);
    }
  }, [corruptionLevel, active, playSound]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[10010] pointer-events-none flex items-center justify-center bg-secondary/20 invert animate-in zoom-in duration-75">
      <div className="relative">
        <Cake size={300} className="text-secondary animate-bounce" />
        <div className="absolute inset-0 bg-secondary/40 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black text-9xl italic">
          CRITICAL_CAKE
        </div>
      </div>
    </div>
  );
}
