import type { Base10Visual } from "@/types/exercise";

function UnitCluster({ count }: { count: number }) {
  const cubes = Math.max(1, Math.min(Math.round(count), 20));

  return (
    <span className="flex max-w-24 flex-wrap gap-0.5" title={`${count} unidades`}>
      {Array.from({ length: cubes }, (_, index) => (
        <span
          key={index}
          className="size-2.5 rounded-[3px] bg-orange-400 shadow-sm"
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
    <div className="mt-4 flex flex-wrap items-end gap-6 rounded-2xl bg-white/70 p-4">
      {hasDecenas && (
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-blue-700">
            Decenas
          </p>
          <div className="flex items-end gap-1.5">
            {visual.decenas.map((value, index) => (
              <span
                key={index}
                title={`${value} decenas`}
                className="h-16 w-3.5 rounded-full bg-blue-500 shadow-sm"
              />
            ))}
          </div>
        </div>
      )}

      {hasUnidades && (
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-orange-700">
            Unidades
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
