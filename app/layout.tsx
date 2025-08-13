import '@/app/global.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Provider } from './provider';

const inter = Inter({
  subsets: ['latin'],
});

// Export the metadata object
export const metadata: Metadata = {
  title: 'Mesh',
  description: 'Web3 TypeScript SDK',
  icons: {
    icon: '/favicon.ico',
    shortcut: 'favicon/favicon-16x16.png',
    apple: 'favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: 'favicon/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: 'favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: 'favicon/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        url: 'favicon/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}