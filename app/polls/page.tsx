import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPolls } from "@/lib/actions/polls";
import { supabaseServer } from "@/lib/supabase-server";

import { PollActions } from '@/components/polls/poll-actions';

export const dynamic = 'force-dynamic';

export default async function PollsListPage() {
  const { polls, error } = await getPolls();
  const { data: { user } } = await supabaseServer.auth.getUser();

  if (error) {
    return (
      <div className="mx-auto max-w-8xl w-full p-6">
        <div className="text-center text-red-600">
          Error loading polls: {error}
        </div>
      </div>
    ); 
  }

  return (
    <div className="mx-auto max-w-8xl w-full p-6 grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Polls</h1>
        <Link href="/polls/new">
          <Button className="bg-black hover:bg-black/80 text-white">
            Create new
          </Button>
        </Link>
      </div>

      {!polls || polls.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No polls created yet.</p>
          <Link href="/polls/new">
            <Button>Create your first poll</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls?.map((poll) => (
            <Card key={poll.id} className="hover:shadow-lg transition-shadow relative">
              <Link href={`/polls/${poll.id}`} className="block">
                <CardHeader>
                  <CardTitle className="font-bold text-lg">
                    {poll.question_text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {poll.description || "No description provided."}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>📊 {poll.option_text.split(',').length} options</span>
                    <span>🗳️ 0 votes</span>
                  </div>
                                  <div className="text-xs text-muted-foreground">
                  Created: {new Date(poll.created_at).toLocaleDateString()}
                </div>
                </CardContent>
              </Link>
              {user && poll.user_id === user.id && (
                <div className="absolute top-2 right-2">
                  <PollActions pollId={poll.id} />
                </div>
              )}
            </Card>
        ))}
      </div>
      )}
    </div>
  );
}



