import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PollsListPage() {
  return (
    <div className="mx-auto max-w-3xl w-full p-4 grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Polls</h1>
        <Link className="underline" href="/polls/new">Create new</Link>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((id) => (
          <Link key={id} href={`/polls/${id}`}>
            <Card>
              <CardHeader>
                <CardTitle>Sample poll {id}</CardTitle>
              </CardHeader>
              <CardContent>
                This is a placeholder for poll description.
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}



