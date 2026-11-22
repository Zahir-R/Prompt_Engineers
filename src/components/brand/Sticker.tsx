import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  coral: "border-coral bg-[#f8d8d1] text-ink",
  mustard: "border-mustard bg-[#fbe7b8] text-ink",
  teal: "border-teal bg-[#cce9e3] text-ink",
  sky: "border-sky bg-[#d6e6f5] text-ink",
  plum: "border-plum bg-[#e2d8f2] text-ink",
  paper: "border-ink bg-paper-deep text-ink",
} as const;

interface StickerProps {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}

export function Sticker({ children, tone = "mustard", className }: StickerProps) {
  return (
    <span
      className={cn(
        "inline-flex -rotate-1 items-center gap-1.5 rounded-[0.7rem_1.1rem_0.8rem_1.2rem] border-2 px-3 py-1 text-xs font-black uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
