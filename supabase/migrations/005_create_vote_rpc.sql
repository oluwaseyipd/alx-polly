create or replace function increment_vote(poll_id uuid, option_text text)
returns void as $$
begin
  update polls
  set votes = jsonb_set(
    votes,
    ARRAY[option_text],
    (COALESCE(votes->>option_text, '0')::int + 1)::text::jsonb
  )
  where id = poll_id;
end;
$$ language plpgsql;
