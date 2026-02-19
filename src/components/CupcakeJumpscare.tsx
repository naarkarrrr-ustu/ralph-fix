
"use client";

import React, { useEffect, useState } from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { Cake, Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * CupcakeJumpscare - A high-corruption glitch event.
 * Now interactive: clicking/smashing the cake reduces system corruption.
 */
export function CupcakeJumpscare() {
  const { corruptionLevel, setCorruptionLevel } = useCorruption();
  const { playSound } = useSoundEffect();
  const [active, setActive] = useState(false);
  const [isShattering, setIsShattering] = useState(false);

  useEffect(() => {
    // Only trigger if corruption is very high (>85%)
    // Added a small probability check so it doesn't spam
    if (corruptionLevel > 85 && Math.random() > 0.98 && !active) {
      setActive(true);
      playSound('alert');
      
      // Auto-dismiss after 2 seconds if the user doesn't smash it
      const timer = setTimeout(() => {
        setActive(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [corruptionLevel, active, playSound]);

  const handleShatter = () => {
    if (isShattering) return;
    
    playSound('hammer');
    setIsShattering(true);
    
    // Reward the player for "smashing" the glitch
    // This provides a "way out" when the system is falling apart
    setCorruptionLevel(Math.max(0, corruptionLevel - 15));
    
    setTimeout(() => {
      setActive(false);
      setIsShattering(false);
    }, 500);
  };

  if (!active) return null;

  return (
    <div 
      onClick={handleShatter}
      className={cn(
        "fixed inset-0 z-[10010] flex items-center justify-center bg-secondary/20 invert transition-all duration-300 cursor-pointer",
        isShattering ? "scale-150 opacity-0 blur-xl" : "animate-in zoom-in duration-75"
      )}
    >
      <div className="relative group">
        {/* Interaction Hint */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-2 bg-black p-3 border-2 border-primary text-xs font-black text-primary animate-bounce shadow-[0_0_20px_rgba(125,249,255,0.5)]">
              <Hammer size={16} /> CLICK_TO_SMASH_GLITCH
           </div>
        </div>
        
        <Cake 
          size={350} 
          className={cn(
            "text-secondary transition-transform", 
            isShattering ? "animate-ping" : "animate-bounce"
          )} 
        />
        
        <div className="absolute inset-0 bg-secondary/40 blur-3xl animate-pulse" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black text-9xl italic whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,0,255,0.9)] select-none pointer-events-none">
          CRITICAL_CAKE
        </div>

        {/* Pixel Fragments grid overlay for extra "glitch" feel */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none opacity-20">
           {Array.from({ length: 100 }).map((_, i) => (
             <div key={i} className="border-[0.5px] border-secondary/30" />
           ))}
        </div>
      </div>
      
      {/* Full screen static burst on interaction */}
      {isShattering && (
        <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
      )}
    </div>
  );
}
