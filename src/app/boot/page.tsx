
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';

export default function BootPage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { resetCorruption } = useCorruption();

  useEffect(() => {
    resetCorruption();
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push('/game-select'), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [router, resetCorruption]);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 bg-background p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl md:text-6xl font-headline tracking-widest text-primary">
          ARCADE<span className="text-secondary">OS</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm">v1.98.2 - READY TO PLAY</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Progress value={progress} className="h-2 border border-primary/20 bg-muted" />
        <div className="flex justify-between font-mono text-xs text-primary/60">
          <span>INITIALIZING CORE...</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>

      <div className="font-mono text-[10px] text-muted-foreground/30 absolute bottom-10 space-y-1 w-full text-center max-w-sm">
        <p>MEM CHECK: 640KB OK</p>
        <p>ROM CHECK: SUGAR_RUSH_001.BIN OK</p>
        <p>IO CHECK: JOYSTICK_DRIVER LOADED</p>
        <p>WARNING: RALPH_MODULE.SYS NOT FOUND</p>
      </div>
    </div>
  );
}
