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
        "inline-flex -rotate-1 items-center gap-1.5 rounded-[0.7rem_1.1rem_0.8rem_1.2rem] border-2 border-ink px-3 py-1 text-xs font-black uppercase tracking-wide shadow-hard",
        meta.badge,
        className,
      )}
    >
      <span className={cn("size-2.5 rounded-full border border-ink/40", meta.dot)} aria-hidden="true" />
      Paso {paso} · {meta.label}
    </span>
  );
}
