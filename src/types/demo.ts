import type { ProgressEntry } from "@/types/exercise";

export type UserRole = "student" | "teacher";

export type AvatarId = "teal" | "coral" | "mustard" | "sky" | "plum" | "ink";

export interface UserProfile {
  id: string;
  role: UserRole;
  alias: string;
  avatar: AvatarId;
  classId: string;
  xp: number;
  level: number;
  streakCurrent: number;
  streakBest: number;
  lastActivityDate: string | null;
}

export interface Classroom {
  id: string;
  name: string;
  code: string;
  teacherId: string;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  order: number;
  exerciseIds: string[];
  accent: "coral" | "mustard" | "teal" | "sky" | "plum";
}

export interface ClubThread {
  id: string;
  unitId: string;
  authorId: string;
  title: string;
  body: string;
  status: "open" | "resolved";
  pinned: boolean;
  hidden: boolean;
  reported: boolean;
  createdAt: string;
}

export interface ClubReply {
  id: string;
  threadId: string;
  authorId: string;
  body: string;
  hidden: boolean;
  reported: boolean;
  createdAt: string;
}

export interface ClubState {
  threads: ClubThread[];
  replies: ClubReply[];
}

export interface DemoSession {
  profileId: string | null;
}

export type ProgressByProfile = Record<
  string,
  Record<string, ProgressEntry>
>;

export type XpAwards = Record<string, Record<string, number>>;
