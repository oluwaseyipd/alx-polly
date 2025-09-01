-- Drop the old permissive policies
DROP POLICY IF EXISTS "Users can create polls" ON polls;
DROP POLICY IF EXISTS "Users can update their own polls" ON polls;
DROP POLICY IF EXISTS "Users can delete their own polls" ON polls;

-- Create proper authenticated policies
CREATE POLICY "Users can create polls" ON polls
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own polls" ON polls
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own polls" ON polls
  FOR DELETE USING (auth.uid() = user_id);

-- Update the poll options policy to be more restrictive
DROP POLICY IF EXISTS "Poll creators can manage options" ON poll_options;

CREATE POLICY "Poll creators can manage options" ON poll_options
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM polls 
      WHERE polls.id = poll_options.poll_id 
      AND polls.user_id = auth.uid()
    )
  );
