import { Suspense } from "react";
import { ExerciseContainer } from "@/components/student/ExerciseContainer";
import { SEED_EXERCISES } from "@/lib/exercises";

export function generateStaticParams() {
  return SEED_EXERCISES.map((exercise) => ({ id: exercise.id }));
}

export default function ExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="font-hand text-2xl font-bold text-ink-soft">
            Abriendo el cuaderno...
          </p>
        </div>
      }
    >
      {params.then(({ id }) => (
        <ExerciseContainer exerciseId={id} />
      ))}
    </Suspense>
  );
}
