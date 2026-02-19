
"use client";

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'arrowup', 'arrowup', 
  'arrowdown', 'arrowdown', 
  'arrowleft', 'arrowright', 
  'arrowleft', 'arrowright', 
  'b', 'a'
];

export function useKonamiCode(onSuccess: () => void) {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Normalize all keys to lowercase for comparison
      const key = e.key.toLowerCase();
      
      const nextInput = [...input, key].slice(-KONAMI_CODE.length);
      setInput(nextInput);

      // Compare normalized strings
      if (nextInput.join(',') === KONAMI_CODE.join(',')) {
        onSuccess();
        setInput([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, onSuccess]);
}
