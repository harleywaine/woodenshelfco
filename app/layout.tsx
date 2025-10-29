import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'The Wooden Shelf Company - Handcrafted Live Edge Shelves',
  description: 'Beautiful handcrafted live edge wooden shelves, cut to measure and finished with care. Custom dimensions, premium wood types, and elegant finishes.',
  keywords: 'wooden shelves, live edge, custom shelves, handcrafted, woodworking, home decor',
  authors: [{ name: 'The Wooden Shelf Company' }],
  openGraph: {
    title: 'The Wooden Shelf Company - Handcrafted Live Edge Shelves',
    description: 'Beautiful handcrafted live edge wooden shelves, cut to measure and finished with care.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Wooden Shelf Company - Handcrafted Live Edge Shelves',
    description: 'Beautiful handcrafted live edge wooden shelves, cut to measure and finished with care.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter antialiased">
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}