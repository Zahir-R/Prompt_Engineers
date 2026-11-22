"use client";

import { useEffect, useRef } from "react";
import { CircleCheck, Stethoscope, X } from "lucide-react";
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
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnosis-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Stethoscope className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h2
                id="diagnosis-title"
                className="font-display text-2xl font-semibold text-slate-900"
              >
                Resumen para acompañante
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Una vista rápida del avance, sin castigos ni puntajes negativos.
              </p>
            </div>
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Cerrar diagnóstico"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-slate-100 p-3 text-center">
            <p className="text-2xl font-black text-slate-900">{exercises.length}</p>
            <p className="text-xs font-semibold text-slate-500">Ejercicios</p>
          </div>
          <div className="rounded-2xl bg-emerald-100 p-3 text-center">
            <p className="text-2xl font-black text-emerald-700">{solved.length}</p>
            <p className="text-xs font-semibold text-emerald-700">Dominados</p>
          </div>
          <div className="rounded-2xl bg-amber-100 p-3 text-center">
            <p className="text-2xl font-black text-amber-800">{attempted.length}</p>
            <p className="text-xs font-semibold text-amber-800">Con intentos</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
            Punto de apoyo sugerido
          </p>
          <p className="mt-1 text-sm font-semibold text-blue-900">
            {needsSupport
              ? `Reforzar "${needsSupport.exercise.titulo}" porque todavía requiere apoyo.`
              : attempted.length === 0
                ? "Aún no hay intentos. Invita al estudiante a resolver el primer reto."
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
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3"
              >
                <span className="text-sm font-bold text-slate-800">
                  {exercise.titulo}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
                    status === "Dominado"
                      ? "bg-emerald-100 text-emerald-700"
                      : status === "En práctica"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-500",
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
      </div>
    </div>
  );
}
