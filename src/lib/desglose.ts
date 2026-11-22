import type { DesgloseStep, Exercise, StepColor } from "@/types/exercise";

export interface StepColorMeta {
  label: string;
  badge: string;
  panel: string;
  dot: string;
}

export const STEP_COLORS: Record<StepColor, StepColorMeta> = {
  blue: {
    label: "Datos iniciales",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    panel: "border-blue-200 bg-blue-50",
    dot: "bg-blue-500",
  },
  orange: {
    label: "Operación",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    panel: "border-orange-200 bg-orange-50",
    dot: "bg-orange-500",
  },
  green: {
    label: "Agrupación",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    panel: "border-emerald-200 bg-emerald-50",
    dot: "bg-emerald-500",
  },
  purple: {
    label: "Respuesta final",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    panel: "border-purple-200 bg-purple-50",
    dot: "bg-purple-500",
  },
  yellow: {
    label: "Verificación",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    panel: "border-amber-200 bg-amber-50",
    dot: "bg-amber-500",
  },
};

export function getStepMeta(color: string | undefined): StepColorMeta {
  return STEP_COLORS[color as StepColor] ?? STEP_COLORS.blue;
}

export function getOrderedSteps(exercise: Exercise): DesgloseStep[] {
  return [...exercise.desglose_pasos].sort((a, b) => a.paso - b.paso);
}

export function clampStepIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.max(index, 0), total - 1);
}
