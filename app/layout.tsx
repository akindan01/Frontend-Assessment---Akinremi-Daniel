import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import MobileNavbar from '@/components/MobileNavbar';
import './globals.css';

const geistSans = localFont({
  src: [
    { path: './fonts/GeistVF.woff2', weight: '100 900', style: 'normal' },
    { path: './fonts/GeistVF-ext.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: [
    { path: './fonts/GeistMonoVF.woff2', weight: '100 900', style: 'normal' },
    { path: './fonts/GeistMonoVF-ext.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CineX — Discover Movies & TV Shows',
  description:
    'Discover and explore thousands of movies and TV shows. Search, filter, and get detailed information about your favorite content.',
  keywords: ['movies', 'tv shows', 'search', 'discovery', 'streaming'],
  openGraph: {
    title: 'CineX',
    description: 'Discover and explore thousands of movies and TV shows.',
    type: 'website',
    siteName: 'CineX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineX',
    description: 'Discover and explore movies and TV shows',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body>
        {/* ── Navigation ── */}
        <header
          id="main-nav"
          className="navbar-glass sticky top-0 z-50 animate-nav-slide"
          style={{ animationDuration: '0.4s' }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 24px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <Link href="/" id="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  background: '#f5c518',
                  borderRadius: '6px',
                }}
              >
                <Clapperboard color="#0a0a0a" size={20} className="stroke-[2.5]" />
              </span>
              <span
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                }}
              >
                Cine<span style={{ color: '#f5c518' }}>X</span>
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center" style={{ gap: '32px' }}>
              <Link
                id="nav-browse"
                href="/"
                className="hover:text-[#f5c518]"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#fff',
                  opacity: 0.9,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
              >
                Movies
              </Link>
              <Link
                id="nav-trending"
                href="#"
                className="hover:text-[#f5c518]"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Trending
              </Link>
              <Link
                id="nav-watchlist"
                href="#"
                className="hover:text-[#f5c518]"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Watchlist
              </Link>
            </nav>
            <MobileNavbar />
          </div>
        </header>

        {/* ── Main Content ── */}
        <main style={{ minHeight: '100vh', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
            {children}
          </div>
        </main>

        {/* ── Footer ── */}
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: '#0a0a0a',
            padding: '40px 24px',
          }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Cine<span style={{ color: '#f5c518' }}>X</span>
            </span>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              Data provided by{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f5c518', textDecoration: 'none' }}
              >
                The Movie Database (TMDB)
              </a>
              {' '}· © {new Date().getFullYear()} CineX
            </p>

          </div>
        </footer>
      </body>
    </html >
  );
}
