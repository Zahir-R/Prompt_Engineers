"use client";

import { cn } from "@/lib/utils";

interface FractionShadeProps {
  value: string;
  onChange: (value: string) => void;
  denominador: number;
  salida: "decimal" | "numerador";
}

export function FractionShade({
  value,
  onChange,
  denominador,
  salida,
}: FractionShadeProps) {
  const den = Math.max(2, denominador);
  const numeric = Number(value);
  const shaded = salida === "decimal" && Number.isFinite(numeric)
    ? Math.round(numeric * den)
    : Math.round(Number(value) || 0);
  const safeShaded = Math.min(den, Math.max(0, shaded));

  const setShaded = (count: number) => {
    const next = Math.min(den, Math.max(0, count));
    onChange(
      salida === "decimal"
        ? String(Number((next / den).toFixed(3)))
        : String(next),
    );
  };

  return (
    <div className="rounded-[1rem_1.3rem_0.9rem_1.2rem] border-2 border-ink bg-paper p-4 shadow-hard">
      <p className="font-hand text-xl font-bold text-ink">
        Pinta las partes de la fracción
      </p>
      <div
        className="mt-3 flex overflow-hidden rounded-xl border-2 border-ink"
        role="group"
        aria-label={`Fracción con ${den} partes`}
      >
        {Array.from({ length: den }, (_, index) => {
          const active = index < safeShaded;
          return (
            <button
              key={index}
              type="button"
              aria-label={`Parte ${index + 1}`}
              aria-pressed={active}
              onClick={() => setShaded(active ? index : index + 1)}
              className={cn(
                "h-11 flex-1 border-r-2 border-ink/30 text-xs font-black last:border-r-0",
                active ? "bg-purple-400 text-paper" : "bg-purple-50 text-ink-soft",
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-sm font-black text-ink" aria-live="polite">
        {safeShaded}/{den} partes pintadas
        {salida === "decimal" ? ` = ${Number((safeShaded / den).toFixed(3))}` : ""}
      </p>
    </div>
  );
}
