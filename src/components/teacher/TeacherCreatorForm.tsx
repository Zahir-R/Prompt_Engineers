"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { CircleCheck, GraduationCap, Plus, Sparkles } from "lucide-react";
import { AnatomyPanel } from "@/components/anatomy/AnatomyPanel";
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
        explicacion: `Trabajamos con los numeros ${num1} y ${num2}.`,
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
        explicacion: `Realizamos la operacion ${num1} ${values.operacion} ${num2}.`,
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
      setError("Completa el titulo, el enunciado, los numeros y la respuesta.");
      return;
    }

    addExercise(exercise);
    setCreatedId(id);
    setValues(initialValues);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white shadow-lg sm:p-8">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-100">
          <GraduationCap className="size-4" aria-hidden="true" />
          Módulo docente
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          Crea una actividad sin código
        </h1>
        <p className="mt-2 max-w-2xl font-semibold text-emerald-100">
          Completa los datos del ejercicio y revisa la vista previa del Modo
          Desglose antes de guardarlo.
        </p>
      </div>

      {createdId && (
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <span className="flex items-center gap-2 font-bold text-emerald-800">
            <CircleCheck className="size-5" aria-hidden="true" />
            Ejercicio guardado correctamente.
          </span>
          <Link
            href={`/ejercicio/${createdId}`}
            className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-black text-white"
          >
            Probar ejercicio
          </Link>
          <Link
            href="/ruta"
            className="rounded-xl bg-white px-3 py-2 text-sm font-black text-emerald-700"
          >
            Ver en la ruta
          </Link>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-slate-900">
            <Plus className="size-5 text-emerald-600" aria-hidden="true" />
            Datos del ejercicio
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="titulo"
                className="block text-sm font-black text-slate-700"
              >
                Titulo
              </label>
              <input
                id="titulo"
                value={values.titulo}
                onChange={(event) => update("titulo", event.target.value)}
                placeholder="Ej. Ayuda a juntar las manzanas"
                className="mt-1 h-12 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 font-semibold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="enunciado"
                className="block text-sm font-black text-slate-700"
              >
                Enunciado
              </label>
              <textarea
                id="enunciado"
                value={values.enunciado}
                onChange={(event) => update("enunciado", event.target.value)}
                rows={3}
                placeholder="Escribe el problema con lenguaje sencillo."
                className="mt-1 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="num1"
                  className="block text-sm font-black text-slate-700"
                >
                  Numero 1
                </label>
                <input
                  id="num1"
                  inputMode="numeric"
                  value={values.num1}
                  onChange={(event) => update("num1", event.target.value)}
                  placeholder="17"
                  className="mt-1 h-12 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 font-black text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="operacion"
                  className="block text-sm font-black text-slate-700"
                >
                  Operación
                </label>
                <select
                  id="operacion"
                  value={values.operacion}
                  onChange={(event) =>
                    update("operacion", event.target.value === "-" ? "-" : "+")
                  }
                  className="mt-1 h-12 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 font-black text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                >
                  <option value="+">Suma (+)</option>
                  <option value="-">Resta (-)</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="num2"
                  className="block text-sm font-black text-slate-700"
                >
                  Numero 2
                </label>
                <input
                  id="num2"
                  inputMode="numeric"
                  value={values.num2}
                  onChange={(event) => update("num2", event.target.value)}
                  placeholder="15"
                  className="mt-1 h-12 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 font-black text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="respuesta"
                className="block text-sm font-black text-slate-700"
              >
                Respuesta correcta
              </label>
              <input
                id="respuesta"
                inputMode="numeric"
                value={values.respuesta}
                onChange={(event) => update("respuesta", event.target.value)}
                placeholder="32"
                className="mt-1 h-12 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 font-black text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-900">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-base font-black text-white transition-colors hover:bg-emerald-700"
          >
            <Plus className="size-5" aria-hidden="true" />
            Guardar ejercicio
          </button>
        </form>

        <div>
          {preview ? (
            <div className="lg:sticky lg:top-24">
              <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
                <Sparkles className="size-4 text-amber-500" aria-hidden="true" />
                Vista previa en tiempo real
              </p>
              <AnatomyPanel exercise={preview} mode="preview" />
            </div>
          ) : (
            <div className="flex h-full min-h-64 items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/60 p-8 text-center">
              <p className="max-w-sm font-semibold text-slate-500">
                Completa el titulo, el enunciado, los numeros y la respuesta para
                ver la vista previa del Modo Desglose.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
