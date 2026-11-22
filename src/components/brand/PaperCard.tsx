import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

export function PaperCard({ children, className, strong = false }: PaperCardProps) {
  return (
    <div
      className={cn(
        strong ? "paper-card-strong" : "paper-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
