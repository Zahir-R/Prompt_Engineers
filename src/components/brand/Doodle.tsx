import { cn } from "@/lib/utils";

interface DoodleProps {
  className?: string;
}

export function StarDoodle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("size-8", className)}
    >
      <path
        d="M24 4c1.5 8.5 6.5 13.5 20 20-13.5 6.5-18.5 11.5-20 20-1.5-8.5-6.5-13.5-20-20 13.5-6.5 18.5-11.5 20-20Z"
        fill="currentColor"
        stroke="var(--ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SquiggleDoodle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 160 24"
      fill="none"
      aria-hidden="true"
      className={cn("h-5 w-40", className)}
    >
      <path
        d="M3 14c12-12 22 8 34-2s22 8 34-2 22 8 34-2 22 8 34-2 12 8 18 4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowDoodle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 80 48"
      fill="none"
      aria-hidden="true"
      className={cn("h-10 w-20", className)}
    >
      <path
        d="M4 8c18 0 32 4 44 16 5 5 9 11 12 18"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M48 38c5 2 10 4 14 5 1-5 2-9 3-14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
