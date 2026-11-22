"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CircleCheck,
  MessageCircle,
  Play,
  Star,
} from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { useApp } from "@/context/AppProvider";
import { getUnitProgress } from "@/lib/demo";

export function UnitDetail({ unitId }: { unitId: string }) {
  const { ready, getUnit, getExercise, progress, club, activeProfile } = useApp();
  const unit = getUnit(unitId);

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo el capítulo...
        </p>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Mascot className="mx-auto size-40" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          No encontramos ese capítulo
        </h1>
        <Link
          href="/unidades"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 font-black text-ink shadow-hard"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a unidades
        </Link>
      </div>
    );
  }

  const unitProgress = getUnitProgress(unit, progress);
  const exercises = unit.exerciseIds.flatMap((exerciseId) => {
    const exercise = getExercise(exerciseId);
    return exercise ? [exercise] : [];
  });
  const nextExercise = exercises.find(
    (exercise) => !progress[exercise.id]?.solved,
  );
  const threadCount = club.threads.filter(
    (thread) => thread.unitId === unit.id && !thread.hidden,
  ).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/unidades"
        className="inline-flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-2 text-sm font-black text-ink-soft hover:border-ink hover:bg-paper hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver a unidades
      </Link>

      <section className="mt-3 grid gap-6 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-paper-deep/60 p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <Sticker tone={unit.accent}>
            <BookOpen className="size-3.5" aria-hidden="true" />
            {unit.levelId === "N0" ? "Primer paso" : `Capítulo ${unit.order}`}
          </Sticker>
          <Link
            href="/hoja-de-ruta"
            className="ml-2 inline-flex rounded-lg border-2 border-ink/20 bg-paper px-2 py-1 text-xs font-black text-ink-soft hover:text-ink"
          >
            Ruta {unit.levelId}
          </Link>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">
            {unit.title}
          </h1>
          <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-ink-soft">
            {unit.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-black text-ink shadow-hard">
              {unitProgress.solved} de {unitProgress.total} hojas
            </span>
            {unitProgress.complete && (
              <span className="flex items-center gap-1 font-hand text-lg font-bold text-teal">
                <CircleCheck className="size-5" aria-hidden="true" />
                capítulo completado
              </span>
            )}
          </div>
        </div>
        <div className="relative mx-auto">
          <Mascot className="size-36" />
          <Star className="absolute -right-3 top-0 size-7 rotate-12 text-mustard" aria-hidden="true" />
        </div>
      </section>

      <div className="mt-5 h-3 overflow-hidden rounded-full border-2 border-ink bg-paper">
        <div
          className="h-full bg-teal transition-all"
          style={{ width: `${unitProgress.percent}%` }}
        />
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_0.38fr]">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Hojas de este capítulo
          </h2>
          <ol className="mt-3 space-y-3">
            {exercises.map((exercise, index) => {
              const entry = progress[exercise.id];
              const solved = entry?.solved ?? false;

              return (
                <li key={exercise.id}>
                  <PaperCard className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-xl font-black text-ink shadow-hard">
                        {solved ? (
                          <CircleCheck className="size-6 text-teal" aria-hidden="true" />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-black uppercase tracking-wide text-ink-soft">
                          {exercise.categoria} · {exercise.nivel.replaceAll("_", " ")}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                          {exercise.titulo}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink-soft">
                          {exercise.enunciado}
                        </p>
                      </div>
                      <Link
                        href={`/ejercicio/${exercise.id}`}
                        className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 text-sm font-black text-ink shadow-hard"
                      >
                        <Play className="size-4" aria-hidden="true" />
                        {solved ? "Repasar" : entry ? "Continuar" : "Abrir"}
                      </Link>
                    </div>
                  </PaperCard>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className="space-y-4">
          {nextExercise && (
            <PaperCard className="-rotate-1 p-5">
              <p className="font-hand text-xl font-bold text-ink-soft">
                siguiente hoja
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-ink">
                {nextExercise.titulo}
              </p>
              <Link
                href={`/ejercicio/${nextExercise.id}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral-deep px-4 py-2.5 text-sm font-black text-paper shadow-hard"
              >
                Continuar
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </PaperCard>
          )}

          <div className="paper-note rotate-1 p-5">
            <div className="tape -top-3 right-8" aria-hidden="true" />
            <p className="flex items-center gap-2 font-hand text-xl font-bold text-ink">
              <MessageCircle className="size-5 text-coral-deep" aria-hidden="true" />
              La Fogata de este capítulo
            </p>
            <p className="mt-1 text-sm font-semibold text-ink-soft">
              {threadCount > 0
                ? `${threadCount} conversación${threadCount === 1 ? "" : "es"} abierta${threadCount === 1 ? "" : "s"}.`
                : "Todavía no hay dudas. Puedes ser quien abra la primera."}
            </p>
            <Link
              href={`/club?unidad=${unit.id}`}
              className="mt-3 inline-flex items-center gap-1 font-black text-coral-deep underline decoration-2 underline-offset-4"
            >
              Ir a La Fogata
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {!activeProfile && (
            <div className="rounded-2xl border-2 border-ink bg-[#cce9e3] p-4 shadow-hard">
              <p className="text-sm font-bold text-ink">
                ¿Quieres guardar tu racha? Elige un alias cuando termines esta
                hoja.
              </p>
              <Link
                href="/entrar"
                className="mt-2 inline-flex text-sm font-black text-teal underline decoration-2 underline-offset-4"
              >
                Elegir alias
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
