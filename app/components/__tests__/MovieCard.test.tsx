import React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src as string} alt={alt as string} {...props} />;
  },
}));

const mockMovie: Movie = {
  id: 1,
  title: 'The Shawshank Redemption',
  overview:
    'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  poster_path: '/28yDEwNQ58eknG51injEHaUc.jpg',
  backdrop_path: '/iNh9Iseeca4f7k1pVp9czbY9b1u.jpg',
  release_date: '1994-09-28',
  vote_average: 9.3,
  vote_count: 25000,
  genre_ids: [18, 80],
  popularity: 50.5,
  original_language: 'en',
};

describe('MovieCard Component', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  });

  it('renders movie card with title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
  });

  it('displays the release year', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('1994')).toBeInTheDocument();
  });

  it('shows the movie rating', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('9.3')).toBeInTheDocument();
  });

  it('renders as a link to movie details', () => {
    render(<MovieCard movie={mockMovie} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movies/1');
  });

  it('handles movies without poster image gracefully', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);
    expect(screen.getByText('🎬')).toBeInTheDocument();
  });
});
