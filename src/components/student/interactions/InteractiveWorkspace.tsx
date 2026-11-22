"use client";

import type { Exercise } from "@/types/exercise";
import { Base10Builder } from "@/components/student/interactions/Base10Builder";
import { NumberLine } from "@/components/student/interactions/NumberLine";
import { FractionShade } from "@/components/student/interactions/FractionShade";

interface InteractiveWorkspaceProps {
  exercise: Exercise;
  value: string;
  onChange: (value: string) => void;
}

export function InteractiveWorkspace({
  exercise,
  value,
  onChange,
}: InteractiveWorkspaceProps) {
  const interaction = exercise.interaccion;
  if (!interaction) return null;

  if (interaction.tipo === "base10") {
    return (
      <Base10Builder
        value={value}
        onChange={onChange}
        max={interaction.max}
      />
    );
  }

  if (interaction.tipo === "recta") {
    return (
      <NumberLine
        value={value}
        onChange={onChange}
        min={interaction.min}
        max={interaction.max}
        step={interaction.paso}
      />
    );
  }

  return (
    <FractionShade
      value={value}
      onChange={onChange}
      denominador={interaction.denominador}
      salida={interaction.salida}
    />
  );
}
