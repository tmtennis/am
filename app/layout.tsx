import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Alexander May Studio',
  description: 'Form held by clarity, freed by imagination.',
  openGraph: {
    title: 'Alexander May Studio',
    description: 'Form held by clarity, freed by imagination.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="canonical" href="https://yourdomain.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Form held by clarity, freed by imagination." />
        <meta property="og:title" content="Alexander May Studio" />
        <meta property="og:description" content="Form held by clarity, freed by imagination." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="/images/hero/hero-1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alexander May Studio" />
        <meta name="twitter:description" content="Form held by clarity, freed by imagination." />
        <meta name="twitter:image" content="/images/hero/hero-1.png" />
        <meta name="twitter:url" content="https://yourdomain.com/" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Alexander May Studio',
          url: 'https://yourdomain.com/',
          logo: '/favicon.svg',
          description: 'Form held by clarity, freed by imagination.'
        })}</script>
      </head>
      <body className={`${inter.className} antialiased text-white bg-black`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
