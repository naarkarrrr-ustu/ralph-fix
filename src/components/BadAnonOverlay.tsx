
"use client";

import React from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { X } from 'lucide-react';
import { ArcadePanel } from './ArcadePanel';
import { GlitchText } from './GlitchText';

export function BadAnonOverlay() {
  const { badAnonActive, setBadAnonActive } = useCorruption();

  if (!badAnonActive) return null;

  const members = ["Ralph", "Bowser", "Zangief", "M. Bison", "Dr. Eggman", "Clyde"];

  return (
    <div className="fixed inset-0 z-[10006] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <ArcadePanel title="BAD-ANON MEETING" className="w-full max-w-2xl" variant="secondary">
        <button 
          onClick={() => setBadAnonActive(false)}
          className="absolute top-2 right-2 text-secondary hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center space-y-8 p-6">
          <GlitchText text="YOU ARE BAD GUY," className="text-4xl font-black" />
          <GlitchText text="BUT THAT DOES NOT MEAN YOU ARE BAD GUY." className="text-xl font-bold block" intensity="low" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {members.map((member, i) => (
              <div key={member} className="p-4 border border-secondary/20 bg-secondary/5 rounded hover:bg-secondary/10 transition-all group">
                <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-black text-secondary">{member[0]}</span>
                </div>
                <p className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest">{member}</p>
                <p className="text-[8px] text-muted-foreground uppercase">MEMBER #{i + 1024}</p>
              </div>
            ))}
          </div>
          
          <p className="text-[10px] font-mono text-muted-foreground italic pt-8">
            "I'm bad, and that's good. I will never be good, and that's not bad. There's no one I'd rather be than me."
          </p>
        </div>
      </ArcadePanel>
    </div>
  );
}
