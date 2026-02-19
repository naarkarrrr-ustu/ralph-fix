
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';
import { Progress } from '@/components/ui/progress';
import { Power, ShieldCheck } from 'lucide-react';
import { useSoundEffect } from '@/hooks/use-sound-effect';

export default function RestartPage() {
  const router = useRouter();
  const { resetCorruption } = useCorruption();
  const { playSound } = useSoundEffect();
  const [phase, setPhase] = useState<'shutdown' | 'resetting' | 'complete'>('shutdown');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    playSound('shutdown');
    const timer = setTimeout(() => {
      setPhase('resetting');
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setPhase('complete');
            return 100;
          }
          return prev + 1;
        });
      }, 40);
    }, 2000);

    return () => clearTimeout(timer);
  }, [playSound]);

  useEffect(() => {
    if (phase === 'complete') {
      playSound('boot');
      const timer = setTimeout(() => {
        resetCorruption();
        router.push('/boot');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, router, resetCorruption, playSound]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-black transition-all duration-1000 p-8">
      {phase === 'shutdown' && (
        <div className="space-y-4 text-center animate-out fade-out duration-1000 delay-[1500ms]">
          <div className="relative inline-block mb-8">
             <Power className="text-primary animate-pulse" size={80} />
             <div className="absolute inset-0 bg-primary/20 blur-2xl animate-pulse" />
          </div>
          <GlitchText text="RALPH PURGED" className="text-4xl font-black text-white" />
          <p className="text-muted-foreground font-mono uppercase tracking-[0.2em] text-xs">Closing Anomaly Processes... Done.</p>
        </div>
      )}

      {phase === 'resetting' && (
        <div className="w-full max-w-lg space-y-8 animate-in fade-in duration-500">
           <div className="space-y-2">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-primary font-bold tracking-widest uppercase text-xs">Factory Reset In Progress</h2>
                <span className="text-primary font-mono text-sm">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-muted rounded-none overflow-hidden border border-primary/20" />
           </div>
           
           <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[10px] font-mono text-muted-foreground/50 uppercase">
             <div className="flex justify-between"><span>Purging Cache...</span> <span className="text-primary">OK</span></div>
             <div className="flex justify-between"><span>Scanning ROM...</span> <span className="text-primary">OK</span></div>
             <div className="flex justify-between"><span>Syncing Felix.exe...</span> <span className="text-primary">OK</span></div>
             <div className="flex justify-between"><span>Resetting UI...</span> <span className="text-primary">OK</span></div>
             <div className="flex justify-between"><span>Deleting temp/ralph/</span> <span className="text-secondary flicker">PENDING</span></div>
             <div className="flex justify-between"><span>Security Sweep...</span> <span className="text-primary">OK</span></div>
           </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 text-center animate-in zoom-in duration-500">
          <div className="flex justify-center mb-4">
             <ShieldCheck size={100} className="text-primary arcade-glow" />
          </div>
          <GlitchText text="SYSTEM STABLE" className="text-6xl font-black text-primary italic" intensity="low" />
          <p className="text-muted-foreground italic text-sm">"Thanks for the fix, brother!" - Felix</p>
          
          <div className="mt-12 opacity-5 animate-pulse">
            <p className="text-[8px] text-secondary font-mono">ralph_was_here.tmp (0 bytes)</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
    </div>
  );
}
