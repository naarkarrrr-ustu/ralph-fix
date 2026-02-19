"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCorruption } from '../context/corruption-context';
import { GlitchText } from '@/components/GlitchText';
import { PixelBreakButton } from '@/components/PixelBreakButton';
import { CorruptionOverlay } from '@/components/CorruptionOverlay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ShieldAlert, User, Cpu, Zap, ChevronLeft, ChevronRight, Settings2, Sliders } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function CharacterPage() {
  const router = useRouter();
  const { increaseCorruption, corruptionLevel } = useCorruption();
  const { playSound } = useSoundEffect();
  const [warnings, setWarnings] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  // Tricky Button State
  const [repairHoverCount, setRepairHoverCount] = useState(0);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const characters = [
    { id: 'ralph-char', name: 'WRECK-IT RALPH', type: 'DESTRUCTION_ENGINE', hint: 'ralph smash' },
    { id: 'felix-char', name: 'FIX-IT FELIX JR.', type: 'REPAIR_SYSTEM', hint: 'felix hammer' },
    { id: 'vanellope-char', name: 'VANELLOPE', type: 'GLITCH_ANOMALY', hint: 'candy racer' },
    { id: 'calhoun-char', name: 'SGT. CALHOUN', type: 'DEFENSE_PROTOCOL', hint: 'hero duty' },
  ];

  const currentChar = characters[currentCharIndex];
  const charImg = PlaceHolderImages.find(i => i.id === currentChar.id);

  useEffect(() => {
    increaseCorruption(15);
    
    const triggerWarning = () => {
      playSound('alert');
      const messages = [
        "Unauthorized character size detected.",
        "Internal memory shift: Ralph.obj is expanding.",
        "Graphic pipeline overflow in sector 7.",
        "Input delay increasing. Character anomaly suspected."
      ];
      setWarnings(prev => [...prev, messages[Math.floor(Math.random() * messages.length)]]);
    };

    const timer = setTimeout(triggerWarning, 3000);
    return () => clearTimeout(timer);
  }, [increaseCorruption, playSound]);

  const removeWarning = (index: number) => {
    setWarnings(prev => prev.filter((_, i) => i !== index));
  };

  const nextChar = () => {
    playSound('click');
    setCurrentCharIndex((prev) => (prev + 1) % characters.length);
    increaseCorruption(5);
  };

  const prevChar = () => {
    playSound('click');
    setCurrentCharIndex((prev) => (prev - 1 + characters.length) % characters.length);
    increaseCorruption(5);
  };

  const handleRepairHover = () => {
    if (repairHoverCount < 5) {
      // Increase the dodge distance with each attempt
      const multiplier = Math.pow(repairHoverCount + 1, 1.5);
      setRepairHoverCount(prev => prev + 1);
      setButtonOffset({
        x: (Math.random() - 0.5) * 200 * multiplier,
        y: (Math.random() - 0.5) * 100 * multiplier
      });
      playSound('glitch');
    }
  };

  const handleClickMe = () => {
    increaseCorruption(8);
    playSound('glitch');
    const ralphJokes = [
      "Ralph: 'Hey! Stop clicking me! I'm not a mouse-pad!'",
      "Ralph: 'You click like a Cy-bug on sugar!'",
      "Ralph: 'If you click one more time, I'm wrecking your cursor!'",
      "Ralph: 'Is this a game to you? Oh wait... it is.'",
      "Ralph: 'One more click and I'm smashing the motherboard!'",
      "Ralph: 'My fists are bigger than your mouse, watch out!'"
    ];
    setWarnings(prev => [ralphJokes[Math.floor(Math.random() * ralphJokes.length)], ...prev]);
  };

  return (
    <div className="h-full flex p-8 gap-8 relative overflow-hidden">
      <CorruptionOverlay />
      
      {/* Sidebar UI - System Monitor */}
      <div className="w-64 flex flex-col gap-4 z-20">
        <div className="p-4 bg-card border border-primary/20 rounded arcade-glow">
          <div className="flex items-center gap-2 mb-4">
             <Settings2 size={14} className="text-primary" />
             <GlitchText text="SYSTEM MONITOR" className="text-xs font-bold block" />
          </div>
          <div className="space-y-3">
            <StatItem icon={<Cpu size={14} />} label="CPU LOAD" value={`${40 + corruptionLevel}%`} glitch />
            <StatItem icon={<User size={14} />} label="PLAYER ID" value="P1_WRECKER" />
            <StatItem icon={<Zap size={14} />} label="STABILITY" value={corruptionLevel > 70 ? "CRITICAL" : "STABLE"} color={corruptionLevel > 70 ? "text-secondary" : "text-primary"} />
          </div>
        </div>

        {/* Character Specific Control Actions */}
        <div className="p-4 bg-card border border-secondary/20 rounded arcade-glow-secondary">
          <div className="flex items-center gap-2 mb-4">
             <Sliders size={14} className="text-secondary" />
             <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">CHARACTER_CONTROLS</span>
          </div>
          <div className="space-y-4">
            <ControlAction label="SPRITE_STABILITY" defaultChecked />
            <ControlAction label="FORCE_GLITCH" onClick={() => increaseCorruption(10)} />
            <ControlAction label="VOICE_LATENCY" />
            <ControlAction label="EMULATE_ROM" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pt-2">
          {warnings.map((msg, i) => (
            <Alert key={i} variant="destructive" className="bg-destructive/10 border-destructive/50 animate-in slide-in-from-left duration-300">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle className="text-[10px] font-bold">SYSTEM FAULT</AlertTitle>
              <AlertDescription className="text-[8px] leading-tight">
                {msg}
                <button onClick={() => removeWarning(i)} className="block mt-2 underline hover:text-white uppercase">DISMISS</button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      {/* Character Center Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="absolute top-0 left-0 p-4 border-l-2 border-t-2 border-primary/30 w-12 h-12" />
        <div className="absolute bottom-0 right-0 p-4 border-r-2 border-b-2 border-primary/30 w-12 h-12" />
        
        {/* Carousel Nav */}
        <button onClick={prevChar} className="absolute left-8 z-30 p-4 bg-black/40 border border-primary/20 hover:bg-primary/20 transition-all active:scale-90">
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextChar} className="absolute right-8 z-30 p-4 bg-black/40 border border-primary/20 hover:bg-primary/20 transition-all active:scale-90">
          <ChevronRight size={32} />
        </button>

        <div className="relative w-80 h-96 group sprite-idle">
          <div className={cn(
            "absolute inset-0 border-2 transition-all scale-105 opacity-20",
            currentChar.id.includes('ralph') ? "border-secondary" : "border-primary",
            corruptionLevel > 60 ? "animate-ping" : "animate-pulse"
          )} />
          
          <div className="relative w-full h-full overflow-hidden border-2 border-primary/40 bg-card arcade-glow">
            {charImg && (
               <Image 
                src={charImg.imageUrl} 
                alt={currentChar.name} 
                fill 
                className={cn(
                  "object-cover transition-all duration-700",
                  corruptionLevel > 50 ? "grayscale opacity-60 scale-110" : "opacity-80 scale-100",
                  currentChar.id === 'vanellope-char' ? "animate-pulse" : ""
                )}
                data-ai-hint={charImg.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
               <GlitchText text={currentChar.name} className="text-2xl font-black text-white" />
               <p className="text-primary text-[10px] tracking-widest font-bold">TYPE: {currentChar.type}</p>
            </div>
          </div>
          
          <div className="absolute -right-4 -top-4 w-24 h-24 border-r-2 border-t-2 border-secondary/50 pointer-events-none group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
        </div>

        <div className="mt-12 flex gap-4 relative">
          <PixelBreakButton variant="outline" className="px-8" onClick={handleClickMe}>CLICK ME...</PixelBreakButton>
          
          <div 
            className="transition-all duration-500 ease-out"
            style={{ 
              transform: repairHoverCount < 5 
                ? `translate(${buttonOffset.x}px, ${buttonOffset.y}px)` 
                : 'translate(0, 0)' 
            }}
          >
            <PixelBreakButton 
              className={cn(
                "px-12 bg-secondary border-secondary hover:bg-secondary/80",
                repairHoverCount < 5 ? "animate-bounce" : ""
              )} 
              onMouseEnter={handleRepairHover}
              onClick={() => { 
                if (repairHoverCount >= 5) {
                  playSound('click'); 
                  router.push('/repair'); 
                }
              }}
            >
              {repairHoverCount < 5 ? `GLITCH_COUNT: ${repairHoverCount}/5` : "REPAIR_SYSTEM"}
            </PixelBreakButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-8 text-right pointer-events-none">
        <p className="text-[10px] text-primary/40">FRAGMENTS DETECTED: {4900 + corruptionLevel}</p>
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

function ControlAction({ label, defaultChecked = false, onClick }: { label: string, defaultChecked?: boolean, onClick?: () => void }) {
  const { playSound } = useSoundEffect();
  return (
    <div className="flex items-center justify-between">
      <Label className="text-[9px] text-muted-foreground uppercase tracking-tighter">{label}</Label>
      <Switch 
        defaultChecked={defaultChecked} 
        onCheckedChange={() => { playSound('click'); onClick?.(); }}
        className="scale-75 data-[state=checked]:bg-secondary" 
      />
    </div>
  );
}
