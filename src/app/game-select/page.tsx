
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlitchText } from '@/components/GlitchText';
import { PixelBreakButton } from '@/components/PixelBreakButton';
import { useCorruption } from '../context/corruption-context';
import { ArcadePanel } from '@/components/ArcadePanel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function GameSelectPage() {
  const router = useRouter();
  const { increaseCorruption, corruptionLevel, setSelectedWorld } = useCorruption();
  const { playSound } = useSoundEffect();
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  useEffect(() => {
    increaseCorruption(10);
  }, [increaseCorruption]);

  const games = [
    { 
      id: 'felix', 
      name: 'FIX-IT FELIX JR.', 
      color: 'text-primary', 
      accent: 'border-primary',
      img: PlaceHolderImages.find(i => i.id === 'fix-it-felix'),
      desc: "Apply repairs and dodge bricks in Niceland's famous high-rise!"
    },
    { 
      id: 'sugar', 
      name: 'SUGAR RUSH', 
      color: 'text-secondary', 
      accent: 'border-secondary',
      img: PlaceHolderImages.find(i => i.id === 'sugar-rush'),
      desc: "High-octane candy racing. Watch out for the King's guard!"
    },
    { 
      id: 'hero', 
      name: "HERO'S DUTY", 
      color: 'text-white', 
      accent: 'border-white',
      img: PlaceHolderImages.find(i => i.id === 'hero-duty'),
      desc: "Protect the sector from Cy-bug infestation. Stand your ground!"
    },
  ];

  const handleSelect = (id: string) => {
    playSound('click');
    setSelectedWorld(id);
    router.push('/character');
  };

  return (
    <div className={cn(
      "h-full flex flex-col p-8 space-y-8 max-w-7xl mx-auto transition-all duration-1000 relative",
      corruptionLevel > 40 ? "hue-rotate-15 saturate-150" : ""
    )}>
      {hoveredGame === 'sugar' && <div className="absolute inset-0 bg-secondary/5 pointer-events-none z-0" />}
      {hoveredGame === 'hero' && <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,255,0,0.05)_100%)] pointer-events-none z-0" />}

      <header className="flex justify-between items-end border-b-4 border-primary/20 pb-6 relative z-10">
        <div className="space-y-2">
          <div onClick={() => { increaseCorruption(5); playSound('glitch'); }} className="cursor-pointer select-none">
            <GlitchText text="SELECT YOUR WORLD" className="text-5xl font-black italic tracking-tighter" />
          </div>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">CHOOSE_SIMULATION_MODULE • INSERT_COIN_P2</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 items-center relative z-10">
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
              className={cn(
                "group h-full cursor-pointer transition-all duration-500",
                hoveredGame === game.id ? "scale-[1.05] z-20" : "opacity-70 grayscale"
              )}
            >
              <div className="space-y-6 h-full flex flex-col">
                <div className={cn(
                  "relative aspect-video w-full overflow-hidden border-2 transition-colors",
                  hoveredGame === game.id ? game.accent : "border-white/10"
                )}>
                  {game.img && (
                    <Image 
                      src={game.img.imageUrl} 
                      alt={game.name} 
                      fill 
                      className={cn(
                        "object-cover transition-all duration-700",
                        hoveredGame === game.id ? "scale-110" : "scale-100"
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
                  <p className="text-muted-foreground text-[10px] leading-relaxed uppercase tracking-widest h-12">
                    {game.desc}
                  </p>
                </div>

                <PixelBreakButton 
                  variant={game.id === 'sugar' ? 'secondary' : 'default'}
                  className="w-full font-black italic text-lg rounded-none" 
                  onClick={() => handleSelect(game.id)}
                >
                  START_MODULE
                </PixelBreakButton>
              </div>
            </ArcadePanel>
          </div>
        ))}
      </div>
    </div>
  );
}
