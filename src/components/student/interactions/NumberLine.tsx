"use client";

import { Minus, Plus } from "lucide-react";

interface NumberLineProps {
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function NumberLine({
  value,
  onChange,
  min,
  max,
  step,
}: NumberLineProps) {
  const numeric = Number(value);
  const current = Number.isFinite(numeric) ? clamp(numeric, min, max) : 0;
  const safeStep = Math.max(1, step);
  const ticks = [];
  for (let tick = min; tick <= max; tick += safeStep) ticks.push(tick);
  if (ticks[ticks.length - 1] !== max) ticks.push(max);

  const setValue = (next: number) => onChange(String(clamp(next, min, max)));
  const position =
    max === min ? 50 : ((current - min) / (max - min)) * 100;

  return (
    <div className="rounded-[1rem_1.3rem_0.9rem_1.2rem] border-2 border-ink bg-paper p-4 shadow-hard">
      <p className="font-hand text-xl font-bold text-ink">
        Muévete por la recta numérica
      </p>
      <div className="relative mt-6 h-16">
        <div className="absolute left-0 right-0 top-8 h-1 rounded-full bg-ink" />
        {ticks.map((tick) => {
          const left =
            max === min ? 50 : ((tick - min) / (max - min)) * 100;
          return (
            <div
              key={tick}
              className="absolute top-5 -translate-x-1/2 text-center"
              style={{ left: `${left}%` }}
            >
              <span className="block h-6 w-0.5 bg-ink/40" />
              <span className="mt-1 block text-[10px] font-bold text-ink-soft">
                {tick}
              </span>
            </div>
          );
        })}
        <span
          className="absolute top-4 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-ink bg-mustard font-display text-sm font-black text-ink shadow-hard"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          {current}
        </span>
      </div>
      <label htmlFor="number-line-range" className="mt-2 block text-sm font-black text-ink">
        Arrastra el marcador o usa las flechas
      </label>
      <input
        id="number-line-range"
        type="range"
        min={min}
        max={max}
        step={safeStep}
        value={current}
        onChange={(event) => setValue(Number(event.target.value))}
        className="mt-1 h-6 w-full accent-teal"
      />
      <p className="mt-1 text-sm font-black text-ink" aria-live="polite">
        Valor actual: {current}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setValue(current - safeStep)}
          aria-label={`Retroceder ${safeStep}`}
          className="flex items-center gap-1 rounded-lg border-2 border-ink bg-paper px-2.5 py-1.5 text-xs font-black text-ink"
        >
          <Minus className="size-3.5" aria-hidden="true" />
          {safeStep}
        </button>
        <button
          type="button"
          onClick={() => setValue(current + safeStep)}
          aria-label={`Avanzar ${safeStep}`}
          className="flex items-center gap-1 rounded-lg border-2 border-ink bg-[#fbe7b8] px-2.5 py-1.5 text-xs font-black text-ink"
        >
          <Plus className="size-3.5" aria-hidden="true" />
          {safeStep}
        </button>
      </div>
    </div>
  );
}
