import { cn } from "@/lib/utils";

interface MascotProps {
  className?: string;
  label?: string;
}

export function Mascot({ className, label }: MascotProps) {
  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn("size-36", className)}
    >
      {label && <title>{label}</title>}
      <path
        d="M34 74 22 40c16 2 26 10 32 22"
        fill="var(--mustard)"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="m146 74 12-34c-16 2-26 10-32 22"
        fill="var(--mustard)"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M90 44c36 0 58 23 58 52 0 32-23 56-58 56s-58-24-58-56c0-29 22-52 58-52Z"
        fill="var(--mustard)"
        stroke="var(--ink)"
        strokeWidth="4"
      />
      <path
        d="M55 64c9-8 21-12 35-12s26 4 35 12"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="66" cy="86" r="17" fill="var(--paper)" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="114" cy="86" r="17" fill="var(--paper)" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="70" cy="88" r="6" fill="var(--ink)" />
      <circle cx="110" cy="88" r="6" fill="var(--ink)" />
      <path
        d="m90 96-9 10h18l-9-10Z"
        fill="var(--coral)"
        stroke="var(--ink)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M62 120c8 8 17 12 28 12s20-4 28-12"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M44 94c-10 8-14 20-12 32 8 1 17-4 23-13"
        fill="var(--mustard)"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M136 94c10 8 14 20 12 32-8 1-17-4-23-13"
        fill="var(--mustard)"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M148 118 166 96"
        stroke="var(--ink)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="m166 96 8-18 6 3-8 18-6-3Z"
        fill="var(--coral)"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="m172 78 6 3"
        stroke="var(--paper)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
