// src/components/Pagination.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const hasPrevPage = currentPage > 1;
  const maxPagesToShow = Math.min(totalPages, 500);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '40px 0' }}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="btn-ghost"
        style={{
          opacity: hasPrevPage ? 1 : 0.5,
          cursor: hasPrevPage ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        aria-label="Previous page"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Page</span>
        <span style={{ fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
          {currentPage}
        </span>
        <span>of</span>
        <span style={{ fontWeight: 600 }}>{maxPagesToShow}</span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="btn-ghost"
        style={{
          opacity: hasNextPage ? 1 : 0.5,
          cursor: hasNextPage ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        aria-label="Next page"
      >
        Next
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
