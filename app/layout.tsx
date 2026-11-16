import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SURPRISE_CONFIG } from '@/config/surprise';

export const metadata: Metadata = {
  title: SURPRISE_CONFIG.websiteTitle,
  description: `A magical birthday surprise for ${SURPRISE_CONFIG.recipient.name} on turning ${SURPRISE_CONFIG.recipient.age}! Crafted with love by ${SURPRISE_CONFIG.sender.name}.`,
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💖</text></svg>',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFF0F5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Dancing+Script:wght@400..700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#FFF5F7] text-gray-800 antialiased selection:bg-pink-300 selection:text-pink-900 overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
