
"use client";

import { useCallback, useRef, useEffect } from 'react';
import { useCorruption } from '@/app/context/corruption-context';

type SoundType = 'boot' | 'click' | 'glitch' | 'hammer' | 'alert' | 'shutdown';

export function useSoundEffect() {
  const { soundEnabled, corruptionLevel } = useCorruption();
  const audioRefs = useRef<{ [key in SoundType]?: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload sounds
    const sounds: SoundType[] = ['boot', 'click', 'glitch', 'hammer', 'alert', 'shutdown'];
    sounds.forEach(sound => {
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
      
      // Apply "glitch" distortion to pitch if corruption is high
      if (corruptionLevel > 50 && (type === 'click' || type === 'alert')) {
        audio.playbackRate = 0.5 + Math.random();
      } else {
        audio.playbackRate = 1.0;
      }

      audio.play().catch(() => {
        // Handle browser autoplay block silently
      });
    }
  }, [soundEnabled, corruptionLevel]);

  return { playSound };
}
