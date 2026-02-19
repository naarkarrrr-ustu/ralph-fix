"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ArcadePanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  glitchy?: boolean;
}

export function ArcadePanel({ children, title, className, variant = 'primary', glitchy = false }: ArcadePanelProps) {
  const glowClass = variant === 'primary' ? 'arcade-glow border-primary' : 'arcade-glow-secondary border-secondary';
  const textClass = variant === 'primary' ? 'text-primary' : 'text-secondary';

  return (
    <div className={cn(
      "relative bg-card/60 border-2 rounded-none p-1",
      glowClass,
      glitchy ? "shake-dynamic" : "",
      className
    )}>
      {/* Corner Accents */}
      <div className={cn("absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2", variant === 'primary' ? 'border-primary' : 'border-secondary')} />
      <div className={cn("absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2", variant === 'primary' ? 'border-primary' : 'border-secondary')} />
      
      {title && (
        <div className={cn(
          "absolute -top-3 left-4 px-2 bg-background text-[10px] font-bold tracking-[0.2em] uppercase",
          textClass
        )}>
          {title}
        </div>
      )}
      
      <div className="p-4 h-full">
        {children}
      </div>
    </div>
  );
}