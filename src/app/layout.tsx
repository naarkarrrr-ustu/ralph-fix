
"use client";

import React from 'react';
import './globals.css';
import { CorruptionProvider, useCorruption } from './context/corruption-context';
import { SystemLog } from '@/components/SystemLog';
import { SoundToggle } from '@/components/SoundToggle';
import { useKonamiCode } from '@/hooks/use-konami-code';
import { KonamiOverlay } from '@/components/KonamiOverlay';
import { BadAnonOverlay } from '@/components/BadAnonOverlay';
import { CupcakeJumpscare } from '@/components/CupcakeJumpscare';
import { useSoundEffect } from '@/hooks/use-sound-effect';

/**
 * LayoutContent handles the global state-dependent UI elements and keyboard listeners.
 * It is wrapped by CorruptionProvider in the root export.
 */
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { setDevMode, resetCorruption, handleTitleClick } = useCorruption();
  const { playSound } = useSoundEffect();

  // Initialize the Konami Code listener
  useKonamiCode(() => {
    playSound('boot');
    setDevMode(true);
    resetCorruption();
  });

  return (
    <body className="font-body antialiased bg-background text-foreground overflow-hidden h-screen w-screen relative p-4">
      {/* Global Arcade Frame - Cabinet Exterior */}
      <div className="fixed inset-0 arcade-border pointer-events-none z-[10000]" />
      
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

      {/* Cinematic Global Overlays */}
      <div className="fixed inset-0 crt-overlay pointer-events-none z-[9999]" />
      <div className="vignette" />
      <div className="scanline" />
      <div className="crt-curve" />
      
      {/* Main App Container */}
      <main className="h-full w-full relative z-10 pb-10 pt-8 rounded-[40px] overflow-hidden">
        {children}
      </main>

      <SystemLog />
    </body>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>ARCADE OS - Wrecked Mode</title>
        <meta name="description" content="A cinematic retro arcade OS that is falling apart." />
      </head>
      <CorruptionProvider>
        <LayoutContent>{children}</LayoutContent>
      </CorruptionProvider>
    </html>
  );
}
