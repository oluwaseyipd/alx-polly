"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Poll } from "@/lib/database.types";

type PollResultChartProps = {
  poll: Poll;
};

export function PollResultChart({ poll }: PollResultChartProps) {
  const votes = poll.votes as Record<string, number>;
  const options = Object.keys(votes);
  const totalVotes = Object.values(votes).reduce(
    (acc, count) => acc + count,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{poll.question_text}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {options.map((option, index) => {
          const voteCount = votes[option];
          const percentage =
            totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
          return (
            <div key={index} className="grid gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{option}</span>
                <span className="text-sm text-muted-foreground">
                  {voteCount} votes ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
