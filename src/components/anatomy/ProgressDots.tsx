import { getStepMeta } from "@/lib/desglose";
import type { DesgloseStep } from "@/types/exercise";
import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  steps: DesgloseStep[];
  current: number;
  onSelect?: (index: number) => void;
}

export function ProgressDots({ steps, current, onSelect }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2" aria-label="Progreso del desglose">
      {steps.map((step, index) => {
        const meta = getStepMeta(step.color_tag);

        return (
          <button
            key={step.paso}
            type="button"
            onClick={() => onSelect?.(index)}
            aria-label={`Ir al paso ${step.paso}: ${step.titulo}`}
            aria-current={index === current ? "step" : undefined}
            className={cn(
              "h-2.5 rounded-full transition-all",
              index === current ? cn("w-8", meta.dot) : "w-2.5 bg-slate-300",
              onSelect ? "cursor-pointer hover:bg-slate-400" : "cursor-default",
            )}
          />
        );
      })}
    </div>
  );
}
