// app/components/MovieCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  preload?: boolean;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function MovieCard({ movie, preload = false }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const rating = movie.vote_average;
  const ratingColor =
    rating >= 7.5 ? '#f5c518' : rating >= 6 ? '#a0a0a0' : '#666';

  return (
    <Link href={`/movies/${movie.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <article className="movie-card" style={{ height: '100%' }}>

        {/* ── Poster ── */}
        <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%', background: '#1a1a1a' }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              loading={preload ? "eager" : "lazy"}
              preload={preload ? true : undefined}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontSize: '2.5rem',
                background: '#1a1a1a',
              }}
            >
              🎬
            </div>
          )}

          {/* Permanent subtle gradient */}
          <div
            className="card-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          />

          {/* Rating pill — top right */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(6px)',
              borderRadius: '5px',
              padding: '3px 7px',
              border: `1px solid ${ratingColor}44`,
            }}
          >
            <span style={{ color: ratingColor, fontSize: '10px' }}>★</span>
            <span style={{ color: ratingColor, fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-geist-mono)' }}>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* ── Info ── */}
        <div
          style={{
            padding: '12px 12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <h3
            className="card-title"
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              margin: 0,
              transition: 'color 0.25s ease',
            }}
          >
            {movie.title}
          </h3>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.35)',
              fontWeight: 500,
            }}
          >
            {year ?? 'N/A'}
          </span>
        </div>
      </article>
    </Link>
  );
}
