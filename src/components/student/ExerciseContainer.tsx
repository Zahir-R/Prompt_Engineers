"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Blocks, Lightbulb, Sparkles } from "lucide-react";
import { DeconstructionModal } from "@/components/anatomy/DeconstructionModal";
import {
  MathProblemView,
  type Feedback,
} from "@/components/student/MathProblemView";
import { useApp } from "@/context/AppProvider";

export function ExerciseContainer({ exerciseId }: { exerciseId: string }) {
  const { getExercise, progress, recordAttempt, markCompleted, ready } = useApp();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({ type: "idle", message: "" });
  const [anatomyOpen, setAnatomyOpen] = useState(false);

  const exercise = getExercise(exerciseId);

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-bold text-slate-600">Cargando el reto...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-semibold text-slate-900">
          No encontramos ese ejercicio
        </h1>
        <p className="mt-2 font-semibold text-slate-600">
          Revisa la ruta de aprendizaje para elegir otro reto.
        </p>
        <Link
          href="/ruta"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-bold text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a la ruta
        </Link>
      </div>
    );
  }

  const entry = progress[exercise.id];
  const attempts = entry?.attempts ?? 0;
  const solved = entry?.solved ?? false;

  const handleSubmit = () => {
    const parsed = Number(answer.trim().replace(",", "."));

    if (!answer.trim() || !Number.isFinite(parsed)) {
      setFeedback({
        type: "wrong",
        message: "Escribe un numero para que podamos comprobar tu respuesta.",
      });
      return;
    }

    const result = recordAttempt(exercise.id, parsed);

    if (result.correct) {
      markCompleted(exercise.id);
      setFeedback({
        type: "correct",
        message: "¡Muy bien! Encontraste la respuesta. Puedes ver el desglose para repasar el procedimiento.",
      });
      return;
    }

    setFeedback({
      type: "wrong",
      message:
        result.attempts >= 2
          ? "No pasa nada, los errores ayudan a aprender. Abrimos el Modo Desglose para descubrir juntos dónde está el detalle."
          : "Todavía no es la respuesta. Revisa con calma y vuelve a intentarlo; no hay castigos por error.",
    });

    if (result.attempts >= 2) {
      setAnatomyOpen(true);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/ruta"
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-white hover:text-slate-900"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver a la ruta
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <MathProblemView
          exercise={exercise}
          value={answer}
          onChange={setAnswer}
          onSubmit={handleSubmit}
          feedback={feedback}
          attempts={attempts}
          solved={solved}
          onOpenAnatomy={() => setAnatomyOpen(true)}
        />

        <aside className="space-y-4">
          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-blue-700">
              <Lightbulb className="size-4" aria-hidden="true" />
              Pista amable
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-blue-900">
              Puedes abrir el Modo Desglose cuando quieras. Si fallas dos veces,
              se abrirá automáticamente para acompañarte paso a paso.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
              <Blocks className="size-4" aria-hidden="true" />
              ¿Qué es el Modo Desglose?
            </p>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
              <li className="flex gap-2">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-blue-500" />
                Azul: datos iniciales.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-orange-500" />
                Naranja: operación.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-emerald-500" />
                Verde: agrupación o resultado intermedio.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-purple-500" />
                Violeta: respuesta final.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-amber-500" />
                Amarillo: verificación.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-amber-800">
              <Sparkles className="size-4" aria-hidden="true" />
              Recuerda
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-amber-900">
              Equivocarse es parte de aprender. Aquí no perdemos puntos: cada
              intento nos ayuda a encontrar el primer paso que necesita apoyo.
            </p>
          </div>
        </aside>
      </div>

      <DeconstructionModal
        exercise={exercise}
        open={anatomyOpen}
        onClose={() => setAnatomyOpen(false)}
      />
    </div>
  );
}
