
"use client";

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'arrowup', 'arrowup', 
  'arrowdown', 'arrowdown', 
  'arrowleft', 'arrowright', 
  'arrowleft', 'arrowright', 
  'b', 'a'
];

/**
 * Hook to listen for the Konami Code sequence globally.
 * @param onSuccess Callback function when the sequence is correctly entered.
 */
export function useKonamiCode(onSuccess: () => void) {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Prevent scrolling when entering arrow keys for the code
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
      }

      const nextInput = [...input, key].slice(-KONAMI_CODE.length);
      setInput(nextInput);

      if (nextInput.join(',') === KONAMI_CODE.join(',')) {
        onSuccess();
        setInput([]); // Reset after success
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, onSuccess]);
}
