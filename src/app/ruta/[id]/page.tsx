import { Suspense } from "react";
import { TeacherRouteDetail } from "@/components/route/TeacherRouteDetail";
import { createSeedTeacherRoutes } from "@/data/demo";

export function generateStaticParams() {
  return createSeedTeacherRoutes().map((route) => ({ id: route.id }));
}

export default function RoutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="font-hand text-2xl font-bold text-ink-soft">
            Abriendo la ruta...
          </p>
        </div>
      }
    >
      {params.then(({ id }) => (
        <TeacherRouteDetail routeId={id} />
      ))}
    </Suspense>
  );
}
