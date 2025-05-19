import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		// Example query to get items from a 'items' table in Supabase
		const { data, error } = await supabase
			.from('items')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) {
			throw error;
		}

		// If Supabase isn't configured yet, return sample data
		if (!data) {
			return json([
				{ id: 1, name: 'Sample Item 1', description: 'This is a sample item' },
				{ id: 2, name: 'Sample Item 2', description: 'This is another sample item' }
			]);
		}

		return json(data);
	} catch (error) {
		console.error('Error fetching items:', error);

		// Return sample data in case of error
		return json(
			[
				{ id: 1, name: 'Sample Item 1', description: 'This is a sample item' },
				{ id: 2, name: 'Sample Item 2', description: 'This is another sample item' }
			],
			{ status: 200 }
		);
	}
};
