'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-4">
      <div className="text-6xl">⚠️</div>
      <h2 className="text-3xl font-bold text-white">Something Went Wrong</h2>
      <p className="text-slate-400 max-w-md">
        {error.message ||
          'We encountered an error while loading. Please try again.'}
      </p>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
