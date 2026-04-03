
import { Suspense } from 'react';
import { searchMovies, getPopularMovies } from '@/lib/api';
import MovieCard from '@/components/MovieCard';
import SearchInput from '@/components/SearchInput';
import { MovieGridSkeleton } from '@/components/MovieSkeleton';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { Movie } from '@/types/movie';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

async function MovieGrid({
  query,
  page,
}: {
  query?: string;
  page: number;
}) {
  let movies: Movie[] = [];
  let totalPages = 0;
  
  try {
    const data = query
      ? await searchMovies(query, page)
      : await getPopularMovies(page);

    movies = data.results;
    totalPages = data.total_pages;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return (
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '4rem' }}>⚠️</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 }}>
          Failed to Load Movies
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
        </p>
        <Link href="/" className="btn-gold" style={{ marginTop: '8px', display: 'inline-block', padding: '10px 28px', background: '#f5c518', color: '#000', fontWeight: 700, borderRadius: '6px', textDecoration: 'none' }}>
          Try Again
        </Link>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '4rem' }}>🔍</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 }}>
          No Results Found
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, textAlign: 'center' }}>
          {query ? `No movies matched "${query}". Try a different search.` : 'Check back soon for more content.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="movie-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        {movies.map((movie, index) => (
          <div key={movie.id} className="animate-fade-in" style={{ opacity: 0 }}>
            <MovieCard movie={movie} preload={index < 5} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={page < totalPages}
        />
      )}
    </>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.query || '';
  const page = parseInt(params.page || '1', 10);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

      {/* ── Hero Section ── */}
      <div className="animate-slide-up" style={{ opacity: 0 }}>
        {/* Decorative top label */}
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '3px',
              height: '22px',
              background: '#f5c518',
              borderRadius: '2px',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#f5c518',
              textTransform: 'uppercase',
            }}
          >
            {query ? 'Search Results' : 'Popular Now'}
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          {query ? (
            <>
              Results for{' '}
              <span style={{ color: '#f5c518' }}>&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            <>
              Discover <span style={{ color: '#f5c518' }}>Amazing</span> Content
            </>
          )}
        </h2>
        <p
          style={{
            marginTop: '12px',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          {query
            ? `Showing movies matching your search across thousands of titles.`
            : 'Stream thousands of movies and TV shows. Find your next obsession.'}
        </p>
      </div>

      {/* ── Search ── */}
      <Suspense
        fallback={
          <div
            style={{
              height: '52px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              animation: 'shimmer 2s infinite',
              backgroundSize: '200% 100%',
              backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)',
              maxWidth: '640px',
            }}
          />
        }
      >
        <SearchInput />
      </Suspense>

      {/* ── Divider ── */}
      <hr className="divider" />

      {/* ── Section label ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '-20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
          {query ? 'Search Results' : 'Trending Movies'}
        </h3>
      </div>

      {/* ── Grid ── */}
      <Suspense fallback={<MovieGridSkeleton count={20} />}>
        <MovieGrid query={query} page={page} />
      </Suspense>
    </div>
  );
}
