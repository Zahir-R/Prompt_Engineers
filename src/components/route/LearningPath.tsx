"use client";

import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Play,
  Route,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppProvider";
import { DEFAULT_PATH_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LearningPath() {
  const { exercises, getExercise, progress, ready } = useApp();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-bold text-slate-600">Cargando la ruta...</p>
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
      <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-blue-100">
          <Route className="size-4" aria-hidden="true" />
          Ruta por defecto
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          Tu camino de nivelación
        </h1>
        <p className="mt-2 max-w-2xl font-semibold text-blue-100">
          Avanza con retos cortos. Cada ejercicio incluye un Modo Desglose para
          entender el procedimiento sin miedo a equivocarte.
        </p>
      </div>

      <ol className="mt-6 space-y-3">
        {defaultPath.map((exercise, index) => {
          const entry = progress[exercise.id];
          const solved = entry?.solved ?? false;
          const attempts = entry?.attempts ?? 0;

          return (
            <li
              key={exercise.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-black",
                  solved
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-100 text-blue-700",
                )}
              >
                {solved ? (
                  <CircleCheck className="size-6" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                    {exercise.categoria}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {exercise.nivel.replaceAll("_", " ")}
                  </span>
                </div>
                <h2 className="mt-1 truncate font-display text-xl font-semibold text-slate-900">
                  {exercise.titulo}
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  {solved
                    ? "Completado"
                    : attempts > 0
                      ? `En práctica · ${attempts} intento${attempts === 1 ? "" : "s"}`
                      : "Pendiente"}
                </p>
              </div>

              <Link
                href={`/ejercicio/${exercise.id}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-blue-700"
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
        <section className="mt-8">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-slate-900">
            <Sparkles className="size-5 text-amber-500" aria-hidden="true" />
            Ejercicios extra
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {extraExercises.map((exercise) => (
              <Link
                key={exercise.id}
                href={`/ejercicio/${exercise.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-wide text-amber-600">
                  {exercise.categoria}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-slate-900">
                  {exercise.titulo}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {exercise.enunciado}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
