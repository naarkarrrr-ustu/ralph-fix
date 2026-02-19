
"use client";

import { useCallback, useRef, useEffect } from 'react';
import { useCorruption } from '@/app/context/corruption-context';

type SoundType = 'boot' | 'click' | 'glitch' | 'hammer' | 'alert' | 'shutdown' | 'coin' | 'death';

export function useSoundEffect() {
  const { soundEnabled, corruptionLevel } = useCorruption();
  const audioRefs = useRef<{ [key in SoundType]?: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload sounds
    const sounds: SoundType[] = ['boot', 'click', 'glitch', 'hammer', 'alert', 'shutdown', 'coin', 'death'];
    sounds.forEach(sound => {
      // Note: These files must exist in public/sounds/
      const audio = new Audio(`/sounds/${sound}.mp3`);
      audio.preload = 'auto';
      audioRefs.current[sound] = audio;
    });
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!soundEnabled) return;

    const audio = audioRefs.current[type];
    if (audio) {
      audio.currentTime = 0;
      
      // Apply distortion logic
      if (corruptionLevel > 50 && (type === 'click' || type === 'alert')) {
        audio.playbackRate = 0.5 + Math.random();
      } else {
        audio.playbackRate = 1.0;
      }

      audio.play().catch(() => {
        // Fallback or silent fail for browser autoplay policies
      });
    }
  }, [soundEnabled, corruptionLevel]);

  return { playSound };
}
