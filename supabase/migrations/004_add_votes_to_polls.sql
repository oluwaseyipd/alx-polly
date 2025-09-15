ALTER TABLE polls
ADD COLUMN votes jsonb DEFAULT '{}'::jsonb;
