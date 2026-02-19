
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';
import { Progress } from '@/components/ui/progress';
import { Power } from 'lucide-react';

export default function RestartPage() {
  const router = useRouter();
  const { resetCorruption } = useCorruption();
  const [phase, setPhase] = useState<'shutdown' | 'resetting' | 'complete'>('shutdown');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('resetting');
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setPhase('complete');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'complete') {
      const timer = setTimeout(() => {
        resetCorruption();
        router.push('/boot');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase, router, resetCorruption]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-black transition-all duration-1000 p-8">
      {phase === 'shutdown' && (
        <div className="space-y-4 text-center animate-out fade-out duration-1000 delay-[1500ms]">
          <Power className="mx-auto text-primary animate-pulse mb-8" size={64} />
          <GlitchText text="SYSTEM SHUTDOWN" className="text-4xl font-black text-white" />
          <p className="text-muted-foreground font-mono">Closing Ralph Processes... Done.</p>
        </div>
      )}

      {phase === 'resetting' && (
        <div className="w-full max-w-lg space-y-6 animate-in fade-in duration-500">
           <div className="flex justify-between items-end mb-2">
             <h2 className="text-primary font-bold tracking-widest uppercase">Factory Reset In Progress</h2>
             <span className="text-primary font-mono">{progress}%</span>
           </div>
           <Progress value={progress} className="h-2 bg-muted rounded-none overflow-hidden" />
           <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-muted-foreground/50">
             <p>Purging Cache...</p>
             <p>OK</p>
             <p>Defragmenting ROM...</p>
             <p>OK</p>
             <p>Removing Ralph Remnants...</p>
             <p className="text-primary flicker">99.9%</p>
           </div>
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-4 text-center animate-in zoom-in duration-500">
          <GlitchText text="SYSTEM STABLE" className="text-6xl font-black text-primary" intensity="low" />
          <p className="text-muted-foreground italic">"I'm gonna wreck it!" - Anonymous User</p>
          
          {/* Final micro-glitch for humor */}
          <div className="mt-12 opacity-5 animate-pulse">
            <p className="text-[8px] text-secondary font-mono">ralph_was_here.tmp (0 bytes)</p>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
    </div>
  );
}
