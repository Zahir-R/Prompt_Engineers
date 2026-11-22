"use client";

import { useEffect, useRef } from "react";
import { CircleCheck, Stethoscope, X } from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { useApp } from "@/context/AppProvider";
import { cn } from "@/lib/utils";

interface DiagnosisModalProps {
  open: boolean;
  onClose: () => void;
}

export function DiagnosisModal({ open, onClose }: DiagnosisModalProps) {
  const { exercises, progress } = useApp();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButton.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const entries = exercises.map((exercise) => ({
    exercise,
    entry: progress[exercise.id],
  }));
  const attempted = entries.filter(({ entry }) => (entry?.attempts ?? 0) > 0);
  const solved = entries.filter(({ entry }) => entry?.solved);
  const needsSupport = attempted.find(({ entry }) => !entry?.solved);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnosis-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto"
      >
        <PaperCard strong className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Mascot className="size-20 shrink-0" />
              <div>
                <Sticker tone="mustard">
                  <Stethoscope className="size-3.5" aria-hidden="true" />
                  Para acompañantes
                </Sticker>
                <h2
                  id="diagnosis-title"
                  className="mt-2 font-display text-2xl font-semibold leading-tight text-ink"
                >
                  Resumen del cuaderno
                </h2>
                <p className="mt-1 text-sm font-semibold text-ink-soft">
                  Avance rápido, sin castigos ni puntajes negativos.
                </p>
              </div>
            </div>
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              className="rounded-xl border-2 border-ink bg-paper p-2 text-ink shadow-hard transition-transform hover:rotate-6"
              aria-label="Cerrar diagnóstico"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[0.8rem_1.1rem_0.7rem_1rem] border-2 border-ink bg-paper-deep p-3 text-center shadow-hard">
              <p className="font-display text-2xl font-black text-ink">
                {exercises.length}
              </p>
              <p className="text-xs font-bold text-ink-soft">Ejercicios</p>
            </div>
            <div className="rounded-[1rem_0.7rem_1.1rem_0.8rem] border-2 border-ink bg-[#cce9e3] p-3 text-center shadow-hard">
              <p className="font-display text-2xl font-black text-teal">
                {solved.length}
              </p>
              <p className="text-xs font-bold text-ink-soft">Dominados</p>
            </div>
            <div className="rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-[#fbe7b8] p-3 text-center shadow-hard">
              <p className="font-display text-2xl font-black text-coral-deep">
                {attempted.length}
              </p>
              <p className="text-xs font-bold text-ink-soft">Con intentos</p>
            </div>
          </div>

          <div className="paper-note mt-6 rotate-1 p-4">
            <p className="font-hand text-xl font-bold text-ink">
              punto de apoyo sugerido
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-ink">
              {needsSupport
                ? `Reforzar "${needsSupport.exercise.titulo}" porque todavía requiere apoyo.`
                : attempted.length === 0
                  ? "Aún no hay intentos. Invita al estudiante a resolver la primera hoja."
                  : "¡Buen trabajo! Los ejercicios intentados ya están dominados."}
            </p>
          </div>

          <ul className="mt-5 space-y-2">
            {exercises.map((exercise) => {
              const entry = progress[exercise.id];
              const status = entry?.solved
                ? "Dominado"
                : (entry?.attempts ?? 0) > 0
                  ? "En práctica"
                  : "Pendiente";

              return (
                <li
                  key={exercise.id}
                  className="flex items-center justify-between gap-3 rounded-[0.7rem_1rem_0.8rem_1.1rem] border-2 border-ink/30 bg-paper px-4 py-3"
                >
                  <span className="text-sm font-bold text-ink">
                    {exercise.titulo}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full border-2 border-ink/40 px-2.5 py-1 text-xs font-black",
                      status === "Dominado"
                        ? "bg-[#cce9e3] text-teal"
                        : status === "En práctica"
                          ? "bg-[#fbe7b8] text-ink"
                          : "bg-paper-deep text-ink-soft",
                    )}
                  >
                    {status === "Dominado" && (
                      <CircleCheck className="size-3.5" aria-hidden="true" />
                    )}
                    {status}
                  </span>
                </li>
              );
            })}
          </ul>
        </PaperCard>
      </div>
    </div>
  );
}
