import { Suspense } from "react";
import { UnitDetail } from "@/components/route/UnitDetail";
import { DEMO_UNITS } from "@/data/demo";

export function generateStaticParams() {
  return DEMO_UNITS.map((unit) => ({ id: unit.id }));
}

export default function UnitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="font-hand text-2xl font-bold text-ink-soft">
            Abriendo el capítulo...
          </p>
        </div>
      }
    >
      {params.then(({ id }) => (
        <UnitDetail unitId={id} />
      ))}
    </Suspense>
  );
}
