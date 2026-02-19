
"use client";

import React, { useEffect, useState } from 'react';
import { useCorruption } from '@/app/context/corruption-context';
import { cn } from '@/lib/utils';

const MESSAGES = [
  "Ralph smashing memory sectors...",
  "Felix applying emergency patch in sector 7G...",
  "Sugar Rush data corrupted: Candy overflow.",
  "Hero's Duty firewall compromised. Cy-bugs detected.",
  "Vanellope detected in code stream. Jitter increasing.",
  "Unexpected cake found in circuitry. Cleaning...",
  "Warning: Character Ralph.obj out of bounds.",
  "Memory leak detected in Litwak-302. Restart suggested.",
  "Felix: 'I can fix it!' ... System: 'No, you can't.'",
  "Ralph: 'I'm gonna wreck it!' ... System: 'Correct.'",
  "Graphic pipeline overflow. Character scale anomaly.",
  "Q*bert language pack loading... !?@#*!",
  "Turbo signature detected. Sector 12.",
  "Bad-Anon session in progress. Do not disturb.",
  "Rerouting glitch stream... Vanellope.anomaly",
  "LITWAK'S POLICY: Do not feed the characters.",
  "Cyber-glitch detected in Sugar Rush candy-kart.",
  "System Stability: 'It's a feature, not a bug.'",
  "Tapper's Root Beer spill detected in Kernel."
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
    }, 3500);

    return () => clearInterval(interval);
  }, [corruptionLevel]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 border-t-2 border-primary/20 p-2 z-[10002] font-mono text-[9px] flex gap-4 overflow-hidden h-10 items-center uppercase tracking-tighter">
      <div className="flex-shrink-0 text-primary font-bold animate-pulse px-3 border-r border-primary/20">
        LITWAK_OS_V1.98
      </div>
      <div className="flex gap-8 animate-in slide-in-from-right duration-500 overflow-hidden">
        {logs.map((log, i) => (
          <span key={i} className={cn(
            "whitespace-nowrap transition-all",
            log.startsWith('CRITICAL') ? "text-secondary font-bold scale-105" : "text-primary/60"
          )}>
            {log}
          </span>
        ))}
      </div>
      <div className="ml-auto flex gap-6 pr-6">
        <span className="text-primary/40">CPU_TEMP: {(45 + corruptionLevel / 2).toFixed(1)}°C</span>
        <span className="text-secondary/40">ERR_FREQ: {corruptionLevel}%</span>
        <span className="text-primary/40 font-bold">STATUS: {corruptionLevel > 80 ? 'FAILURE' : 'ACTIVE'}</span>
      </div>
    </div>
  );
}
