"use client";

import React, { useState, useEffect } from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { SystemLog } from '@/components/SystemLog';
import { SoundToggle } from '@/components/SoundToggle';
import { useKonamiCode } from '@/hooks/use-konami-code';
import { KonamiOverlay } from '@/components/KonamiOverlay';
import { BadAnonOverlay } from '@/components/BadAnonOverlay';
import { CupcakeJumpscare } from '@/components/CupcakeJumpscare';
import { VirtualGamepad } from '@/components/VirtualGamepad';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { useRouter } from 'next/navigation';

/**
 * Client-side layout wrapper that handles global system logic, 
 * audio, and overlays. 
 * 
 * HYDRATION FIX: Ensures all client-side-only elements are rendered 
 * in a stable container AFTER mounting to prevent Next.js mismatches.
 */
export function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setDevMode, resetCorruption, handleTitleClick, increaseCorruption } = useCorruption();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useKonamiCode(
    () => {
      playSound('boot');
      setDevMode(true);
      resetCorruption();
    },
    () => {
      playSound('death');
      increaseCorruption(100);
      setTimeout(() => {
        router.push('/restart');
      }, 1500);
    }
  );

  return (
    <div className="h-full w-full relative p-4 bg-background">
      {/* 1. Global Arcade Frame - Static sibling at index 0 */}
      <div className="fixed inset-0 arcade-border pointer-events-none z-[10000]" />
      
      {/* 2. Main App Container - Static sibling at index 1 */}
      <main className="h-full w-full relative z-10 pb-10 pt-8 rounded-[40px] overflow-hidden">
        {children}
      </main>

      {/* 3. System HUD Container - Stabilized for Hydration at index 2 */}
      <div id="arcade-system-hud">
        {mounted && (
          <div className="relative z-[10001]">
            {/* Top Marquee Bar */}
            <div className="fixed top-0 left-0 w-full bg-black h-8 border-b border-primary/40 flex items-center overflow-hidden z-[10001]">
               <div 
                onClick={handleTitleClick}
                className="marquee text-[10px] font-bold text-primary tracking-[0.4em] uppercase cursor-pointer select-none"
               >
                  LITWAK’S ARCADE OS – FIX IT BEFORE RALPH BREAKS IT • SYSTEM INTEGRITY: CRITICAL • INSERT COIN TO PLAY • RALPH DETECTED • SUGAR RUSH • HERO'S DUTY • FIX-IT FELIX JR. • 
               </div>
            </div>

            <SoundToggle />
            <KonamiOverlay />
            <BadAnonOverlay />
            <CupcakeJumpscare />
            <VirtualGamepad />

            {/* Cinematic Global Overlays */}
            <div className="fixed inset-0 crt-overlay pointer-events-none z-[9999]" />
            <div className="scanline" />
            <div className="crt-curve" />
            <div className="vignette" />
            
            <SystemLog />
          </div>
        )}
      </div>
    </div>
  );
}
