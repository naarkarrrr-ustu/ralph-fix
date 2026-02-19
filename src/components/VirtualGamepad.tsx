"use client";

import React, { useState, useEffect } from 'react';
import { ArcadePanel } from './ArcadePanel';
import { GlitchText } from './GlitchText';
import { 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, 
  Terminal, X, Circle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSoundEffect } from '@/hooks/use-sound-effect';

export function VirtualGamepad() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { playSound } = useSoundEffect();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pressKey = (key: string) => {
    playSound('click');
    // Ensure the event reaches the window-level Konami listener
    window.dispatchEvent(new CustomEvent('konami-key', { detail: { key } }));
  };

  if (!mounted) return null;

  return (
    <>
      {/* Secret Trigger - Terminal icon in top-left */}
      <button 
        onClick={() => { setIsOpen(true); playSound('glitch'); }}
        className={cn(
          "fixed top-1 left-1 z-[10005] w-6 h-6 flex items-center justify-center",
          "opacity-40 hover:opacity-100 transition-opacity bg-primary/10 rounded"
        )}
        title="Open Secret Console"
      >
        <Terminal size={14} className="text-primary animate-pulse" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[10006] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <ArcadePanel title="SECRET_INPUT_MODULE" className="w-80" variant="primary">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-primary hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="space-y-6 text-center">
              <div className="space-y-1">
                <GlitchText text="VIRTUAL GAMEPAD" className="text-xl font-black italic" />
                <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Enter the sequence correctly... or else.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div />
                <ControlButton onClick={() => pressKey('arrowup')} icon={<ArrowUp size={24} />} />
                <div />

                <ControlButton onClick={() => pressKey('arrowleft')} icon={<ArrowLeft size={24} />} />
                <ControlButton onClick={() => pressKey('arrowdown')} icon={<ArrowDown size={24} />} />
                <ControlButton onClick={() => pressKey('arrowright')} icon={<ArrowRight size={24} />} />

                <div className="col-span-3 h-4" />

                <div />
                <ControlButton onClick={() => pressKey('b')} icon={<Circle size={24} fill="currentColor" className="text-secondary" />} label="B" variant="secondary" />
                <ControlButton onClick={() => pressKey('a')} icon={<Circle size={24} fill="currentColor" className="text-primary" />} label="A" variant="primary" />
              </div>

              <p className="text-[8px] font-mono text-primary/40 pt-4 uppercase tracking-tighter">
                Sequence required: ↑ ↑ ↓ ↓ ← → ← → B A
              </p>
            </div>
          </ArcadePanel>
        </div>
      )}
    </>
  );
}

function ControlButton({ 
  onClick, 
  icon, 
  label, 
  variant = 'default' 
}: { 
  onClick: () => void, 
  icon: React.ReactNode, 
  label?: string,
  variant?: 'default' | 'primary' | 'secondary' 
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "aspect-square flex flex-col items-center justify-center border-2 transition-all active:scale-90 arcade-glow",
        variant === 'default' && "border-primary/40 bg-primary/5 hover:bg-primary/20 text-primary",
        variant === 'primary' && "border-primary bg-primary/20 hover:bg-primary/40 text-primary",
        variant === 'secondary' && "border-secondary bg-secondary/20 hover:bg-secondary/40 text-secondary"
      )}
    >
      {icon}
      {label && <span className="text-[10px] font-black mt-1">{label}</span>}
    </button>
  );
}