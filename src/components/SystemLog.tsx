"use client";

import React, { useEffect, useState } from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { cn } from '@/lib/utils';

const MESSAGES = [
  "Ralph smashing UI components...",
  "Felix patching instability in sector 7G...",
  "Sugar Rush data corrupted: Candy overflow.",
  "Hero's Duty defense compromised. Cy-bugs detected.",
  "System stability fluctuating. Nominal-ish.",
  "Unexpected cake found in circuitry.",
  "Warning: Character Ralph.obj out of bounds.",
  "Memory leak detected in Litwak-302.",
  "Initializing pixel burst buffer...",
  "Graphic pipeline overflow. Retrying..."
];

export function SystemLog() {
  const { corruptionLevel } = useCorruption();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = corruptionLevel > 60 
        ? `CRITICAL: ${MESSAGES[Math.floor(Math.random() * MESSAGES.length)]}`
        : `LOG: ${MESSAGES[Math.floor(Math.random() * MESSAGES.length)]}`;
      
      setLogs(prev => [msg, ...prev].slice(0, 4));
    }, 4000);

    return () => clearInterval(interval);
  }, [corruptionLevel]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 border-t border-primary/20 p-2 z-50 font-mono text-[10px] flex gap-4 overflow-hidden h-10 items-center">
      <div className="flex-shrink-0 text-primary font-bold animate-pulse px-2 border-r border-primary/20">
        SYS_LOG_V1.9
      </div>
      <div className="flex gap-6 animate-in slide-in-from-right duration-500">
        {logs.map((log, i) => (
          <span key={i} className={cn(
            "whitespace-nowrap transition-colors",
            log.startsWith('CRITICAL') ? "text-secondary" : "text-primary/60"
          )}>
            {log}
          </span>
        ))}
      </div>
      <div className="ml-auto flex gap-4 pr-4">
        <span className="text-primary/40">CPU: {(40 + corruptionLevel / 2).toFixed(1)}%</span>
        <span className="text-secondary/40">ERR_RATE: {corruptionLevel}%</span>
      </div>
    </div>
  );
}