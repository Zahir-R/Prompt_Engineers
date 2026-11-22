"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Blocks, Lightbulb, Sparkles } from "lucide-react";
import { DeconstructionModal } from "@/components/anatomy/DeconstructionModal";
import { Mascot } from "@/components/brand/Mascot";
import { Sticker } from "@/components/brand/Sticker";
import {
  MathProblemView,
  type Feedback,
} from "@/components/student/MathProblemView";
import { useApp } from "@/context/AppProvider";

export function ExerciseContainer({ exerciseId }: { exerciseId: string }) {
  const {
    activeProfile,
    getExercise,
    getUnitForExercise,
    progress,
    recordAttempt,
    markCompleted,
    ready,
  } = useApp();
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback>({ type: "idle", message: "" });
  const [anatomyOpen, setAnatomyOpen] = useState(false);

  const exercise = getExercise(exerciseId);
  const unit = getUnitForExercise(exerciseId);
  const backHref = unit ? `/unidad/${unit.id}` : "/unidades";
  const backLabel = unit ? "Volver al capítulo" : "Volver a unidades";

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Abriendo el cuaderno...
        </p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Mascot className="mx-auto size-40" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          No encontramos ese ejercicio
        </h1>
        <p className="mt-2 font-semibold text-ink-soft">
          Revisa los capítulos para elegir otra hoja.
        </p>
        <Link
          href="/unidades"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 font-black text-ink shadow-hard"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a unidades
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
        message: "Escribe un número para que podamos comprobar tu respuesta.",
      });
      return;
    }

    const result = recordAttempt(exercise.id, parsed);

    if (result.correct) {
      markCompleted(exercise.id);
      setFeedback({
        type: "correct",
        message:
          activeProfile?.role === "student"
            ? "¡Muy bien! Encontraste la respuesta. Tu XP y tu racha ya se actualizaron."
            : "¡Muy bien! Encontraste la respuesta. Puedes ver el desglose para repasar el procedimiento.",
      });
      return;
    }

    setFeedback({
      type: "wrong",
      message:
        result.attempts >= 2
          ? "No pasa nada, los errores ayudan a aprender. Abrimos el Modo Desglose para descubrir juntos dónde está el detalle."
          : "Todavía no es la respuesta. Revisa con calma y vuelve a intentarlo; aquí no hay castigos por error.",
    });

    if (result.attempts >= 2) {
      setAnatomyOpen(true);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-2 text-sm font-black text-ink-soft transition-colors hover:border-ink hover:bg-paper hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {backLabel}
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
          backHref={backHref}
          backLabel={backLabel}
        />

        <aside className="space-y-5">
          <div className="paper-note relative rotate-1 p-5">
            <div className="tape -top-3 right-8" aria-hidden="true" />
            <p className="flex items-center gap-2 font-hand text-xl font-bold text-ink">
              <Lightbulb className="size-5 text-coral-deep" aria-hidden="true" />
              pista amable
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-ink-soft">
              Puedes abrir el Modo Desglose cuando quieras. Si fallas dos veces,
              se abrirá automáticamente para acompañarte paso a paso.
            </p>
          </div>

          <div className="relative -rotate-1">
            <div className="tape -top-3 left-8" aria-hidden="true" />
            <div className="rounded-[1rem_1.3rem_0.9rem_1.2rem] border-2 border-ink bg-paper p-5 shadow-hard">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-ink-soft">
                <Blocks className="size-4 text-teal" aria-hidden="true" />
                Los cinco colores
              </p>
              <ul className="mt-3 space-y-2 text-sm font-semibold text-ink-soft">
                <li className="flex gap-2">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-blue-500" />
                  Azul: datos iniciales.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-orange-500" />
                  Naranja: operación.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-emerald-500" />
                  Verde: agrupación o resultado intermedio.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-purple-500" />
                  Violeta: respuesta final.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-amber-500" />
                  Amarillo: verificación.
                </li>
              </ul>
            </div>
          </div>

          {!activeProfile && (
            <div className="rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-[#fbe7b8] p-5 shadow-hard">
              <p className="font-hand text-xl font-bold text-ink">
                Estás practicando como visitante
              </p>
              <p className="mt-1 text-sm font-semibold text-ink-soft">
                Tu avance se guarda en este navegador. Si eliges un alias, también
                guardas racha, XP y puedes entrar a La Fogata.
              </p>
              <Link
                href="/entrar"
                className="mt-3 inline-flex text-sm font-black text-coral-deep underline decoration-2 underline-offset-4"
              >
                Elegir mi alias
              </Link>
            </div>
          )}

          <div className="rounded-[1.2rem_0.8rem_1.4rem_0.9rem] border-2 border-ink bg-[#cce9e3] p-5 shadow-hard">
            <div className="flex items-start gap-3">
              <Mascot className="size-20 shrink-0" />
              <div>
                <Sticker tone="teal">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Recuerda
                </Sticker>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-ink">
                  Equivocarse es parte de aprender. Aquí no perdemos puntos:
                  cada intento nos ayuda a encontrar el primer paso que necesita
                  apoyo.
                </p>
              </div>
            </div>
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
