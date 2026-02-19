"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { GlitchText } from '@/components/GlitchText';
import { PixelBreakButton } from '@/components/PixelBreakButton';
import { useCorruption } from '../context/corruption-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function GameSelectPage() {
  const router = useRouter();
  const { increaseCorruption } = useCorruption();

  useEffect(() => {
    increaseCorruption(10);
  }, [increaseCorruption]);

  const games = [
    { id: 'felix', name: 'FIX-IT FELIX JR.', color: 'text-primary', img: PlaceHolderImages.find(i => i.id === 'fix-it-felix') },
    { id: 'sugar', name: 'SUGAR RUSH', color: 'text-secondary', img: PlaceHolderImages.find(i => i.id === 'sugar-rush') },
    { id: 'hero', name: "HERO'S DUTY", color: 'text-white', img: PlaceHolderImages.find(i => i.id === 'hero-duty') },
  ];

  return (
    <div className="h-full flex flex-col p-8 space-y-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-end border-b-2 border-primary/20 pb-4">
        <div className="space-y-1">
          <GlitchText text="SELECT YOUR WORLD" className="text-3xl font-bold" />
          <p className="text-muted-foreground text-sm uppercase">Tokens Remaining: 99</p>
        </div>
        <div className="text-right">
          <p className="text-primary text-xs uppercase">Arcade ID: LITWAK-302</p>
          <p className="text-secondary text-xs uppercase animate-pulse">System Status: Nominalish</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-y-auto pb-8">
        {games.map((game) => (
          <Card key={game.id} className="group cursor-pointer bg-card/50 border-primary/20 hover:border-primary transition-all overflow-hidden relative">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="relative h-48 w-full grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden">
                {game.img && (
                  <Image 
                    src={game.img.imageUrl} 
                    alt={game.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    data-ai-hint={game.img.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={cn("text-xl font-bold mb-2", game.color)}>
                    {game.name}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    A classic arcade experience. High-definition pixels. Maximum enjoyment.
                  </p>
                </div>
                <PixelBreakButton 
                  className="w-full" 
                  onClick={() => router.push('/character')}
                >
                  INSERT COIN
                </PixelBreakButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <footer className="text-center py-4 text-[10px] text-muted-foreground/30 font-mono">
        <p>OS CORRUPTION LEVEL: 12% | MEMORY LEAK: DETECTED | BLAME: RALPH</p>
      </footer>
    </div>
  );
}
