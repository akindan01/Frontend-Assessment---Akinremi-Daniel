// src/lib/api.ts
import { MovieResponse, MovieDetails, Genre } from '@/types/movie';

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface NextFetchOptions extends RequestInit {
  next?: { revalidate?: number | false };
}

if (!API_KEY) {
  console.warn('NEXT_PUBLIC_TMDB_API_KEY is not set. API calls will fail.');
}

const fetchOptions: NextFetchOptions = {
  next: { revalidate: 3600 }, // Cache for 1 hour
  headers: {
    'Content-Type': 'application/json',
  },
} as NextFetchOptions;

export async function getPopularMovies(page: number = 1): Promise<MovieResponse> {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch popular movies: ${res.statusText}`);
  }
  return res.json();
}

export async function searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
  if (!query.trim()) {
    return getPopularMovies(page);
  }

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to search movies: ${res.statusText}`);
  }
  return res.json();
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch movie details: ${res.statusText}`);
  }
  return res.json();
}

export async function getGenres(): Promise<Genre[]> {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch genres: ${res.statusText}`);
  }
  const data = await res.json();
  return data.genres;
}

// Legacy function for backward compatibility
export async function getMovies(query?: string, page: number = 1): Promise<MovieResponse> {
  if (query) {
    return searchMovies(query, page);
  }
  return getPopularMovies(page);
}
