import type {
  Classroom,
  ClubState,
  ProgressByProfile,
  Unit,
  UserProfile,
} from "@/types/demo";
import type {
  CosmeticSticker,
  CosmeticsByProfile,
} from "@/types/cosmetics";

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
      email: "ana@mates.club",
      password: "mates2026",
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
    id: "unidad_n0",
    title: "Primeros pasos",
    description:
      "Cuenta, compara y resuelve tus primeras sumas y restas con objetos y figuras.",
    order: 0,
    exerciseIds: [
      "ejercicio_math_006",
      "ejercicio_math_007",
      "ejercicio_math_008",
      "ejercicio_math_009",
      "ejercicio_math_010",
    ],
    accent: "sky",
    levelId: "N0",
  },
  {
    id: "unidad_sumas",
    title: "Sumas que cruzan el 10",
    description:
      "Aprende a juntar cantidades y a llevar una decena cuando las unidades pasan de nueve.",
    order: 1,
    exerciseIds: ["ejercicio_math_001", "ejercicio_math_003"],
    accent: "coral",
    levelId: "N1",
  },
  {
    id: "unidad_restas",
    title: "Restas con préstamo",
    description:
      "Descubre cómo pedir prestada una decena para restar sin perderte.",
    order: 1,
    exerciseIds: ["ejercicio_math_002", "ejercicio_math_004"],
    accent: "teal",
    levelId: "N1",
  },
  {
    id: "unidad_reto",
    title: "El gran desafío",
    description:
      "Mezcla sumas y restas para demostrar todo lo que aprendiste en el cuaderno.",
    order: 1,
    exerciseIds: [
      "ejercicio_math_001",
      "ejercicio_math_002",
      "ejercicio_math_003",
      "ejercicio_math_004",
      "ejercicio_math_005",
    ],
    accent: "mustard",
    levelId: "N1",
  },
  {
    id: "unidad_n2",
    title: "Multiplicar y repartir",
    description:
      "Aprende a multiplicar, dividir y entender la fracción como parte de un todo.",
    order: 2,
    exerciseIds: [
      "ejercicio_math_011",
      "ejercicio_math_012",
      "ejercicio_math_013",
      "ejercicio_math_014",
      "ejercicio_math_015",
    ],
    accent: "teal",
    levelId: "N2",
  },
  {
    id: "unidad_n3",
    title: "Números grandes y figuras",
    description:
      "Opera con números grandes, calcula perímetros y descubre el área de las figuras.",
    order: 3,
    exerciseIds: [
      "ejercicio_math_016",
      "ejercicio_math_017",
      "ejercicio_math_018",
      "ejercicio_math_019",
      "ejercicio_math_020",
    ],
    accent: "mustard",
    levelId: "N3",
  },
  {
    id: "unidad_n4",
    title: "Fracciones y decimales",
    description:
      "Suma decimales, encuentra fracciones equivalentes y convierte unidades.",
    order: 4,
    exerciseIds: [
      "ejercicio_math_021",
      "ejercicio_math_022",
      "ejercicio_math_023",
      "ejercicio_math_024",
      "ejercicio_math_025",
    ],
    accent: "plum",
    levelId: "N4",
  },
  {
    id: "unidad_n5",
    title: "Proporciones y divisibilidad",
    description:
      "Descubre el mcm, el mcd, las fracciones heterogéneas y las proporciones.",
    order: 5,
    exerciseIds: [
      "ejercicio_math_026",
      "ejercicio_math_027",
      "ejercicio_math_028",
      "ejercicio_math_029",
      "ejercicio_math_030",
    ],
    accent: "coral",
    levelId: "N5",
  },
  {
    id: "unidad_n6",
    title: "Enteros y potencias",
    description:
      "Trabaja con números enteros, potencias, porcentajes y datos.",
    order: 6,
    exerciseIds: [
      "ejercicio_math_031",
      "ejercicio_math_032",
      "ejercicio_math_033",
      "ejercicio_math_034",
      "ejercicio_math_035",
    ],
    accent: "sky",
    levelId: "N6",
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

export const COSMETIC_STICKERS: CosmeticSticker[] = [
  {
    id: "lupa",
    label: "Lupa",
    description: "Para detectives que miran cada paso.",
    cost: 3,
    bg: "bg-[#d6e6f5]",
    text: "text-sky",
  },
  {
    id: "cohete",
    label: "Cohete",
    description: "Para quienes no paran de avanzar.",
    cost: 5,
    bg: "bg-[#f8d8d1]",
    text: "text-coral-deep",
  },
  {
    id: "estrella",
    label: "Estrella",
    description: "Para maestros del cuaderno.",
    cost: 8,
    bg: "bg-[#fbe7b8]",
    text: "text-ink",
  },
];

export function createSeedCosmetics(): CosmeticsByProfile {
  return {
    profile_sofia: { owned: ["cohete"], equipped: "cohete" },
    profile_mateo: { owned: [], equipped: null },
    guest: { owned: [], equipped: null },
  };
}
