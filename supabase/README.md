# Supabase Database Setup

This directory contains the database schema and migrations for the ALX Polly polling application.

## Database Schema

### Tables

1. **polls** - Main polls table
   - `id`: Unique identifier (UUID)
   - `user_id`: User who created the poll (references auth.users)
   - `question_text`: The poll question
   - `option_text`: The poll options (comma-separated or JSON)
   - `created_at`: Creation timestamp
   - `updated_at`: Last update timestamp
   - `is_active`: Whether the poll is active
   - `expires_at`: Optional expiration date

2. **poll_options** - Available options for each poll
   - `id`: Unique identifier (UUID)
   - `poll_id`: Reference to the poll (references polls.id)
   - `option_text`: The text of the option
   - `created_at`: Creation timestamp

3. **votes** - Individual votes cast
   - `id`: Unique identifier (UUID)
   - `poll_id`: Reference to the poll (references polls.id)
   - `option_id`: Reference to the selected option (references poll_options.id)
   - `voter_id`: User who voted (references auth.users, nullable for anonymous voting)
   - `voter_ip`: IP address for anonymous voting (nullable)
   - `created_at`: Vote timestamp

## Setup Instructions

### 1. Create the Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `001_create_polls_schema.sql`
4. Run the migration

### 2. Verify Tables

After running the migration, you should see:
- `polls` table
- `poll_options` table  
- `votes` table
- Proper indexes and constraints
- Row Level Security (RLS) enabled

### 3. Test the Schema

You can test the schema by:
1. Creating a test poll
2. Adding options to the poll
3. Casting some test votes

### 4. Environment Variables

Make sure your `.env.local` contains:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features

- **Row Level Security**: Users can only modify their own polls
- **Anonymous Voting**: Users can vote without accounts using IP tracking
- **One Vote Per Poll**: Prevents duplicate voting
- **Automatic Timestamps**: Created and updated timestamps are managed automatically
- **Performance Indexes**: Optimized queries with proper indexing

## Security

- All tables have RLS enabled
- Users can only create/modify their own polls
- Anonymous voting is limited to one vote per IP per poll
- Poll options can only be managed by poll creators
