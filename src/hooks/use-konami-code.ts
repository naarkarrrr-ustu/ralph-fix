
"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

const KONAMI_CODE = [
  'arrowup', 'arrowup', 
  'arrowdown', 'arrowdown', 
  'arrowleft', 'arrowright', 
  'arrowleft', 'arrowright', 
  'b', 'a'
];

/**
 * Hook to listen for the Konami Code sequence globally.
 * Fixed to avoid state updates during render by moving side effects 
 * out of the functional state update.
 */
export function useKonamiCode(onSuccess: () => void) {
  const [input, setInput] = useState<string[]>([]);
  // Use a ref to store the latest onSuccess to avoid re-binding listeners too often
  const callbackRef = useRef(onSuccess);
  
  useEffect(() => {
    callbackRef.current = onSuccess;
  }, [onSuccess]);

  const processKey = useCallback((key: string) => {
    const normalizedKey = key.toLowerCase();
    
    setInput(prev => {
      const nextInput = [...prev, normalizedKey].slice(-KONAMI_CODE.length);
      
      // Check if code is matched
      if (nextInput.join(',') === KONAMI_CODE.join(',')) {
        // We schedule the callback to run after the state update to avoid
        // "update while rendering" warnings.
        setTimeout(() => {
          callbackRef.current();
        }, 0);
        return []; // Reset sequence
      }
      
      return nextInput;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Track valid keys
      const validKeys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'a', 'b'];
      if (validKeys.includes(key)) {
        processKey(key);
      }
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
