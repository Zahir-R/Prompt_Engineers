import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  GraduationCap,
  Route,
  Sparkles,
  Trophy,
} from "lucide-react";
import { SEED_EXERCISES } from "@/lib/exercises";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">
            <Sparkles className="size-4" aria-hidden="true" />
            Abstracthon 2026 · Educación
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Matemática que se entiende,{" "}
            <span className="text-blue-600">paso a paso</span>.
          </h1>
          <p className="mt-4 max-w-xl text-lg font-semibold leading-relaxed text-slate-600">
            Retos cortos para primaria con un Modo Desglose que muestra el
            procedimiento en colores, metáforas visuales y explicaciones simples.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/ruta"
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-base font-black text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Route className="size-5" aria-hidden="true" />
              Empezar la ruta
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/docente"
              className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-base font-black text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
            >
              <GraduationCap className="size-5" aria-hidden="true" />
              Soy docente
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white bg-white/80 p-5 shadow-lg backdrop-blur">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
            <Trophy className="size-4 text-amber-500" aria-hidden="true" />
            El problema que atendemos
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-red-50 p-4">
              <p className="font-display text-4xl font-black text-red-600">9%</p>
              <p className="mt-1 text-xs font-bold text-red-700">
                alcanza el nivel mínimo en 6to de primaria
              </p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="font-display text-4xl font-black text-amber-600">35,8%</p>
              <p className="mt-1 text-xs font-bold text-amber-700">
                alcanza el nivel mínimo en 3ro de primaria
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500">
            Fuente: ERCE 2023, UNESCO.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-slate-900">
              <BookOpen className="size-5 text-blue-600" aria-hidden="true" />
              Ejercicios de práctica
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Dos retos listos para probar el Modo Desglose.
            </p>
          </div>
          <Link
            href="/ruta"
            className="text-sm font-black text-blue-700 hover:text-blue-900"
          >
            Ver ruta completa →
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {SEED_EXERCISES.map((exercise) => (
            <Link
              key={exercise.id}
              href={`/ejercicio/${exercise.id}`}
              className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-700">
                  {exercise.categoria}
                </span>
                <Blocks className="size-5 text-slate-300 transition-colors group-hover:text-blue-500" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-slate-900">
                {exercise.titulo}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm font-semibold text-slate-600">
                {exercise.enunciado}
              </p>
              <p className="mt-3 text-sm font-black text-blue-700">
                Resolver reto →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-blue-50 p-5">
          <p className="text-sm font-black text-blue-800">Modo Desglose</p>
          <p className="mt-1 text-sm font-semibold text-blue-900/80">
            Cada paso tiene color, explicación y apoyo visual.
          </p>
        </div>
        <div className="rounded-3xl bg-emerald-50 p-5">
          <p className="text-sm font-black text-emerald-800">Sin castigos</p>
          <p className="mt-1 text-sm font-semibold text-emerald-900/80">
            Los errores activan ayuda, no restan puntos.
          </p>
        </div>
        <div className="rounded-3xl bg-amber-50 p-5">
          <p className="text-sm font-black text-amber-800">Panel del adulto</p>
          <p className="mt-1 text-sm font-semibold text-amber-900/80">
            Un resumen claro del punto exacto que necesita apoyo.
          </p>
        </div>
      </section>
    </div>
  );
}
