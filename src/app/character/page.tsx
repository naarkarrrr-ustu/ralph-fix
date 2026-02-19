"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';
import { PixelBreakButton } from '@/components/PixelBreakButton';
import { CorruptionOverlay } from '@/components/CorruptionOverlay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, User, Cpu, Zap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function CharacterPage() {
  const router = useRouter();
  const { increaseCorruption, corruptionLevel } = useCorruption();
  const [warnings, setWarnings] = useState<string[]>([]);
  const charImg = PlaceHolderImages.find(i => i.id === 'ralph-char');

  useEffect(() => {
    increaseCorruption(25);
    
    const triggerWarning = () => {
      const messages = [
        "Unauthorized character size detected.",
        "Internal memory shift: Ralph.obj is expanding.",
        "Graphic pipeline overflow in sector 7.",
        "Input delay increasing. Please restart controller."
      ];
      setWarnings(prev => [...prev, messages[Math.floor(Math.random() * messages.length)]]);
    };

    const timer = setTimeout(triggerWarning, 3000);
    const timer2 = setTimeout(triggerWarning, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [increaseCorruption]);

  const removeWarning = (index: number) => {
    setWarnings(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex p-8 gap-8 relative overflow-hidden">
      <CorruptionOverlay />
      
      {/* Sidebar UI */}
      <div className="w-64 flex flex-col gap-4 z-20">
        <div className="p-4 bg-card border border-primary/20 rounded">
          <GlitchText text="SYSTEM MONITOR" className="text-xs font-bold mb-4 block" />
          <div className="space-y-3">
            <StatItem icon={<Cpu size={14} />} label="CPU LOAD" value="89%" glitch />
            <StatItem icon={<User size={14} />} label="PLAYER ID" value="P1_WRECKER" />
            <StatItem icon={<Zap size={14} />} label="VOLTAGE" value="OVERLOAD" color="text-secondary" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {warnings.map((msg, i) => (
            <Alert key={i} variant="destructive" className="bg-destructive/10 border-destructive/50 animate-in slide-in-from-left duration-300">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>SYSTEM FAULT</AlertTitle>
              <AlertDescription className="text-[10px]">
                {msg}
                <button onClick={() => removeWarning(i)} className="block mt-1 underline hover:text-white">DISMISS</button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      {/* Character Center Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="absolute top-0 left-0 p-4 border-l-2 border-t-2 border-primary/30 w-12 h-12" />
        <div className="absolute bottom-0 right-0 p-4 border-r-2 border-b-2 border-primary/30 w-12 h-12" />
        
        <div className="relative w-80 h-96 group">
          <div className="absolute inset-0 border-2 border-secondary animate-pulse scale-105 opacity-20" />
          {charImg && (
            <div className="relative w-full h-full overflow-hidden border-2 border-primary/40 bg-card">
               <Image 
                src={charImg.imageUrl} 
                alt="Ralph" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                data-ai-hint={charImg.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                 <GlitchText text="WRECK-IT RALPH" className="text-2xl font-black text-white" />
                 <p className="text-primary text-[10px] tracking-widest font-bold">TYPE: DESTRUCTION_ENGINE</p>
              </div>
            </div>
          )}
          
          <div className="absolute -right-4 -top-4 w-24 h-24 border-r-2 border-t-2 border-secondary/50 pointer-events-none group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
        </div>

        <div className="mt-12 flex gap-4">
          <PixelBreakButton variant="outline" className="px-8" onClick={() => increaseCorruption(5)}>PUNCH</PixelBreakButton>
          <PixelBreakButton className="px-12 bg-secondary border-secondary hover:bg-secondary/80" onClick={() => router.push('/repair')}>START GAME</PixelBreakButton>
        </div>
      </div>

      <div className="absolute bottom-4 right-8 text-right pointer-events-none">
        <p className="text-[10px] text-primary/40">FRAGMENTS DETECTED: 4,901</p>
        <p className="text-[10px] text-secondary/40">SYSTEM STABILITY: {100 - corruptionLevel}%</p>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value, color = "text-primary", glitch = false }: { icon: any, label: string, value: string, color?: string, glitch?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <span className={cn("text-[10px] font-bold font-mono", color, glitch ? "flicker" : "")}>{value}</span>
    </div>
  );
}
