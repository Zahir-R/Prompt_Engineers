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
      <div className="rounded-3xl bg-white p-6 text-center">
        <p className="font-bold text-slate-700">
          Este ejercicio todavía no tiene pasos de desglose.
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-bold text-white"
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
          ? "max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6"
          : "rounded-3xl border border-slate-200 bg-white p-4 shadow-sm",
      )}
      aria-label={`Modo desglose de ${exercise.titulo}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-blue-600">
            <Lightbulb className="size-4" aria-hidden="true" />
            {mode === "preview" ? "Vista previa del desglose" : "Modo Desglose"}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight text-slate-900">
            {exercise.titulo}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Paso {index + 1} de {steps.length}
          </p>
        </div>

        {mode === "modal" && onClose && (
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
        className={cn("mt-5 rounded-2xl border p-4 sm:p-5", meta.panel)}
        aria-live="polite"
      >
        <StepColorBadge color={step.color_tag} paso={step.paso} />
        <h3 className="mt-3 font-display text-xl font-semibold text-slate-900">
          {step.titulo}
        </h3>
        <p className="mt-2 text-base font-semibold leading-relaxed text-slate-700">
          {step.explicacion}
        </p>
        <OperationHighlight text={step.operacion_destacada} />
        <StepVisualizer visual={step.visual_state} />

        {typeof step.resultado_final === "number" && (
          <div className="mt-4 rounded-2xl bg-white/80 p-4 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-purple-600">
              Resultado final
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
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Anterior
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={isLast && mode === "preview"}
          className={cn(
            "flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-black text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60",
            isLast ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700",
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
    </section>
  );
}
