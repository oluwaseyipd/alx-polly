import { getPollById } from "@/lib/actions/polls";
import { notFound } from "next/navigation";
import { PollDetail } from "@/components/polls/poll-detail";

type PollDetailPageProps = {
  params: { id: string };
};

export default async function PollDetailPage({ params }: PollDetailPageProps) {
  const { id } = params;
  const { poll, error } = await getPollById(id);

  if (error || !poll) {
    notFound();
  }

  return <PollDetail poll={poll} />;
}
