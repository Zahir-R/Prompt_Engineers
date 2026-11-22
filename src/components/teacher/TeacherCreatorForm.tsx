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
import type { Exercise } from "@/types/exercise";
import { createId } from "@/lib/utils";

interface FormValues {
  titulo: string;
  enunciado: string;
  num1: string;
  num2: string;
  operacion: "+" | "-";
  respuesta: string;
}

const initialValues: FormValues = {
  titulo: "",
  enunciado: "",
  num1: "",
  num2: "",
  operacion: "+",
  respuesta: "",
};

const inputClass =
  "mt-1 h-12 w-full rounded-[0.7rem_1rem_0.8rem_1.1rem] border-2 border-ink bg-paper-deep/35 px-3 font-semibold text-ink focus:border-sky focus:bg-paper focus:outline-none";

function tens(value: number): number[] {
  const count = Math.max(0, Math.min(10, Math.floor(value / 10)));
  return Array.from({ length: count }, () => 10);
}

function buildExercise(values: FormValues, id: string): Exercise | null {
  const num1 = Number(values.num1);
  const num2 = Number(values.num2);
  const respuesta = Number(values.respuesta);

  if (
    !values.titulo.trim() ||
    !values.enunciado.trim() ||
    !Number.isFinite(num1) ||
    !Number.isFinite(num2) ||
    !Number.isFinite(respuesta)
  ) {
    return null;
  }

  return {
    id,
    categoria: values.operacion === "+" ? "Adicion" : "Sustraccion",
    nivel: "Personalizado",
    titulo: values.titulo.trim(),
    enunciado: values.enunciado.trim(),
    datos: { num1, num2, operacion: values.operacion },
    respuesta_correcta: respuesta,
    desglose_pasos: [
      {
        paso: 1,
        titulo: "Identificar los datos",
        color_tag: "blue",
        explicacion: `Trabajamos con los números ${num1} y ${num2}.`,
        visual_state: {
          tipo: "base10",
          decenas: [...tens(num1), ...tens(num2)],
          unidades: [num1 % 10, num2 % 10],
        },
      },
      {
        paso: 2,
        titulo: "Resolver la operación",
        color_tag: "orange",
        explicacion: `Realizamos la operación ${num1} ${values.operacion} ${num2}.`,
        operacion_destacada: `${num1} ${values.operacion} ${num2} = ${respuesta}`,
      },
      {
        paso: 3,
        titulo: "Respuesta final",
        color_tag: "purple",
        explicacion: `El resultado del ejercicio es ${respuesta}.`,
        resultado_final: respuesta,
      },
    ],
    metafora_grafica: "bloques_base_10",
  };
}

export function TeacherCreatorForm() {
  const { addExercise } = useApp();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const preview = useMemo(() => buildExercise(values, "preview_custom"), [values]);

  const update = <Key extends keyof FormValues,>(
    key: Key,
    value: FormValues[Key],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    setCreatedId(null);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = createId("custom");
    const exercise = buildExercise(values, id);

    if (!exercise) {
      setError("Completa el título, el enunciado, los números y la respuesta.");
      return;
    }

    addExercise(exercise);
    setCreatedId(id);
    setValues(initialValues);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/panel"
        className="inline-flex items-center gap-2 rounded-xl border-2 border-transparent px-3 py-2 text-sm font-black text-ink-soft hover:border-ink hover:bg-paper hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver al panel de guía
      </Link>

      <section className="relative mt-2 grid gap-5 rounded-[1.4rem_1rem_1.6rem_1.1rem] border-2 border-ink bg-[#cce9e3] p-6 shadow-hard sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
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
            Completa los datos y revisa el Modo Desglose antes de guardarlo. No
            necesitas escribir código.
          </p>
        </div>
        <Mascot className="mx-auto size-36" label="Tinta revisa tu nueva hoja" />
      </section>

      {createdId && (
        <div className="paper-note mt-5 flex flex-wrap items-center gap-3 p-4">
          <span className="flex items-center gap-2 font-bold text-ink">
            <CircleCheck className="size-5 text-teal" aria-hidden="true" />
            Ejercicio guardado en el cuaderno.
          </span>
          <Link
            href={`/ejercicio/${createdId}`}
            className="rounded-xl border-2 border-ink bg-teal px-3 py-2 text-sm font-black text-paper shadow-hard"
          >
            Probar ejercicio
          </Link>
          <Link
            href="/ruta"
            className="rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-black text-ink shadow-hard"
          >
            Ver en la ruta
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
            <span className="font-hand text-lg font-bold text-ink-soft">
              sin código
            </span>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
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

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="num1" className="text-sm font-black text-ink">
                    Número 1
                  </label>
                  <input
                    id="num1"
                    inputMode="numeric"
                    value={values.num1}
                    onChange={(event) => update("num1", event.target.value)}
                    placeholder="17"
                    className={`${inputClass} font-black`}
                  />
                </div>
                <div>
                  <label htmlFor="operacion" className="text-sm font-black text-ink">
                    Operación
                  </label>
                  <select
                    id="operacion"
                    value={values.operacion}
                    onChange={(event) =>
                      update("operacion", event.target.value === "-" ? "-" : "+")
                    }
                    className={`${inputClass} font-black`}
                  >
                    <option value="+">Suma (+)</option>
                    <option value="-">Resta (-)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="num2" className="text-sm font-black text-ink">
                    Número 2
                  </label>
                  <input
                    id="num2"
                    inputMode="numeric"
                    value={values.num2}
                    onChange={(event) => update("num2", event.target.value)}
                    placeholder="15"
                    className={`${inputClass} font-black`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="respuesta" className="text-sm font-black text-ink">
                  Respuesta correcta
                </label>
                <input
                  id="respuesta"
                  inputMode="numeric"
                  value={values.respuesta}
                  onChange={(event) => update("respuesta", event.target.value)}
                  placeholder="32"
                  className={`${inputClass} font-black`}
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-[0.7rem_1rem_0.8rem_1.1rem] border-2 border-mustard bg-[#fbe7b8] p-3 text-sm font-bold text-ink">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-coral-deep px-4 text-base font-black text-paper shadow-hard transition-transform hover:-rotate-1"
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
                Completa el título, el enunciado, los números y la respuesta para
                ver la vista previa.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
