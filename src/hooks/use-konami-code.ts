
"use client";

import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
  'arrowup', 'arrowup', 
  'arrowdown', 'arrowdown', 
  'arrowleft', 'arrowright', 
  'arrowleft', 'arrowright', 
  'b', 'a'
];

/**
 * Hook to listen for the Konami Code sequence globally.
 * Now supports custom 'konami-key' events for virtual input.
 */
export function useKonamiCode(onSuccess: () => void) {
  const [input, setInput] = useState<string[]>([]);

  const processKey = useCallback((key: string) => {
    const normalizedKey = key.toLowerCase();
    setInput(prev => {
      const nextInput = [...prev, normalizedKey].slice(-KONAMI_CODE.length);
      if (nextInput.join(',') === KONAMI_CODE.join(',')) {
        onSuccess();
        return []; // Reset after success
      }
      return nextInput;
    });
  }, [onSuccess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Prevent scrolling when entering arrow keys for the code
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
      }
      processKey(key);
    };

    const handleCustomKey = (e: any) => {
      if (e.detail && e.detail.key) {
        processKey(e.detail.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('konami-key', handleCustomKey);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('konami-key', handleCustomKey);
    };
  }, [processKey]);
}
