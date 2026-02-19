
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';
import { PixelBreakButton } from '@/components/PixelBreakButton';
import { CorruptionOverlay } from '@/components/CorruptionOverlay';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Hammer, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RepairPage() {
  const router = useRouter();
  const { increaseCorruption, corruptionLevel } = useCorruption();
  const [repairProgress, setRepairProgress] = useState(0);
  const [fragments, setFragments] = useState<{ id: number, top: string, left: string, size: number }[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    increaseCorruption(30);
    generateFragments();
    
    const msgInterval = setInterval(() => {
      const humors = [
        "Arcade unstable. Blame Ralph.",
        "Corruption at critical. That seems fine.",
        "Fix it before Felix sees this.",
        "Memory leak detected in Sugar Rush sector.",
        "Ralph detected outside intended bounds.",
        "Unexpected cake found in circuitry."
      ];
      setMessages(prev => [humors[Math.floor(Math.random() * humors.length)], ...prev].slice(0, 5));
    }, 3000);

    return () => clearInterval(msgInterval);
  }, []);

  const generateFragments = () => {
    const newFrags = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      size: Math.random() * 40 + 20
    }));
    setFragments(newFrags);
  };

  const handleFragmentClick = (id: number) => {
    setFragments(prev => prev.filter(f => f.id !== id));
    setRepairProgress(prev => {
      const next = prev + 12.5;
      if (next >= 100) {
        // Trigger completion logic
        setTimeout(() => router.push('/restart'), 1000);
      }
      return next;
    });
    // Increase corruption on "miss" or just progressively
    if (Math.random() > 0.7) increaseCorruption(2);
  };

  return (
    <div className="h-full flex flex-col p-8 relative overflow-hidden bg-[#0a0a0c]">
      <CorruptionOverlay />
      
      <div className="z-20 max-w-4xl mx-auto w-full space-y-8">
        <div className="flex justify-between items-center bg-card/80 p-6 border-b-2 border-secondary shadow-[0_0_20px_rgba(255,0,255,0.2)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="text-secondary animate-pulse" size={24} />
              <GlitchText text="CRITICAL SYSTEM FAILURE" className="text-2xl font-black text-secondary" intensity="high" />
            </div>
            <p className="text-muted-foreground font-mono text-xs">ERRCODE: 0xRALPH_WRECKED_IT</p>
          </div>
          <div className="text-right">
            <p className="text-primary font-bold">REPAIR STATUS</p>
            <p className="text-3xl font-black font-mono text-primary">{Math.floor(repairProgress)}%</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-primary/70 font-bold uppercase tracking-widest">
            <span>Filtering Garbage Data...</span>
            <span>Unstable</span>
          </div>
          <Progress value={repairProgress} className="h-4 bg-muted border border-primary/20 rounded-none shadow-[0_0_10px_rgba(125,249,255,0.2)]" />
        </div>

        {/* Repair Area */}
        <div className="relative h-[50vh] bg-card/20 border-2 border-dashed border-primary/20 rounded-lg overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
             <RefreshCw size={200} className="animate-spin duration-[10s]" />
          </div>

          {fragments.map((frag) => (
            <button
              key={frag.id}
              onClick={() => handleFragmentClick(frag.id)}
              className="absolute z-30 transform hover:scale-125 transition-transform p-2 bg-secondary/30 border border-secondary text-secondary animate-pulse"
              style={{
                top: frag.top,
                left: frag.left,
                width: frag.size,
                height: frag.size,
              }}
            >
              <Hammer className="w-full h-full" />
            </button>
          ))}

          {fragments.length === 0 && repairProgress < 100 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-40">
              <PixelBreakButton onClick={generateFragments} className="bg-primary text-background font-bold">
                SCAN FOR MORE FRAGMENTS
              </PixelBreakButton>
            </div>
          )}

          {repairProgress >= 100 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/20 backdrop-blur-md z-50 text-center animate-in zoom-in duration-500">
               <GlitchText text="REPAIR COMPLETE" className="text-5xl font-black text-white mb-4" />
               <p className="text-white font-mono animate-bounce">REBOOTING SYSTEM...</p>
            </div>
          )}
        </div>

        {/* Console */}
        <div className="bg-black/80 p-4 font-mono text-[10px] text-green-500/80 h-32 overflow-hidden border border-green-500/20">
          {messages.map((m, i) => (
            <p key={i} className={cn(i === 0 ? "text-green-400" : "text-green-900")}>
              {">"} {m}
            </p>
          ))}
          <p className="animate-pulse">{"_ "}</p>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
}
