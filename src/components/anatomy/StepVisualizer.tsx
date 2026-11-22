import { Base10Blocks } from "@/components/anatomy/Base10Blocks";
import type { VisualState } from "@/types/exercise";

export function StepVisualizer({ visual }: { visual?: VisualState | null }) {
  if (!visual) return null;

  if (visual.tipo === "base10") {
    return <Base10Blocks visual={visual} />;
  }

  if (visual.tipo === "agrupacion") {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink/20 bg-paper/80 p-4">
        <div>
          <p className="mb-2 font-hand text-lg font-bold text-emerald-700">
            grupos de 10
          </p>
          <div className="flex gap-2">
            {Array.from({ length: visual.grupos }, (_, index) => (
              <span
                key={index}
                className="flex size-12 items-center justify-center rounded-xl border-2 border-ink/40 bg-emerald-500 font-black text-white shadow-hard"
              >
                10
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-hand text-lg font-bold text-orange-700">
            sueltas
          </p>
          <span className="flex size-9 items-center justify-center rounded-lg border-2 border-ink/40 bg-orange-400 font-black text-white">
            {visual.sobrantes}
          </span>
        </div>
      </div>
    );
  }

  if (visual.tipo === "fraccion") {
    const total = Math.max(1, visual.denominador);
    const pintadas = Math.min(Math.max(visual.pintadas, 0), total);

    return (
      <div className="mt-4 rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink/20 bg-paper/80 p-4">
        <p className="mb-2 font-hand text-lg font-bold text-purple-700">
          fracción
        </p>
        <div className="flex overflow-hidden rounded-xl border-2 border-ink/40">
          {Array.from({ length: total }, (_, index) => (
            <span
              key={index}
              className={`h-10 flex-1 border-r-2 border-ink/20 last:border-r-0 ${
                index < pintadas ? "bg-purple-400" : "bg-purple-50"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-sm font-bold text-purple-800">
          {visual.pintadas}/{visual.denominador} partes
        </p>
      </div>
    );
  }

  return null;
}
