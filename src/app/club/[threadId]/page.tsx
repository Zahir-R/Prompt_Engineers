import { Suspense } from "react";
import { ThreadDetail } from "@/components/club/ThreadDetail";
import { createSeedClub } from "@/data/demo";

export function generateStaticParams() {
  return createSeedClub().threads.map((thread) => ({ threadId: thread.id }));
}

export default function ThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="font-hand text-2xl font-bold text-ink-soft">
            Abriendo la conversación...
          </p>
        </div>
      }
    >
      {params.then(({ threadId }) => (
        <ThreadDetail threadId={threadId} />
      ))}
    </Suspense>
  );
}
