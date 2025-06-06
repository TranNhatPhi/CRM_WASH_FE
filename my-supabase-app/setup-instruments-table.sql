-- Create instruments table
CREATE TABLE IF NOT EXISTS instruments (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    brand TEXT,
    model TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Insert some sample data
INSERT INTO instruments (name, type, brand, model, description)
VALUES (
        'Electric Guitar',
        'String',
        'Fender',
        'Stratocaster',
        'Classic electric guitar with versatile sound'
    ),
    (
        'Digital Piano',
        'Keyboard',
        'Yamaha',
        'P-125',
        'Weighted keys digital piano perfect for home practice'
    ),
    (
        'Acoustic Drum Kit',
        'Percussion',
        'Pearl',
        'Export Series',
        'Complete 5-piece acoustic drum set'
    ),
    (
        'Violin',
        'String',
        'Stentor',
        'Student II',
        'Quality student violin with bow and case'
    ),
    (
        'Trumpet',
        'Brass',
        'Bach',
        'TR300H2',
        'Student trumpet with excellent projection'
    );
-- Enable Row Level Security (optional)
-- ALTER TABLE instruments ENABLE ROW LEVEL SECURITY;
-- Create a policy to allow read access (optional)
-- CREATE POLICY "Allow public read access" ON instruments FOR SELECT USING (true);