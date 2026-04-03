// src/components/MovieSkeleton.tsx
export default function MovieSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
      role="status"
      aria-label="Loading movie card"
    >
      {/* Image Skeleton */}
      <div
        className="animate-pulse"
        style={{
          position: 'relative',
          aspectRatio: '2/3',
          width: '100%',
          background: 'var(--bg-secondary)',
        }}
      >
        {/* Shimmer effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          }}
        />
      </div>

      {/* Content Skeleton */}
      <div style={{ padding: '12px 12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Title skeletons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="animate-pulse" style={{ height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', width: '85%' }} />
          <div className="animate-pulse" style={{ height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', width: '60%' }} />
        </div>

        {/* Meta info skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <div className="animate-pulse" style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', width: '35px' }} />
          <div className="animate-pulse" style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', width: '35px' }} />
        </div>
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '20px',
        width: '100%',
        marginBottom: '40px',
      }}
    >
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}>
          <MovieSkeleton />
        </div>
      ))}
    </div>
  );
}
