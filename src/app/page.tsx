import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  GraduationCap,
  Route,
  Sparkles,
} from "lucide-react";
import { ArrowDoodle, SquiggleDoodle, StarDoodle } from "@/components/brand/Doodle";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { SEED_EXERCISES } from "@/lib/exercises";

const colorSteps = [
  { color: "bg-blue-500", label: "Datos" },
  { color: "bg-orange-500", label: "Operación" },
  { color: "bg-emerald-500", label: "Agrupación" },
  { color: "bg-purple-500", label: "Respuesta" },
  { color: "bg-amber-500", label: "Verificación" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="relative">
          <Sticker tone="teal" className="rotate-[-2deg]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Abstracthon 2026 · Educación
          </Sticker>

          <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Las mates se aprenden{" "}
            <span className="relative inline-block">
              paso a paso
              <SquiggleDoodle className="absolute -bottom-3 left-0 w-full text-coral" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-ink-soft">
            Un cuaderno de aventuras para primaria. Resuelve retos cortos y abre
            el <strong className="text-ink">Modo Desglose</strong> cuando quieras
            ver el procedimiento en colores, bloques y palabras simples.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/ruta"
              className="flex items-center gap-2 rounded-[1rem_0.7rem_1.2rem_0.8rem] border-2 border-ink bg-coral-deep px-5 py-3 text-base font-black text-paper shadow-hard transition-transform hover:-rotate-1"
            >
              <Route className="size-5" aria-hidden="true" />
              Empezar la ruta
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/docente"
              className="flex items-center gap-2 rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-paper px-5 py-3 text-base font-black text-ink shadow-hard transition-transform hover:rotate-1"
            >
              <GraduationCap className="size-5" aria-hidden="true" />
              Soy docente
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="tape -top-3 left-8" aria-hidden="true" />
          <PaperCard strong className="relative rotate-1 p-6 pt-8 text-center">
            <Mascot className="mx-auto size-44" label="Tinta, la mascota búho de Mates" />
            <p className="mt-2 font-hand text-2xl font-bold leading-tight text-ink">
              “¡Hola! Soy Tinta. Si algo no sale, lo miramos por partes.”
            </p>
            <div className="mt-4 border-t-2 border-dashed border-ink/30 pt-3">
              <p className="text-xs font-black uppercase tracking-wide text-ink-soft">
                Un dato para conversar
              </p>
              <p className="mt-1 text-sm font-bold text-ink">
                En 6.º de primaria, solo <span className="text-coral-deep">9%</span>{" "}
                alcanza el nivel mínimo en matemática en Bolivia.
              </p>
              <p className="mt-1 text-[11px] font-semibold text-ink-soft">
                Fuente: ERCE 2023, UNESCO.
              </p>
            </div>
          </PaperCard>
          <ArrowDoodle className="absolute -bottom-10 -left-8 rotate-12 text-teal" />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-display text-3xl font-semibold text-ink">
              <BookOpen className="size-6 text-coral-deep" aria-hidden="true" />
              Fichas para hoy
            </h2>
            <p className="mt-1 font-hand text-xl font-bold text-ink-soft">
              elige una hoja y empieza a resolver
            </p>
          </div>
          <Link
            href="/ruta"
            className="font-black text-sky underline decoration-2 underline-offset-4 hover:text-ink"
          >
            Ver ruta completa →
          </Link>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {SEED_EXERCISES.map((exercise, index) => (
            <Link
              key={exercise.id}
              href={`/ejercicio/${exercise.id}`}
              className={index === 0 ? "sm:-rotate-1" : "sm:rotate-1"}
            >
              <PaperCard className="group h-full p-5 transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <Sticker tone={index === 0 ? "coral" : "plum"}>
                    {exercise.categoria}
                  </Sticker>
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl font-black text-sky"
                  >
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink">
                  {exercise.titulo}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm font-semibold leading-relaxed text-ink-soft">
                  {exercise.enunciado}
                </p>
                <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-ink/25 pt-3">
                  <span className="text-xs font-black uppercase tracking-wide text-ink-soft">
                    {exercise.nivel.replaceAll("_", " ")}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-black text-coral-deep">
                    Resolver
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </PaperCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <PaperCard className="relative -rotate-1 p-6">
          <StarDoodle className="absolute -right-3 -top-4 rotate-12 text-mustard" />
          <div className="flex items-center gap-2">
            <Blocks className="size-5 text-teal" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold text-ink">
              El Modo Desglose en cinco colores
            </h2>
          </div>
          <p className="mt-2 max-w-lg text-sm font-semibold leading-relaxed text-ink-soft">
            Cada color tiene un significado. No es decoración: es una pista para
            saber en qué parte del procedimiento estamos.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {colorSteps.map((step) => (
              <li
                key={step.label}
                className="flex items-center gap-2 rounded-xl border-2 border-ink/15 bg-paper-deep/50 px-3 py-2 text-sm font-black text-ink"
              >
                <span className={`size-3 rounded-full ${step.color}`} aria-hidden="true" />
                {step.label}
              </li>
            ))}
          </ul>
        </PaperCard>

        <div className="paper-note relative rotate-1 p-5">
          <div className="tape -top-3 right-8" aria-hidden="true" />
          <p className="font-hand text-2xl font-bold leading-tight text-ink">
            “Equivocarse no quita puntos. Abre una pista.”
          </p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-ink-soft">
            Si fallas dos veces, el desglose aparece solo. También puedes abrirlo
            cuando quieras con el botón <strong className="text-ink">Ver Modo Desglose</strong>.
          </p>
          <Link
            href="/ruta"
            className="mt-4 inline-flex items-center gap-1 font-black text-coral-deep underline decoration-2 underline-offset-4"
          >
            Ir a mi ruta
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
