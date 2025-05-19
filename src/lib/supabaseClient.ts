import { createClient } from '@supabase/supabase-js';

// Create a custom Supabase client connected to our local PostgreSQL
export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL as string,
	import.meta.env.VITE_SUPABASE_ANON_KEY as string,
	{
		db: {
			schema: 'public'
		},
		auth: {
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: true
		}
	}
);
