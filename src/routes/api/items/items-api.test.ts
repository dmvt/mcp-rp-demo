import { describe, it, expect, vi, beforeEach } from 'vitest';
import { json } from '@sveltejs/kit';

// Mock dependencies
vi.mock('@sveltejs/kit', () => ({
  json: vi.fn((data) => ({
    status: 200,
    body: data,
    json: async () => data
  }))
}));

// Mock the implementation of the GET handler
const mockItemsData = [
  { id: 1, name: 'Sample Item 1', description: 'This is a sample item' },
  { id: 2, name: 'Sample Item 2', description: 'This is another sample item' }
];

describe('Items API endpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return sample data when called', async () => {
    // Import our handler - this will use the mocked dependencies
    const { GET } = await import('./+server');
    
    // Call the handler
    const response = await GET();
    const data = await response.json();
    
    // Expect data to be returned
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    
    // Verify the json function was called
    expect(json).toHaveBeenCalled();
  });
});