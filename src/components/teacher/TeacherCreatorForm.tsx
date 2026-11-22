"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, CircleCheck, GraduationCap, Plus, Sparkles } from "lucide-react";
import { AnatomyPanel } from "@/components/anatomy/AnatomyPanel";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { SquiggleDoodle } from "@/components/brand/Doodle";
import { useApp } from "@/context/AppProvider";
import { ROADMAP_LEVELS } from "@/data/roadmap";
import {
  buildExerciseFromTemplate,
  TEMPLATE_OPTIONS,
  type ExerciseTemplateType,
} from "@/lib/exerciseTemplates";
import type { RoadmapLevelId } from "@/types/roadmap";
import { createId } from "@/lib/utils";

interface FormValues {
  type: ExerciseTemplateType;
  levelId: RoadmapLevelId;
  titulo: string;
  enunciado: string;
  num1: string;
  num2: string;
}

const initialValues: FormValues = {
  type: "suma",
  levelId: "N1",
  titulo: "",
  enunciado: "",
  num1: "",
  num2: "",
};

const inputClass =
  "mt-1 h-12 w-full rounded-[0.7rem_1rem_0.8rem_1.1rem] border-2 border-ink bg-paper-deep/35 px-3 font-semibold text-ink focus:border-sky focus:bg-paper focus:outline-none";

function numberLabels(type: ExerciseTemplateType) {
  if (type === "geometria") return ["Largo", "Ancho"];
  if (type === "fraccion") return ["Numerador", "Denominador"];
  if (type === "division") return ["Total a repartir", "Cantidad de grupos"];
  return ["Número 1", "Número 2"];
}

export function TeacherCreatorForm({ embedded = false }: { embedded?: boolean }) {
  const { addExercise } = useApp();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [explanations, setExplanations] = useState<string[]>([]);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const draft = useMemo(
    () =>
      buildExerciseFromTemplate(
        {
          type: values.type,
          levelId: values.levelId,
          titulo: values.titulo,
          enunciado: values.enunciado,
          num1: Number(values.num1),
          num2: Number(values.num2),
        },
        "preview_custom",
        explanations,
      ),
    [values, explanations],
  );
  const preview = draft.exercise;
  const labels = numberLabels(values.type);

  const update = <Key extends keyof FormValues,>(
    key: Key,
    value: FormValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setCreatedId(null);
    setError("");
    if (["type", "levelId", "num1", "num2"].includes(key)) {
      setExplanations([]);
    }
  };

  const updateExplanation = (index: number, value: string) => {
    const base = preview?.desglose_pasos.map((step) => step.explicacion) ?? [];
    setExplanations((current) =>
      Array.from({ length: 5 }, (_, i) => current[i] ?? base[i] ?? "").map(
        (text, i) => (i === index ? value : text),
      ),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const id = createId("custom");
    const result = buildExerciseFromTemplate(
      {
        type: values.type,
        levelId: values.levelId,
        titulo: values.titulo,
        enunciado: values.enunciado,
        num1: Number(values.num1),
        num2: Number(values.num2),
      },
      id,
      explanations,
    );

    if (!result.exercise) {
      setError(result.error ?? "Completa los datos del ejercicio.");
      return;
    }

    addExercise(result.exercise);
    setCreatedId(id);
    setValues(initialValues);
    setExplanations([]);
  };

  return (
    <div className={embedded ? "" : "mx-auto max-w-6xl px-4 py-8"}>
      {!embedded && (
        <Link
          href="/panel"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-2 text-sm font-black text-ink-soft hover:border-ink hover:bg-paper hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al panel de guía
        </Link>
      )}

      <section className={embedded ? "hidden" : "relative mt-2 grid gap-5 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-[#cce9e3] p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"}>
        <div>
          <Sticker tone="paper">
            <GraduationCap className="size-3.5" aria-hidden="true" />
            Módulo docente
          </Sticker>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-ink sm:text-5xl">
            Escribe una
            <span className="relative ml-2 inline-block">
              hoja nueva
              <SquiggleDoodle className="absolute -bottom-2 left-0 w-full text-coral" />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-ink">
            Elige un tipo de ejercicio y completa los datos. La app genera los
            cinco pasos del desglose, el reto y la verificación; tú puedes ajustar
            las explicaciones.
          </p>
        </div>
        <Mascot className="mx-auto size-36" label="Tinta revisa tu nueva hoja" />
      </section>

      {embedded && (
        <div className="mb-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Crear un reto</h2>
          <p className="mt-1 text-sm font-semibold text-ink-soft">
            La app arma los cinco pasos y tú ajustas las explicaciones antes de
            guardar.
          </p>
        </div>
      )}

      {createdId && (
        <div className="paper-note mt-5 flex flex-wrap items-center gap-3 p-4">
          <span className="flex items-center gap-2 font-bold text-ink">
            <CircleCheck className="size-5 text-teal" aria-hidden="true" />
            Ejercicio guardado y publicado en los capítulos.
          </span>
          <Link
            href={`/ejercicio/${createdId}`}
            className="rounded-xl border-2 border-ink bg-teal px-3 py-2 text-sm font-black text-paper shadow-hard"
          >
            Probar ejercicio
          </Link>
          <Link
            href="/unidades"
            className="rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-black text-ink shadow-hard"
          >
            Ver en los capítulos
          </Link>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <PaperCard className="-rotate-1 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              <Plus className="size-5 text-coral-deep" aria-hidden="true" />
              Datos de la ficha
            </h2>
            <span className="font-hand text-lg font-bold text-ink-soft">sin código</span>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="nivel" className="text-sm font-black text-ink">
                    Nivel
                  </label>
                  <select
                    id="nivel"
                    value={values.levelId}
                    onChange={(event) =>
                      update("levelId", event.target.value as RoadmapLevelId)
                    }
                    className={inputClass}
                  >
                    {ROADMAP_LEVELS.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.id} · {level.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="tipo" className="text-sm font-black text-ink">
                    Tipo
                  </label>
                  <select
                    id="tipo"
                    value={values.type}
                    onChange={(event) =>
                      update("type", event.target.value as ExerciseTemplateType)
                    }
                    className={inputClass}
                  >
                    {TEMPLATE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="titulo" className="text-sm font-black text-ink">
                  Título
                </label>
                <input
                  id="titulo"
                  value={values.titulo}
                  onChange={(event) => update("titulo", event.target.value)}
                  placeholder="Ej. Ayuda a juntar las manzanas"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="enunciado" className="text-sm font-black text-ink">
                  Enunciado
                </label>
                <textarea
                  id="enunciado"
                  value={values.enunciado}
                  onChange={(event) => update("enunciado", event.target.value)}
                  rows={3}
                  placeholder="Escribe el problema con lenguaje sencillo."
                  className="mt-1 w-full rounded-[0.8rem_1.1rem_0.7rem_1.2rem] border-2 border-ink bg-paper-deep/35 px-3 py-2 font-semibold text-ink focus:border-sky focus:bg-paper focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="num1" className="text-sm font-black text-ink">
                    {labels[0]}
                  </label>
                  <input
                    id="num1"
                    inputMode="numeric"
                    value={values.num1}
                    onChange={(event) => update("num1", event.target.value)}
                    placeholder="17"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="num2" className="text-sm font-black text-ink">
                    {labels[1]}
                  </label>
                  <input
                    id="num2"
                    inputMode="numeric"
                    value={values.num2}
                    onChange={(event) => update("num2", event.target.value)}
                    placeholder="15"
                    className={inputClass}
                  />
                </div>
              </div>

              {preview && (
                <p className="rounded-xl border-2 border-teal bg-[#cce9e3] p-3 text-sm font-bold text-ink">
                  Respuesta correcta calculada: {preview.respuesta_correcta}. Los
                  pasos y la verificación se generan automáticamente.
                </p>
              )}

              {preview && (
                <details className="rounded-xl border-2 border-ink/20 bg-paper-deep/40 p-3">
                  <summary className="cursor-pointer text-sm font-black text-ink">
                    Editar explicaciones de los pasos
                  </summary>
                  <div className="mt-3 space-y-3">
                    {preview.desglose_pasos.map((step, index) => (
                      <div key={step.paso}>
                        <label
                          htmlFor={`explicacion-${index}`}
                          className="text-xs font-black uppercase tracking-wide text-ink-soft"
                        >
                          Paso {step.paso}: {step.titulo}
                        </label>
                        <textarea
                          id={`explicacion-${index}`}
                          value={
                            explanations[index] ?? step.explicacion
                          }
                          onChange={(event) =>
                            updateExplanation(index, event.target.value)
                          }
                          rows={2}
                          className="mt-1 w-full rounded-xl border-2 border-ink/30 bg-paper px-3 py-2 text-sm font-semibold text-ink focus:border-sky focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>

            {error && (
              <p className="mt-4 rounded-[0.7rem_1rem_0.8rem_1.1rem] border-2 border-mustard bg-[#fbe7b8] p-3 text-sm font-bold text-ink">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!preview}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-coral-deep px-4 text-base font-black text-paper shadow-hard transition-transform hover:-rotate-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="size-5" aria-hidden="true" />
              Guardar ejercicio
            </button>
          </form>
        </PaperCard>

        <div>
          {preview ? (
            <div className="lg:sticky lg:top-24">
              <p className="mb-2 flex items-center gap-2 font-hand text-xl font-bold text-ink-soft">
                <Sparkles className="size-5 text-mustard" aria-hidden="true" />
                vista previa en tiempo real
              </p>
              <div className="rotate-1">
                <AnatomyPanel exercise={preview} mode="preview" />
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-64 items-center justify-center rounded-[1.3rem_0.9rem_1.5rem_1rem] border-2 border-dashed border-ink/40 bg-paper/60 p-8 text-center">
              <p className="max-w-sm font-hand text-2xl font-bold leading-tight text-ink-soft">
                Completa el título, el enunciado y los números para ver la vista
                previa.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
