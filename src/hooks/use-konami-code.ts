
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
 * Now includes an onFailure callback for incorrect attempts.
 */
export function useKonamiCode(onSuccess: () => void, onFailure?: () => void) {
  const [input, setInput] = useState<string[]>([]);
  const successCallbackRef = useRef(onSuccess);
  const failureCallbackRef = useRef(onFailure);
  
  useEffect(() => {
    successCallbackRef.current = onSuccess;
    failureCallbackRef.current = onFailure;
  }, [onSuccess, onFailure]);

  const processKey = useCallback((key: string) => {
    const normalizedKey = key.toLowerCase();
    
    setInput(prev => {
      const nextInput = [...prev, normalizedKey].slice(-KONAMI_CODE.length);
      
      // Only evaluate if we have a full sequence of 10 keys
      if (nextInput.length === KONAMI_CODE.length) {
        if (nextInput.join(',') === KONAMI_CODE.join(',')) {
          // MATCH!
          setTimeout(() => {
            successCallbackRef.current();
          }, 0);
          return []; // Reset sequence
        } else {
          // WRONG CODE! (If they just finished a 10-key attempt)
          if (failureCallbackRef.current) {
            setTimeout(() => {
              failureCallbackRef.current?.();
            }, 0);
          }
          return []; // Reset sequence
        }
      }
      
      return nextInput;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
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
