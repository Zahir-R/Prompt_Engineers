import { Base10Blocks } from "@/components/anatomy/Base10Blocks";
import {
  FractionFigure,
  GeometryFigure,
  MarbleFigure,
} from "@/components/figures";
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
    return (
      <div className="mt-4 rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink/20 bg-paper/80 p-4">
        <FractionFigure
          tipo={visual.forma || "ambos"}
          denominador={visual.denominador}
          numerador={visual.pintadas}
          color="purple"
          interactivo={true}
        />
        <p className="mt-2 text-center text-sm font-bold text-purple-800">
          {visual.pintadas}/{visual.denominador} partes seleccionadas
        </p>
      </div>
    );
  }

  if (visual.tipo === "geometria") {
    return (
      <div className="mt-4 flex flex-col items-center rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink/20 bg-paper/80 p-4">
        <GeometryFigure
          tipo={visual.figura}
          anchoUnidades={visual.ancho ?? 5}
          altoUnidades={visual.alto ?? 3}
          modo={visual.modo ?? "area"}
        />
      </div>
    );
  }

  if (visual.tipo === "canicas") {
    return (
      <div className="mt-4 flex flex-col items-center rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink/20 bg-paper/80 p-4">
        <MarbleFigure
          modo={visual.modo}
          total={visual.total ?? 20}
          filas={visual.filas ?? 3}
          columnas={visual.columnas ?? 4}
          gruposReparto={visual.gruposReparto ?? 3}
          color={visual.color === "yellow" ? "yellow" : visual.color || "blue"}
        />
      </div>
    );
  }

  return null;
}
