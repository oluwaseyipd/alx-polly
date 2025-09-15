'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addVote } from "@/lib/actions/polls";
import type { Poll } from '@/lib/database.types';
import { PollResultChart } from '@/components/polls/poll-result-chart';

type PollDetailProps = {
  poll: Poll;
};

export function PollDetail({ poll: initialPoll }: PollDetailProps) {
  const [poll, setPoll] = useState(initialPoll);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
    if (votedPolls.includes(poll.id)) {
      setSubmitted(true);
    }
  }, [poll.id]);

  const options = poll.option_text.split(',').map((opt: string) => opt.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      setLoading(true);
      try {
        await addVote(poll.id, selectedOption);
        setSubmitted(true);
        const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
        localStorage.setItem('votedPolls', JSON.stringify([...votedPolls, poll.id]));
      } catch (error) {
        console.error(error);
        alert('Failed to vote');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl w-full p-6 grid gap-4">
      {submitted ? (
        <PollResultChart poll={poll} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{poll.question_text}</CardTitle>
            {poll.description && (
              <p className="text-sm text-muted-foreground">{poll.description}</p>
            )}
          </CardHeader>
          <CardContent className="grid gap-3">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                {options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="poll-option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="h-4 w-4"
                    />
                    <label htmlFor={`option-${index}`} className="text-sm">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <Button type="submit" disabled={!selectedOption || loading}>
                {loading ? 'Voting...' : 'Submit Vote'}
              </Button>
            </form>
            <div className="text-sm text-muted-foreground">
              Created: {new Date(poll.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
