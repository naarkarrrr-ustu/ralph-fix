
import type {Metadata} from 'next';
import './globals.css';
import { CorruptionProvider } from './context/corruption-context';
import { SystemLog } from '@/components/SystemLog';
import { SoundToggle } from '@/components/SoundToggle';

export const metadata: Metadata = {
  title: 'ARCADE OS - Wrecked Mode',
  description: 'A cinematic retro arcade OS that is falling apart.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-hidden h-screen w-screen relative p-4">
        <CorruptionProvider>
          {/* Global Arcade Frame */}
          <div className="fixed inset-0 arcade-border pointer-events-none z-[10000]" />
          
          {/* Animated Marquee Header */}
          <div className="fixed top-0 left-0 w-full bg-black h-8 z-[10001] border-b border-primary/40 flex items-center overflow-hidden">
             <div className="marquee text-[10px] font-bold text-primary tracking-[0.4em] uppercase">
                ARCADE OS – FIX IT BEFORE RALPH BREAKS IT • SYSTEM INTEGRITY: {100}% • CHARACTER ANOMALY DETECTED • INSERT COIN TO PLAY • FIX-IT FELIX JR. • SUGAR RUSH • HERO'S DUTY • 
             </div>
          </div>

          <SoundToggle />

          {/* Cinematic Global Overlays */}
          <div className="fixed inset-0 crt-overlay pointer-events-none z-[9999]" />
          <div className="scanline" />
          
          <main className="h-full w-full relative z-10 pb-10 pt-8">
            {children}
          </main>

          <SystemLog />
        </CorruptionProvider>
      </body>
    </html>
  );
}
