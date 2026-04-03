import { MovieGridSkeleton } from '@/components/MovieSkeleton';

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center space-y-4 mb-8 animate-pulse">
        <div className="h-12 bg-slate-800 rounded w-3/4 mx-auto" />
        <div className="h-6 bg-slate-800 rounded w-2/3 mx-auto" />
      </div>

      {/* Search Input Skeleton */}
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="h-12 bg-slate-800 rounded-lg animate-pulse" />
      </div>

      {/* Movie Grid Skeleton */}
      <MovieGridSkeleton count={20} />
    </div>
  );
}
