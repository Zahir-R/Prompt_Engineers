"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FractionShadeProps {
  value: string;
  onChange: (value: string) => void;
  denominador: number;
  salida: "decimal" | "numerador";
}

function DraggablePiece({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn(
        "flex size-10 cursor-grab items-center justify-center rounded-lg border-2 border-ink bg-purple-400 font-black text-paper shadow-hard",
        isDragging && "opacity-50",
      )}
      aria-label="Arrastrar una parte"
      {...listeners}
      {...attributes}
    >
      <Grip className="size-4" aria-hidden="true" />
    </button>
  );
}

function FractionDropZone({
  children,
  denominador,
}: {
  children: ReactNode;
  denominador: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "fraction-bar" });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "mt-3 flex overflow-hidden rounded-xl border-2 transition-colors",
        isOver ? "border-teal" : "border-ink",
      )}
      role="group"
      aria-label={`Fracción con ${denominador} partes`}
    >
      {children}
    </div>
  );
}

export function FractionShade({
  value,
  onChange,
  denominador,
  salida,
}: FractionShadeProps) {
  const den = Math.max(2, denominador);
  const numeric = Number(value);
  const shaded =
    salida === "decimal" && Number.isFinite(numeric)
      ? Math.round(numeric * den)
      : Math.round(Number(value) || 0);
  const safeShaded = Math.min(den, Math.max(0, shaded));
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  );
  const setShaded = (count: number) => {
    const next = Math.min(den, Math.max(0, count));
    onChange(
      salida === "decimal"
        ? String(Number((next / den).toFixed(3)))
        : String(next),
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id === "fraction-bar") {
      setShaded(safeShaded + 1);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="rounded-[1rem_1.3rem_0.9rem_1.2rem] border-2 border-ink bg-paper p-4 shadow-hard">
        <p className="font-hand text-xl font-bold text-ink">
          Pinta las partes de la fracción
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: den - safeShaded }, (_, index) => (
              <DraggablePiece key={index} id={`fraction-piece-${index}`} />
            ))}
            {safeShaded === den && (
              <span className="font-hand text-lg font-bold text-teal">
                ¡Todas las partes pintadas!
              </span>
            )}
          </div>
          <span className="font-hand text-lg font-bold text-ink-soft">
            arrastra una pieza a la barra
          </span>
        </div>

        <FractionDropZone denominador={den}>
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
        </FractionDropZone>
        <p className="mt-2 text-sm font-black text-ink" aria-live="polite">
          {safeShaded}/{den} partes pintadas
          {salida === "decimal"
            ? ` = ${Number((safeShaded / den).toFixed(3))}`
            : ""}
        </p>
      </div>
    </DndContext>
  );
}
