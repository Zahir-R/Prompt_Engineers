import type {
  DesgloseStep,
  Exercise,
  ExerciseInteraction,
  VisualState,
} from "@/types/exercise";
import type { RoadmapLevelId } from "@/types/roadmap";

export type ExerciseTemplateType =
  | "suma"
  | "resta"
  | "multiplicacion"
  | "division"
  | "fraccion"
  | "geometria";

export const TEMPLATE_OPTIONS: Array<{
  value: ExerciseTemplateType;
  label: string;
  hint: string;
}> = [
  { value: "suma", label: "Suma", hint: "Junta dos cantidades." },
  { value: "resta", label: "Resta", hint: "Quita una cantidad de otra." },
  { value: "multiplicacion", label: "Multiplicación", hint: "Repite grupos iguales." },
  { value: "division", label: "División", hint: "Reparte en grupos iguales." },
  { value: "fraccion", label: "Fracción", hint: "Parte de un todo." },
  { value: "geometria", label: "Área de rectángulo", hint: "Largo por ancho." },
];

export interface ExerciseTemplateInput {
  type: ExerciseTemplateType;
  levelId: RoadmapLevelId;
  titulo: string;
  enunciado: string;
  num1: number;
  num2: number;
}

export interface ExerciseTemplateResult {
  exercise: Exercise | null;
  error?: string;
}

function tens(value: number): number[] {
  return Array.from(
    { length: Math.max(0, Math.min(20, Math.floor(value / 10))) },
    () => 10,
  );
}

function strategy(type: ExerciseTemplateType) {
  switch (type) {
    case "suma":
      return {
        options: ["Sumar", "Restar", "Multiplicar"],
        correct: 0,
        explanation: "Para juntar las cantidades, sumamos.",
        hint: "Cuando algo aumenta o se junta, sumamos.",
      };
    case "resta":
      return {
        options: ["Sumar", "Restar", "Repartir"],
        correct: 1,
        explanation: "Para quitar una cantidad, restamos.",
        hint: "Cuando algo disminuye, restamos.",
      };
    case "multiplicacion":
      return {
        options: ["Sumar", "Multiplicar", "Restar"],
        correct: 1,
        explanation: "Hay grupos iguales, así que multiplicamos.",
        hint: "Multiplicar es sumar el mismo número varias veces.",
      };
    case "division":
      return {
        options: ["Multiplicar", "Repartir en grupos iguales", "Sumar"],
        correct: 1,
        explanation: "Para repartir en partes iguales, dividimos.",
        hint: "Dividir es repartir en grupos iguales.",
      };
    case "fraccion":
      return {
        options: ["Dividir el total en partes iguales", "Sumar todo", "Restar"],
        correct: 0,
        explanation: "La fracción indica partes iguales de un todo.",
        hint: "El denominador dice en cuántas partes se divide.",
      };
    case "geometria":
      return {
        options: ["Multiplicar largo por ancho", "Sumar los lados", "Restar"],
        correct: 0,
        explanation: "El área del rectángulo se calcula multiplicando largo por ancho.",
        hint: "Área = largo × ancho.",
      };
  }
}

function visualFor(
  type: ExerciseTemplateType,
  a: number,
  b: number,
): VisualState | undefined {
  if (type === "suma" || type === "resta") {
    if (a <= 99 && b <= 99 && a >= 0 && b >= 0) {
      return {
        tipo: "base10",
        decenas: [...tens(a), ...tens(b)],
        unidades: [a % 10, b % 10],
      };
    }
    return undefined;
  }

  if (type === "multiplicacion" && a <= 12 && b <= 12) {
    return {
      tipo: "canicas",
      modo: "multiplication",
      filas: a,
      columnas: b,
      objeto: "manzana",
    };
  }

  if (type === "division" && a <= 60 && b <= 12) {
    return {
      tipo: "canicas",
      modo: "sharing",
      total: a,
      gruposReparto: b,
      objeto: "manzana",
    };
  }

  if (type === "fraccion") {
    return {
      tipo: "fraccion",
      numerador: a,
      denominador: b,
      pintadas: a,
      forma: "barra",
    };
  }

  if (type === "geometria") {
    return {
      tipo: "geometria",
      figura: "rectangle",
      ancho: a,
      alto: b,
      modo: "area",
    };
  }

  return undefined;
}

function interactionFor(
  type: ExerciseTemplateType,
  a: number,
  b: number,
  answer: number,
): ExerciseInteraction | undefined {
  if ((type === "suma" || type === "resta") && a <= 99 && b <= 99 && answer <= 99) {
    return { tipo: "base10", max: 99 };
  }
  if (type === "multiplicacion" && answer <= 100) {
    return { tipo: "recta", min: 0, max: answer, paso: b };
  }
  if (type === "fraccion") {
    return { tipo: "fraccion", denominador: b, salida: "decimal" };
  }
  return undefined;
}

export function buildExerciseFromTemplate(
  input: ExerciseTemplateInput,
  id: string,
  explanations: string[] = [],
): ExerciseTemplateResult {
  const { type, num1: a, num2: b } = input;
  if (!input.titulo.trim() || !input.enunciado.trim()) {
    return { exercise: null, error: "Completa el título y el enunciado." };
  }
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return { exercise: null, error: "Escribe números válidos." };
  }

  let answer = 0;
  let operation = "+";
  let expression = `${a} + ${b}`;
  let category = "Adicion";
  let stepTexts: string[] = [];

  if (type === "suma") {
    answer = a + b;
    operation = "+";
    expression = `${a} + ${b}`;
    category = "Adicion";
    stepTexts = [
      `Identificamos las cantidades ${a} y ${b}.`,
      `Para juntar ambas cantidades, sumamos.`,
      `Resolvemos ${a} + ${b} = ${answer}.`,
      `La respuesta final es ${answer}.`,
      `Comprobamos: ${answer} − ${b} = ${a}.`,
    ];
  } else if (type === "resta") {
    if (a < b) {
      return { exercise: null, error: "En una resta, el primer número debe ser mayor o igual al segundo." };
    }
    answer = a - b;
    operation = "-";
    expression = `${a} - ${b}`;
    category = "Sustraccion";
    stepTexts = [
      `Empezamos con ${a} y quitamos ${b}.`,
      `Para quitar una cantidad, restamos.`,
      `Resolvemos ${a} − ${b} = ${answer}.`,
      `La respuesta final es ${answer}.`,
      `Comprobamos: ${answer} + ${b} = ${a}.`,
    ];
  } else if (type === "multiplicacion") {
    answer = a * b;
    operation = "×";
    expression = `${a} × ${b}`;
    category = "Multiplicacion";
    stepTexts = [
      `Tenemos ${a} grupos de ${b} elementos.`,
      `Como los grupos son iguales, multiplicamos.`,
      `Resolvemos ${a} × ${b} = ${answer}.`,
      `La respuesta final es ${answer}.`,
      `Comprobamos: ${answer} ÷ ${a} = ${b}.`,
    ];
  } else if (type === "division") {
    if (b === 0) {
      return { exercise: null, error: "No se puede dividir entre cero." };
    }
    if (a % b !== 0) {
      return { exercise: null, error: "Para esta plantilla, la división debe ser exacta." };
    }
    answer = a / b;
    operation = "÷";
    expression = `${a} ÷ ${b}`;
    category = "Division";
    stepTexts = [
      `Tenemos ${a} elementos para repartir en ${b} grupos iguales.`,
      `Para repartir en partes iguales, dividimos.`,
      `Resolvemos ${a} ÷ ${b} = ${answer}.`,
      `La respuesta final es ${answer}.`,
      `Comprobamos: ${answer} × ${b} = ${a}.`,
    ];
  } else if (type === "fraccion") {
    if (b <= 1 || a <= 0 || a > b) {
      return { exercise: null, error: "La fracción debe tener numerador mayor que 0 y menor o igual al denominador." };
    }
    if (![2, 4, 5, 8, 10].includes(b)) {
      return { exercise: null, error: "Usa denominadores 2, 4, 5, 8 o 10 para que el resultado decimal sea exacto." };
    }
    answer = a / b;
    operation = "fraccion";
    expression = `${a}/${b}`;
    category = "Fraccion";
    stepTexts = [
      `La fracción ${a}/${b} significa ${a} partes de ${b} partes iguales.`,
      `El denominador ${b} indica en cuántas partes se divide el entero.`,
      `El numerador ${a} indica cuántas partes tomamos: ${a}/${b} = ${answer}.`,
      `La respuesta decimal es ${answer}.`,
      `Comprobamos que ${answer} × ${b} = ${a}.`,
    ];
  } else {
    answer = a * b;
    operation = "×";
    expression = `${a} × ${b}`;
    category = "Geometria";
    stepTexts = [
      `El rectángulo mide ${a} de largo y ${b} de ancho.`,
      `El área se calcula multiplicando largo por ancho.`,
      `Resolvemos ${a} × ${b} = ${answer}.`,
      `La respuesta final es ${answer} metros cuadrados.`,
      `Comprobamos contando los cuadrados de la cuadrícula.`,
    ];
  }

  const strategyData = strategy(type);
  const visual = visualFor(type, a, b);
  const interaction = interactionFor(type, a, b, answer);

  const steps: DesgloseStep[] = [
    {
      paso: 1,
      titulo: "Identificar los datos",
      color_tag: "blue",
      explicacion: explanations[0]?.trim() || stepTexts[0],
      visual_state: visual,
    },
    {
      paso: 2,
      titulo: "Elegir la estrategia",
      color_tag: "orange",
      explicacion: explanations[1]?.trim() || stepTexts[1],
      reto: {
        pregunta: "¿Qué debemos hacer para resolver?",
        opciones: strategyData.options,
        correcta: strategyData.correct,
        pista: strategyData.hint,
      },
    },
    {
      paso: 3,
      titulo: "Resolver",
      color_tag: "green",
      explicacion: explanations[2]?.trim() || stepTexts[2],
      operacion_destacada: `${expression} = ${answer}`,
      visual_state: type === "fraccion" ? visual : undefined,
    },
    {
      paso: 4,
      titulo: "Respuesta final",
      color_tag: "purple",
      explicacion: explanations[3]?.trim() || stepTexts[3],
      resultado_final: answer,
    },
    {
      paso: 5,
      titulo: "Comprobar",
      color_tag: "yellow",
      explicacion: explanations[4]?.trim() || stepTexts[4],
    },
  ];

  return {
    exercise: {
      id,
      categoria: category,
      nivel: input.levelId,
      titulo: input.titulo.trim(),
      enunciado: input.enunciado.trim(),
      datos: { num1: a, num2: b, operacion: operation, expresion: expression },
      respuesta_correcta: answer,
      desglose_pasos: steps,
      metafora_grafica: type === "geometria" ? "figuras_geometricas" : type === "fraccion" ? "fracciones" : "bloques_base_10",
      levelId: input.levelId,
      interaccion: interaction,
    },
  };
}
