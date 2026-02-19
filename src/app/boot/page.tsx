
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';
import { ArcadePanel } from '@/components/ArcadePanel';
import { Progress } from '@/components/ui/progress';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { cn } from '@/lib/utils';

export default function BootPage() {
  const [progress, setProgress] = useState(0);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [waitingForCoin, setWaitingForCoin] = useState(true);
  const router = useRouter();
  const { resetCorruption } = useCorruption();
  const { playSound } = useSoundEffect();

  useEffect(() => {
    resetCorruption();
  }, [resetCorruption]);

  const handleInsertCoin = () => {
    setWaitingForCoin(false);
    playSound('boot');
    
    const logs = [
      "Initializing Arcade Kernel...",
      "Loading World Modules...",
      "Fix-It Felix Jr. sector: OK",
      "Sugar Rush sector: OK",
      "Hero's Duty sector: OK",
      "Checking Ralph Integrity... FAILED",
      "Character Ralph.obj out of bounds.",
      "Attempting bypass... READY"
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push('/game-select'), 800);
          return 100;
        }
        
        if (Math.random() > 0.7 && logIndex < logs.length) {
          setBootLog(prev => [...prev, logs[logIndex++]]);
        }

        return prev + Math.random() * 8;
      });
    }, 150);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-12 bg-background p-6">
      <div className="space-y-4 text-center">
        <div className="relative inline-block">
          <h1 className="text-6xl md:text-8xl font-black tracking-widest text-primary drop-shadow-[0_0_15px_rgba(125,249,255,0.5)]">
            ARCADE<span className="text-secondary">OS</span>
          </h1>
          <div className="absolute -right-12 top-0 rotate-12">
            <Badge text="V1.98.2" color="bg-secondary" />
          </div>
        </div>
        <GlitchText text="LITWAK'S SYSTEM" className="text-muted-foreground font-mono text-sm tracking-[0.5em] block" />
      </div>

      <div className="w-full max-w-lg space-y-6">
        {waitingForCoin ? (
          <div 
            onClick={handleInsertCoin}
            className="group cursor-pointer flex flex-col items-center space-y-8 animate-pulse"
          >
            <div className="w-24 h-24 border-4 border-primary rounded-full flex items-center justify-center text-primary font-black text-3xl group-hover:scale-110 transition-transform arcade-glow">
              $
            </div>
            <GlitchText 
              text="INSERT COIN TO START" 
              className="text-xl font-black text-primary italic tracking-widest"
              intensity="low"
            />
          </div>
        ) : (
          <ArcadePanel title="BOOT_LOADER" className="bg-black/40">
             <div className="space-y-4">
              <Progress value={progress} className="h-2 rounded-none bg-muted border border-primary/20" />
              <div className="h-32 overflow-hidden font-mono text-[10px] text-primary/60 space-y-1">
                {bootLog.map((log, i) => (
                  <p key={i} className="animate-in slide-in-from-left duration-300">{">"} {log}</p>
                ))}
                <p className="animate-pulse">{">"} _</p>
              </div>
             </div>
          </ArcadePanel>
        )}
      </div>

      <div className="absolute bottom-16 flex gap-12 text-[10px] font-mono text-muted-foreground/30">
        <p>MEM: 640KB OK</p>
        <p>JOYSTICK_DRIVER: LOADED</p>
        <p>ANOMALY_DETECTION: BYPASSED</p>
      </div>
    </div>
  );
}

function Badge({ text, color }: { text: string, color: string }) {
  return (
    <span className={cn("px-2 py-0.5 text-[10px] font-bold text-white rounded uppercase", color)}>
      {text}
    </span>
  );
}
