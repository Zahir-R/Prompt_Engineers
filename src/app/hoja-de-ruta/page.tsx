"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  Flag,
  Route,
  Sparkles,
  Star,
} from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { SquiggleDoodle, StarDoodle } from "@/components/brand/Doodle";
import { useApp } from "@/context/AppProvider";
import { CRITICAL_GATES, ROADMAP_LEVELS } from "@/data/roadmap";
import {
  getCurrentLevel,
  getLevelProgress,
  getTodaySolvedCount,
} from "@/lib/roadmap";
import { getRouteProgress } from "@/lib/teacherRoutes";
import { cn } from "@/lib/utils";

export default function HojaDeRutaPage() {
  const {
    ready,
    activeProfile,
    progress,
    units,
    teacherRoutes,
    getProfileProgress,
  } = useApp();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Preparando tu ruta...
        </p>
      </div>
    );
  }

  const currentLevel = getCurrentLevel(ROADMAP_LEVELS, units, progress);
  const currentProgress = getLevelProgress(currentLevel, units, progress);
  const todaySolved = getTodaySolvedCount(progress);
  const dailyGoal = 2;
  const guestProgress = getProfileProgress("guest");
  const classRoutes = activeProfile
    ? teacherRoutes.filter(
        (route) =>
          route.status === "published" && route.classId === activeProfile.classId,
      )
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="relative grid gap-6 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-paper-deep/60 p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <Sticker tone="teal">
            <Compass className="size-3.5" aria-hidden="true" />
            Tu camino N0–N6
          </Sticker>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">
            Mi ruta de
            <span className="relative ml-2 inline-block">
              aventuras
              <SquiggleDoodle className="absolute -bottom-2 left-0 w-full text-coral" />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-ink-soft">
            La ruta sigue el currículo oficial de primaria, pero no importa tu
            grado: importa lo que ya sabes hacer. Puedes entrar a cualquier nivel
            y practicar a tu ritmo.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-black text-ink shadow-hard">
              Nivel actual: {currentLevel.id}
            </span>
            <span className="rounded-xl border-2 border-ink bg-[#fbe7b8] px-3 py-2 text-sm font-black text-ink shadow-hard">
              Hoy: {todaySolved} de {dailyGoal} hojas
            </span>
            {activeProfile && (
              <span className="flex items-center gap-1 rounded-xl border-2 border-ink bg-[#cce9e3] px-3 py-2 text-sm font-black text-ink shadow-hard">
                <Star className="size-4 text-coral-deep" aria-hidden="true" />
                {activeProfile.xp} XP
              </span>
            )}
          </div>
        </div>
        <div className="relative mx-auto">
          <Mascot className="size-40" />
          <StarDoodle className="absolute -right-3 top-0 rotate-12 text-mustard" />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border-2 border-ink bg-paper p-4 shadow-hard">
        <div className="flex items-center justify-between text-sm font-black text-ink">
          <span>
            {currentLevel.id} · {currentLevel.title}
          </span>
          <span>
            {currentProgress.solved}/{currentProgress.total} hojas
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-ink bg-paper-deep">
          <div className="h-full bg-teal" style={{ width: `${currentProgress.percent}%` }} />
        </div>
      </section>

      <ol className="relative mt-8 space-y-5">
        <div
          className="absolute bottom-8 left-[2.15rem] top-8 hidden w-1 border-l-4 border-dashed border-ink/25 sm:block"
          aria-hidden="true"
        />
        {ROADMAP_LEVELS.map((level) => {
          const levelProgress = getLevelProgress(level, units, progress);
          const isCurrent = level.id === currentLevel.id;
          const levelUnits = units.filter((unit) => unit.levelId === level.id);
          const firstUnit = levelUnits[0];

          return (
            <li key={level.id} className="relative">
              <div className="grid gap-4 sm:grid-cols-[4.5rem_1fr] sm:items-start">
                <div
                  className={cn(
                    "relative z-10 flex size-16 items-center justify-center rounded-full border-2 border-ink font-display text-xl font-black shadow-hard",
                    levelProgress.complete
                      ? "bg-teal text-paper"
                      : isCurrent
                        ? "bg-mustard text-ink"
                        : "bg-paper text-ink",
                  )}
                >
                  {levelProgress.complete ? (
                    <Check className="size-7" aria-hidden="true" />
                  ) : (
                    level.id
                  )}
                </div>

                <PaperCard
                  strong={isCurrent}
                  className={cn("p-5 sm:p-6", isCurrent ? "-rotate-1" : "rotate-0")}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Sticker tone={isCurrent ? "coral" : "paper"}>
                      {level.id} · {level.title}
                    </Sticker>
                    <span className="text-xs font-bold text-ink-soft">
                      {level.baseYear}
                    </span>
                    {isCurrent && (
                      <span className="font-hand text-lg font-bold text-coral-deep">
                        estás aquí
                      </span>
                    )}
                    {levelProgress.complete && (
                      <span className="font-hand text-lg font-bold text-teal">
                        completado
                      </span>
                    )}
                  </div>

                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                    {level.focus}
                  </h2>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-ink-soft">
                    {level.canDo}
                  </p>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs font-black text-ink-soft">
                      <span>
                        {levelProgress.completeUnits} de {levelProgress.totalUnits} capítulo{levelProgress.totalUnits === 1 ? "" : "s"}
                      </span>
                      <span>
                        {levelProgress.solved}/{levelProgress.total} hojas
                      </span>
                    </div>
                    <div className="mt-1 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-paper-deep">
                      <div className="h-full bg-teal" style={{ width: `${levelProgress.percent}%` }} />
                    </div>
                  </div>

                  <details className="mt-4 rounded-xl border-2 border-ink/20 bg-paper-deep/40 p-3">
                    <summary className="cursor-pointer text-sm font-black text-ink">
                      Qué aprenderás en {level.id}
                    </summary>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {level.components.map((component) => (
                        <div key={component.name} className="rounded-xl border-2 border-ink/15 bg-paper p-3">
                          <p className="text-xs font-black uppercase tracking-wide text-ink-soft">
                            {component.name}
                          </p>
                          <ul className="mt-1 space-y-1">
                            {component.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-1.5 text-xs font-semibold text-ink-soft">
                                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-coral" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 rounded-lg bg-[#fbe7b8] p-2 text-xs font-bold text-ink">
                      <Flag className="mr-1 inline size-3.5" aria-hidden="true" />
                      {level.checkpoint}
                    </p>
                  </details>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {firstUnit ? (
                      <Link
                        href={`/unidad/${firstUnit.id}`}
                        className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral-deep px-4 py-2.5 text-sm font-black text-paper shadow-hard"
                      >
                        Practicar {level.id}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className="rounded-xl border-2 border-ink/20 bg-paper-deep px-4 py-2.5 text-sm font-black text-ink-soft">
                        Próximamente
                      </span>
                    )}
                    <Link
                      href="/unidades"
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-black text-ink shadow-hard"
                    >
                      <BookOpen className="size-4" aria-hidden="true" />
                      Ver capítulos
                    </Link>
                  </div>
                </PaperCard>
              </div>
            </li>
          );
        })}
      </ol>

      {classRoutes.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
            <Route className="size-5 text-teal" aria-hidden="true" />
            Rutas de mi clase
          </h2>
          <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
            secuencias preparadas por tu docente
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {classRoutes.map((route) => {
              const routeProgress = getRouteProgress(route, progress);
              return (
                <Link key={route.id} href={`/ruta/${route.id}`}>
                  <PaperCard className="h-full p-4 transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <Sticker tone="teal">{route.levelId}</Sticker>
                      <span className="text-xs font-black text-ink-soft">
                        {routeProgress.solved}/{routeProgress.total}
                      </span>
                    </div>
                    <p className="mt-2 font-display text-xl font-semibold text-ink">
                      {route.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink-soft">
                      {route.description}
                    </p>
                  </PaperCard>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
          <Flag className="size-5 text-coral-deep" aria-hidden="true" />
          Compuertas críticas
        </h2>
        <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
          si una compuerta no está firme, conviene repasarla antes de avanzar
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {CRITICAL_GATES.map((gate) => (
            <PaperCard key={gate.id} className="p-4">
              <p className="flex items-center gap-2 text-sm font-black text-ink">
                <Sparkles className="size-4 text-mustard" aria-hidden="true" />
                {gate.label}
              </p>
              <p className="mt-1 text-xs font-bold text-ink-soft">
                {gate.levelIds.join(" · ")}
              </p>
            </PaperCard>
          ))}
        </div>
      </section>

      {!activeProfile && Object.keys(guestProgress).length > 0 && (
        <section className="mt-8 rounded-2xl border-2 border-ink bg-[#fbe7b8] p-4 shadow-hard">
          <p className="text-sm font-bold text-ink">
            Puedes practicar sin cuenta. Si eliges un alias, guardas tu racha,
            tus chispas y tu avance en tu perfil.
          </p>
          <Link
            href="/entrar"
            className="mt-2 inline-flex text-sm font-black text-coral-deep underline decoration-2 underline-offset-4"
          >
            Elegir mi alias
          </Link>
        </section>
      )}
    </div>
  );
}
