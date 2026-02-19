
"use client";

import React from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useCorruption();

  return (
    <button 
      onClick={toggleSound}
      className={cn(
        "fixed top-12 right-12 z-[10002] p-2 rounded-full border-2 transition-all hover:scale-110 active:scale-95",
        soundEnabled ? "border-primary text-primary arcade-glow" : "border-muted text-muted"
      )}
    >
      {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
