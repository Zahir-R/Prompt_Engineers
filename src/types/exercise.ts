export type StepColor = "blue" | "orange" | "green" | "purple" | "yellow";

export interface Base10Visual {
  tipo: "base10";
  decenas: number[];
  unidades: number[];
}

export interface GroupingVisual {
  tipo: "agrupacion";
  grupos: number;
  sobrantes: number;
}

export interface FractionVisual {
  tipo: "fraccion";
  numerador: number;
  denominador: number;
  pintadas: number;
}

export type VisualState = Base10Visual | GroupingVisual | FractionVisual;

export interface StepChallenge {
  pregunta: string;
  opciones: string[];
  correcta: number;
  pista?: string;
}

export interface DesgloseStep {
  paso: number;
  titulo: string;
  color_tag: StepColor;
  explicacion: string;
  operacion_destacada?: string;
  visual_state?: VisualState | null;
  resultado_final?: number;
  reto?: StepChallenge;
}

export interface ExerciseData {
  num1: number;
  num2: number;
  operacion: string;
}

export interface Exercise {
  id: string;
  categoria: string;
  nivel: string;
  titulo: string;
  enunciado: string;
  datos: ExerciseData;
  respuesta_correcta: number;
  desglose_pasos: DesgloseStep[];
  metafora_grafica?: string;
}

export interface ProgressEntry {
  attempts: number;
  solved: boolean;
  lastAnswer: number | null;
  updatedAt: string;
}
