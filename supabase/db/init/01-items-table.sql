-- Create the 'items' table
CREATE TABLE IF NOT EXISTS public.items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create a row level security policy
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read the items
CREATE POLICY items_select_policy ON public.items
    FOR SELECT USING (true);

-- Insert sample data
INSERT INTO public.items (name, description) VALUES
    ('First Item', 'This is the first item in the database.'),
    ('Second Item', 'This is the second item in the database.'),
    ('Third Item', 'This is the third item in the database.');