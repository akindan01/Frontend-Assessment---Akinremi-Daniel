import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetails } from '@/lib/api';
import { MovieDetails } from '@/types/movie';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: MoviePageProps,
): Promise<Metadata> {
  try {
    const { id } = await params;
    const movie: MovieDetails = await getMovieDetails(parseInt(id));

    return {
      title: `${movie.title} | CineX`,
      description: movie.overview || 'Movie details',
      openGraph: {
        title: movie.title,
        description: movie.overview,
        type: 'video.movie',
        images: movie.poster_path
          ? [`${IMAGE_BASE_URL}${movie.poster_path}`]
          : [],
      },
    };
  } catch {
    return {
      title: 'Movie Details | CineX',
      description: 'View movie details',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  let movie: MovieDetails | null = null;
  let backdropUrl: string | null = null;
  let posterUrl: string | null = null;
  let releaseYear: number | null = null;
  let ratingColor: string = '#fff';

  try {
    movie = await getMovieDetails(parseInt(id));

    backdropUrl = movie.backdrop_path
      ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
      : null;

    posterUrl = movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null;

    releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : null;

    ratingColor = movie.vote_average >= 7.5 ? '#f5c518' : '#fff';
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '20px' }}>
        <div style={{ fontSize: '4rem' }}>⚠️</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Failed to Load Movie</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>
          {error instanceof Error ? error.message : 'The movie could not be found.'}
        </p>
        <Link href="/" className="btn-gold" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <article style={{ display: 'flex', flexDirection: 'column', marginTop: '-40px' }}>

      {/* ── Hero Backdrop ── */}
      <div
        className="animate-fade-in"
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          height: '75vh',
          minHeight: '600px',
          maxHeight: '900px',
          background: '#0a0a0a',
        }}
      >
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            preload={true}
            loading="eager"
            sizes="100vw"
            style={{ objectPosition: 'center 20%' }}
          />
        )}

        {/* Vignette & fade-to-black bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.85) 15%, rgba(10,10,10,0.4) 40%, transparent 100%), linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.4) 30%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Hero Content Overlay ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            paddingBottom: '60px',
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '48px', alignItems: 'flex-end' }}>

            {/* Poster (Desktop only) */}
            <div
              className="animate-slide-up"
              style={{
                display: 'none',
                '@media (minwidth: 768px)': { display: 'block' },
                position: 'relative',
                width: '300px',
                aspectRatio: '2/3',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#1a1a1a',
                flexShrink: 0,
                boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
                zIndex: 10,
                animationDelay: '0.2s',
              } as React.CSSProperties}
            >
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                  loading="lazy"
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4rem' }}>🎬</div>
              )}
            </div>

            {/* Text Content */}
            <div
              className="animate-slide-up"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxWidth: '800px',
                animationDelay: '0.1s',
                paddingBottom: '20px',
              }}
            >
              <Link
                href="/"
                className="hover:text-white"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  marginBottom: '16px',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}
              >
                {movie.title}
              </h1>

              {/* Metadata Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', fontSize: '1rem', fontWeight: 500, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                <div style={{ color: ratingColor, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}>
                  ★ {movie.vote_average.toFixed(1)}
                </div>
                <span>{releaseYear}</span>
                {movie.runtime > 0 && <span>{movie.runtime}m</span>}
                <span style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '3px', padding: '0 6px', fontSize: '0.75em' }}>HD</span>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#fff',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(4px)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                      }}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <button
                  className="btn-gold"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 32px',
                    fontSize: '1.2rem',
                  }}
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play
                </button>
                <button
                  className="btn-ghost"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 32px',
                    fontSize: '1.2rem',
                  }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  List
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── More Details ── */}
      <div className="animate-slide-up" style={{ animationDelay: '0.3s', marginTop: '40px', display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '60px' }}>

        {/* Main info column */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Overview</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
            {movie.overview || 'No description available for this title.'}
          </p>
        </div>

        {/* Meta column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '0.95rem' }}>
          {movie.status && (
            <div>
              <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '4px' }}>Status</span>
              <span style={{ fontWeight: 600 }}>{movie.status}</span>
            </div>
          )}

          {(movie.budget > 0 || movie.revenue > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {movie.budget > 0 && (
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '4px' }}>Budget</span>
                  <span style={{ fontWeight: 600 }}>${(movie.budget / 1000000).toFixed(1)}M</span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '4px' }}>Revenue</span>
                  <span style={{ fontWeight: 600 }}>${(movie.revenue / 1000000).toFixed(1)}M</span>
                </div>
              )}
            </div>
          )}

          {movie.original_language && (
            <div>
              <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '4px' }}>Original Language</span>
              <span style={{ fontWeight: 600, textTransform: 'uppercase' }}>{movie.original_language}</span>
            </div>
          )}
        </div>
      </div>

    </article>
  );
}
