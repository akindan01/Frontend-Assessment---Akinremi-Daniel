'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentQuery = searchParams.get('query') || '';
  const [value, setValue] = useState(currentQuery);
  const debouncedValue = useDebounce(value, 400);

  // Sync with URL updates
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue.trim()) {
      params.set('query', debouncedValue);
      params.set('page', '1'); // Reset to page 1 on new search
    } else {
      params.delete('query');
      params.delete('page');
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`, { scroll: false });
    });
  }, [debouncedValue, router, searchParams]);

  return (
    <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search movies, TV shows, and more..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Search content"
          className="search-input"
        />
        <div
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.4)',
            pointerEvents: 'none',
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        {isPending && (
          <div
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <div
              className="animate-spin"
              style={{
                width: '20px',
                height: '20px',
                border: '2px solid rgba(245,197,24,0.3)',
                borderTopColor: '#f5c518',
                borderRadius: '50%',
              }}
            />
          </div>
        )}
      </div>

      {value && (
        <button
          onClick={() => setValue('')}
          className="hover:text-white"
          style={{
            position: 'absolute',
            right: isPending ? '48px' : '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
          }}
          aria-label="Clear search"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
