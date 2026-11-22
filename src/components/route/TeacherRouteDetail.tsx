"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CircleCheck,
  Play,
  Route as RouteIcon,
} from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { useApp } from "@/context/AppProvider";
import { getRouteProgress } from "@/lib/teacherRoutes";
import { ROADMAP_LEVELS } from "@/data/roadmap";

export function TeacherRouteDetail({ routeId }: { routeId: string }) {
  const { ready, activeProfile, getTeacherRoute, getExercise, progress } =
    useApp();
  const route = getTeacherRoute(routeId);

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo la ruta...
        </p>
      </div>
    );
  }

  if (
    !route ||
    (route.status !== "published" && activeProfile?.role !== "teacher")
  ) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Mascot className="mx-auto size-40" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          Esta ruta no está disponible
        </h1>
        <p className="mt-2 font-semibold text-ink-soft">
          Puede que todavía sea un borrador o que ya no esté publicada.
        </p>
        <Link
          href="/hoja-de-ruta"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 font-black text-ink shadow-hard"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a mi ruta
        </Link>
      </div>
    );
  }

  const exercises = route.exerciseIds.flatMap((id) => {
    const exercise = getExercise(id);
    return exercise ? [exercise] : [];
  });
  const routeProgress = getRouteProgress(route, progress);
  const nextExercise = exercises.find(
    (exercise) => !progress[exercise.id]?.solved,
  );
  const level = ROADMAP_LEVELS.find((item) => item.id === route.levelId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/hoja-de-ruta"
        className="inline-flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-2 text-sm font-black text-ink-soft hover:border-ink hover:bg-paper hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver a mi ruta
      </Link>

      <section className="mt-3 grid gap-6 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-paper-deep/60 p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Sticker tone="teal">
              <RouteIcon className="size-3.5" aria-hidden="true" />
              Ruta de mi clase
            </Sticker>
            <span className="rounded-full border-2 border-ink/20 bg-paper px-2 py-1 text-xs font-black text-ink-soft">
              {route.levelId} · {level?.title ?? "Nivel"}
            </span>
            {route.status === "draft" && (
              <span className="rounded-full border-2 border-mustard bg-[#fbe7b8] px-2 py-1 text-xs font-black text-ink">
                Borrador
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">
            {route.title}
          </h1>
          <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-ink-soft">
            {route.description || "Una ruta preparada para acompañar el avance de la clase."}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-black text-ink shadow-hard">
              {routeProgress.solved} de {routeProgress.total} actividades
            </span>
            {nextExercise && (
              <Link
                href={`/ejercicio/${nextExercise.id}?ruta=${route.id}`}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral-deep px-4 py-2.5 text-sm font-black text-paper shadow-hard"
              >
                <Play className="size-4" aria-hidden="true" />
                Continuar
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
        <Mascot className="mx-auto size-36" />
      </section>

      <div className="mt-5 h-3 overflow-hidden rounded-full border-2 border-ink bg-paper">
        <div className="h-full bg-teal" style={{ width: `${routeProgress.percent}%` }} />
      </div>

      <ol className="mt-6 space-y-3">
        {exercises.map((exercise, index) => {
          const solved = progress[exercise.id]?.solved ?? false;
          return (
            <li key={exercise.id}>
              <PaperCard className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-lg font-black text-ink">
                    {solved ? (
                      <CircleCheck className="size-6 text-teal" aria-hidden="true" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-wide text-ink-soft">
                      {exercise.categoria}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                      {exercise.titulo}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink-soft">
                      {exercise.enunciado}
                    </p>
                  </div>
                  <Link
                    href={`/ejercicio/${exercise.id}?ruta=${route.id}`}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 text-sm font-black text-ink shadow-hard"
                  >
                    <BookOpen className="size-4" aria-hidden="true" />
                    {solved ? "Repasar" : "Abrir"}
                  </Link>
                </div>
              </PaperCard>
            </li>
          );
        })}
      </ol>

      {exercises.length === 0 && (
        <PaperCard className="mt-6 p-8 text-center">
          <p className="font-display text-2xl text-ink">
            Esta ruta todavía no tiene actividades.
          </p>
        </PaperCard>
      )}
    </div>
  );
}
