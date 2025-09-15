import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPoll } from "@/lib/actions/polls";

export default function NewPollPage() {
  return (
    <div className="mx-auto max-w-2xl w-full p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create a new poll</CardTitle>
        </CardHeader>
        <form action={createPoll}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                placeholder="e.g., What's your favorite framework?"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Additional details about your poll..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="options">Options (comma-separated)</Label>
              <Input
                id="options"
                name="options"
                placeholder="React, Vue, Svelte, Angular"
                required
                minLength={3}
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple options with commas (minimum 2 options)
              </p>
            </div>
            <Button type="submit" className="w-full">
              Create poll
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
