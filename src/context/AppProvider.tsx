"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SEED_EXERCISES } from "@/lib/exercises";
import {
  CUSTOM_EXERCISES_STORAGE_KEY,
  DEMO_ANATOMY_KEY,
  DEMO_CLASSROOMS_KEY,
  DEMO_CLUB_KEY,
  DEMO_PROFILES_KEY,
  DEMO_PROGRESS_KEY,
  DEMO_SESSION_KEY,
  DEMO_SPARKS_KEY,
  DEMO_XP_KEY,
  PROGRESS_STORAGE_KEY,
} from "@/lib/constants";
import {
  createSeedClassrooms,
  createSeedClub,
  createSeedProfiles,
  createSeedProgress,
  createSeedSparks,
  DEMO_UNITS,
} from "@/data/demo";
import {
  createProfileId,
  daysBetween,
  getClassroomByCode,
  getLevelInfo,
  getUnitForExercise as findUnitForExercise,
  isAliasTaken,
  normalizeAlias,
  todayKey,
  xpKeyDay,
  xpKeyExercise,
  xpKeyUnit,
  XP_PER_DAY,
  XP_PER_DETECTIVE,
  XP_PER_EXERCISE,
  XP_PER_UNIT,
  SPARKS_PER_ANATOMY,
  SPARKS_PER_CHALLENGE,
  xpKeyAnatomy,
} from "@/lib/demo";
import { createId } from "@/lib/utils";
import type { Exercise, ProgressEntry } from "@/types/exercise";
import type { AnatomyByProfile, AnatomyEntry } from "@/types/anatomy";
import type {
  AvatarId,
  Classroom,
  ClubReply,
  ClubState,
  ClubThread,
  DemoSession,
  ProgressByProfile,
  Unit,
  UserProfile,
  XpAwards,
} from "@/types/demo";

interface AttemptResult {
  attempts: number;
  correct: boolean;
}

export interface CompletedReward {
  gained: number;
  detectiveBonus: boolean;
}

export interface AnatomyReward {
  sparksGained: number;
  alreadyCompleted: boolean;
}

export interface EnterClassResult {
  ok: boolean;
  error?: string;
  profileId?: string;
  imported?: number;
}

export interface AppContextValue {
  exercises: Exercise[];
  progress: Record<string, ProgressEntry>;
  progressByProfile: ProgressByProfile;
  anatomyProgress: Record<string, AnatomyEntry>;
  anatomyByProfile: AnatomyByProfile;
  sparks: number;
  sparksByProfile: Record<string, number>;
  ready: boolean;
  units: Unit[];
  profiles: UserProfile[];
  classrooms: Classroom[];
  club: ClubState;
  session: DemoSession;
  activeProfile: UserProfile | null;
  activeProfileId: string | null;
  isGuest: boolean;
  getExercise: (id: string) => Exercise | undefined;
  getProfile: (id: string) => UserProfile | undefined;
  getProfileProgress: (profileId: string) => Record<string, ProgressEntry>;
  getProfileSparks: (profileId: string) => number;
  getProfileAnatomy: (profileId: string) => Record<string, AnatomyEntry>;
  getAnatomyProgress: (exerciseId: string) => AnatomyEntry | undefined;
  getUnit: (id: string) => Unit | undefined;
  getUnitForExercise: (exerciseId: string) => Unit | undefined;
  addExercise: (exercise: Exercise) => void;
  recordAttempt: (id: string, answer: number) => AttemptResult;
  markCompleted: (id: string) => CompletedReward;
  recordAnatomyStep: (
    exerciseId: string,
    stepNumber: number,
    challengeCorrect: boolean,
  ) => { sparksGained: number };
  completeAnatomy: (exerciseId: string) => AnatomyReward;
  resetProgress: () => void;
  enterClass: (code: string, alias: string, avatar: AvatarId) => EnterClassResult;
  createStudentAlias: (
    code: string,
    alias: string,
    avatar: AvatarId,
  ) => EnterClassResult;
  switchProfile: (profileId: string | null) => void;
  logout: () => void;
  addThread: (
    unitId: string,
    title: string,
    body: string,
  ) => { ok: boolean; threadId?: string; error?: string };
  addReply: (
    threadId: string,
    body: string,
  ) => { ok: boolean; error?: string };
  resolveThread: (threadId: string) => void;
  togglePinThread: (threadId: string) => void;
  toggleHideThread: (threadId: string) => void;
  reportThread: (threadId: string) => void;
  reportReply: (replyId: string) => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

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

function createInitialProgress(): ProgressByProfile {
  const stored = readStorage<ProgressByProfile | null>(DEMO_PROGRESS_KEY, null);
  if (stored) return stored;

  const legacy = readStorage<Record<string, ProgressEntry>>(
    PROGRESS_STORAGE_KEY,
    {},
  );
  const seed = createSeedProgress();

  if (Object.keys(legacy).length > 0) {
    seed.guest = legacy;
  }

  return seed;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [customExercises, setCustomExercises] = useState<Exercise[]>(() =>
    readStorage<Exercise[]>(CUSTOM_EXERCISES_STORAGE_KEY, []),
  );
  const [profiles, setProfiles] = useState<UserProfile[]>(() =>
    readStorage<UserProfile[]>(DEMO_PROFILES_KEY, createSeedProfiles()),
  );
  const [classrooms, setClassrooms] = useState<Classroom[]>(() =>
    readStorage<Classroom[]>(DEMO_CLASSROOMS_KEY, createSeedClassrooms()),
  );
  const [session, setSession] = useState<DemoSession>(() =>
    readStorage<DemoSession>(DEMO_SESSION_KEY, { profileId: null }),
  );
  const [progressByProfile, setProgressByProfile] =
    useState<ProgressByProfile>(createInitialProgress);
  const [anatomyByProfile, setAnatomyByProfile] = useState<AnatomyByProfile>(
    () => readStorage<AnatomyByProfile>(DEMO_ANATOMY_KEY, {}),
  );
  const [sparksByProfile, setSparksByProfile] = useState<Record<string, number>>(
    () => readStorage<Record<string, number>>(DEMO_SPARKS_KEY, createSeedSparks()),
  );
  const [xpAwards, setXpAwards] = useState<XpAwards>(() =>
    readStorage<XpAwards>(DEMO_XP_KEY, {}),
  );
  const [club, setClub] = useState<ClubState>(() =>
    readStorage<ClubState>(DEMO_CLUB_KEY, createSeedClub()),
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeStorage(CUSTOM_EXERCISES_STORAGE_KEY, customExercises);
  }, [customExercises, ready]);

  useEffect(() => {
    if (!ready) return;
    writeStorage(DEMO_PROFILES_KEY, profiles);
  }, [profiles, ready]);

  useEffect(() => {
    if (!ready) return;
    writeStorage(DEMO_CLASSROOMS_KEY, classrooms);
  }, [classrooms, ready]);

  useEffect(() => {
    if (!ready) return;
    writeStorage(DEMO_SESSION_KEY, session);
  }, [session, ready]);

  useEffect(() => {
    if (!ready) return;
    writeStorage(DEMO_PROGRESS_KEY, progressByProfile);
  }, [progressByProfile, ready]);

  useEffect(() => {
    if (!ready) return;
    writeStorage(DEMO_ANATOMY_KEY, anatomyByProfile);
  }, [anatomyByProfile, ready]);

  useEffect(() => {
    if (!ready) return;
    writeStorage(DEMO_SPARKS_KEY, sparksByProfile);
  }, [sparksByProfile, ready]);

  useEffect(() => {
    if (!ready) return;
    writeStorage(DEMO_XP_KEY, xpAwards);
  }, [xpAwards, ready]);

  useEffect(() => {
    if (!ready) return;
    writeStorage(DEMO_CLUB_KEY, club);
  }, [club, ready]);

  const exercises = useMemo(() => {
    const byId = new Map<string, Exercise>();
    for (const exercise of [...SEED_EXERCISES, ...customExercises]) {
      byId.set(exercise.id, exercise);
    }
    return Array.from(byId.values());
  }, [customExercises]);

  const activeProfileId = session.profileId;
  const activeProfile = useMemo(
    () =>
      activeProfileId
        ? profiles.find((profile) => profile.id === activeProfileId) ?? null
        : null,
    [activeProfileId, profiles],
  );
  const progressKey = activeProfileId ?? "guest";
  const progress = useMemo(
    () => progressByProfile[progressKey] ?? {},
    [progressByProfile, progressKey],
  );

  const getExercise = useCallback(
    (id: string) => exercises.find((exercise) => exercise.id === id),
    [exercises],
  );

  const getProfile = useCallback(
    (id: string) => profiles.find((profile) => profile.id === id),
    [profiles],
  );

  const anatomyProgress = useMemo(
    () => anatomyByProfile[progressKey] ?? {},
    [anatomyByProfile, progressKey],
  );
  const sparks = sparksByProfile[progressKey] ?? 0;

  const getProfileProgress = useCallback(
    (profileId: string) => progressByProfile[profileId] ?? {},
    [progressByProfile],
  );

  const getProfileSparks = useCallback(
    (profileId: string) => sparksByProfile[profileId] ?? 0,
    [sparksByProfile],
  );

  const getProfileAnatomy = useCallback(
    (profileId: string) => anatomyByProfile[profileId] ?? {},
    [anatomyByProfile],
  );

  const getAnatomyProgress = useCallback(
    (exerciseId: string) => anatomyByProfile[progressKey]?.[exerciseId],
    [anatomyByProfile, progressKey],
  );

  const getUnit = useCallback(
    (id: string) => DEMO_UNITS.find((unit) => unit.id === id),
    [],
  );

  const getUnitForExercise = useCallback(
    (exerciseId: string) => findUnitForExercise(DEMO_UNITS, exerciseId),
    [],
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

  const importGuestProgress = useCallback(
    (profileId: string): number => {
      const guest = progressByProfile.guest ?? {};
      const target = progressByProfile[profileId] ?? {};
      const incoming = Object.entries(guest).filter(
        ([exerciseId]) => !target[exerciseId],
      );

      const solvedIncoming = incoming.filter(([, entry]) => entry.solved).length;
      const merged = {
        ...target,
        ...Object.fromEntries(incoming),
      };

      if (incoming.length > 0) {
        setProgressByProfile((current) => ({
          ...current,
          guest: {},
          [profileId]: merged,
        }));
      }

      const guestAnatomy = anatomyByProfile.guest ?? {};
      if (Object.keys(guestAnatomy).length > 0) {
        setAnatomyByProfile((current) => ({
          ...current,
          guest: {},
          [profileId]: {
            ...(current[profileId] ?? {}),
            ...guestAnatomy,
          },
        }));
      }

      const guestSparks = sparksByProfile.guest ?? 0;
      if (guestSparks > 0) {
        setSparksByProfile((current) => ({
          ...current,
          guest: 0,
          [profileId]: (current[profileId] ?? 0) + guestSparks,
        }));
      }

      if (solvedIncoming > 0) {
        const gained = solvedIncoming * XP_PER_EXERCISE;
        setProfiles((current) =>
          current.map((profile) =>
            profile.id === profileId
              ? {
                  ...profile,
                  xp: profile.xp + gained,
                  level: getLevelInfo(profile.xp + gained).level,
                }
              : profile,
          ),
        );
      }

      return solvedIncoming;
    },
    [anatomyByProfile, progressByProfile, sparksByProfile],
  );

  const enterClass = useCallback(
    (code: string, alias: string, avatar: AvatarId): EnterClassResult => {
      const classroom = getClassroomByCode(classrooms, code);
      if (!classroom) {
        return { ok: false, error: "Ese código de clase no existe." };
      }

      const cleanAlias = normalizeAlias(alias);
      if (cleanAlias.length < 2) {
        return { ok: false, error: "Tu alias necesita al menos 2 letras." };
      }

      if (cleanAlias.length > 20) {
        return { ok: false, error: "Usa un alias de 20 letras o menos." };
      }

      const existing = profiles.find(
        (profile) =>
          profile.classId === classroom.id &&
          profile.alias.toLocaleLowerCase("es") ===
            cleanAlias.toLocaleLowerCase("es"),
      );

      if (existing) {
        const imported = importGuestProgress(existing.id);
        setSession({ profileId: existing.id });
        return { ok: true, profileId: existing.id, imported };
      }

      if (isAliasTaken(profiles, classroom.id, cleanAlias)) {
        return { ok: false, error: "Ese alias ya está en la clase." };
      }

      const profile: UserProfile = {
        id: createProfileId(),
        role: "student",
        alias: cleanAlias,
        avatar,
        classId: classroom.id,
        xp: 0,
        level: 1,
        streakCurrent: 0,
        streakBest: 0,
        lastActivityDate: null,
      };

      setProfiles((current) => [...current, profile]);
      const imported = importGuestProgress(profile.id);
      setSession({ profileId: profile.id });
      return { ok: true, profileId: profile.id, imported };
    },
    [classrooms, importGuestProgress, profiles],
  );

  const createStudentAlias = useCallback(
    (code: string, alias: string, avatar: AvatarId): EnterClassResult => {
      const classroom = getClassroomByCode(classrooms, code);
      if (!classroom) {
        return { ok: false, error: "Ese código de clase no existe." };
      }

      const cleanAlias = normalizeAlias(alias);
      if (cleanAlias.length < 2) {
        return { ok: false, error: "El alias necesita al menos 2 letras." };
      }

      if (isAliasTaken(profiles, classroom.id, cleanAlias)) {
        return { ok: false, error: "Ese alias ya está en la clase." };
      }

      const profile: UserProfile = {
        id: createProfileId(),
        role: "student",
        alias: cleanAlias,
        avatar,
        classId: classroom.id,
        xp: 0,
        level: 1,
        streakCurrent: 0,
        streakBest: 0,
        lastActivityDate: null,
      };

      setProfiles((current) => [...current, profile]);
      return { ok: true, profileId: profile.id };
    },
    [classrooms, profiles],
  );

  const switchProfile = useCallback((profileId: string | null) => {
    setSession({ profileId });
  }, []);

  const logout = useCallback(() => {
    setSession({ profileId: null });
  }, []);

  const recordAttempt = useCallback(
    (id: string, answer: number): AttemptResult => {
      const exercise = exercises.find((item) => item.id === id);
      const correct = exercise?.respuesta_correcta === answer;
      const currentProgress = progressByProfile[progressKey] ?? {};
      const attempts = (currentProgress[id]?.attempts ?? 0) + 1;

      setProgressByProfile((current) => {
        const profileProgress = current[progressKey] ?? {};
        const previous = profileProgress[id];
        return {
          ...current,
          [progressKey]: {
            ...profileProgress,
            [id]: {
              attempts: (previous?.attempts ?? 0) + 1,
              solved: previous?.solved || correct,
              lastAnswer: answer,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });

      return { attempts, correct };
    },
    [exercises, progressByProfile, progressKey],
  );

  const markCompleted = useCallback(
    (id: string): CompletedReward => {
      const wasSolved = progressByProfile[progressKey]?.[id]?.solved ?? false;

      setProgressByProfile((current) => {
        const profileProgress = current[progressKey] ?? {};
        const previous = profileProgress[id];
        return {
          ...current,
          [progressKey]: {
            ...profileProgress,
            [id]: {
              attempts: previous?.attempts ?? 0,
              solved: true,
              lastAnswer: previous?.lastAnswer ?? null,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });

      if (
        wasSolved ||
        !activeProfile ||
        activeProfile.role !== "student"
      ) {
        return { gained: 0, detectiveBonus: false };
      }

      const currentAwards = xpAwards[activeProfile.id] ?? {};
      const nextAwards: Record<string, number> = { ...currentAwards };
      let gained = 0;

      const exerciseKey = xpKeyExercise(id);
      if (!currentAwards[exerciseKey]) {
        nextAwards[exerciseKey] = XP_PER_EXERCISE;
        gained += XP_PER_EXERCISE;
      }

      const detectiveBonus =
        Boolean(anatomyByProfile[progressKey]?.[id]?.completed) &&
        !currentAwards[xpKeyAnatomy(id)];

      if (detectiveBonus) {
        nextAwards[xpKeyAnatomy(id)] = XP_PER_DETECTIVE;
        gained += XP_PER_DETECTIVE;
      }

      for (const unit of DEMO_UNITS) {
        if (!unit.exerciseIds.includes(id)) continue;
        const unitKey = xpKeyUnit(unit.id);
        if (currentAwards[unitKey]) continue;

        const complete = unit.exerciseIds.every(
          (exerciseId) =>
            exerciseId === id ||
            (progressByProfile[progressKey]?.[exerciseId]?.solved ?? false),
        );

        if (complete) {
          nextAwards[unitKey] = XP_PER_UNIT;
          gained += XP_PER_UNIT;
        }
      }

      const today = todayKey();
      const dayKey = xpKeyDay(today);
      let nextStreak = activeProfile.streakCurrent;
      let nextBest = activeProfile.streakBest;
      let nextLast = activeProfile.lastActivityDate;

      if (!currentAwards[dayKey]) {
        nextAwards[dayKey] = XP_PER_DAY;
        gained += XP_PER_DAY;

        if (activeProfile.lastActivityDate === today) {
          nextStreak = Math.max(activeProfile.streakCurrent, 1);
        } else if (
          activeProfile.lastActivityDate &&
          daysBetween(activeProfile.lastActivityDate, today) === 1
        ) {
          nextStreak = activeProfile.streakCurrent + 1;
        } else {
          nextStreak = 1;
        }

        nextLast = today;
        nextBest = Math.max(activeProfile.streakBest, nextStreak);
      } else if (!activeProfile.lastActivityDate) {
        nextLast = today;
      }

      if (gained === 0) {
        return { gained: 0, detectiveBonus: false };
      }

      setXpAwards((current) => ({
        ...current,
        [activeProfile.id]: {
          ...(current[activeProfile.id] ?? {}),
          ...nextAwards,
        },
      }));

      setProfiles((current) =>
        current.map((profile) =>
          profile.id === activeProfile.id
            ? {
                ...profile,
                xp: profile.xp + gained,
                level: getLevelInfo(profile.xp + gained).level,
                streakCurrent: nextStreak,
                streakBest: nextBest,
                lastActivityDate: nextLast,
              }
            : profile,
        ),
      );

      return { gained, detectiveBonus };
    },
    [activeProfile, anatomyByProfile, progressByProfile, progressKey, xpAwards],
  );

  const resetProgress = useCallback(() => {
    setProgressByProfile((current) => ({
      ...current,
      [progressKey]: {},
    }));
  }, [progressKey]);

  const recordAnatomyStep = useCallback(
    (exerciseId: string, stepNumber: number, challengeCorrect: boolean) => {
      const key = progressKey;
      const previousEntry = anatomyByProfile[key]?.[exerciseId];
      const stepKey = String(stepNumber);
      const previousStep = previousEntry?.steps?.[stepKey];
      const sparksGained =
        challengeCorrect && !previousStep?.challengeSolved
          ? SPARKS_PER_CHALLENGE
          : 0;

      setAnatomyByProfile((current) => {
        const profileAnatomy = current[key] ?? {};
        const entry = profileAnatomy[exerciseId] ?? {
          steps: {},
          completed: false,
          updatedAt: new Date().toISOString(),
        };

        return {
          ...current,
          [key]: {
            ...profileAnatomy,
            [exerciseId]: {
              ...entry,
              steps: {
                ...entry.steps,
                [stepKey]: {
                  viewed: true,
                  challengeSolved:
                    previousStep?.challengeSolved || challengeCorrect,
                },
              },
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });

      if (sparksGained > 0) {
        setSparksByProfile((current) => ({
          ...current,
          [key]: (current[key] ?? 0) + sparksGained,
        }));
      }

      return { sparksGained };
    },
    [anatomyByProfile, progressKey],
  );

  const completeAnatomy = useCallback(
    (exerciseId: string): AnatomyReward => {
      const key = progressKey;
      const previousEntry = anatomyByProfile[key]?.[exerciseId];

      if (previousEntry?.completed) {
        return { sparksGained: 0, alreadyCompleted: true };
      }

      setAnatomyByProfile((current) => {
        const profileAnatomy = current[key] ?? {};
        const entry = profileAnatomy[exerciseId] ?? {
          steps: {},
          completed: false,
          updatedAt: new Date().toISOString(),
        };

        return {
          ...current,
          [key]: {
            ...profileAnatomy,
            [exerciseId]: {
              ...entry,
              completed: true,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });

      setSparksByProfile((current) => ({
        ...current,
        [key]: (current[key] ?? 0) + SPARKS_PER_ANATOMY,
      }));

      return {
        sparksGained: SPARKS_PER_ANATOMY,
        alreadyCompleted: false,
      };
    },
    [anatomyByProfile, progressKey],
  );

  const addThread = useCallback(
    (unitId: string, title: string, body: string) => {
      if (!activeProfile) {
        return { ok: false, error: "Entra con tu alias para preguntar." };
      }

      const cleanTitle = title.trim();
      const cleanBody = body.trim();
      if (cleanTitle.length < 4 || cleanBody.length < 8) {
        return {
          ok: false,
          error: "Escribe una pregunta un poco más completa.",
        };
      }

      const thread: ClubThread = {
        id: createId("thread"),
        unitId,
        authorId: activeProfile.id,
        title: cleanTitle,
        body: cleanBody,
        status: "open",
        pinned: false,
        hidden: false,
        reported: false,
        createdAt: new Date().toISOString(),
      };

      setClub((current) => ({
        ...current,
        threads: [thread, ...current.threads],
      }));

      return { ok: true, threadId: thread.id };
    },
    [activeProfile],
  );

  const addReply = useCallback(
    (threadId: string, body: string) => {
      if (!activeProfile) {
        return { ok: false, error: "Entra con tu alias para responder." };
      }

      const cleanBody = body.trim();
      if (cleanBody.length < 4) {
        return { ok: false, error: "Escribe una respuesta un poco más larga." };
      }

      const reply: ClubReply = {
        id: createId("reply"),
        threadId,
        authorId: activeProfile.id,
        body: cleanBody,
        hidden: false,
        reported: false,
        createdAt: new Date().toISOString(),
      };

      setClub((current) => ({
        ...current,
        replies: [...current.replies, reply],
      }));

      return { ok: true };
    },
    [activeProfile],
  );

  const resolveThread = useCallback(
    (threadId: string) => {
      if (activeProfile?.role !== "teacher") return;
      setClub((current) => ({
        ...current,
        threads: current.threads.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                status: thread.status === "resolved" ? "open" : "resolved",
              }
            : thread,
        ),
      }));
    },
    [activeProfile],
  );

  const togglePinThread = useCallback(
    (threadId: string) => {
      if (activeProfile?.role !== "teacher") return;
      setClub((current) => ({
        ...current,
        threads: current.threads.map((thread) =>
          thread.id === threadId ? { ...thread, pinned: !thread.pinned } : thread,
        ),
      }));
    },
    [activeProfile],
  );

  const toggleHideThread = useCallback(
    (threadId: string) => {
      if (activeProfile?.role !== "teacher") return;
      setClub((current) => ({
        ...current,
        threads: current.threads.map((thread) =>
          thread.id === threadId ? { ...thread, hidden: !thread.hidden } : thread,
        ),
      }));
    },
    [activeProfile],
  );

  const reportThread = useCallback((threadId: string) => {
    setClub((current) => ({
      ...current,
      threads: current.threads.map((thread) =>
        thread.id === threadId ? { ...thread, reported: true } : thread,
      ),
    }));
  }, []);

  const reportReply = useCallback((replyId: string) => {
    setClub((current) => ({
      ...current,
      replies: current.replies.map((reply) =>
        reply.id === replyId ? { ...reply, reported: true } : reply,
      ),
    }));
  }, []);

  const resetDemo = useCallback(() => {
    setProfiles(createSeedProfiles());
    setClassrooms(createSeedClassrooms());
    setSession({ profileId: null });
    setProgressByProfile(createSeedProgress());
    setAnatomyByProfile({});
    setSparksByProfile(createSeedSparks());
    setXpAwards({});
    setClub(createSeedClub());
    setCustomExercises([]);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      exercises,
      progress,
      progressByProfile,
      anatomyProgress,
      anatomyByProfile,
      sparks,
      sparksByProfile,
      ready,
      units: DEMO_UNITS,
      profiles,
      classrooms,
      club,
      session,
      activeProfile,
      activeProfileId,
      isGuest: !activeProfile,
      getExercise,
      getProfile,
      getProfileProgress,
      getProfileSparks,
      getProfileAnatomy,
      getAnatomyProgress,
      getUnit,
      getUnitForExercise,
      addExercise,
      recordAttempt,
      markCompleted,
      recordAnatomyStep,
      completeAnatomy,
      resetProgress,
      enterClass,
      createStudentAlias,
      switchProfile,
      logout,
      addThread,
      addReply,
      resolveThread,
      togglePinThread,
      toggleHideThread,
      reportThread,
      reportReply,
      resetDemo,
    }),
    [
      exercises,
      progress,
      progressByProfile,
      anatomyProgress,
      anatomyByProfile,
      sparks,
      sparksByProfile,
      ready,
      profiles,
      classrooms,
      club,
      session,
      activeProfile,
      activeProfileId,
      getExercise,
      getProfile,
      getProfileProgress,
      getProfileSparks,
      getProfileAnatomy,
      getAnatomyProgress,
      getUnit,
      getUnitForExercise,
      addExercise,
      recordAttempt,
      markCompleted,
      recordAnatomyStep,
      completeAnatomy,
      resetProgress,
      enterClass,
      createStudentAlias,
      switchProfile,
      logout,
      addThread,
      addReply,
      resolveThread,
      togglePinThread,
      toggleHideThread,
      reportThread,
      reportReply,
      resetDemo,
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
