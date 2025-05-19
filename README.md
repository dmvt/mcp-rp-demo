# MCP Reverse Proxy Demo

A SvelteKit v5 application that demonstrates integrating with the Model Context Protocol (MCP) using reverse proxy functionality.

## Technologies Used

- **SvelteKit v5** - Modern web framework with server and client rendering capabilities
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS v4** - Utility-first CSS framework
- **Supabase** - Open source Firebase alternative for database and authentication
- **Docker** - For containerizing MCP servers and Supabase

## Project Setup

### Prerequisites

- Node.js v18+ and npm/pnpm/yarn
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:

```bash
git clone git@github.com:dmvt/mcp-rp-demo.git
cd mcp-rp-demo
```

2. Install dependencies:

```bash
npm install
```

3. Start local Supabase using Docker:

```bash
# Start the PostgreSQL container with Supabase schema
docker-compose up -d
```

4. Environment setup:

```bash
# Create .env file from example
cp .env.example .env
```

The default `.env.example` values should work with the local Docker setup:
- `VITE_SUPABASE_URL=http://localhost:8000`
- `VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODU0MCwiZXhwIjoxOTI4Njc0NTQwfQ.magsCMsSnNXfoUuBl8XQQrugR-zBXRfXBpEBklJ8-Fs`

### Development

First, make sure your Supabase containers are running:

```bash
docker-compose ps
# If they're not running, start them with:
docker-compose up -d
```

Then, start the development server (runs on port 5500):

```bash
npm run dev

# Or open in browser automatically
npm run dev -- --open
```

The application will be available at http://localhost:5500

### Testing

Run tests with:

```bash
npm run test
```

### Linting and Formatting

Check formatting and linting:

```bash
npm run lint
```

Format your code:

```bash
npm run format
```

### Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Adding New Features

### Tailwind Utilities

To add custom Tailwind utilities, edit `tailwind.config.js` in the project root.

Example:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'custom-blue': '#1a73e8'
			}
		}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
```

### Supabase Tables

This project uses a PostgreSQL database with Supabase Studio running in Docker containers. To add new tables:

1. Create a new SQL migration file in `supabase/db/init/` directory
2. Number it sequentially (e.g., `02-new-table.sql`)
3. Define your table structure and any seed data
4. Restart the Docker container to apply changes

Example SQL migration file (`supabase/db/init/02-new-table.sql`):

```sql
-- Create a new table
CREATE TABLE IF NOT EXISTS public.my_new_table (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert some seed data
INSERT INTO public.my_new_table (title, content) VALUES
    ('First Item', 'This is the first item in my new table'),
    ('Second Item', 'This is the second item in my new table');
```

Then, in your SvelteKit code:

```typescript
// src/routes/api/my-new-table/+server.ts
import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const { data, error } = await supabase.from('my_new_table').select('*');

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	return json(data);
};
```

## MCP Integration

This project is designed to work with Model Context Protocol (MCP) servers running in Docker. Documentation for setting up and interacting with MCP servers will be added in future updates.

## License

ISC License