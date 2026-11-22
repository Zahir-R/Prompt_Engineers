import type { ProgressEntry } from "@/types/exercise";
import type {
  AvatarId,
  Classroom,
  Unit,
  UserProfile,
} from "@/types/demo";
import { createId } from "@/lib/utils";

export const DEMO_TIME_ZONE = "America/La_Paz";
export const XP_PER_EXERCISE = 10;
export const XP_PER_UNIT = 20;
export const XP_PER_DAY = 5;

export const AVATAR_OPTIONS: Array<{
  id: AvatarId;
  label: string;
  bg: string;
  text: string;
}> = [
  { id: "teal", label: "Turquesa", bg: "bg-[#cce9e3]", text: "text-teal" },
  { id: "coral", label: "Coral", bg: "bg-[#f8d8d1]", text: "text-coral-deep" },
  { id: "mustard", label: "Mostaza", bg: "bg-[#fbe7b8]", text: "text-ink" },
  { id: "sky", label: "Cielo", bg: "bg-[#d6e6f5]", text: "text-sky" },
  { id: "plum", label: "Ciruela", bg: "bg-[#e2d8f2]", text: "text-plum" },
  { id: "ink", label: "Tinta", bg: "bg-ink", text: "text-paper" },
];

const LEVELS = [
  { min: 0, name: "Explorador" },
  { min: 40, name: "Aventurero" },
  { min: 100, name: "Rastreador" },
  { min: 200, name: "Maestro del cuaderno" },
] as const;

export function getAvatarOption(avatar: AvatarId) {
  return AVATAR_OPTIONS.find((option) => option.id === avatar) ?? AVATAR_OPTIONS[0];
}

export function getInitials(alias: string): string {
  return alias
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function normalizeAlias(alias: string): string {
  return alias.trim().replace(/\s+/g, " ");
}

export function isAliasTaken(
  profiles: UserProfile[],
  classId: string,
  alias: string,
  exceptId?: string,
): boolean {
  const normalized = normalizeAlias(alias).toLocaleLowerCase("es");
  return profiles.some(
    (profile) =>
      profile.id !== exceptId &&
      profile.classId === classId &&
      profile.alias.toLocaleLowerCase("es") === normalized,
  );
}

export function createProfileId(): string {
  return createId("student");
}

export function todayKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: DEMO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const value = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function parseDateKey(key: string): Date {
  return new Date(`${key}T00:00:00Z`);
}

export function formatDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(key: string, days: number): string {
  const date = parseDateKey(key);
  date.setUTCDate(date.getUTCDate() + days);
  return formatDateKey(date);
}

export function daysBetween(from: string, to: string): number {
  return Math.round(
    (parseDateKey(to).getTime() - parseDateKey(from).getTime()) / 86_400_000,
  );
}

export function formatShortDate(key: string): string {
  return new Intl.DateTimeFormat("es-BO", {
    weekday: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${key}T12:00:00Z`));
}

export function getLastDays(count = 7, today = todayKey()): string[] {
  return Array.from({ length: count }, (_, index) =>
    addDays(today, index - (count - 1)),
  );
}

export function getStreakDays(profile: UserProfile, count = 7) {
  const today = todayKey();
  const active =
    profile.lastActivityDate &&
    daysBetween(profile.lastActivityDate, today) <= 1
      ? profile.streakCurrent
      : 0;
  const activeDates = new Set<string>();

  if (profile.lastActivityDate && active > 0) {
    for (let index = 0; index < active; index += 1) {
      activeDates.add(addDays(profile.lastActivityDate, -index));
    }
  }

  return getLastDays(count, today).map((date) => ({
    date,
    active: activeDates.has(date),
    today: date === today,
  }));
}

export function getLevelInfo(xp: number) {
  let index = 0;
  for (let current = 0; current < LEVELS.length; current += 1) {
    if (xp >= LEVELS[current].min) index = current;
  }

  const current = LEVELS[index];
  const next = LEVELS[index + 1];
  const progress = next
    ? Math.min(
        100,
        Math.round(((xp - current.min) / (next.min - current.min)) * 100),
      )
    : 100;

  return {
    level: index + 1,
    name: current.name,
    min: current.min,
    nextMin: next?.min ?? null,
    progress,
  };
}

export function getUnitProgress(
  unit: Unit,
  progress: Record<string, ProgressEntry>,
) {
  const total = unit.exerciseIds.length;
  const solved = unit.exerciseIds.filter(
    (exerciseId) => progress[exerciseId]?.solved,
  ).length;

  return {
    solved,
    total,
    percent: total === 0 ? 0 : Math.round((solved / total) * 100),
    complete: total > 0 && solved === total,
  };
}

export function getSolvedCount(progress: Record<string, ProgressEntry>): number {
  return Object.values(progress).filter((entry) => entry.solved).length;
}

export function getUnitForExercise(
  units: Unit[],
  exerciseId: string,
): Unit | undefined {
  return units.find((unit) => unit.exerciseIds.includes(exerciseId));
}

export function getClassroomByCode(
  classrooms: Classroom[],
  code: string,
): Classroom | undefined {
  const normalized = code.trim().toLocaleUpperCase("es");
  return classrooms.find(
    (classroom) => classroom.code.toLocaleUpperCase("es") === normalized,
  );
}

export function xpKeyExercise(exerciseId: string): string {
  return `exercise:${exerciseId}`;
}

export function xpKeyUnit(unitId: string): string {
  return `unit:${unitId}`;
}

export function xpKeyDay(dateKey: string): string {
  return `day:${dateKey}`;
}
