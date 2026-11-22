"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { SEED_EXERCISES } from "@/lib/exercises";
import {
  CUSTOM_EXERCISES_STORAGE_KEY,
  PROGRESS_STORAGE_KEY,
} from "@/lib/constants";
import type { Exercise, ProgressEntry } from "@/types/exercise";

interface AttemptResult {
  attempts: number;
  correct: boolean;
}

export interface AppContextValue {
  exercises: Exercise[];
  progress: Record<string, ProgressEntry>;
  ready: boolean;
  getExercise: (id: string) => Exercise | undefined;
  addExercise: (exercise: Exercise) => void;
  recordAttempt: (id: string, answer: number) => AttemptResult;
  markCompleted: (id: string) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const subscribeToClient = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const isClient = useIsClient();
  const [customExercises, setCustomExercises] = useState<Exercise[]>(() =>
    readStorage<Exercise[]>(CUSTOM_EXERCISES_STORAGE_KEY, []),
  );
  const [progress, setProgress] = useState<Record<string, ProgressEntry>>(() =>
    readStorage<Record<string, ProgressEntry>>(PROGRESS_STORAGE_KEY, {}),
  );

  useEffect(() => {
    if (!isClient) return;
    writeStorage(CUSTOM_EXERCISES_STORAGE_KEY, customExercises);
  }, [customExercises, isClient]);

  useEffect(() => {
    if (!isClient) return;
    writeStorage(PROGRESS_STORAGE_KEY, progress);
  }, [progress, isClient]);

  const exercises = useMemo(() => {
    const byId = new Map<string, Exercise>();
    for (const exercise of [...SEED_EXERCISES, ...customExercises]) {
      byId.set(exercise.id, exercise);
    }
    return Array.from(byId.values());
  }, [customExercises]);

  const getExercise = useCallback(
    (id: string) => exercises.find((exercise) => exercise.id === id),
    [exercises],
  );

  const addExercise = useCallback((exercise: Exercise) => {
    setCustomExercises((current) => {
      const exists = current.some((item) => item.id === exercise.id);
      if (!exists) return [...current, exercise];
      return current.map((item) =>
        item.id === exercise.id ? exercise : item,
      );
    });
  }, []);

  const recordAttempt = useCallback(
    (id: string, answer: number): AttemptResult => {
      const exercise = exercises.find((item) => item.id === id);
      const correct = exercise?.respuesta_correcta === answer;
      const attempts = (progress[id]?.attempts ?? 0) + 1;

      setProgress((current) => {
        const previous = current[id];
        return {
          ...current,
          [id]: {
            attempts: (previous?.attempts ?? 0) + 1,
            solved: previous?.solved || correct,
            lastAnswer: answer,
            updatedAt: new Date().toISOString(),
          },
        };
      });

      return { attempts, correct };
    },
    [exercises, progress],
  );

  const markCompleted = useCallback((id: string) => {
    setProgress((current) => {
      const previous = current[id];
      return {
        ...current,
        [id]: {
          attempts: previous?.attempts ?? 0,
          solved: true,
          lastAnswer: previous?.lastAnswer ?? null,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({});
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      exercises,
      progress,
      ready: isClient,
      getExercise,
      addExercise,
      recordAttempt,
      markCompleted,
      resetProgress,
    }),
    [
      exercises,
      progress,
      isClient,
      getExercise,
      addExercise,
      recordAttempt,
      markCompleted,
      resetProgress,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de AppProvider");
  }
  return context;
}
