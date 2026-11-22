"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Copy,
  EyeOff,
  Flag,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Pin,
  Plus,
  RotateCcw,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/brand/Avatar";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { useApp } from "@/context/AppProvider";
import {
  AVATAR_OPTIONS,
  getSolvedCount,
  getUnitProgress,
} from "@/lib/demo";
import type { AvatarId } from "@/types/demo";
import { cn } from "@/lib/utils";

export default function PanelPage() {
  const {
    ready,
    activeProfile,
    profiles,
    classrooms,
    club,
    units,
    switchProfile,
    createStudentAlias,
    getProfileProgress,
    getProfileSparks,
    getProfileAnatomy,
    getProfileCosmetics,
    resolveThread,
    togglePinThread,
    toggleHideThread,
    resetDemo,
    logout,
  } = useApp();
  const [alias, setAlias] = useState("");
  const [avatar, setAvatar] = useState<AvatarId>("sky");
  const [studentMessage, setStudentMessage] = useState("");
  const [copied, setCopied] = useState(false);

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo el panel de guía...
        </p>
      </div>
    );
  }

  if (activeProfile?.role !== "teacher") {
    const teacher = profiles.find((profile) => profile.role === "teacher");

    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <PaperCard strong className="relative p-8 text-center">
          <div className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden="true" />
          <Mascot className="mx-auto size-36" />
          <Sticker tone="plum" className="mt-3">
            <LayoutDashboard className="size-3.5" aria-hidden="true" />
            Detrás del telón
          </Sticker>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
            Panel de guía
          </h1>
          <p className="mx-auto mt-2 max-w-md font-semibold text-ink-soft">
            Este espacio es solo para docentes. Los estudiantes no lo ven en su
            navegación.
          </p>
          {teacher ? (
            <button
              type="button"
              onClick={() => switchProfile(teacher.id)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-plum px-4 py-2.5 text-sm font-black text-paper shadow-hard"
            >
              <GraduationCap className="size-4" aria-hidden="true" />
              Entrar como {teacher.alias} (demo)
            </button>
          ) : (
            <Link
              href="/entrar"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 text-sm font-black text-ink shadow-hard"
            >
              Elegir un perfil
            </Link>
          )}
        </PaperCard>
      </div>
    );
  }

  const classroom = classrooms.find((item) => item.id === activeProfile.classId);
  const students = profiles.filter(
    (profile) =>
      profile.role === "student" && profile.classId === activeProfile.classId,
  );
  const moderationThreads = [...club.threads].sort((a, b) => {
    if (a.reported !== b.reported) return Number(b.reported) - Number(a.reported);
    if (a.hidden !== b.hidden) return Number(a.hidden) - Number(b.hidden);
    return b.createdAt.localeCompare(a.createdAt);
  });

  const handleCreateStudent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStudentMessage("");
    if (!classroom) return;

    const result = createStudentAlias(classroom.code, alias, avatar);
    if (!result.ok) {
      setStudentMessage(result.error ?? "No pudimos crear el alias.");
      return;
    }

    setAlias("");
    setStudentMessage("Alias creado. Ya puede entrar con el código de clase.");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="grid gap-5 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-plum p-6 text-paper shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <Sticker tone="paper">
            <LayoutDashboard className="size-3.5" aria-hidden="true" />
            Panel de guía
          </Sticker>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-none">
            Todo lo importante, sin entrar al aula
          </h1>
          <p className="mt-3 max-w-2xl font-semibold text-paper/80">
            El estudiante ve aventuras, unidades y La Fogata. Desde aquí puedes
            gestionar alias, revisar avance y moderar el club.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-xl border-2 border-paper/30 bg-paper/10 px-3 py-2 text-sm font-black">
              Código: {classroom?.code ?? "—"}
            </span>
            <button
              type="button"
              onClick={async () => {
                if (!classroom) return;
                await navigator.clipboard?.writeText(classroom.code);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              }}
              className="flex items-center gap-1 rounded-xl border-2 border-paper/30 bg-paper/10 px-3 py-2 text-sm font-black"
            >
              <Copy className="size-4" aria-hidden="true" />
              {copied ? "Copiado" : "Copiar código"}
            </button>
            <Link
              href="/docente"
              className="flex items-center gap-1 rounded-xl border-2 border-paper/30 bg-paper/10 px-3 py-2 text-sm font-black"
            >
              <BookOpen className="size-4" aria-hidden="true" />
              Crear actividad
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1 rounded-xl border-2 border-paper/30 bg-paper/10 px-3 py-2 text-sm font-black"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Salir
            </button>
          </div>
        </div>
        <Mascot className="mx-auto size-36" />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
            <Users className="size-5 text-teal" aria-hidden="true" />
            Estudiantes del club
          </h2>
          <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
            alias, no nombres reales
          </p>
          <ul className="mt-3 space-y-3">
            {students.map((student, index) => {
              const studentProgress = getProfileProgress(student.id);
              const studentSparks = getProfileSparks(student.id);
              const completedDesgloses = Object.values(
                getProfileAnatomy(student.id),
              ).filter((entry) => entry.completed).length;
              const studentCosmetics = getProfileCosmetics(student.id);
              const solved = getSolvedCount(studentProgress);
              const completedUnits = units.filter(
                (unit) => getUnitProgress(unit, studentProgress).complete,
              ).length;

              return (
                <li key={student.id}>
                  <PaperCard
                    className={cn(
                      "p-4",
                      index % 2 === 0 ? "-rotate-1" : "rotate-1",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <Avatar
                        alias={student.alias}
                        avatar={student.avatar}
                        sticker={studentCosmetics.equipped}
                        size="md"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-xl font-semibold text-ink">
                          {student.alias}
                        </p>
                        <p className="text-xs font-bold text-ink-soft">
                          {solved} hoja{solved === 1 ? "" : "s"} · {completedUnits} capítulo{completedUnits === 1 ? "" : "s"} ·{" "}
                          {completedDesgloses} desglose{completedDesgloses === 1 ? "" : "s"} · {studentSparks} chispa{studentSparks === 1 ? "" : "s"} ·{" "}
                          racha {student.streakCurrent}
                        </p>
                      </div>
                      <div className="rounded-xl border-2 border-ink bg-paper-deep px-3 py-1.5 text-sm font-black text-ink">
                        {student.xp} XP
                      </div>
                    </div>
                  </PaperCard>
                </li>
              );
            })}
          </ul>

          <form onSubmit={handleCreateStudent} className="mt-5">
            <PaperCard className="p-5">
              <h3 className="font-display text-xl font-semibold text-ink">
                Crear alias de estudiante
              </h3>
              <p className="mt-1 text-sm font-semibold text-ink-soft">
                El estudiante no necesita correo. Entra con el código de la clase
                y el alias.
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  value={alias}
                  onChange={(event) => setAlias(event.target.value)}
                  placeholder="Alias del estudiante"
                  maxLength={20}
                  className="h-11 flex-1 rounded-xl border-2 border-ink bg-paper-deep/40 px-3 font-bold text-ink focus:border-sky focus:outline-none"
                />
                <select
                  value={avatar}
                  onChange={(event) => setAvatar(event.target.value as AvatarId)}
                  className="h-11 rounded-xl border-2 border-ink bg-paper-deep/40 px-3 font-bold text-ink focus:border-sky focus:outline-none"
                  aria-label="Color del avatar"
                >
                  {AVATAR_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 text-sm font-black text-ink shadow-hard"
                >
                  <Plus className="size-4" aria-hidden="true" />
                  Crear
                </button>
              </div>
              {studentMessage && (
                <p className="mt-3 rounded-xl border-2 border-ink/20 bg-paper-deep/40 p-2 text-sm font-bold text-ink">
                  {studentMessage}
                </p>
              )}
            </PaperCard>
          </form>
        </section>

        <section>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
            <Flag className="size-5 text-coral-deep" aria-hidden="true" />
            Moderar La Fogata
          </h2>
          <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
            sin aparecer como aula
          </p>
          <ul className="mt-3 space-y-3">
            {moderationThreads.map((thread) => {
              const author = profiles.find((profile) => profile.id === thread.authorId);
              const unit = units.find((item) => item.id === thread.unitId);

              return (
                <li key={thread.id}>
                  <PaperCard className="p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border-2 border-ink/20 bg-paper-deep px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-ink-soft">
                        {unit?.title ?? "Club"}
                      </span>
                      {thread.reported && (
                        <span className="text-[10px] font-black text-coral-deep">
                          reportada
                        </span>
                      )}
                      {thread.hidden && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-ink-soft">
                          <EyeOff className="size-3" aria-hidden="true" />
                          oculta
                        </span>
                      )}
                      {thread.pinned && (
                        <Pin className="size-3 text-coral-deep" aria-hidden="true" />
                      )}
                      {thread.status === "resolved" && (
                        <CircleCheck className="size-3 text-teal" aria-hidden="true" />
                      )}
                    </div>
                    <p className="mt-1 font-bold text-ink">{thread.title}</p>
                    <p className="text-xs font-semibold text-ink-soft">
                      por {author?.alias ?? "Aventurero"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => resolveThread(thread.id)}
                        className="rounded-lg border-2 border-ink bg-[#cce9e3] px-2 py-1 text-[10px] font-black text-ink"
                      >
                        {thread.status === "resolved" ? "Reabrir" : "Resolver"}
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePinThread(thread.id)}
                        className="rounded-lg border-2 border-ink bg-[#fbe7b8] px-2 py-1 text-[10px] font-black text-ink"
                      >
                        {thread.pinned ? "No fijar" : "Fijar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleHideThread(thread.id)}
                        className="rounded-lg border-2 border-ink bg-paper px-2 py-1 text-[10px] font-black text-ink"
                      >
                        {thread.hidden ? "Mostrar" : "Ocultar"}
                      </button>
                      <Link
                        href={`/club/${thread.id}`}
                        className="flex items-center gap-1 rounded-lg border-2 border-ink bg-paper px-2 py-1 text-[10px] font-black text-ink"
                      >
                        Abrir
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </PaperCard>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => {
              if (window.confirm("¿Reiniciar todos los datos de la demo?")) {
                resetDemo();
              }
            }}
            className="mt-4 flex items-center gap-2 rounded-xl border-2 border-ink bg-paper px-3 py-2 text-xs font-black text-ink shadow-hard"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Reiniciar demo
          </button>
        </section>
      </div>
    </div>
  );
}
