"use client";

import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Play,
  Route,
  Sparkles,
} from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { StarDoodle, SquiggleDoodle } from "@/components/brand/Doodle";
import { useApp } from "@/context/AppProvider";
import { DEFAULT_PATH_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LearningPath() {
  const { exercises, getExercise, progress, ready } = useApp();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo el cuaderno...
        </p>
      </div>
    );
  }

  const defaultPath = DEFAULT_PATH_IDS.flatMap((id) => {
    const exercise = getExercise(id);
    return exercise ? [exercise] : [];
  });
  const extraExercises = exercises.filter(
    (exercise) =>
      !DEFAULT_PATH_IDS.includes(
        exercise.id as (typeof DEFAULT_PATH_IDS)[number],
      ),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="relative grid gap-6 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-paper-deep/60 p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <Sticker tone="teal">
            <Route className="size-3.5" aria-hidden="true" />
            Ruta por defecto
          </Sticker>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">
            Tu camino de
            <span className="relative ml-2 inline-block">
              aventuras
              <SquiggleDoodle className="absolute -bottom-2 left-0 w-full text-mustard" />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-ink-soft">
            Avanza casilla por casilla. Cada reto es corto y siempre puedes abrir
            el Modo Desglose para entender el procedimiento.
          </p>
        </div>
        <div className="relative mx-auto">
          <Mascot className="size-40" label="Tinta te acompaña en la ruta" />
          <StarDoodle className="absolute -right-4 top-0 rotate-12 text-mustard" />
        </div>
      </section>

      <ol className="relative mt-8 space-y-4">
        <div
          className="absolute bottom-8 left-[2.35rem] top-8 hidden w-1 border-l-4 border-dashed border-ink/25 sm:block"
          aria-hidden="true"
        />
        {defaultPath.map((exercise, index) => {
          const entry = progress[exercise.id];
          const solved = entry?.solved ?? false;
          const attempts = entry?.attempts ?? 0;
          const rotate = index % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1";

          return (
            <li
              key={exercise.id}
              className={cn(
                "relative grid gap-4 sm:grid-cols-[5rem_1fr_auto] sm:items-center",
                rotate,
              )}
            >
              <div className="relative z-10 flex size-16 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-2xl font-black text-ink shadow-hard">
                {solved ? (
                  <CircleCheck className="size-8 text-teal" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </div>

              <PaperCard className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Sticker tone={solved ? "teal" : "paper"}>
                    {exercise.categoria}
                  </Sticker>
                  <span className="text-xs font-black uppercase tracking-wide text-ink-soft">
                    {exercise.nivel.replaceAll("_", " ")}
                  </span>
                  {solved && (
                    <span className="font-hand text-lg font-bold text-teal">
                      ¡completado!
                    </span>
                  )}
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">
                  {exercise.titulo}
                </h2>
                <p className="mt-1 text-sm font-semibold text-ink-soft">
                  {solved
                    ? "Puedes repasarlo cuando quieras."
                    : attempts > 0
                      ? `En práctica · ${attempts} intento${attempts === 1 ? "" : "s"}`
                      : "Pendiente · todavía no lo intentaste."}
                </p>
              </PaperCard>

              <Link
                href={`/ejercicio/${exercise.id}`}
                className="flex items-center justify-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-mustard px-4 py-3 text-sm font-black text-ink shadow-hard transition-transform hover:-rotate-1"
              >
                <Play className="size-4" aria-hidden="true" />
                {solved ? "Repasar" : attempts > 0 ? "Continuar" : "Empezar"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ol>

      {extraExercises.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
            <Sparkles className="size-5 text-coral-deep" aria-hidden="true" />
            Hojas extra
          </h2>
          <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
            creadas por docentes o agregadas al cuaderno
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {extraExercises.map((exercise, index) => (
              <Link
                key={exercise.id}
                href={`/ejercicio/${exercise.id}`}
                className={index % 2 === 0 ? "rotate-1" : "-rotate-1"}
              >
                <PaperCard className="h-full p-5 transition-transform hover:-translate-y-1">
                  <Sticker tone="plum">{exercise.categoria}</Sticker>
                  <p className="mt-3 font-display text-xl font-semibold text-ink">
                    {exercise.titulo}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink-soft">
                    {exercise.enunciado}
                  </p>
                </PaperCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
