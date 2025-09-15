import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPolls } from "@/lib/actions/polls";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function PollsListPage() {
  const supabase = createServerSupabaseClient();
  const { polls, error } = await getPolls();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("Server-side user:", user);
  console.log("Server-side error from getPolls:", error);
  console.log("Server-side error from getUser:", userError);

  if (error || userError) {
    console.error("Error in PollsListPage:", error || userError);
    return (
      <div className="mx-auto max-w-8xl w-full p-6">
        <div className="text-center text-red-600">
          Error loading polls: {error || userError}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-8xl w-full p-6 grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Polls</h1>
        {user && (
          <Link href="/dashboard/polls/new">
            <Button className="bg-black hover:bg-black/80 text-white">
              Create new
            </Button>
          </Link>
        )}
      </div>

      {!polls || polls.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No polls created yet.</p>
          <Link href="/dashboard/polls/new">
            <Button>Create your first poll</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls?.map((poll) => (
            <Link key={poll.id} href={`/dashboard/polls/${poll.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer relative">
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
                    <span>📊 {poll.option_text.split(",").length} options</span>
                    <span>🗳️ 0 votes</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(poll.created_at).toLocaleDateString()}
                  </div>
                  {user && poll.user_id === user.id && (
                    <div className="absolute top-2 right-2">
                      <Link href={`/dashboard/polls/edit/${poll.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
