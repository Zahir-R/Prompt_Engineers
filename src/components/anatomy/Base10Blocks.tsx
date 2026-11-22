import type { Base10Visual } from "@/types/exercise";

function UnitCluster({ count }: { count: number }) {
  const cubes = Math.max(1, Math.min(Math.round(count), 20));

  return (
    <span className="flex max-w-24 flex-wrap gap-0.5" title={`${count} unidades`}>
      {Array.from({ length: cubes }, (_, index) => (
        <span
          key={index}
          className="size-2.5 rounded-[3px] border border-ink/40 bg-orange-400"
        />
      ))}
    </span>
  );
}

export function Base10Blocks({ visual }: { visual: Base10Visual }) {
  const hasDecenas = visual.decenas.length > 0;
  const hasUnidades = visual.unidades.length > 0;

  if (!hasDecenas && !hasUnidades) return null;

  return (
    <div className="mt-4 flex flex-wrap items-end gap-6 rounded-[0.8rem_1.2rem_0.7rem_1rem] border-2 border-ink/20 bg-paper/80 p-4">
      {hasDecenas && (
        <div>
          <p className="mb-2 font-hand text-lg font-bold text-blue-700">
            decenas
          </p>
          <div className="flex items-end gap-1.5">
            {visual.decenas.map((value, index) => (
              <span
                key={index}
                title={`${value} decenas`}
                className="h-16 w-3.5 rounded-full border-2 border-ink/40 bg-blue-500"
              />
            ))}
          </div>
        </div>
      )}

      {hasUnidades && (
        <div>
          <p className="mb-2 font-hand text-lg font-bold text-orange-700">
            unidades
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {visual.unidades.map((value, index) => (
              <UnitCluster key={index} count={value} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
