'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPollById } from "@/lib/actions/polls";
import { notFound } from "next/navigation";
import type { Poll } from '@/lib/database.types';

type PollDetailPageProps = {
  params: { id: string };
};

export default function PollDetailPage({ params }: PollDetailPageProps) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchPoll() {
      const { poll, error } = await getPollById(params.id);
      if (error || !poll) {
        notFound();
      }
      setPoll(poll as Poll);
    }
    fetchPoll();
  }, [params.id]);

  if (!poll) {
    return <div>Loading...</div>;
  }

  const options = poll.option_text.split(',').map((opt: string) => opt.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      console.log('Voted for:', selectedOption);
      setSubmitted(true);
    }
  };

  return (
    <div className="mx-auto max-w-2xl w-full p-6 grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{poll.question_text}</CardTitle>
          {poll.description && (
            <p className="text-sm text-muted-foreground">{poll.description}</p>
          )}
        </CardHeader>
        <CardContent className="grid gap-3">
          {submitted ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold">Thank you for voting!</h2>
            </div>
          ) : (
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
              <Button type="submit" disabled={!selectedOption}>
                Submit Vote
              </Button>
            </form>
          )}
          <div className="text-sm text-muted-foreground">
            Created: {new Date(poll.created_at).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



