import seedExercises from "@/data/exercises.json";
import type { Exercise } from "@/types/exercise";

export const SEED_EXERCISES = seedExercises as unknown as Exercise[];

export function getSeedExercise(id: string): Exercise | undefined {
  return SEED_EXERCISES.find((exercise) => exercise.id === id);
}
