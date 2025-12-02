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
    default: 'Mesh - Open-Source TypeScript SDK for Cardano Blockchain Development',
    template: '%s | Mesh SDK',
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
    'cardano dapp',
    'cardano smart contracts',
    'blockchain sdk',
    'web3 sdk',
    'cardano development',
    'cardano tools',
    'cardano library',
    'cardano npm',
    'cardano react',
    'decentralized applications',
  ],
  authors: [{ name: 'MeshJS', url: 'https://meshjs.dev' }],
  creator: 'MeshJS',
  publisher: 'MeshJS Pte. Ltd.',
  applicationName: 'Mesh',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  category: 'technology',
  classification: 'Blockchain Development Tools',
  alternates: {
    canonical: 'https://meshjs.dev',
    types: {
      'application/rss+xml': 'https://meshjs.dev/rss.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meshjs.dev',
    siteName: 'Mesh - Cardano TypeScript SDK',
    title: 'Mesh - Open-Source TypeScript SDK for Cardano Blockchain Development',
    description: 'Ship UTXO dApps faster with Mesh. The open-source TypeScript SDK for Cardano blockchain development with React components, wallet integrations, and transaction builders. Trusted by 1M+ downloads.',
    images: [
      {
        url: '/home/hero.png',
        width: 1200,
        height: 630,
        alt: 'Mesh - TypeScript SDK for Cardano - Build dApps faster',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@meshsdk',
    creator: '@meshsdk',
    title: 'Mesh - Open-Source TypeScript SDK for Cardano',
    description: 'Ship UTXO dApps faster with Mesh. Less than 60kB, production-ready, with 1M+ downloads. Build Cardano blockchain applications with TypeScript.',
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '', // Bing
    },
  },
  other: {
    'msapplication-TileColor': '#5bbad5',
    'theme-color': '#ffffff',
  },
};

// JSON-LD Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://meshjs.dev/#organization',
      name: 'MeshJS',
      url: 'https://meshjs.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://meshjs.dev/logo-mesh/mesh.png',
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://twitter.com/meshsdk',
        'https://github.com/MeshJS/mesh',
        'https://www.npmjs.com/package/@meshsdk/core',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Developer Support',
        url: 'https://meshjs.dev',
      },
      description: 'Open-source TypeScript SDK for Cardano blockchain development',
      foundingDate: '2021',
      keywords: 'Cardano SDK, TypeScript, Web3, Blockchain Development, dApp',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://meshjs.dev/#website',
      url: 'https://meshjs.dev',
      name: 'Mesh - Cardano TypeScript SDK',
      description: 'Open-source TypeScript SDK for building Cardano blockchain applications',
      publisher: {
        '@id': 'https://meshjs.dev/#organization',
      },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://meshjs.dev/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://meshjs.dev/#software',
      name: 'Mesh SDK',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
        bestRating: '5',
      },
      downloadUrl: 'https://www.npmjs.com/package/@meshsdk/core',
      softwareVersion: 'latest',
      description: 'TypeScript SDK for Cardano blockchain development with React components and transaction builders',
      releaseNotes: 'Production-ready SDK with 1M+ downloads',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://meshjs.dev/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://meshjs.dev',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Guides',
          item: 'https://meshjs.dev/guides',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'APIs',
          item: 'https://meshjs.dev/apis',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'React',
          item: 'https://meshjs.dev/react',
        },
      ],
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}