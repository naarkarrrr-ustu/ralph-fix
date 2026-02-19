
"use client";

import React, { useEffect, useState } from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { cn } from '@/lib/utils';

export function CorruptionOverlay() {
  const { corruptionLevel } = useCorruption();
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (corruptionLevel < 10) return;

    const interval = setInterval(() => {
      if (Math.random() * 100 < corruptionLevel) {
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 100 + Math.random() * 200);
      }
    }, 2000 / (corruptionLevel / 10));

    return () => clearInterval(interval);
  }, [corruptionLevel]);

  if (!showBurst) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden flex flex-col items-center justify-center">
      <div 
        className={cn(
          "absolute w-full bg-secondary/10 backdrop-invert h-[2px] transition-all",
          Math.random() > 0.5 ? "top-1/4" : "top-3/4"
        )} 
      />
      <div 
        className="w-full h-full bg-primary/5 animate-pulse flex items-center justify-center opacity-30"
        style={{ clipPath: `polygon(${Math.random()*100}% 0, 100% ${Math.random()*100}%, ${Math.random()*100}% 100%, 0 ${Math.random()*100}%)` }}
      >
        <span className="text-[10vw] font-bold text-secondary-foreground opacity-20 transform -rotate-12">
          CORRUPTION DETECTED
        </span>
      </div>
    </div>
  );
}
