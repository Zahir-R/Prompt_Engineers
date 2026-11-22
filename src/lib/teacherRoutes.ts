import type { ProgressEntry } from "@/types/exercise";
import type { TeacherRoute } from "@/types/teacherRoute";

export function getRouteProgress(
  route: TeacherRoute,
  progress: Record<string, ProgressEntry>,
) {
  const total = route.exerciseIds.length;
  const solved = route.exerciseIds.filter((id) => progress[id]?.solved).length;

  return {
    solved,
    total,
    percent: total === 0 ? 0 : Math.round((solved / total) * 100),
    complete: total > 0 && solved === total,
  };
}

export function getNextRouteExerciseId(
  route: TeacherRoute,
  exerciseId: string,
): string | undefined {
  const index = route.exerciseIds.indexOf(exerciseId);
  if (index < 0) return undefined;
  return route.exerciseIds[index + 1];
}
