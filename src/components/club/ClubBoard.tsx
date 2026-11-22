"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CircleCheck,
  LogIn,
  MessageCircle,
  Pin,
  Plus,
  Sparkles,
} from "lucide-react";
import { Avatar } from "@/components/brand/Avatar";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { SquiggleDoodle } from "@/components/brand/Doodle";
import { useApp } from "@/context/AppProvider";
import { cn } from "@/lib/utils";

export function ClubBoard() {
  const searchParams = useSearchParams();
  const {
    ready,
    activeProfile,
    club,
    units,
    getProfile,
    getUnit,
    addThread,
  } = useApp();
  const [unitFilter, setUnitFilter] = useState(
    searchParams.get("unidad") ?? "all",
  );
  const [showForm, setShowForm] = useState(false);
  const [threadUnit, setThreadUnit] = useState(
    searchParams.get("unidad") ?? units[0]?.id ?? "",
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  const visibleThreads = useMemo(
    () =>
      club.threads
        .filter(
          (thread) =>
            (activeProfile?.role === "teacher" || !thread.hidden) &&
            (unitFilter === "all" || thread.unitId === unitFilter),
        )
        .sort((a, b) => {
          if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
          return b.createdAt.localeCompare(a.createdAt);
        }),
    [activeProfile, club.threads, unitFilter],
  );

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Encendiendo La Fogata...
        </p>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    const result = addThread(threadUnit, title, body);

    if (!result.ok) {
      setMessage({
        type: "error",
        text: result.error ?? "No pudimos publicar la duda.",
      });
      return;
    }

    setTitle("");
    setBody("");
    setShowForm(false);
    setMessage({ type: "ok", text: "Tu duda ya está en La Fogata." });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="relative grid gap-6 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-[#fbe7b8] p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <Sticker tone="coral">
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Club de aventureros
          </Sticker>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">
            La
            <span className="relative ml-2 inline-block">
              Fogata
              <SquiggleDoodle className="absolute -bottom-2 left-0 w-full text-coral" />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-ink-soft">
            Dudas, pistas y descubrimientos por capítulo. Puedes leer sin cuenta;
            para preguntar o responder necesitas tu alias.
          </p>
          {activeProfile ? (
            <button
              type="button"
              onClick={() => setShowForm((current) => !current)}
              className="mt-5 inline-flex items-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-coral-deep px-4 py-2.5 text-sm font-black text-paper shadow-hard"
            >
              <Plus className="size-4" aria-hidden="true" />
              Preguntar a la Fogata
            </button>
          ) : (
            <Link
              href="/entrar"
              className="mt-5 inline-flex items-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-[#cce9e3] px-4 py-2.5 text-sm font-black text-ink shadow-hard"
            >
              <LogIn className="size-4" aria-hidden="true" />
              Elegir alias para participar
            </Link>
          )}
        </div>
        <Mascot className="mx-auto size-36" />
      </section>

      {showForm && activeProfile && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 rounded-[1.2rem_0.8rem_1.4rem_0.9rem] border-2 border-ink bg-paper p-5 shadow-hard"
        >
          <h2 className="font-display text-2xl font-semibold text-ink">
            Abrir una conversación
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
            <div>
              <label htmlFor="club-unidad" className="text-sm font-black text-ink">
                Capítulo
              </label>
              <select
                id="club-unidad"
                value={threadUnit}
                onChange={(event) => setThreadUnit(event.target.value)}
                className="mt-1 h-11 w-full rounded-xl border-2 border-ink bg-paper-deep/40 px-3 font-bold text-ink focus:border-sky focus:outline-none"
              >
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="club-titulo" className="text-sm font-black text-ink">
                Tu pregunta
              </label>
              <input
                id="club-titulo"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ej. ¿Por qué llevamos una decena?"
                className="mt-1 h-11 w-full rounded-xl border-2 border-ink bg-paper-deep/40 px-3 font-bold text-ink focus:border-sky focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="club-cuerpo" className="text-sm font-black text-ink">
              Cuéntanos un poco más
            </label>
            <textarea
              id="club-cuerpo"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={3}
              placeholder="¿Qué parte no te queda clara?"
              className="mt-1 w-full rounded-xl border-2 border-ink bg-paper-deep/40 px-3 py-2 font-semibold text-ink focus:border-sky focus:outline-none"
            />
          </div>
          {message?.type === "error" && (
            <p className="mt-3 rounded-xl border-2 border-coral bg-[#f8d8d1] p-3 text-sm font-bold text-ink">
              {message.text}
            </p>
          )}
          <button
            type="submit"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral-deep px-4 py-2.5 text-sm font-black text-paper shadow-hard"
          >
            <Plus className="size-4" aria-hidden="true" />
            Publicar en La Fogata
          </button>
        </form>
      )}

      {message?.type === "ok" && (
        <p className="mt-4 rounded-xl border-2 border-teal bg-[#cce9e3] p-3 text-sm font-bold text-ink">
          {message.text}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setUnitFilter("all")}
          className={cn(
            "rounded-full border-2 px-3 py-1.5 text-xs font-black",
            unitFilter === "all"
              ? "border-ink bg-mustard text-ink shadow-hard"
              : "border-ink/20 bg-paper text-ink-soft",
          )}
        >
          Todas
        </button>
        {units.map((unit) => (
          <button
            key={unit.id}
            type="button"
            onClick={() => setUnitFilter(unit.id)}
            className={cn(
              "rounded-full border-2 px-3 py-1.5 text-xs font-black",
              unitFilter === unit.id
                ? "border-ink bg-mustard text-ink shadow-hard"
                : "border-ink/20 bg-paper text-ink-soft",
            )}
          >
            {unit.title}
          </button>
        ))}
      </div>

      <ul className="mt-5 space-y-3">
        {visibleThreads.map((thread, index) => {
          const author = getProfile(thread.authorId);
          const unit = getUnit(thread.unitId);
          const replies = club.replies.filter(
            (reply) => reply.threadId === thread.id && !reply.hidden,
          );

          return (
            <li key={thread.id}>
              <Link href={`/club/${thread.id}`} className="block">
                <PaperCard
                  className={cn(
                    "p-4 transition-transform hover:-translate-y-0.5 sm:p-5",
                    index % 2 === 0 ? "-rotate-1" : "rotate-1",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Sticker tone="paper">{unit?.title ?? "Club"}</Sticker>
                    {thread.pinned && (
                      <span className="flex items-center gap-1 text-xs font-black text-coral-deep">
                        <Pin className="size-3.5" aria-hidden="true" />
                        fijada
                      </span>
                    )}
                    {thread.status === "resolved" && (
                      <span className="flex items-center gap-1 text-xs font-black text-teal">
                        <CircleCheck className="size-3.5" aria-hidden="true" />
                        resuelta
                      </span>
                    )}
                    {thread.reported && (
                      <span className="text-xs font-black text-coral-deep">
                        reportada
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                    {thread.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-ink-soft">
                    {thread.body}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {author && (
                      <Avatar alias={author.alias} avatar={author.avatar} size="sm" />
                    )}
                    <span className="text-xs font-bold text-ink-soft">
                      {author?.alias ?? "Aventurero"} · {replies.length} respuesta
                      {replies.length === 1 ? "" : "s"}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-xs font-black text-sky">
                      Abrir
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </PaperCard>
              </Link>
            </li>
          );
        })}
      </ul>

      {visibleThreads.length === 0 && (
        <PaperCard className="mt-6 p-8 text-center">
          <Sparkles className="mx-auto size-8 text-mustard" aria-hidden="true" />
          <p className="mt-2 font-display text-2xl text-ink">
            Todavía no hay conversaciones aquí.
          </p>
          <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
            Puedes abrir la primera duda.
          </p>
        </PaperCard>
      )}
    </div>
  );
}
