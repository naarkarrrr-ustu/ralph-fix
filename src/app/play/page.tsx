
"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';
import { ArcadePanel } from '@/components/ArcadePanel';
import { Progress } from '@/components/ui/progress';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { Heart, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ROMTarget {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

export default function PlayPage() {
  const router = useRouter();
  const { repairComplete, selectedWorld, corruptionLevel, increaseCorruption } = useCorruption();
  const { playSound } = useSoundEffect();
  
  const [score, setScore] = useState(0);
  const [stability, setStability] = useState(100);
  const [timeLeft, setTimeLeft] = useState(20);
  const [targets, setTargets] = useState<ROMTarget[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'win' | 'loss'>('playing');
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Security Guard: Redirect if repair not complete
  useEffect(() => {
    if (!repairComplete) {
      router.push('/boot');
    }
  }, [repairComplete, router]);

  const spawnTarget = useCallback(() => {
    if (targets.length >= 5 || gameState !== 'playing') return;
    
    const speedBase = corruptionLevel > 70 ? 1.5 : corruptionLevel < 40 ? 0.8 : 1.2;
    const newTarget: ROMTarget = {
      id: Math.random(),
      x: 10 + Math.random() * 80,
      y: -10,
      size: 40 + Math.random() * 20,
      speed: speedBase + Math.random() * 0.5
    };
    
    setTargets(prev => [...prev, newTarget]);
  }, [targets.length, gameState, corruptionLevel]);

  // Game Logic Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Move targets
    gameLoopRef.current = setInterval(() => {
      setTargets(prev => {
        const next: ROMTarget[] = [];
        prev.forEach(t => {
          const nextY = t.y + t.speed;
          if (nextY > 100) {
            // Missed target
            setStability(s => Math.max(0, s - 10));
            playSound('glitch');
          } else {
            next.push({ ...t, y: nextY });
          }
        });
        return next;
      });
    }, 50);

    // Spawn targets
    spawnIntervalRef.current = setInterval(() => {
      spawnTarget();
    }, 1200);

    // Countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('win');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      clearInterval(timer);
    };
  }, [gameState, spawnTarget, playSound]);

  // Monitor Stability for Loss Condition
  useEffect(() => {
    if (stability <= 0 && gameState === 'playing') {
      setGameState('loss');
      playSound('death');
    }
  }, [stability, gameState, playSound]);

  // Handle Win/Loss Transitions
  useEffect(() => {
    if (gameState === 'win') {
      increaseCorruption(10);
      setTimeout(() => router.push('/restart'), 3000);
    } else if (gameState === 'loss') {
      increaseCorruption(25);
      setTimeout(() => router.push('/restart'), 3000);
    }
  }, [gameState, router, increaseCorruption]);

  const handleTargetClick = (id: number) => {
    playSound('click');
    setScore(s => s + 100);
    setTargets(prev => prev.filter(t => t.id !== id));
  };

  if (!repairComplete) return null;

  return (
    <div className="h-full flex flex-col p-8 space-y-6 relative overflow-hidden bg-black">
      {/* HUD Bar */}
      <div className="flex gap-4 z-20">
        <ArcadePanel className="flex-1" title="WORLD_STATUS">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-3">
               <Zap className="text-primary animate-pulse" />
               <span className="font-black text-xl italic uppercase text-primary">
                 {selectedWorld?.replace('-', ' ') || 'FIX-IT FELIX JR.'}
               </span>
             </div>
             <div className="flex gap-8">
                <Stat icon={<Target />} label="SCORE" value={score.toString().padStart(5, '0')} />
                <Stat icon={<Heart />} label="STABILITY" value={`${stability}%`} color={stability < 30 ? "text-secondary" : "text-primary"} />
             </div>
          </div>
        </ArcadePanel>
        
        <ArcadePanel className="w-48" title="TIMER">
           <div className="text-center">
              <p className="text-3xl font-black font-mono text-primary">
                00:{timeLeft.toString().padStart(2, '0')}
              </p>
           </div>
        </ArcadePanel>
      </div>

      {/* Game Stage */}
      <div className="flex-1 relative border-4 border-primary/20 bg-primary/5 rounded overflow-hidden">
        {targets.map(target => (
          <button
            key={target.id}
            onClick={() => handleTargetClick(target.id)}
            className="absolute z-30 flex items-center justify-center transition-transform active:scale-75 hover:brightness-125"
            style={{
              top: `${target.y}%`,
              left: `${target.x}%`,
              width: `${target.size}px`,
              height: `${target.size}px`,
            }}
          >
            <div className="w-full h-full bg-primary/20 border-2 border-primary arcade-glow flex items-center justify-center rounded">
              <Zap size={target.size * 0.5} className="text-primary animate-pulse" />
            </div>
          </button>
        ))}

        {/* Win/Loss Overlays */}
        {gameState === 'win' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary/40 backdrop-blur-md animate-in zoom-in duration-500">
             <GlitchText text="ROM STABLE" className="text-7xl font-black text-white italic" />
             <p className="text-white font-mono mt-4 uppercase tracking-[0.5em]">System Recovery Initiated...</p>
          </div>
        )}

        {gameState === 'loss' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-secondary/40 backdrop-blur-md animate-in zoom-in duration-500">
             <GlitchText text="GAME CRASHED" className="text-7xl font-black text-white italic" />
             <p className="text-white font-mono mt-4 uppercase tracking-[0.3em]">Ralph Broke the Building.</p>
          </div>
        )}
      </div>

      {/* Stability Bar Footer */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-primary uppercase tracking-widest">
           <span>Core Integrity</span>
           <span>{stability}%</span>
        </div>
        <Progress value={stability} className="h-3 bg-muted rounded-none border border-primary/20" />
      </div>
    </div>
  );
}

function Stat({ icon, label, value, color = "text-primary" }: { icon: any, label: string, value: string, color?: string }) {
  return (
    <div className="flex flex-col items-end">
      <span className="text-[8px] text-muted-foreground uppercase">{label}</span>
      <div className={cn("flex items-center gap-1 font-mono font-bold", color)}>
        {value}
      </div>
    </div>
  );
}
