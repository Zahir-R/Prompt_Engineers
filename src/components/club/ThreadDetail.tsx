"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CircleCheck,
  Flag,
  LogIn,
  MessageCircle,
  Pin,
  Send,
  Shield,
  Sparkles,
  EyeOff,
} from "lucide-react";
import { Avatar } from "@/components/brand/Avatar";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { useApp } from "@/context/AppProvider";

export function ThreadDetail({ threadId }: { threadId: string }) {
  const {
    ready,
    activeProfile,
    club,
    getProfile,
    getUnit,
    addReply,
    resolveThread,
    togglePinThread,
    toggleHideThread,
    reportThread,
    reportReply,
  } = useApp();
  const [body, setBody] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo la conversación...
        </p>
      </div>
    );
  }

  const thread = club.threads.find((item) => item.id === threadId);

  if (!thread || (thread.hidden && activeProfile?.role !== "teacher")) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Mascot className="mx-auto size-40" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          Esta conversación no está disponible
        </h1>
        <Link
          href="/club"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 font-black text-ink shadow-hard"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a La Fogata
        </Link>
      </div>
    );
  }

  const author = getProfile(thread.authorId);
  const unit = getUnit(thread.unitId);
  const replies = club.replies.filter(
    (reply) =>
      reply.threadId === thread.id &&
      (activeProfile?.role === "teacher" || !reply.hidden),
  );

  const handleReply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    const result = addReply(thread.id, body);

    if (!result.ok) {
      setMessage({ type: "error", text: result.error ?? "No pudimos responder." });
      return;
    }

    setBody("");
    setMessage({ type: "ok", text: "Tu respuesta ya está en La Fogata." });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/club"
        className="inline-flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-2 text-sm font-black text-ink-soft hover:border-ink hover:bg-paper hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver a La Fogata
      </Link>

      {thread.hidden && (
        <div className="mt-3 rounded-xl border-2 border-coral bg-[#f8d8d1] p-3 text-sm font-bold text-ink">
          Esta conversación está oculta para los estudiantes.
        </div>
      )}

      <PaperCard strong className="relative mt-3 p-5 sm:p-6">
        <div className="tape -top-3 left-10" aria-hidden="true" />
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
            <span className="text-xs font-black text-coral-deep">reportada</span>
          )}
        </div>

        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">
          {thread.title}
        </h1>
        <p className="mt-3 text-base font-semibold leading-relaxed text-ink-soft">
          {thread.body}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {author && <Avatar alias={author.alias} avatar={author.avatar} size="sm" />}
          <span className="text-sm font-bold text-ink-soft">
            {author?.alias ?? "Aventurero"}
          </span>
          {activeProfile && !thread.reported && (
            <button
              type="button"
              onClick={() => reportThread(thread.id)}
              className="ml-auto flex items-center gap-1 text-xs font-black text-ink-soft hover:text-coral-deep"
            >
              <Flag className="size-3.5" aria-hidden="true" />
              Reportar
            </button>
          )}
        </div>

        {activeProfile?.role === "teacher" && (
          <div className="mt-4 flex flex-wrap gap-2 border-t-2 border-dashed border-ink/20 pt-3">
            <button
              type="button"
              onClick={() => resolveThread(thread.id)}
              className="flex items-center gap-1 rounded-lg border-2 border-ink bg-[#cce9e3] px-3 py-1.5 text-xs font-black text-ink"
            >
              <CircleCheck className="size-3.5" aria-hidden="true" />
              {thread.status === "resolved" ? "Reabrir" : "Resolver"}
            </button>
            <button
              type="button"
              onClick={() => togglePinThread(thread.id)}
              className="flex items-center gap-1 rounded-lg border-2 border-ink bg-[#fbe7b8] px-3 py-1.5 text-xs font-black text-ink"
            >
              <Pin className="size-3.5" aria-hidden="true" />
              {thread.pinned ? "Quitar fijada" : "Fijar"}
            </button>
            <button
              type="button"
              onClick={() => toggleHideThread(thread.id)}
              className="flex items-center gap-1 rounded-lg border-2 border-ink bg-paper px-3 py-1.5 text-xs font-black text-ink"
            >
              <EyeOff className="size-3.5" aria-hidden="true" />
              {thread.hidden ? "Mostrar" : "Ocultar"}
            </button>
          </div>
        )}
      </PaperCard>

      <section className="mt-6">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
          <MessageCircle className="size-5 text-coral-deep" aria-hidden="true" />
          Respuestas
        </h2>

        <ul className="mt-3 space-y-3">
          {replies.map((reply, index) => {
            const replyAuthor = getProfile(reply.authorId);

            return (
              <li
                key={reply.id}
                className={index % 2 === 0 ? "-rotate-1" : "rotate-1"}
              >
                <PaperCard className="p-4">
                  <div className="flex items-center gap-2">
                    {replyAuthor && (
                      <Avatar
                        alias={replyAuthor.alias}
                        avatar={replyAuthor.avatar}
                        size="sm"
                      />
                    )}
                    <span className="text-sm font-black text-ink">
                      {replyAuthor?.alias ?? "Aventurero"}
                    </span>
                    {reply.hidden && activeProfile?.role === "teacher" && (
                      <span className="text-xs font-black text-coral-deep">
                        oculta
                      </span>
                    )}
                    {activeProfile && !reply.reported && (
                      <button
                        type="button"
                        onClick={() => reportReply(reply.id)}
                        className="ml-auto flex items-center gap-1 text-xs font-black text-ink-soft hover:text-coral-deep"
                      >
                        <Flag className="size-3.5" aria-hidden="true" />
                        Reportar
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-ink-soft">
                    {reply.body}
                  </p>
                </PaperCard>
              </li>
            );
          })}
        </ul>

        {replies.length === 0 && (
          <p className="mt-3 font-hand text-xl font-bold text-ink-soft">
            Todavía no hay respuestas. ¿Te animas a dar una pista?
          </p>
        )}

        {activeProfile ? (
          <form onSubmit={handleReply} className="mt-5">
            <label htmlFor="respuesta-club" className="text-sm font-black text-ink">
              Tu respuesta
            </label>
            <textarea
              id="respuesta-club"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={3}
              placeholder="Escribe una pista o una explicación amable."
              className="mt-1 w-full rounded-xl border-2 border-ink bg-paper px-3 py-2 font-semibold text-ink focus:border-sky focus:outline-none"
            />
            {message && (
              <p
                className={
                  message.type === "error"
                    ? "mt-2 rounded-xl border-2 border-coral bg-[#f8d8d1] p-2 text-sm font-bold text-ink"
                    : "mt-2 rounded-xl border-2 border-teal bg-[#cce9e3] p-2 text-sm font-bold text-ink"
                }
              >
                {message.text}
              </p>
            )}
            <button
              type="submit"
              className="mt-3 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral-deep px-4 py-2.5 text-sm font-black text-paper shadow-hard"
            >
              <Send className="size-4" aria-hidden="true" />
              Responder
            </button>
          </form>
        ) : (
          <Link
            href="/entrar"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-[#cce9e3] px-4 py-2.5 text-sm font-black text-ink shadow-hard"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Elegir alias para responder
          </Link>
        )}
      </section>

      <div className="mt-6 flex items-start gap-3 rounded-xl border-2 border-ink/20 bg-paper-deep/40 p-4">
        <Shield className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden="true" />
        <p className="text-xs font-semibold leading-relaxed text-ink-soft">
          <Sparkles className="mr-1 inline size-3.5 text-mustard" aria-hidden="true" />
          La Fogata se guarda en este navegador. Comparte pistas, no datos
          personales. Si algo te incomoda, usa “Reportar”.
        </p>
      </div>
    </div>
  );
}
