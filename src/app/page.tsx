"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Flame,
  LayoutDashboard,
  LogIn,
  MessageCircle,
  Play,
  Sparkles,
  Star,
} from "lucide-react";
import { Avatar } from "@/components/brand/Avatar";
import { SquiggleDoodle, StarDoodle } from "@/components/brand/Doodle";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { useApp } from "@/context/AppProvider";
import { getLevelInfo, getSolvedCount, getUnitProgress } from "@/lib/demo";
import { cn } from "@/lib/utils";
import { ROADMAP_LEVELS } from "@/data/roadmap";
import {
  getCurrentLevel,
  getLevelProgress,
  getTodaySolvedCount,
} from "@/lib/roadmap";

export default function Home() {
  const {
    ready,
    activeProfile,
    progress,
    units,
    club,
    getExercise,
    getProfile,
    getUnit,
  } = useApp();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo el cuaderno...
        </p>
      </div>
    );
  }

  const currentLevel = getCurrentLevel(ROADMAP_LEVELS, units, progress);
  const currentLevelUnits = units.filter(
    (unit) => unit.levelId === currentLevel.id,
  );
  const currentLevelProgress = getLevelProgress(currentLevel, units, progress);
  const todaySolved = getTodaySolvedCount(progress);
  const nextUnit =
    currentLevelUnits.find((unit) => {
      const unitProgress = getUnitProgress(unit, progress);
      return !unitProgress.complete;
    }) ??
    currentLevelUnits[0] ??
    units[0];
  const nextExerciseId =
    nextUnit?.exerciseIds.find((exerciseId) => !progress[exerciseId]?.solved) ??
    nextUnit?.exerciseIds[0];
  const nextExercise = nextExerciseId ? getExercise(nextExerciseId) : undefined;
  const solvedCount = getSolvedCount(progress);
  const visibleThreads = club.threads
    .filter((thread) => !thread.hidden)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned))
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      {activeProfile ? (
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <PaperCard strong className="relative p-6 sm:p-8">
            <div className="tape -top-3 left-10" aria-hidden="true" />
            <div className="flex items-center gap-4">
              <Avatar
                alias={activeProfile.alias}
                avatar={activeProfile.avatar}
                size="lg"
              />
              <div>
                <Sticker tone="teal">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {activeProfile.role === "teacher" ? "Panel de guía" : "Tu carnet"}
                </Sticker>
                <h1 className="mt-2 font-display text-4xl font-semibold leading-none text-ink">
                  Hola, {activeProfile.alias}
                </h1>
                <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
                  {activeProfile.role === "teacher"
                    ? "todo listo para acompañar el club"
                    : "tu próxima aventura te espera"}
                </p>
              </div>
            </div>

            {activeProfile.role === "teacher" ? (
              <Link
                href="/panel"
                className="mt-6 inline-flex items-center gap-2 rounded-[1rem_0.7rem_1.2rem_0.8rem] border-2 border-ink bg-plum px-5 py-3 text-base font-black text-paper shadow-hard"
              >
                <LayoutDashboard className="size-5" aria-hidden="true" />
                Abrir panel de guía
              </Link>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-[0.8rem_1.1rem_0.7rem_1rem] border-2 border-ink bg-[#fbe7b8] p-3 text-center shadow-hard">
                    <Flame className="mx-auto size-5 text-coral-deep" aria-hidden="true" />
                    <p className="mt-1 font-display text-2xl font-black text-ink">
                      {activeProfile.streakCurrent}
                    </p>
                    <p className="text-xs font-bold text-ink-soft">racha</p>
                  </div>
                  <div className="rounded-[1rem_0.7rem_1.1rem_0.8rem] border-2 border-ink bg-[#d6e6f5] p-3 text-center shadow-hard">
                    <Star className="mx-auto size-5 text-sky" aria-hidden="true" />
                    <p className="mt-1 font-display text-2xl font-black text-ink">
                      {activeProfile.xp}
                    </p>
                    <p className="text-xs font-bold text-ink-soft">XP</p>
                  </div>
                  <div className="rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-[#cce9e3] p-3 text-center shadow-hard">
                    <BookOpen className="mx-auto size-5 text-teal" aria-hidden="true" />
                    <p className="mt-1 font-display text-2xl font-black text-ink">
                      {solvedCount}
                    </p>
                    <p className="text-xs font-bold text-ink-soft">hojas</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border-2 border-ink/20 bg-paper-deep/50 p-4">
                  <div className="flex items-center justify-between gap-2 text-sm font-black text-ink">
                    <span>{getLevelInfo(activeProfile.xp).name}</span>
                    <span>{activeProfile.xp} XP</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-ink bg-paper">
                    <div
                      className="h-full bg-teal"
                      style={{ width: `${getLevelInfo(activeProfile.xp).progress}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </PaperCard>

          <div className="relative">
            <StarDoodle className="absolute -right-2 -top-5 rotate-12 text-mustard" />
            <PaperCard className="h-full -rotate-1 p-6">
              <Sticker tone="coral">
                <Play className="size-3.5" aria-hidden="true" />
                Aventura de hoy
              </Sticker>
              {nextExercise ? (
                <>
                  <p className="mt-3 font-hand text-xl font-bold text-ink-soft">
                    {nextUnit?.title}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-semibold leading-tight text-ink">
                    {nextExercise.titulo}
                  </h2>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-ink-soft">
                    {nextExercise.enunciado}
                  </p>
                  <Link
                    href={`/ejercicio/${nextExercise.id}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-coral-deep px-5 py-3 text-sm font-black text-paper shadow-hard"
                  >
                    Continuar
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <p className="mt-4 font-display text-2xl text-ink">
                  ¡Todo completado! Puedes repasar tus unidades favoritas.
                </p>
              )}
            </PaperCard>
          </div>
        </section>
      ) : (
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative">
            <Sticker tone="teal">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Aprende sin cuenta
            </Sticker>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
              Las mates se aprenden{" "}
              <span className="relative inline-block">
                paso a paso
                <SquiggleDoodle className="absolute -bottom-3 left-0 w-full text-coral" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-ink-soft">
              Explora los capítulos, resuelve retos y mira el procedimiento en
              colores. Si quieres guardar racha y entrar a La Fogata, elige un
              alias.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/unidades"
                className="flex items-center gap-2 rounded-[1rem_0.7rem_1.2rem_0.8rem] border-2 border-ink bg-coral-deep px-5 py-3 text-base font-black text-paper shadow-hard"
              >
                <Compass className="size-5" aria-hidden="true" />
                Explorar unidades
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/entrar"
                className="flex items-center gap-2 rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-paper px-5 py-3 text-base font-black text-ink shadow-hard"
              >
                <LogIn className="size-5" aria-hidden="true" />
                Elegir mi alias
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="tape -top-3 left-8" aria-hidden="true" />
            <PaperCard strong className="relative rotate-1 p-6 pt-8 text-center">
              <Mascot className="mx-auto size-44" label="Tinta, la mascota de Mates" />
              <p className="mt-2 font-hand text-2xl font-bold leading-tight text-ink">
                “Puedes practicar sin cuenta. Si quieres, después eliges tu alias.”
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-soft">
                Solo tu alias y tu avatar. Sin correos.
              </p>
            </PaperCard>
          </div>
        </section>
      )}

      <section className="mt-10">
        <PaperCard className="p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <Sticker tone="teal">
                <Compass className="size-3.5" aria-hidden="true" />
                Tu camino N0–N6
              </Sticker>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                {currentLevel.id} · {currentLevel.title}
              </h2>
              <p className="text-sm font-semibold text-ink-soft">
                Hoy: {todaySolved} de 2 hojas · {currentLevelProgress.solved}/
                {currentLevelProgress.total} del nivel
              </p>
            </div>
            <Link
              href="/hoja-de-ruta"
              className="inline-flex items-center gap-1 text-sm font-black text-coral-deep underline decoration-2 underline-offset-4"
            >
              Ver mi ruta
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {ROADMAP_LEVELS.map((level) => {
              const active = level.id === currentLevel.id;
              return (
                <Link
                  key={level.id}
                  href="/hoja-de-ruta"
                  className={cn(
                    "rounded-xl border-2 px-2 py-2 text-center transition-transform",
                    active
                      ? "-rotate-1 border-ink bg-mustard text-ink shadow-hard"
                      : "border-ink/20 bg-paper-deep/40 text-ink-soft hover:border-ink",
                  )}
                >
                  <span className="block font-display text-base font-black">
                    {level.id}
                  </span>
                  <span className="block text-[10px] font-bold leading-tight">
                    {level.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </PaperCard>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-display text-3xl font-semibold text-ink">
              <Compass className="size-6 text-coral-deep" aria-hidden="true" />
              Capítulos de {currentLevel.id}
            </h2>
            <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
              elige por dónde seguir
            </p>
          </div>
          <Link
            href="/hoja-de-ruta"
            className="font-black text-sky underline decoration-2 underline-offset-4 hover:text-ink"
          >
            Ver mi ruta →
          </Link>
        </div>

        <PaperCard className="mt-5 p-2 sm:p-3">
          <ul className="divide-y-2 divide-dashed divide-ink/15">
            {currentLevelUnits.map((unit) => {
              const unitProgress = getUnitProgress(unit, progress);

              return (
                <li key={unit.id}>
                  <Link
                    href={`/unidad/${unit.id}`}
                    className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-paper-deep/50 sm:gap-4 sm:p-4"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-lg font-black text-ink">
                      {unit.levelId === "N0" ? "N0" : unit.order}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Sticker tone={unit.accent}>
                          <BookOpen className="size-3.5" aria-hidden="true" />
                          {unit.levelId === "N0" ? "Primer paso" : `Capítulo ${unit.order}`}
                        </Sticker>
                        <span className="text-xs font-black text-sky">
                          {unitProgress.solved}/{unitProgress.total} hojas
                        </span>
                      </div>
                      <p className="mt-1 truncate font-display text-lg font-semibold text-ink">
                        {unit.title}
                      </p>
                    </div>
                    <ArrowRight className="size-5 shrink-0 text-coral-deep" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </PaperCard>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <PaperCard className="-rotate-1 p-6">
          <Sticker tone="mustard">
            <MessageCircle className="size-3.5" aria-hidden="true" />
            La Fogata
          </Sticker>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
            Dudas y pistas de otros aventureros
          </h2>
          <ul className="mt-4 space-y-2">
            {visibleThreads.map((thread) => {
              const author = getProfile(thread.authorId);
              const unit = getUnit(thread.unitId);
              return (
                <li key={thread.id}>
                  <Link
                    href={`/club/${thread.id}`}
                    className="block rounded-xl border-2 border-ink/20 bg-paper-deep/40 px-3 py-2 hover:border-ink"
                  >
                    <p className="text-xs font-black uppercase tracking-wide text-ink-soft">
                      {unit?.title ?? "Club"}
                    </p>
                    <p className="font-bold text-ink">{thread.title}</p>
                    <p className="text-xs font-semibold text-ink-soft">
                      por {author?.alias ?? "Aventurero"}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/club"
            className="mt-4 inline-flex items-center gap-1 font-black text-coral-deep underline decoration-2 underline-offset-4"
          >
            Entrar a La Fogata
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </PaperCard>

        <div className="paper-note relative rotate-1 p-5">
          <div className="tape -top-3 right-8" aria-hidden="true" />
          <p className="font-hand text-2xl font-bold leading-tight text-ink">
            “Equivocarse no quita puntos. Abre una pista.”
          </p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-ink-soft">
            Si fallas dos veces, el Modo Desglose aparece solo. También puedes
            abrirlo cuando quieras desde cada reto.
          </p>
          <Link
            href="/unidades"
            className="mt-4 inline-flex items-center gap-1 font-black text-coral-deep underline decoration-2 underline-offset-4"
          >
            Ir a mi siguiente capítulo
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
