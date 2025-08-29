import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PollDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PollDetailPage(props: PollDetailPageProps) {
  const { id } = await props.params;

  return (
    <div className="mx-auto max-w-2xl w-full p-4 grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Poll {id}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">Question</span>
            <p className="text-base">This is where the poll question will appear.</p>
          </div>
          <div className="grid gap-2">
            {["Option A", "Option B", "Option C"].map((label) => (
              <Button key={label} variant="outline" className="justify-start">
                {label}
              </Button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">Vote results and metadata will go here.</div>
        </CardContent>
      </Card>
    </div>
  );
}



