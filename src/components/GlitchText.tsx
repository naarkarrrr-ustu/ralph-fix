"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useCorruption } from '@/app/context/corruption-context';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high' | 'auto';
}

export function GlitchText({ text, className, intensity = 'auto' }: GlitchTextProps) {
  const { corruptionLevel } = useCorruption();

  const getIntensityClass = () => {
    if (intensity === 'auto') {
      if (corruptionLevel > 70) return "text-glitch flicker-dynamic scale-[1.05] drop-shadow-[2px_2px_0_#ff00ff]";
      if (corruptionLevel > 30) return "text-glitch";
      return "";
    }
    
    return {
      low: "hover:text-glitch transition-all",
      medium: "text-glitch",
      high: "text-glitch flicker-dynamic scale-105"
    }[intensity];
  };

  return (
    <span 
      className={cn("inline-block font-headline tracking-tighter relative", getIntensityClass(), className)} 
      data-text={text}
    >
      {text}
    </span>
  );
}