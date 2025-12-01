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
  metadataBase: new URL('https://meshjs.dev'),
  title: {
    default: 'Mesh - Open-Source TypeScript SDK for Cardano',
    template: '%s | Mesh',
  },
  description: 'Mesh is the open-source TypeScript SDK that helps developers build better Cardano blockchain applications faster. Ship UTXO dApps with ease using our comprehensive suite of tools, React components, and transaction builders. Less than 60kB, production-ready, with 1M+ downloads.',
  keywords: [
    'Cardano',
    'TypeScript SDK',
    'Web3',
    'blockchain development',
    'Cardano SDK',
    'dApp development',
    'smart contracts',
    'Cardano API',
    'blockchain tools',
    'UTXO',
    'Cardano wallet',
    'NFT',
    'Plutus',
    'Aiken',
    'React hooks',
    'Web3 development',
    'Cardano TypeScript',
    'mesh sdk',
    'cardano javascript',
  ],
  authors: [{ name: 'MeshJS', url: 'https://meshjs.dev' }],
  creator: 'MeshJS',
  publisher: 'MeshJS Pte. Ltd.',
  applicationName: 'Mesh',
  generator: 'Next.js',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meshjs.dev',
    siteName: 'Mesh - Cardano TypeScript SDK',
    title: 'Mesh - Open-Source TypeScript SDK for Cardano',
    description: 'Ship UTXO dApps faster with Mesh. The open-source TypeScript SDK for Cardano blockchain development with React components, wallet integrations, and transaction builders.',
    images: [
      {
        url: '/home/hero.png',
        width: 1200,
        height: 630,
        alt: 'Mesh - TypeScript SDK for Cardano',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@meshsdk',
    creator: '@meshsdk',
    title: 'Mesh - Open-Source TypeScript SDK for Cardano',
    description: 'Ship UTXO dApps faster with Mesh. Less than 60kB, production-ready, with 1M+ downloads.',
    images: ['/home/hero.png'],
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Add your Google Search Console verification code here
  },
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