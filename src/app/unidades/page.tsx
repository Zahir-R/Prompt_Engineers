"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Flame,
  LogIn,
  Star,
} from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { StarDoodle, SquiggleDoodle } from "@/components/brand/Doodle";
import { useApp } from "@/context/AppProvider";
import { getUnitProgress } from "@/lib/demo";

export default function UnidadesPage() {
  const { ready, activeProfile, progress, units, exercises, getExercise } =
    useApp();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo los capítulos...
        </p>
      </div>
    );
  }

  const extraExercises = exercises.filter(
    (exercise) =>
      !units.some((unit) => unit.exerciseIds.includes(exercise.id)),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="relative grid gap-6 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-paper-deep/60 p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <Sticker tone="teal">
            <BookOpen className="size-3.5" aria-hidden="true" />
            Libres para explorar
          </Sticker>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">
            Capítulos del
            <span className="relative ml-2 inline-block">
              cuaderno
              <SquiggleDoodle className="absolute -bottom-2 left-0 w-full text-mustard" />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-ink-soft">
            Todos los capítulos están abiertos. Puedes practicar sin cuenta; si
            eliges un alias, guardas racha, XP y participas en La Fogata.
          </p>
          {!activeProfile && (
            <Link
              href="/entrar"
              className="mt-5 inline-flex items-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-[#cce9e3] px-4 py-2.5 text-sm font-black text-ink shadow-hard"
            >
              <LogIn className="size-4" aria-hidden="true" />
              Elegir mi alias
            </Link>
          )}
        </div>
        <div className="relative mx-auto">
          <Mascot className="size-40" />
          <StarDoodle className="absolute -right-3 top-1 rotate-12 text-mustard" />
        </div>
      </section>

      {activeProfile && activeProfile.role === "student" && (
        <div className="mt-5 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl border-2 border-ink bg-[#fbe7b8] px-3 py-2 text-sm font-black text-ink shadow-hard">
            <Flame className="size-4 text-coral-deep" aria-hidden="true" />
            Racha: {activeProfile.streakCurrent}
          </div>
          <div className="flex items-center gap-2 rounded-xl border-2 border-ink bg-[#d6e6f5] px-3 py-2 text-sm font-black text-ink shadow-hard">
            <Star className="size-4 text-sky" aria-hidden="true" />
            {activeProfile.xp} XP
          </div>
        </div>
      )}

      <ol className="mt-8 space-y-5">
        {units.map((unit, index) => {
          const unitProgress = getUnitProgress(unit, progress);
          const exercises = unit.exerciseIds.flatMap((exerciseId) => {
            const exercise = getExercise(exerciseId);
            return exercise ? [exercise] : [];
          });

          return (
            <li key={unit.id}>
              <PaperCard
                strong={unitProgress.complete}
                className={index % 2 === 0 ? "-rotate-1 p-5 sm:p-6" : "rotate-1 p-5 sm:p-6"}
              >
                <div className="grid gap-4 sm:grid-cols-[5rem_1fr_auto] sm:items-center">
                  <div className="relative flex size-16 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-2xl font-black text-ink shadow-hard">
                    {unitProgress.complete ? (
                      <CircleCheck className="size-8 text-teal" aria-hidden="true" />
                    ) : (
                      unit.order
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Sticker tone={unit.accent}>
                        Capítulo {unit.order}
                      </Sticker>
                      <span className="text-xs font-black uppercase tracking-wide text-ink-soft">
                        {unitProgress.solved} de {unitProgress.total} hojas
                      </span>
                      {unitProgress.complete && (
                        <span className="font-hand text-lg font-bold text-teal">
                          ¡completado!
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">
                      {unit.title}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-ink-soft">
                      {unit.description}
                    </p>
                    <p className="mt-2 line-clamp-1 text-xs font-bold text-ink-soft">
                      {exercises.map((exercise) => exercise.titulo).join(" · ")}
                    </p>
                  </div>

                  <Link
                    href={`/unidad/${unit.id}`}
                    className="flex items-center justify-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-mustard px-4 py-3 text-sm font-black text-ink shadow-hard"
                  >
                    {unitProgress.complete ? "Repasar" : "Abrir"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full border-2 border-ink bg-paper-deep">
                  <div
                    className="h-full bg-teal transition-all"
                    style={{ width: `${unitProgress.percent}%` }}
                  />
                </div>
              </PaperCard>
            </li>
          );
        })}
      </ol>

      {extraExercises.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Hojas libres del club
          </h2>
          <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
            actividades creadas por la comunidad
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {extraExercises.map((exercise) => (
              <Link
                key={exercise.id}
                href={`/ejercicio/${exercise.id}`}
                className="rounded-xl border-2 border-ink bg-paper p-4 shadow-hard"
              >
                <p className="text-xs font-black uppercase tracking-wide text-coral-deep">
                  {exercise.categoria}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">
                  {exercise.titulo}
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink-soft">
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
