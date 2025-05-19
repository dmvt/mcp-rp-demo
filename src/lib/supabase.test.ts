import { describe, it, expect, vi } from 'vitest';
import { createClient } from '@supabase/supabase-js';

// Mock the createClient function
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }))
}));

describe('Supabase configuration', () => {
  it('can create a Supabase client', () => {
    expect(createClient).toBeDefined();
    expect(typeof createClient).toBe('function');
  });
});