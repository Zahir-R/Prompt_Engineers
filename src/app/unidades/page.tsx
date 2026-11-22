"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Compass,
  Flame,
  LogIn,
  Star,
} from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { StarDoodle, SquiggleDoodle } from "@/components/brand/Doodle";
import { useApp } from "@/context/AppProvider";
import { ROADMAP_LEVELS } from "@/data/roadmap";
import { getUnitProgress } from "@/lib/demo";

export default function UnidadesPage() {
  const { ready, activeProfile, progress, units, getExercise } = useApp();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo los capítulos...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="relative grid gap-6 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-paper-deep/60 p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <Sticker tone="teal">
            <BookOpen className="size-3.5" aria-hidden="true" />
            Libres para explorar
          </Sticker>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">
            Capítulos por
            <span className="relative ml-2 inline-block">
              nivel
              <SquiggleDoodle className="absolute -bottom-2 left-0 w-full text-mustard" />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-ink-soft">
            Todos los capítulos están abiertos. Puedes practicar sin cuenta; si
            eliges un alias, guardas racha, XP y participas en La Fogata.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/hoja-de-ruta"
              className="inline-flex items-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-mustard px-4 py-2.5 text-sm font-black text-ink shadow-hard"
            >
              <Compass className="size-4" aria-hidden="true" />
              Ver mi ruta N0–N6
            </Link>
            {!activeProfile && (
              <Link
                href="/entrar"
                className="inline-flex items-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-[#cce9e3] px-4 py-2.5 text-sm font-black text-ink shadow-hard"
              >
                <LogIn className="size-4" aria-hidden="true" />
                Elegir mi alias
              </Link>
            )}
          </div>
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

      <div className="mt-8 space-y-10">
        {ROADMAP_LEVELS.map((level) => {
          const levelUnits = units.filter((unit) => unit.levelId === level.id);
          if (levelUnits.length === 0) return null;

          return (
            <section key={level.id}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <Sticker tone="paper">
                    <Compass className="size-3.5" aria-hidden="true" />
                    {level.id} · {level.title}
                  </Sticker>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                    {level.focus}
                  </h2>
                </div>
                <Link
                  href="/hoja-de-ruta"
                  className="text-sm font-black text-sky underline decoration-2 underline-offset-4"
                >
                  Ver esta parte de la ruta →
                </Link>
              </div>

              <ol className="mt-4 space-y-4">
                {levelUnits.map((unit, index) => {
                  const unitProgress = getUnitProgress(unit, progress);
                  const unitExercises = unit.exerciseIds.flatMap((exerciseId) => {
                    const exercise = getExercise(exerciseId);
                    return exercise ? [exercise] : [];
                  });

                  return (
                    <li key={unit.id}>
                      <PaperCard
                        strong={unitProgress.complete}
                        className={index % 2 === 0 ? "-rotate-1 p-5" : "rotate-1 p-5"}
                      >
                        <div className="grid gap-4 sm:grid-cols-[5rem_1fr_auto] sm:items-center">
                          <div className="relative flex size-16 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-2xl font-black text-ink shadow-hard">
                            {unitProgress.complete ? (
                              <CircleCheck className="size-8 text-teal" aria-hidden="true" />
                            ) : (
                              unit.levelId === "N0" ? "N0" : unit.order
                            )}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Sticker tone={unit.accent}>
                                {unit.levelId === "N0" ? "Primer paso" : `Capítulo ${unit.order}`}
                              </Sticker>
                              <span className="rounded-full bg-paper-deep px-2.5 py-1 text-xs font-black text-ink-soft">
                                {unit.levelId}
                              </span>
                              <span className="text-xs font-black uppercase tracking-wide text-ink-soft">
                                {unitProgress.solved} de {unitProgress.total} hojas
                              </span>
                            </div>
                            <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-ink">
                              {unit.title}
                            </h3>
                            <p className="mt-1 text-sm font-semibold text-ink-soft">
                              {unit.description}
                            </p>
                            <p className="mt-2 line-clamp-1 text-xs font-bold text-ink-soft">
                              {unitExercises.map((exercise) => exercise.titulo).join(" · ")}
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
            </section>
          );
        })}
      </div>

    </div>
  );
}
