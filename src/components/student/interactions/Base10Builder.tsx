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
import { Grip, Minus, Plus, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Base10BuilderProps {
  value: string;
  onChange: (value: string) => void;
  max?: number;
}

function parseValue(value: string): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.max(0, Math.round(numeric)) : 0;
}

function DraggableBlock({
  id,
  label,
  className,
}: {
  id: string;
  label: string;
  className: string;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn(
        "flex cursor-grab items-center gap-1 rounded-lg border-2 border-ink bg-paper px-2.5 py-1.5 text-xs font-black text-ink shadow-hard",
        className,
        isDragging && "opacity-50",
      )}
      {...listeners}
      {...attributes}
      aria-label={`Arrastrar ${label}`}
    >
      <Grip className="size-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}

function Base10DropZone({ children }: { children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: "base10-tray" });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "mt-3 rounded-xl border-2 border-dashed p-3 transition-colors",
        isOver ? "border-teal bg-[#cce9e3]" : "border-ink/30 bg-paper-deep/30",
      )}
    >
      {children}
    </div>
  );
}

export function Base10Builder({ value, onChange, max = 99 }: Base10BuilderProps) {
  const total = Math.min(max, parseValue(value));
  const tens = Math.floor(total / 10);
  const ones = total % 10;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  );
  const setTotal = (next: number) => {
    onChange(String(Math.min(max, Math.max(0, next))));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id !== "base10-tray") return;
    if (event.active.id === "ten") setTotal(total + 10);
    if (event.active.id === "unit") setTotal(total + 1);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="rounded-[1rem_1.3rem_0.9rem_1.2rem] border-2 border-ink bg-paper p-4 shadow-hard">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-hand text-xl font-bold text-ink">
            Construye tu respuesta con bloques
          </p>
          <button
            type="button"
            onClick={() => setTotal(0)}
            className="flex items-center gap-1 rounded-lg border-2 border-ink/30 bg-paper px-2 py-1 text-xs font-black text-ink-soft"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Limpiar
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <DraggableBlock id="ten" label="Decena" className="bg-[#d6e6f5]" />
          <DraggableBlock id="unit" label="Unidad" className="bg-[#fbe7b8]" />
        </div>

        <Base10DropZone>
          <p className="text-xs font-black uppercase tracking-wide text-ink-soft">
            Arrastra los bloques aquí
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-5">
            <div className="min-w-24">
              <p className="mb-1 text-xs font-black uppercase tracking-wide text-blue-700">
                Decenas
              </p>
              <div className="flex min-h-16 flex-wrap items-end gap-1.5">
                {Array.from({ length: tens }, (_, index) => (
                  <span
                    key={index}
                    className="h-16 w-3.5 rounded-full border-2 border-ink/40 bg-blue-500"
                  />
                ))}
                {tens === 0 && (
                  <span className="font-hand text-lg font-bold text-ink-soft">
                    ninguna
                  </span>
                )}
              </div>
            </div>
            <div className="min-w-24">
              <p className="mb-1 text-xs font-black uppercase tracking-wide text-orange-700">
                Unidades
              </p>
              <div className="flex max-w-48 flex-wrap gap-1">
                {Array.from({ length: ones }, (_, index) => (
                  <span
                    key={index}
                    className="size-4 rounded-[3px] border-2 border-ink/40 bg-orange-400"
                  />
                ))}
                {ones === 0 && (
                  <span className="font-hand text-lg font-bold text-ink-soft">
                    ninguna
                  </span>
                )}
              </div>
            </div>
          </div>
        </Base10DropZone>

        <p className="mt-3 text-sm font-black text-ink" aria-live="polite">
          Total construido: {total}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTotal(total - 10)}
            aria-label="Quitar una decena"
            className="flex items-center gap-1 rounded-lg border-2 border-ink bg-paper px-2.5 py-1.5 text-xs font-black text-ink"
          >
            <Minus className="size-3.5" aria-hidden="true" />
            1 decena
          </button>
          <button
            type="button"
            onClick={() => setTotal(total + 10)}
            aria-label="Agregar una decena"
            className="flex items-center gap-1 rounded-lg border-2 border-ink bg-[#d6e6f5] px-2.5 py-1.5 text-xs font-black text-ink"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            1 decena
          </button>
          <button
            type="button"
            onClick={() => setTotal(total - 1)}
            aria-label="Quitar una unidad"
            className="flex items-center gap-1 rounded-lg border-2 border-ink bg-paper px-2.5 py-1.5 text-xs font-black text-ink"
          >
            <Minus className="size-3.5" aria-hidden="true" />
            1 unidad
          </button>
          <button
            type="button"
            onClick={() => setTotal(total + 1)}
            aria-label="Agregar una unidad"
            className="flex items-center gap-1 rounded-lg border-2 border-ink bg-[#fbe7b8] px-2.5 py-1.5 text-xs font-black text-ink"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            1 unidad
          </button>
        </div>
      </div>
    </DndContext>
  );
}
