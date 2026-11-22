"use client";

import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Lightbulb,
  Sparkles,
  Star,
} from "lucide-react";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { StarDoodle } from "@/components/brand/Doodle";
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
    <div className="relative">
      <div className="tape -top-3 left-10" aria-hidden="true" />
      <PaperCard strong className="relative p-5 pt-7 sm:p-7">
        <StarDoodle className="absolute -right-3 -top-4 rotate-12 text-mustard" />

        <div className="flex flex-wrap items-center gap-2">
          <Sticker tone="coral">{exercise.categoria}</Sticker>
          <Sticker tone="paper">
            {exercise.nivel.replaceAll("_", " ")}
          </Sticker>
          {solved && (
            <Sticker tone="teal">
              <CircleCheck className="size-3.5" aria-hidden="true" />
              Completado
            </Sticker>
          )}
        </div>

        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {exercise.titulo}
        </h1>
        <p className="mt-3 text-lg font-semibold leading-relaxed text-ink-soft">
          {exercise.enunciado}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-[0.8rem_1rem_0.7rem_1.1rem] border-2 border-ink bg-[#d6e6f5] px-4 py-2 font-mono text-xl font-black text-ink shadow-hard">
            {exercise.datos.num1}
          </span>
          <span className="rounded-full border-2 border-ink bg-mustard px-4 py-2 font-mono text-xl font-black text-ink shadow-hard">
            {exercise.datos.operacion}
          </span>
          <span className="rounded-[1rem_0.7rem_1.1rem_0.8rem] border-2 border-ink bg-[#d6e6f5] px-4 py-2 font-mono text-xl font-black text-ink shadow-hard">
            {exercise.datos.num2}
          </span>
        </div>

        <form
          className="mt-7"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <label
            htmlFor="respuesta"
            className="font-hand text-2xl font-bold text-ink"
          >
            Mi respuesta es...
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
              placeholder="escribe el número"
              className="h-14 flex-1 rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-paper-deep/40 px-4 text-xl font-black text-ink placeholder:font-hand placeholder:text-lg placeholder:font-bold placeholder:text-ink-soft/70 focus:border-sky focus:bg-paper focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-14 items-center justify-center gap-2 rounded-[1rem_0.7rem_1.2rem_0.8rem] border-2 border-ink bg-coral-deep px-6 text-lg font-black text-paper shadow-hard transition-transform hover:-rotate-1"
            >
              Comprobar
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </form>

        {feedback.type !== "idle" && (
          <div
            className={cn(
              "mt-5 rounded-[0.8rem_1.3rem_0.9rem_1.1rem] border-2 p-4 text-base font-bold",
              feedback.type === "correct"
                ? "border-teal bg-[#cce9e3] text-ink"
                : "border-mustard bg-[#fbe7b8] text-ink",
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
            className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-teal px-4 py-2.5 text-sm font-black text-paper shadow-hard"
          >
            <Star className="size-4" aria-hidden="true" />
            Volver a la ruta
          </Link>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t-2 border-dashed border-ink/25 pt-4">
          <button
            type="button"
            onClick={onOpenAnatomy}
            className="flex items-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-[#fbe7b8] px-4 py-2.5 text-sm font-black text-ink shadow-hard transition-transform hover:rotate-1"
          >
            <Lightbulb className="size-4" aria-hidden="true" />
            Ver Modo Desglose
          </button>
          <span className="font-hand text-xl font-bold text-ink-soft">
            intentos: {attempts}
          </span>
          {attempts >= 2 && !solved && (
            <span className="flex items-center gap-1 font-hand text-lg font-bold text-coral-deep">
              <Sparkles className="size-4" aria-hidden="true" />
              el desglose se abre solito después de 2 intentos
            </span>
          )}
        </div>
      </PaperCard>
    </div>
  );
}
