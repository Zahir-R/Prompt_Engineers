"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Flame,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageCircle,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { Avatar } from "@/components/brand/Avatar";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { StarDoodle } from "@/components/brand/Doodle";
import { useApp } from "@/context/AppProvider";
import {
  formatShortDate,
  getLevelInfo,
  getSolvedCount,
  getStreakDays,
  getUnitProgress,
} from "@/lib/demo";
import { cn } from "@/lib/utils";

export default function PerfilPage() {
  const {
    ready,
    activeProfile,
    progress,
    units,
    club,
    logout,
    getProfileProgress,
  } = useApp();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo tu carnet...
        </p>
      </div>
    );
  }

  if (!activeProfile) {
    const guestProgress = getProfileProgress("guest");
    const guestSolved = getSolvedCount(guestProgress);

    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <PaperCard strong className="relative p-6 sm:p-8">
            <div className="tape -top-3 left-10" aria-hidden="true" />
            <Sticker tone="teal">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Modo visitante
            </Sticker>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-ink">
              Tu carnet está en blanco
            </h1>
            <p className="mt-3 font-semibold leading-relaxed text-ink-soft">
              Puedes seguir practicando sin cuenta. El alias solo desbloquea
              racha, XP y la escritura en La Fogata.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/entrar"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral-deep px-4 py-2.5 text-sm font-black text-paper shadow-hard"
              >
                <LogIn className="size-4" aria-hidden="true" />
                Elegir mi alias
              </Link>
              <Link
                href="/unidades"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 text-sm font-black text-ink shadow-hard"
              >
                <BookOpen className="size-4" aria-hidden="true" />
                Explorar unidades
              </Link>
            </div>
            {guestSolved > 0 && (
              <p className="mt-4 rounded-xl border-2 border-mustard bg-[#fbe7b8] p-3 text-sm font-bold text-ink">
                Ya resolviste {guestSolved} hoja{guestSolved === 1 ? "" : "s"} en
                este navegador. Al elegir alias podemos traerlas a tu carnet.
              </p>
            )}
          </PaperCard>
          <Mascot className="mx-auto size-56" />
        </div>
      </div>
    );
  }

  if (activeProfile.role === "teacher") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <PaperCard strong className="relative p-6 sm:p-8">
          <div className="tape -top-3 left-10" aria-hidden="true" />
          <Sticker tone="plum">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Cuenta de guía
          </Sticker>
          <div className="mt-4 flex items-center gap-4">
            <Avatar
              alias={activeProfile.alias}
              avatar={activeProfile.avatar}
              size="lg"
            />
            <div>
              <h1 className="font-display text-4xl font-semibold leading-none text-ink">
                {activeProfile.alias}
              </h1>
              <p className="mt-1 font-semibold text-ink-soft">
                Esta cuenta vive detrás del telón. El panel de guía no aparece en
                la experiencia del estudiante.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/panel"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-plum px-4 py-2.5 text-sm font-black text-paper shadow-hard"
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
              Abrir panel de guía
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-paper px-4 py-2.5 text-sm font-black text-ink shadow-hard"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Cerrar sesión
            </button>
          </div>
        </PaperCard>
      </div>
    );
  }

  const solvedCount = getSolvedCount(progress);
  const level = getLevelInfo(activeProfile.xp);
  const streakDays = getStreakDays(activeProfile);
  const unitProgress = units.map((unit) => ({
    unit,
    progress: getUnitProgress(unit, progress),
  }));
  const completedUnits = unitProgress.filter((item) => item.progress.complete);
  const authoredThreads = club.threads.filter(
    (thread) => thread.authorId === activeProfile.id && !thread.hidden,
  );
  const badges = [
    { label: "Primer paso", active: solvedCount > 0 },
    { label: "Racha de 3", active: activeProfile.streakBest >= 3 },
    { label: "Capítulo completo", active: completedUnits.length > 0 },
    { label: "Voz de la Fogata", active: authoredThreads.length > 0 },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <PaperCard strong className="relative p-6 sm:p-8">
          <div className="tape -top-3 left-10" aria-hidden="true" />
          <StarDoodle className="absolute -right-3 -top-4 rotate-12 text-mustard" />
          <div className="flex items-center gap-4">
            <Avatar
              alias={activeProfile.alias}
              avatar={activeProfile.avatar}
              size="lg"
            />
            <div>
              <Sticker tone="teal">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Carnet de aventuras
              </Sticker>
              <h1 className="mt-2 font-display text-4xl font-semibold leading-none text-ink">
                {activeProfile.alias}
              </h1>
              <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
                {level.name}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border-2 border-ink/20 bg-paper-deep/50 p-4">
            <div className="flex items-center justify-between text-sm font-black text-ink">
              <span>{level.name}</span>
              <span>{activeProfile.xp} XP</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-ink bg-paper">
              <div className="h-full bg-teal" style={{ width: `${level.progress}%` }} />
            </div>
            {level.nextMin && (
              <p className="mt-1 text-xs font-semibold text-ink-soft">
                Próximo nivel a los {level.nextMin} XP
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border-2 border-ink bg-[#fbe7b8] p-3 text-center shadow-hard">
              <Flame className="mx-auto size-5 text-coral-deep" aria-hidden="true" />
              <p className="mt-1 font-display text-2xl font-black text-ink">
                {activeProfile.streakCurrent}
              </p>
              <p className="text-xs font-bold text-ink-soft">racha</p>
            </div>
            <div className="rounded-xl border-2 border-ink bg-[#d6e6f5] p-3 text-center shadow-hard">
              <Star className="mx-auto size-5 text-sky" aria-hidden="true" />
              <p className="mt-1 font-display text-2xl font-black text-ink">
                {activeProfile.xp}
              </p>
              <p className="text-xs font-bold text-ink-soft">XP</p>
            </div>
            <div className="rounded-xl border-2 border-ink bg-[#cce9e3] p-3 text-center shadow-hard">
              <BookOpen className="mx-auto size-5 text-teal" aria-hidden="true" />
              <p className="mt-1 font-display text-2xl font-black text-ink">
                {solvedCount}
              </p>
              <p className="text-xs font-bold text-ink-soft">hojas</p>
            </div>
          </div>
        </PaperCard>

        <div className="space-y-4">
          <PaperCard className="-rotate-1 p-5">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              <Flame className="size-5 text-coral-deep" aria-hidden="true" />
              Días de aventura
            </h2>
            <div className="mt-3 grid grid-cols-7 gap-1.5">
              {streakDays.map((day) => (
                <div key={day.date} className="text-center">
                  <span
                    className={cn(
                      "mx-auto flex size-8 items-center justify-center rounded-full border-2 border-ink text-xs font-black",
                      day.active
                        ? "bg-mustard text-ink"
                        : "bg-paper-deep text-ink-soft/60",
                      day.today && "ring-2 ring-sky ring-offset-1",
                    )}
                  >
                    {day.active ? "★" : "·"}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold text-ink-soft">
                    {formatShortDate(day.date)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 font-hand text-lg font-bold text-ink-soft">
              mejor racha: {activeProfile.streakBest} días
            </p>
          </PaperCard>

          <PaperCard className="rotate-1 p-5">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              <Trophy className="size-5 text-mustard" aria-hidden="true" />
              Insignias
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <li
                  key={badge.label}
                  className={cn(
                    "rounded-full border-2 px-3 py-1 text-xs font-black",
                    badge.active
                      ? "border-ink bg-[#cce9e3] text-ink"
                      : "border-ink/20 bg-paper-deep text-ink-soft/50",
                  )}
                >
                  {badge.label}
                </li>
              ))}
            </ul>
          </PaperCard>
        </div>
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <PaperCard className="p-5">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
            <BookOpen className="size-5 text-teal" aria-hidden="true" />
            Mis capítulos
          </h2>
          <ul className="mt-3 space-y-2">
            {unitProgress.map(({ unit, progress: unitState }) => (
              <li
                key={unit.id}
                className="flex items-center justify-between gap-3 rounded-xl border-2 border-ink/20 bg-paper-deep/40 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate font-bold text-ink">{unit.title}</p>
                  <p className="text-xs font-semibold text-ink-soft">
                    {unitState.solved} de {unitState.total} hojas
                  </p>
                </div>
                <Link
                  href={`/unidad/${unit.id}`}
                  className="shrink-0 rounded-lg border-2 border-ink bg-mustard px-2.5 py-1 text-xs font-black text-ink"
                >
                  Abrir
                </Link>
              </li>
            ))}
          </ul>
        </PaperCard>

        <div className="space-y-4">
          <div className="paper-note rotate-1 p-5">
            <div className="tape -top-3 right-8" aria-hidden="true" />
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
              <MessageCircle className="size-5 text-coral-deep" aria-hidden="true" />
              Mi voz en La Fogata
            </h2>
            <p className="mt-1 text-sm font-semibold text-ink-soft">
              {authoredThreads.length > 0
                ? `Abriste ${authoredThreads.length} conversación${authoredThreads.length === 1 ? "" : "es"}.`
                : "Todavía no abriste ninguna duda. La Fogata espera tu pregunta."}
            </p>
            <Link
              href="/club"
              className="mt-3 inline-flex items-center gap-1 font-black text-coral-deep underline decoration-2 underline-offset-4"
            >
              Ir a La Fogata
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/entrar"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-paper px-4 py-2.5 text-sm font-black text-ink shadow-hard"
            >
              Cambiar perfil
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-paper px-4 py-2.5 text-sm font-black text-ink shadow-hard"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Salir
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
