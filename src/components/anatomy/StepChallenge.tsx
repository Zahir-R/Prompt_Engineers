"use client";

import { useState, type ReactNode } from "react";
import { Check, Lightbulb, Star } from "lucide-react";
import { SparkBurst } from "@/components/anatomy/SparkBurst";
import { Sticker } from "@/components/brand/Sticker";
import type { StepChallenge as StepChallengeData } from "@/types/exercise";
import { cn } from "@/lib/utils";

interface StepChallengeProps {
  challenge: StepChallengeData;
  solved: boolean;
  onSolved: (correct: boolean) => void;
  children: ReactNode;
}

export function StepChallenge({
  challenge,
  solved,
  onSolved,
  children,
}: StepChallengeProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const correct = selected === challenge.correcta;

  if (solved && !answered) {
    return (
      <div>
        <Sticker tone="teal" className="mb-3">
          <Check className="size-3.5" aria-hidden="true" />
          Reto superado
        </Sticker>
        {children}
      </div>
    );
  }

  if (!answered) {
    return (
      <div>
        <div className="rounded-xl border-2 border-dashed border-ink/30 bg-paper/70 p-3">
          <p className="flex items-center gap-2 text-sm font-black text-ink">
            <Lightbulb className="size-4 text-coral-deep" aria-hidden="true" />
            {challenge.pregunta}
          </p>
          <div className="mt-3 grid gap-2">
            {challenge.opciones.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelected(index);
                  setAnswered(true);
                  onSolved(index === challenge.correcta);
                }}
                className="rounded-xl border-2 border-ink bg-paper px-3 py-2 text-left text-sm font-bold text-ink shadow-hard transition-transform hover:-rotate-1"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className={cn(
          "relative rounded-xl border-2 p-3",
          correct
            ? "border-teal bg-[#cce9e3]"
            : "border-mustard bg-[#fbe7b8]",
        )}
        role="status"
        aria-live="polite"
      >
        {correct && <SparkBurst />}
        <p className="flex items-center gap-2 text-sm font-black text-ink">
          {correct ? (
            <>
              <Star className="size-4 text-coral-deep" aria-hidden="true" />
              ¡Chispa! +1
            </>
          ) : (
            <>
              <Lightbulb className="size-4 text-coral-deep" aria-hidden="true" />
              Casi. Mira esta pista: {challenge.pista}
            </>
          )}
        </p>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
