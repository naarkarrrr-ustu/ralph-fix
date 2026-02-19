
"use client";

import React, { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PixelBreakButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function PixelBreakButton({ children, className, ...props }: PixelBreakButtonProps) {
  const [isBreaking, setIsBreaking] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsBreaking(true);
    // Sound effect trigger comment: Play pixel burst sound
    setTimeout(() => setIsBreaking(false), 300);
    if (props.onClick) props.onClick(e);
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={cn(
        "relative transition-all active:scale-95 border-2 border-primary overflow-hidden",
        isBreaking ? "shake opacity-50 bg-secondary" : "",
        className
      )}
    >
      <span className={cn("z-10", isBreaking ? "blur-sm" : "")}>
        {children}
      </span>
      {isBreaking && (
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="bg-primary/20 border-[0.5px] border-primary/40 animate-out fade-out zoom-out"
              style={{ animationDelay: `${i * 10}ms` }}
            />
          ))}
        </div>
      )}
    </Button>
  );
}
