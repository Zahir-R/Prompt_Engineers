"use client";

import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Lightbulb,
  Sparkles,
  Star,
} from "lucide-react";
import type { Exercise } from "@/types/exercise";
import { cn } from "@/lib/utils";

export interface Feedback {
  type: "idle" | "correct" | "wrong";
  message: string;
}

interface MathProblemViewProps {
  exercise: Exercise;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  feedback: Feedback;
  attempts: number;
  solved: boolean;
  onOpenAnatomy: () => void;
}

export function MathProblemView({
  exercise,
  value,
  onChange,
  onSubmit,
  feedback,
  attempts,
  solved,
  onOpenAnatomy,
}: MathProblemViewProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">
          {exercise.categoria}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {exercise.nivel.replaceAll("_", " ")}
        </span>
        {solved && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
            <CircleCheck className="size-3.5" aria-hidden="true" />
            Completado
          </span>
        )}
      </div>

      <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-slate-900">
        {exercise.titulo}
      </h1>
      <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-700">
        {exercise.enunciado}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-2xl bg-blue-50 px-4 py-2 font-mono text-lg font-black text-blue-800">
          {exercise.datos.num1}
        </span>
        <span className="rounded-2xl bg-orange-50 px-4 py-2 font-mono text-lg font-black text-orange-700">
          {exercise.datos.operacion}
        </span>
        <span className="rounded-2xl bg-blue-50 px-4 py-2 font-mono text-lg font-black text-blue-800">
          {exercise.datos.num2}
        </span>
      </div>

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label
          htmlFor="respuesta"
          className="block text-sm font-black uppercase tracking-wide text-slate-600"
        >
          Tu respuesta
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="respuesta"
            name="respuesta"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Escribe el resultado"
            className="h-14 flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 text-xl font-black text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-lg font-black text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Comprobar
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </form>

      {feedback.type !== "idle" && (
        <div
          className={cn(
            "mt-4 rounded-2xl border-2 p-4 text-base font-bold",
            feedback.type === "correct"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-amber-200 bg-amber-50 text-amber-900",
          )}
          role="status"
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}

      {solved && (
        <Link
          href="/ruta"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-emerald-700"
        >
          <Star className="size-4" aria-hidden="true" />
          Volver a la ruta
        </Link>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={onOpenAnatomy}
          className="flex items-center gap-2 rounded-xl bg-amber-100 px-4 py-2.5 text-sm font-black text-amber-900 transition-colors hover:bg-amber-200"
        >
          <Lightbulb className="size-4" aria-hidden="true" />
          Ver Modo Desglose
        </button>
        <span className="text-sm font-semibold text-slate-500">
          Intentos: {attempts}
        </span>
        {attempts >= 2 && !solved && (
          <span className="flex items-center gap-1 text-sm font-bold text-amber-700">
            <Sparkles className="size-4" aria-hidden="true" />
            El desglose se abre solo después de 2 intentos.
          </span>
        )}
      </div>
    </section>
  );
}
