"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  X,
} from "lucide-react";
import { OperationHighlight } from "@/components/anatomy/OperationHighlight";
import { ProgressDots } from "@/components/anatomy/ProgressDots";
import { StepColorBadge } from "@/components/anatomy/StepColorBadge";
import { StepVisualizer } from "@/components/anatomy/StepVisualizer";
import { Sticker } from "@/components/brand/Sticker";
import { clampStepIndex, getOrderedSteps, getStepMeta } from "@/lib/desglose";
import type { Exercise } from "@/types/exercise";
import { cn } from "@/lib/utils";

interface AnatomyPanelProps {
  exercise: Exercise;
  mode?: "modal" | "preview";
  initialStep?: number;
  onClose?: () => void;
  onFinish?: () => void;
}

export function AnatomyPanel({
  exercise,
  mode = "modal",
  initialStep = 0,
  onClose,
  onFinish,
}: AnatomyPanelProps) {
  const steps = getOrderedSteps(exercise);
  const [rawIndex, setIndex] = useState(initialStep);
  const index = clampStepIndex(rawIndex, steps.length);
  const step = steps[index];
  const meta = getStepMeta(step?.color_tag);
  const isLast = index === steps.length - 1;

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

  const goNext = () => {
    if (isLast) {
      if (mode === "preview") return;
      onFinish?.();
      onClose?.();
      return;
    }
    setIndex(index + 1);
  };

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
            {mode === "preview" ? "así se verá el desglose" : "mi cuaderno de pistas"}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight text-ink">
            {exercise.titulo}
          </h2>
          <p className="mt-1 font-hand text-lg font-bold text-ink-soft">
            paso {index + 1} de {steps.length}
          </p>
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

      <div className="mt-4">
        <ProgressDots steps={steps} current={index} onSelect={setIndex} />
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
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
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
              puedes volver a este paso cuando quieras
            </span>
          </Sticker>
        </div>
      )}
    </section>
  );
}
