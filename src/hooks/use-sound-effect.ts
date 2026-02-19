
"use client";

import { useCallback, useRef, useEffect } from 'react';
import { useCorruption } from '@/app/context/corruption-context';

type SoundType = 'boot' | 'click' | 'glitch' | 'hammer' | 'alert' | 'shutdown' | 'coin' | 'death';

export function useSoundEffect() {
  const { soundEnabled, corruptionLevel } = useCorruption();
  const audioRefs = useRef<{ [key in SoundType]?: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload sounds - Browser policy requires user interaction to play, 
    // but we can initialize the objects now.
    const sounds: SoundType[] = ['boot', 'click', 'glitch', 'hammer', 'alert', 'shutdown', 'coin', 'death'];
    sounds.forEach(sound => {
      // These files MUST exist at public/sounds/[name].mp3
      const audio = new Audio(`/sounds/${sound}.mp3`);
      audio.preload = 'auto';
      audioRefs.current[sound] = audio;
    });

    // Cleanup on unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!soundEnabled) return;

    const audio = audioRefs.current[type];
    if (audio) {
      // Reset sound to start in case it's already playing
      audio.currentTime = 0;
      
      // Dynamic Pitch Distortion based on System Corruption
      if (corruptionLevel > 50 && (type === 'click' || type === 'alert')) {
        // Randomly jitter playback rate between 0.5 and 1.5
        audio.playbackRate = 0.5 + Math.random();
      } else if (corruptionLevel > 80) {
        // Deep slowdown for high corruption
        audio.playbackRate = 0.7;
      } else {
        audio.playbackRate = 1.0;
      }

      audio.play().catch((err) => {
        // Silent fail: Browser likely blocked autoplay or file is missing
        console.warn(`Sound "${type}" could not play. Check if /public/sounds/${type}.mp3 exists.`, err);
      });
    }
  }, [soundEnabled, corruptionLevel]);

  return { playSound };
}
