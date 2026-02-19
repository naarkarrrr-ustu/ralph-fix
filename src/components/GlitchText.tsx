
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchText({ text, className, intensity = 'medium' }: GlitchTextProps) {
  const intensityClass = {
    low: "hover:text-glitch transition-all",
    medium: "text-glitch",
    high: "text-glitch flicker scale-105"
  }[intensity];

  return (
    <span className={cn("inline-block font-headline tracking-tighter", intensityClass, className)} data-text={text}>
      {text}
    </span>
  );
}
