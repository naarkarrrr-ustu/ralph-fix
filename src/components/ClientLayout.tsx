
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
 * FIXED: Stabilized the sibling order between the cabinet border, 
 * the main content, and the client-only HUD elements to prevent 
 * hydration mismatches.
 */
export function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setDevMode, resetCorruption, handleTitleClick, increaseCorruption } = useCorruption();
  const { playSound } = useSoundEffect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize the Konami Code listener globally
  useKonamiCode(
    () => {
      // SUCCESS
      playSound('boot');
      setDevMode(true);
      resetCorruption();
    },
    () => {
      // FAILURE - Glitch out and reboot
      playSound('death');
      increaseCorruption(100);
      setTimeout(() => {
        router.push('/restart');
      }, 1500);
    }
  );

  return (
    <div className="h-full w-full relative p-4">
      {/* 1. Global Arcade Frame - Static sibling at index 0 (Always rendered) */}
      <div className="fixed inset-0 arcade-border pointer-events-none z-[10000]" />
      
      {/* 2. Main App Container - Static sibling at index 1 (Always rendered) */}
      <main className="h-full w-full relative z-10 pb-10 pt-8 rounded-[40px] overflow-hidden">
        {children}
      </main>

      {/* 3. HUD and Overlays Container - Static sibling at index 2 (Client-only contents) */}
      <div id="arcade-system-hud" className="relative z-[10001]">
        {mounted && (
          <>
            {/* Top Marquee Bar */}
            <div className="fixed top-0 left-0 w-full bg-black h-8 z-[10001] border-b border-primary/40 flex items-center overflow-hidden">
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
          </>
        )}
      </div>
    </div>
  );
}
