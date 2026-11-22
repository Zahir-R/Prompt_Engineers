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
              "h-3 rounded-full border-2 border-ink transition-all",
              index === current
                ? cn("w-9 shadow-hard", meta.dot)
                : "w-3 bg-paper-deep",
              onSelect ? "cursor-pointer hover:bg-mustard" : "cursor-default",
            )}
          />
        );
      })}
    </div>
  );
}
