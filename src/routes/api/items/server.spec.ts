import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as supabaseModule from '$lib/supabaseClient';
import { GET } from './+server';

describe('Items API Endpoint', () => {
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();
  });

  test('returns sample data when Supabase query succeeds with data', async () => {
    const mockData = [
      { id: 1, name: 'Database Item 1', description: 'From database' },
      { id: 2, name: 'Database Item 2', description: 'From database too' }
    ];

    // Mock the Supabase client
    vi.spyOn(supabaseModule, 'supabase', 'get').mockReturnValue({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: mockData,
            error: null
          })
        })
      })
    });

    // Call the handler
    const response = await GET();
    const data = await response.json();

    // Check that the response contains the mock data
    expect(data).toEqual(mockData);
  });

  test('returns sample data when Supabase returns no data', async () => {
    // Mock the Supabase client
    vi.spyOn(supabaseModule, 'supabase', 'get').mockReturnValue({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: null,
            error: null
          })
        })
      })
    });

    // Call the handler
    const response = await GET();
    const data = await response.json();

    // Check that the response contains sample data
    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('Sample Item 1');
    expect(data[1].name).toBe('Sample Item 2');
  });

  test('returns sample data when Supabase query fails', async () => {
    // Mock the Supabase client to throw an error
    vi.spyOn(supabaseModule, 'supabase', 'get').mockReturnValue({
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: null,
            error: new Error('Database error')
          })
        })
      })
    });

    // Create a spy for console.error to avoid cluttering test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation();

    // Call the handler
    const response = await GET();
    const data = await response.json();
    
    // Check that the console.error was called
    expect(consoleSpy).toHaveBeenCalled();

    // Check that the response contains sample data
    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('Sample Item 1');
    expect(data[1].name).toBe('Sample Item 2');

    // Ensure response has 200 status
    expect(response.status).toBe(200);
  });
});