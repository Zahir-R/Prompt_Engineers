import type { ProgressEntry } from "@/types/exercise";
import type { Unit } from "@/types/demo";
import type { RoadmapLevel } from "@/types/roadmap";
import { todayKey } from "@/lib/demo";

export function getLevelExerciseIds(level: RoadmapLevel, units: Unit[]): string[] {
  return Array.from(
    new Set(
      units
        .filter((unit) => unit.levelId === level.id)
        .flatMap((unit) => unit.exerciseIds),
    ),
  );
}

export function getLevelProgress(
  level: RoadmapLevel,
  units: Unit[],
  progress: Record<string, ProgressEntry>,
) {
  const exerciseIds = getLevelExerciseIds(level, units);
  const solved = exerciseIds.filter((id) => progress[id]?.solved).length;
  const total = exerciseIds.length;
  const levelUnits = units.filter((unit) => unit.levelId === level.id);
  const completeUnits = levelUnits.filter(
    (unit) =>
      unit.exerciseIds.length > 0 &&
      unit.exerciseIds.every((id) => progress[id]?.solved),
  ).length;

  return {
    solved,
    total,
    percent: total === 0 ? 0 : Math.round((solved / total) * 100),
    completeUnits,
    totalUnits: levelUnits.length,
    complete: total > 0 && solved === total,
  };
}

export function getCurrentLevel(
  levels: RoadmapLevel[],
  units: Unit[],
  progress: Record<string, ProgressEntry>,
): RoadmapLevel {
  const latestEntry = Object.entries(progress)
    .filter(([, entry]) => entry.updatedAt)
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))[0];

  if (latestEntry) {
    const [exerciseId] = latestEntry;
    const unit = units.find((item) => item.exerciseIds.includes(exerciseId));
    const level = levels.find((item) => item.id === unit?.levelId);
    if (level) return level;
  }

  return levels.find((level) => level.order === 0) ?? levels[0];
}

export function getTodaySolvedCount(progress: Record<string, ProgressEntry>): number {
  const today = todayKey();
  return Object.values(progress).filter(
    (entry) => entry.solved && entry.updatedAt.slice(0, 10) === today,
  ).length;
}

export function getNextExerciseIdForLevel(
  level: RoadmapLevel,
  units: Unit[],
  progress: Record<string, ProgressEntry>,
): string | undefined {
  return getLevelExerciseIds(level, units).find(
    (exerciseId) => !progress[exerciseId]?.solved,
  );
}

export function getNextExerciseId(
  exerciseId: string,
  units: Unit[],
  levels: RoadmapLevel[],
): string | undefined {
  const currentUnit = units.find((unit) =>
    unit.exerciseIds.includes(exerciseId),
  );
  if (!currentUnit) return undefined;

  const ordered: string[] = [];
  for (const level of [...levels].sort((a, b) => a.order - b.order)) {
    const seen = new Set<string>();
    for (const unit of units
      .filter((item) => item.levelId === level.id)
      .sort((a, b) => a.order - b.order)) {
      for (const id of unit.exerciseIds) {
        if (seen.has(id)) continue;
        seen.add(id);
        ordered.push(id);
      }
    }
  }

  const index = ordered.indexOf(exerciseId);
  return index >= 0 ? ordered[index + 1] : undefined;
}
