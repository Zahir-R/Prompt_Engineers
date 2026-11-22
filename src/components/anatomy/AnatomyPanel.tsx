"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { CompletionStamp } from "@/components/anatomy/CompletionStamp";
import { OperationHighlight } from "@/components/anatomy/OperationHighlight";
import { ProgressDots } from "@/components/anatomy/ProgressDots";
import { StepChallenge } from "@/components/anatomy/StepChallenge";
import { StepColorBadge } from "@/components/anatomy/StepColorBadge";
import { StepVisualizer } from "@/components/anatomy/StepVisualizer";
import { Mascot } from "@/components/brand/Mascot";
import { Sticker } from "@/components/brand/Sticker";
import { useApp } from "@/context/AppProvider";
import { clampStepIndex, getOrderedSteps, getStepMeta } from "@/lib/desglose";
import type { Exercise } from "@/types/exercise";
import { cn } from "@/lib/utils";

interface AnatomyPanelProps {
  exercise: Exercise;
  mode?: "modal" | "preview";
  source?: "auto" | "manual";
  initialStep?: number;
  onClose?: () => void;
  onFinish?: () => void;
}

export function AnatomyPanel({
  exercise,
  mode = "modal",
  source = "manual",
  initialStep = 0,
  onClose,
  onFinish,
}: AnatomyPanelProps) {
  const {
    getAnatomyProgress,
    recordAnatomyStep,
    completeAnatomy,
    sparks,
  } = useApp();
  const steps = getOrderedSteps(exercise);
  const [rawIndex, setIndex] = useState(initialStep);
  const [finished, setFinished] = useState(false);
  const [completion, setCompletion] = useState<{
    sparksGained: number;
    alreadyCompleted: boolean;
  } | null>(null);
  const index = clampStepIndex(rawIndex, steps.length);
  const step = steps[index];
  const meta = getStepMeta(step?.color_tag);
  const isLast = index === steps.length - 1;
  const entry = mode === "modal" ? getAnatomyProgress(exercise.id) : undefined;

  if (!step) {
    return (
      <div className="paper-card-strong p-6 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Este ejercicio todavía no tiene pasos de desglose.
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 rounded-xl border-2 border-ink bg-mustard px-4 py-2 font-black text-ink shadow-hard"
          >
            Volver al reto
          </button>
        )}
      </div>
    );
  }

  const visit = (nextIndex: number) => {
    const nextStep = steps[nextIndex];
    if (mode === "modal" && nextStep) {
      recordAnatomyStep(exercise.id, nextStep.paso, false);
    }
    setIndex(nextIndex);
  };

  const finish = () => {
    if (mode === "preview") return;
    const reward = completeAnatomy(exercise.id);
    setCompletion(reward);
    setFinished(true);
  };

  const goNext = () => {
    if (isLast) {
      finish();
      return;
    }
    visit(index + 1);
  };

  const stepContent = (
    <>
      <p className="mt-2 text-base font-semibold leading-relaxed text-ink">
        {step.explicacion}
      </p>
      <OperationHighlight text={step.operacion_destacada} />
      <StepVisualizer visual={step.visual_state} />

      {typeof step.resultado_final === "number" && (
        <div className="mt-4 rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-paper p-4 text-center shadow-hard">
          <p className="font-hand text-xl font-bold text-purple-700">
            respuesta final
          </p>
          <p className="font-display text-4xl font-black text-purple-700">
            {step.resultado_final}
          </p>
        </div>
      )}
    </>
  );

  if (finished) {
    return (
      <section
        className={cn(
          "w-full",
          mode === "modal"
            ? "max-h-[90vh] overflow-y-auto rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-paper p-5 shadow-hard-lg sm:p-6"
            : "rounded-[1.2rem_0.8rem_1.4rem_0.9rem] border-2 border-ink bg-paper p-4 shadow-hard",
        )}
        aria-label={`Modo desglose completado de ${exercise.titulo}`}
      >
        <div className="text-center">
          <Mascot className="mx-auto size-28" />
          <p className="mt-1 font-hand text-2xl font-bold text-coral-deep">
            ¡Misión cumplida!
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-ink">
            Ya sabes el camino
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm font-semibold text-ink-soft">
            Ahora vuelve al reto y prueba tú. Si resuelves después de usar el
            desglose, ganas un bonus de detective.
          </p>
          <CompletionStamp
            sparksGained={completion?.sparksGained ?? 0}
            alreadyCompleted={completion?.alreadyCompleted ?? false}
          />
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              onFinish?.();
              onClose?.();
            }}
            className="rounded-[1rem_0.7rem_1.2rem_0.8rem] border-2 border-ink bg-coral-deep px-5 py-3 text-sm font-black text-paper shadow-hard"
          >
            Ahora inténtalo tú
          </button>
          <button
            type="button"
            onClick={() => setFinished(false)}
            className="rounded-[0.8rem_1.1rem_0.7rem_1rem] border-2 border-ink bg-paper px-4 py-3 text-sm font-black text-ink shadow-hard"
          >
            Repasar pasos
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "w-full",
        mode === "modal"
          ? "max-h-[90vh] overflow-y-auto rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-paper p-5 shadow-hard-lg sm:p-6"
          : "rounded-[1.2rem_0.8rem_1.4rem_0.9rem] border-2 border-ink bg-paper p-4 shadow-hard",
      )}
      aria-label={`Modo desglose de ${exercise.titulo}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 font-hand text-xl font-bold text-coral-deep">
            <Lightbulb className="size-5" aria-hidden="true" />
            {mode === "preview"
              ? "así se verá el desglose"
              : "mi cuaderno de pistas"}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight text-ink">
            {exercise.titulo}
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <p className="font-hand text-lg font-bold text-ink-soft">
              paso {index + 1} de {steps.length}
            </p>
            {mode === "modal" && (
              <span className="flex items-center gap-1 rounded-full border-2 border-ink/20 bg-[#fbe7b8] px-2 py-0.5 text-xs font-black text-ink">
                <Star className="size-3.5 text-coral-deep" aria-hidden="true" />
                {sparks} chispas
              </span>
            )}
          </div>
        </div>

        {mode === "modal" && onClose && (
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="rounded-xl border-2 border-ink bg-paper p-2 text-ink shadow-hard transition-transform hover:rotate-6"
            aria-label="Cerrar Modo Desglose"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {mode === "modal" && source === "auto" && (
        <div className="mt-4 flex items-start gap-3 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-[#fbe7b8] p-3">
          <Mascot className="size-12 shrink-0" />
          <p className="text-sm font-bold leading-relaxed text-ink">
            Tinta encontró una pista. No es un castigo: es una misión para
            descubrir el primer paso.
          </p>
        </div>
      )}

      <div className="mt-4">
        <ProgressDots steps={steps} current={index} onSelect={visit} />
      </div>

      <div
        key={step.paso}
        className={cn(
          "mt-5 rounded-[1rem_1.3rem_0.9rem_1.2rem] border-2 border-ink p-4 shadow-hard sm:p-5",
          meta.panel,
        )}
        aria-live="polite"
      >
        <StepColorBadge color={step.color_tag} paso={step.paso} />
        <h3 className="mt-3 font-display text-xl font-semibold text-ink">
          {step.titulo}
        </h3>

        {step.reto ? (
          <div className="mt-2">
            <StepChallenge
              key={step.paso}
              challenge={step.reto}
              solved={
                mode === "modal"
                  ? entry?.steps[String(step.paso)]?.challengeSolved ?? false
                  : false
              }
              onSolved={(correct) => {
                if (mode === "modal") {
                  recordAnatomyStep(exercise.id, step.paso, correct);
                }
              }}
            >
              {stepContent}
            </StepChallenge>
          </div>
        ) : (
          stepContent
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => visit(index - 1)}
          disabled={index === 0}
          className="flex items-center gap-1.5 rounded-[0.8rem_1.1rem_0.7rem_1rem] border-2 border-ink bg-paper px-4 py-2.5 text-sm font-black text-ink shadow-hard transition-transform hover:-rotate-1 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Anterior
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={isLast && mode === "preview"}
          className={cn(
            "flex items-center gap-1.5 rounded-[1rem_0.7rem_1.2rem_0.8rem] border-2 border-ink px-4 py-2.5 text-sm font-black shadow-hard transition-transform disabled:cursor-not-allowed disabled:opacity-60",
            isLast
              ? "bg-teal text-paper hover:rotate-1"
              : "bg-coral-deep text-paper hover:rotate-1",
          )}
        >
          {isLast ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              {mode === "modal" ? "Terminar" : "Fin de la vista previa"}
            </>
          ) : (
            <>
              Siguiente
              <ChevronRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {mode === "modal" && (
        <div className="mt-4 text-center">
          <Sticker tone="paper" className="rotate-0 normal-case tracking-normal">
            <span className="font-hand text-base font-bold">
              <Sparkles className="mr-1 inline size-3.5 text-mustard" aria-hidden="true" />
              puedes volver a este paso cuando quieras
            </span>
          </Sticker>
        </div>
      )}
    </section>
  );
}
