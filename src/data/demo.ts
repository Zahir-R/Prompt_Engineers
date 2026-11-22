import type {
  Classroom,
  ClubState,
  ProgressByProfile,
  Unit,
  UserProfile,
} from "@/types/demo";

export const SEED_DAY = "2026-11-22";
export const SEED_PREVIOUS_DAY = "2026-11-21";

export const DEMO_CLASS_CODE = "MATES-3A";

export function createSeedProfiles(): UserProfile[] {
  return [
    {
      id: "profile_ana",
      role: "teacher",
      alias: "Profe Ana",
      avatar: "plum",
      classId: "class_mates_3a",
      xp: 0,
      level: 1,
      streakCurrent: 0,
      streakBest: 0,
      lastActivityDate: null,
    },
    {
      id: "profile_sofia",
      role: "student",
      alias: "Sofía",
      avatar: "teal",
      classId: "class_mates_3a",
      xp: 50,
      level: 2,
      streakCurrent: 3,
      streakBest: 5,
      lastActivityDate: SEED_DAY,
    },
    {
      id: "profile_mateo",
      role: "student",
      alias: "Mateo",
      avatar: "coral",
      classId: "class_mates_3a",
      xp: 10,
      level: 1,
      streakCurrent: 1,
      streakBest: 2,
      lastActivityDate: SEED_PREVIOUS_DAY,
    },
  ];
}

export function createSeedClassrooms(): Classroom[] {
  return [
    {
      id: "class_mates_3a",
      name: "Club MATES",
      code: DEMO_CLASS_CODE,
      teacherId: "profile_ana",
    },
  ];
}

export const DEMO_UNITS: Unit[] = [
  {
    id: "unidad_sumas",
    title: "Sumas que cruzan el 10",
    description:
      "Aprende a juntar cantidades y a llevar una decena cuando las unidades pasan de nueve.",
    order: 1,
    exerciseIds: ["ejercicio_math_001", "ejercicio_math_003"],
    accent: "coral",
  },
  {
    id: "unidad_restas",
    title: "Restas con préstamo",
    description:
      "Descubre cómo pedir prestada una decena para restar sin perderte.",
    order: 2,
    exerciseIds: ["ejercicio_math_002", "ejercicio_math_004"],
    accent: "teal",
  },
  {
    id: "unidad_reto",
    title: "El gran desafío",
    description:
      "Mezcla sumas y restas para demostrar todo lo que aprendiste en el cuaderno.",
    order: 3,
    exerciseIds: [
      "ejercicio_math_001",
      "ejercicio_math_002",
      "ejercicio_math_003",
      "ejercicio_math_004",
    ],
    accent: "mustard",
  },
];

export function createSeedProgress(): ProgressByProfile {
  return {
    profile_sofia: {
      ejercicio_math_001: {
        attempts: 1,
        solved: true,
        lastAnswer: 32,
        updatedAt: "2026-11-22T14:00:00.000Z",
      },
      ejercicio_math_003: {
        attempts: 2,
        solved: false,
        lastAnswer: 41,
        updatedAt: "2026-11-22T14:00:00.000Z",
      },
    },
    profile_mateo: {
      ejercicio_math_001: {
        attempts: 1,
        solved: true,
        lastAnswer: 32,
        updatedAt: "2026-11-21T18:00:00.000Z",
      },
      ejercicio_math_002: {
        attempts: 1,
        solved: false,
        lastAnswer: 24,
        updatedAt: "2026-11-21T18:10:00.000Z",
      },
    },
    guest: {},
  };
}

export function createSeedClub(): ClubState {
  return {
    threads: [
      {
        id: "thread_decena",
        unitId: "unidad_sumas",
        authorId: "profile_sofia",
        title: "¿Por qué llevamos una decena?",
        body: "En 7 + 5 = 12, no entiendo de dónde sale la decena que llevamos.",
        status: "resolved",
        pinned: true,
        hidden: false,
        reported: false,
        createdAt: "2026-11-21T16:00:00.000Z",
      },
      {
        id: "thread_prestamo",
        unitId: "unidad_restas",
        authorId: "profile_mateo",
        title: "No me sale la resta con préstamo",
        body: "Cuando pido prestado, ¿el número de arriba cambia?",
        status: "open",
        pinned: false,
        hidden: false,
        reported: false,
        createdAt: "2026-11-22T10:00:00.000Z",
      },
    ],
    replies: [
      {
        id: "reply_decena",
        threadId: "thread_decena",
        authorId: "profile_mateo",
        body: "Porque 12 tiene 1 decena y 2 unidades. La decena se va con las otras decenas.",
        hidden: false,
        reported: false,
        createdAt: "2026-11-22T11:00:00.000Z",
      },
    ],
  };
}

export function createSeedSparks(): Record<string, number> {
  return {
    profile_sofia: 6,
    profile_mateo: 1,
    guest: 0,
  };
}
