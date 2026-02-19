
"use client";

import React, { useEffect, useState } from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { cn } from '@/lib/utils';

export function CorruptionOverlay() {
  const { corruptionLevel } = useCorruption();
  const [showBurst, setShowBurst] = useState(false);
  const [burstStyle, setBurstStyle] = useState<React.CSSProperties>({});
  const [lineClass, setLineClass] = useState<string>("");

  useEffect(() => {
    if (corruptionLevel < 10) return;

    const interval = setInterval(() => {
      // Calculate randomness only on the client
      if (Math.random() * 100 < corruptionLevel) {
        const randomTop = Math.random() > 0.5 ? "top-1/4" : "top-3/4";
        const randomPolygon = `polygon(${Math.random()*100}% 0, 100% ${Math.random()*100}%, ${Math.random()*100}% 100%, 0 ${Math.random()*100}%)`;
        const randomRotate = Math.floor(Math.random() * 30 - 15);

        setLineClass(randomTop);
        setBurstStyle({
          clipPath: randomPolygon,
          transform: `rotate(${randomRotate}deg)`
        });

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
          lineClass
        )} 
      />
      <div 
        className="w-full h-full bg-primary/5 animate-pulse flex items-center justify-center opacity-30"
        style={burstStyle}
      >
        <span className="text-[10vw] font-bold text-secondary-foreground opacity-20 transform">
          CORRUPTION DETECTED
        </span>
      </div>
    </div>
  );
}
