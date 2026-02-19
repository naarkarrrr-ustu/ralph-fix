import type {Metadata} from 'next';
import './globals.css';
import { CorruptionProvider } from './context/corruption-context';
import { SystemLog } from '@/components/SystemLog';

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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-hidden h-screen w-screen relative">
        <CorruptionProvider>
          {/* Cinematic Global Overlays */}
          <div className="fixed inset-0 crt-overlay pointer-events-none z-[9999]" />
          <div className="scanline" />
          
          <main className="h-full w-full relative z-10 pb-10">
            {children}
          </main>

          <SystemLog />
        </CorruptionProvider>
      </body>
    </html>
  );
}