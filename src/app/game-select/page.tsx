"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlitchText } from '@/components/GlitchText';
import { PixelBreakButton } from '@/components/PixelBreakButton';
import { useCorruption } from '../context/corruption-context';
import { ArcadePanel } from '@/components/ArcadePanel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function GameSelectPage() {
  const router = useRouter();
  const { increaseCorruption, corruptionLevel } = useCorruption();
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  useEffect(() => {
    increaseCorruption(10);
  }, []);

  const games = [
    { id: 'felix', name: 'FIX-IT FELIX JR.', color: 'text-primary', img: PlaceHolderImages.find(i => i.id === 'fix-it-felix') },
    { id: 'sugar', name: 'SUGAR RUSH', color: 'text-secondary', img: PlaceHolderImages.find(i => i.id === 'sugar-rush') },
    { id: 'hero', name: "HERO'S DUTY", color: 'text-white', img: PlaceHolderImages.find(i => i.id === 'hero-duty') },
  ];

  return (
    <div className={cn(
      "h-full flex flex-col p-8 space-y-8 max-w-7xl mx-auto transition-all duration-1000",
      corruptionLevel > 40 ? "hue-rotate-15 saturate-150" : ""
    )}>
      <header className="flex justify-between items-end border-b-4 border-primary/20 pb-6">
        <div className="space-y-2">
          <div onClick={() => increaseCorruption(5)} className="cursor-pointer select-none">
            <GlitchText text="SELECT YOUR WORLD" className="text-5xl font-black italic tracking-tighter" />
          </div>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">INSERT COIN TO CONTINUE • TOKENS: 99</p>
        </div>
        <div className="text-right font-mono">
          <p className="text-primary text-[10px] uppercase">CABINET: LITWAK-302</p>
          <p className={cn(
            "text-xs uppercase font-bold",
            corruptionLevel > 50 ? "text-secondary animate-bounce" : "text-primary animate-pulse"
          )}>
            STABILITY: {100 - corruptionLevel}%
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 items-center">
        {games.map((game) => (
          <div 
            key={game.id} 
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
            className="h-full"
          >
            <ArcadePanel 
              title={game.id === 'sugar' ? "RACING_SIM" : "ARCADE_ROM"} 
              variant={game.id === 'sugar' ? 'secondary' : 'primary'}
              glitchy={hoveredGame === game.id}
              className="group h-full cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <div className="space-y-6 h-full flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden border border-white/10 group-hover:border-white/40 transition-colors">
                  {game.img && (
                    <Image 
                      src={game.img.imageUrl} 
                      alt={game.name} 
                      fill 
                      className={cn(
                        "object-cover transition-all duration-700",
                        hoveredGame === game.id ? "scale-110 grayscale-0" : "grayscale opacity-50"
                      )}
                      data-ai-hint={game.img.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className={cn("text-2xl font-black italic", game.color)}>
                    {game.name}
                  </h3>
                  <p className="text-muted-foreground text-[10px] leading-relaxed uppercase tracking-widest">
                    Experience the ultimate in pixelated simulation. High intensity gameplay.
                  </p>
                </div>

                <PixelBreakButton 
                  variant={game.id === 'sugar' ? 'secondary' : 'default'}
                  className="w-full font-black italic text-lg rounded-none" 
                  onClick={() => router.push('/character')}
                >
                  START_MODULE
                </PixelBreakButton>
              </div>
            </ArcadePanel>
          </div>
        ))}
      </div>

      <footer className="text-center py-4 text-[10px] text-muted-foreground/30 font-mono tracking-[0.5em] uppercase">
        RALPH DETECTED • OS DEGRADATION IN PROGRESS • DON'T PANIC
      </footer>
    </div>
  );
}