import { Sparkles } from "lucide-react";
import { SparkBurst } from "@/components/anatomy/SparkBurst";

interface CompletionStampProps {
  sparksGained: number;
  alreadyCompleted: boolean;
}

export function CompletionStamp({
  sparksGained,
  alreadyCompleted,
}: CompletionStampProps) {
  return (
    <div className="relative mt-2 text-center">
      <SparkBurst />
      <div className="stamp-in mx-auto inline-flex flex-col items-center rounded-[1.2rem_0.7rem_1.4rem_0.9rem] border-4 border-teal bg-[#cce9e3] px-6 py-4 shadow-hard">
        <Sparkles className="size-7 text-teal" aria-hidden="true" />
        <p className="mt-1 font-display text-2xl font-black text-ink">
          Sello de detective
        </p>
        <p className="font-hand text-lg font-bold text-ink-soft">
          {alreadyCompleted
            ? "ya tenías este sello"
            : `+${sparksGained} chispas`}
        </p>
      </div>
    </div>
  );
}
