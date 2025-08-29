import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PollsListPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <Link key={id} href={`/polls/${id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="font-bold text-lg">
                  Sample Poll Question {id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  This is a placeholder for poll description.
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>📊 {Math.floor(Math.random() * 5) + 2} options</span>
                  <span>🗳️ {Math.floor(Math.random() * 100) + 10} votes</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}



