import { getStepMeta } from "@/lib/desglose";
import { cn } from "@/lib/utils";

interface StepColorBadgeProps {
  color?: string;
  paso: number;
  className?: string;
}

export function StepColorBadge({ color, paso, className }: StepColorBadgeProps) {
  const meta = getStepMeta(color);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide",
        meta.badge,
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", meta.dot)} aria-hidden="true" />
      Paso {paso} · {meta.label}
    </span>
  );
}
