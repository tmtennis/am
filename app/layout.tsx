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
      <body className={`${inter.className} antialiased text-white`} style={{ backgroundColor: '#1a1919' }}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
