"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import withAuth from "@/app/auth/protected/page";

function NewPollPage() {
  return (
    <div className="mx-auto max-w-2xl w-full p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create a new poll</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., What's your favorite framework?"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Optional details..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="options">Options (comma-separated)</Label>
            <Input id="options" placeholder="React, Vue, Svelte, Angular" />
          </div>
          <Button className="w-full">Create poll</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(NewPollPage);



