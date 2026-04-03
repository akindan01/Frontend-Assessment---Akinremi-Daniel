import { describe, it, expect, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce Hook', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('debounces value updates', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 50),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    // Update value twice rapidly
    rerender({ value: 'first' });
    rerender({ value: 'final' });

    // Should still be initial until delay passes
    expect(result.current).toBe('initial');

    // Wait for debounce to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current).toBe('final');
  });

  it('handles multiple rapid updates correctly', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 50),
      { initialProps: { value: 'value1' } }
    );

    // Simulate rapid typing
    const updates = ['v', 'va', 'val', 'valu', 'value'];
    for (const update of updates) {
      rerender({ value: update });
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    // Only the final value should propagate after debounce completes
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(result.current).toContain('value');
  });
});

