import './globals.css';
import { CorruptionProvider } from './context/corruption-context';
import { ClientLayout } from '@/components/ClientLayout';

/**
 * Root Layout (Server Component)
 * Next.js 15 requires the root layout to be a server component for 
 * proper metadata and script injection.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>ARCADE OS - Wrecked Mode</title>
        <meta name="description" content="A cinematic retro arcade OS that is falling apart." />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-hidden h-screen w-screen relative">
        <CorruptionProvider>
          <ClientLayout>{children}</ClientLayout>
        </CorruptionProvider>
      </body>
    </html>
  );
}
