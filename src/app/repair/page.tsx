
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';
import { CorruptionOverlay } from '@/components/CorruptionOverlay';
import { ArcadePanel } from '@/components/ArcadePanel';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Hammer, RefreshCw, Zap, Target } from 'lucide-react';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { cn } from '@/lib/utils';

interface Fragment {
  id: number;
  top: number;
  left: number;
  size: number;
  speedX: number;
  speedY: number;
  type: 'code' | 'glitch' | 'data';
}

interface Spark {
  id: number;
  top: number;
  left: number;
}

export default function RepairPage() {
  const router = useRouter();
  const { increaseCorruption, corruptionLevel, setCorruptionLevel } = useCorruption();
  const { playSound } = useSoundEffect();
  const [repairProgress, setRepairProgress] = useState(0);
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(35);
  const [score, setScore] = useState(0);

  const spawnFragments = useCallback(() => {
    // Easier: only 6 fragments at a time instead of 10
    const newFrags = Array.from({ length: 6 }).map((_, i) => ({
      id: Math.random(),
      top: Math.random() * 70 + 15,
      left: Math.random() * 70 + 15,
      size: Math.random() * 40 + 35, // Slightly larger targets
      speedX: (Math.random() - 0.5) * (1 + (corruptionLevel / 80)), // Slower movement
      speedY: (Math.random() - 0.5) * (1 + (corruptionLevel / 80)),
      type: Math.random() > 0.8 ? 'glitch' : 'code',
    } as Fragment));
    setFragments(newFrags);
  }, [corruptionLevel]);

  useEffect(() => {
    increaseCorruption(15);
    spawnFragments();
    
    const moveInterval = setInterval(() => {
      setFragments(prev => prev.map(f => {
        let newTop = f.top + f.speedY;
        let newLeft = f.left + f.speedX;
        
        if (newTop < 5 || newTop > 90) f.speedY *= -1;
        if (newLeft < 5 || newLeft > 95) f.speedX *= -1;

        return { ...f, top: newTop, left: newLeft };
      }));
    }, 50);

    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          playSound('death');
          increaseCorruption(30);
          return 35; // Reset timer on death
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(timerInterval);
    };
  }, [increaseCorruption, spawnFragments, playSound]);

  const handleFragmentClick = (frag: Fragment) => {
    playSound('hammer');
    
    const newSpark = { id: Math.random(), top: frag.top, left: frag.left };
    setSparks(prev => [...prev, newSpark]);
    setTimeout(() => {
      setSparks(prev => prev.filter(s => s.id !== newSpark.id));
    }, 400);

    setFragments(prev => prev.filter(f => f.id !== frag.id));
    setScore(prev => prev + (frag.type === 'glitch' ? 500 : 200));
    
    setRepairProgress(prev => {
      // Easier: 20% progress per click instead of 10%
      const next = prev + 20;
      if (next >= 100) {
        setTimeout(() => router.push('/restart'), 1200);
        return 100;
      }
      return next;
    });
    
    setCorruptionLevel(Math.max(0, corruptionLevel - 5));

    if (fragments.length <= 1) {
      setTimeout(spawnFragments, 300);
    }
  };

  return (
    <div className={cn(
      "h-full flex flex-col p-8 relative overflow-hidden bg-[#0a0a0c] transition-all hammer-cursor",
      corruptionLevel > 70 ? "shake-dynamic" : "",
      corruptionLevel > 85 ? "zoom-distortion" : ""
    )}>
      <CorruptionOverlay />
      
      <div className="z-20 max-w-5xl mx-auto w-full space-y-6 flex-1 flex flex-col">
        <div className="flex gap-4">
          <ArcadePanel className="flex-1" variant="secondary" title="SYSTEM_ALERT">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/20 p-2 rounded animate-pulse">
                <AlertTriangle className="text-secondary" size={32} />
              </div>
              <div>
                <GlitchText text={corruptionLevel > 80 ? "GOING TURBO" : "CORRUPTION DETECTED"} className="text-3xl font-black text-secondary uppercase" />
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">THREAT_LEVEL: OMEGA • CHARACTER_ANOMALY: RALPH</p>
              </div>
            </div>
          </ArcadePanel>
          
          <ArcadePanel className="w-48" title="TIMER">
             <div className="text-center">
                <p className="text-[8px] font-bold text-primary/60 uppercase">TIME_TO_CRASH</p>
                <p className={cn(
                  "text-3xl font-black font-mono",
                  timeRemaining < 10 ? "text-destructive animate-pulse" : "text-primary"
                )}>
                  00:{timeRemaining.toString().padStart(2, '0')}
                </p>
             </div>
          </ArcadePanel>

          <ArcadePanel className="w-48" title="SCORE">
             <div className="text-center">
                <p className="text-[8px] font-bold text-primary/60 uppercase">P1_PATCH_SCORE</p>
                <p className="text-3xl font-black font-mono text-primary">
                  {score.toString().padStart(6, '0')}
                </p>
             </div>
          </ArcadePanel>
        </div>

        <div className="relative flex-1 bg-black/40 border-4 border-dashed border-primary/10 rounded overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
             <RefreshCw size={400} className="animate-spin duration-[20s]" />
          </div>

          {sparks.map(spark => (
            <div 
              key={spark.id}
              className="absolute z-50 spark-burst flex items-center justify-center"
              style={{ top: `${spark.top}%`, left: `${spark.left}%` }}
            >
               <div className="w-4 h-4 bg-yellow-400 rounded-full blur-sm" />
               <div className="absolute w-12 h-[1px] bg-yellow-400 rotate-45" />
               <div className="absolute w-12 h-[1px] bg-yellow-400 -rotate-45" />
            </div>
          ))}

          {fragments.map((frag) => (
            <button
              key={frag.id}
              onClick={() => handleFragmentClick(frag)}
              className="absolute z-30 transition-transform active:scale-75 hover:brightness-150"
              style={{
                top: `${frag.top}%`,
                left: `${frag.left}%`,
                width: `${frag.size}px`,
                height: `${frag.size}px`,
              }}
            >
              <div className={cn(
                "w-full h-full p-2 flex items-center justify-center animate-pulse rotate-45 border-2",
                frag.type === 'glitch' ? "bg-secondary/20 border-secondary" : "bg-primary/20 border-primary"
              )}>
                 {frag.type === 'glitch' ? <Target className="text-secondary -rotate-45" /> : <Hammer className="text-primary -rotate-45" />}
              </div>
            </button>
          ))}

          {repairProgress >= 100 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/20 backdrop-blur-xl z-50 animate-in zoom-in duration-700">
               <div className="bg-background p-12 border-4 border-primary arcade-glow text-center space-y-4">
                 <GlitchText text="SYSTEM STABILIZED" className="text-6xl font-black text-primary italic" />
                 <p className="text-primary font-mono animate-pulse uppercase tracking-widest">REBOOTING_ARCADE_OS...</p>
                 <div className="flex justify-center gap-4 mt-4">
                    <Zap className="text-primary animate-bounce" size={48} />
                    <Hammer className="text-primary animate-bounce delay-150" size={48} />
                 </div>
               </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
           <div className="flex justify-between text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
              <span>Applying emergency kernel patches...</span>
              <span>Stability Restore: {Math.floor(repairProgress)}%</span>
           </div>
           <Progress value={repairProgress} className="h-4 bg-muted border-2 border-primary/20 rounded-none overflow-hidden" />
        </div>
      </div>
    </div>
  );
}
