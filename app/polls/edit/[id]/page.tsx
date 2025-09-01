import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPollById } from "@/lib/actions/polls";
import { supabaseServer } from "@/lib/supabase-server";

type EditPollPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPollPage(props: EditPollPageProps) {
  const { id } = await props.params;
  const { poll, error } = await getPollById(id);
  const { data: { user } } = await supabaseServer.auth.getUser();

  if (error || !poll) {
    notFound();
  }

  // Check if user owns this poll
  if (!user || poll.user_id !== user.id) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl w-full p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Poll</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="question">Question</Label>
            <Input 
              id="question" 
              defaultValue={poll.question_text}
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Question editing coming soon
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="options">Options</Label>
            <Input 
              id="options" 
              defaultValue={poll.option_text}
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Option editing coming soon
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              Cancel
            </Button>
            <Button disabled>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
