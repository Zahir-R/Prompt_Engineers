"use client";

import { useId, useState } from "react";
import { CountingItem, CountingObjectType } from "./CountingObjects";

export interface MarbleFigureProps {
  modo?: "base10" | "multiplication" | "sharing" | "free" | "drag-merge";
  objeto?: CountingObjectType;
  total?: number;
  filas?: number;
  columnas?: number;
  gruposReparto?: number;
  color?: "blue" | "orange" | "green" | "purple" | "yellow";
  interactivo?: boolean;
}

export function MarbleFigure({
  modo = "base10",
  objeto = "canica",
  total = 24,
  filas = 3,
  columnas = 4,
  gruposReparto = 3,
  color = "blue",
}: MarbleFigureProps) {
  const uid = useId();

  // Estado para el modo de arrastre y unión (drag-merge)
  const [mergeItems, setMergeItems] = useState<{ id: string; value: number }[]>(
    () =>
      Array.from({ length: Math.min(10, total) }, (_, i) => ({
        id: `drag-${i}`,
        value: 1,
      }))
  );

  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  if (modo === "base10") {
    const cant = Math.max(0, total);
    const decenas = Math.floor(cant / 10);
    const unidades = cant % 10;

    return (
      <div
      className="flex flex-wrap justify-center gap-5 max-w-2xl py-2"
      role="img"
      aria-label={`${Math.max(0, total)} ${objeto} en decenas y unidades`}
    >
        {Array.from({ length: decenas }).map((_, d) => (
          <div key={`${uid}-decena-${d}`} className="text-center">
            <span className="font-hand text-lg font-bold text-teal">
              Caja 10 (#{d + 1})
            </span>
            <div className="grid grid-cols-5 grid-rows-2 gap-2 rounded-2xl border-2 border-ink bg-paper-deep p-2.5 shadow-hard">
              {Array.from({ length: 10 }).map((__, m) => (
                <div
                  key={`${uid}-cell-${d}-${m}`}
                  className="flex size-11 items-center justify-center rounded-xl border border-dashed border-ink/40 bg-white/50"
                >
                  <CountingItem
                    tipo={objeto}
                    numero={d * 10 + m + 1}
                    color={color}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {unidades > 0 && (
          <div className="text-center">
            <span className="font-hand text-lg font-bold text-coral-deep">
              Sueltas ({unidades})
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-coral bg-paper-deep p-3 min-w-[140px]">
              {Array.from({ length: unidades }).map((_, u) => (
                <CountingItem
                  key={`${uid}-u-${u}`}
                  tipo={objeto}
                  numero={decenas * 10 + u + 1}
                  color="orange"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (modo === "multiplication") {
    const r = Math.max(1, filas);
    const c = Math.max(1, columnas);
    let counter = 1;

    return (
      <div
        className="flex flex-col gap-2.5 rounded-2xl border-2 border-ink bg-paper-deep p-4 shadow-hard"
        role="img"
        aria-label={`${Math.max(1, filas)} filas de ${Math.max(1, columnas)} ${objeto}`}
      >
        {Array.from({ length: r }).map((_, rIdx) => (
          <div key={`${uid}-mrow-${rIdx}`} className="flex items-center gap-3">
            <span className="w-14 text-right font-hand text-lg font-bold text-coral-deep">
              Fila {rIdx + 1}
            </span>
            {Array.from({ length: c }).map(() => {
              const currentNum = counter++;
              return (
                <div key={`${uid}-mcol-${currentNum}`}>
                  <CountingItem
                    tipo={objeto}
                    numero={currentNum}
                    color={color}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  if (modo === "sharing") {
    const cant = Math.max(1, total);
    const g = Math.max(1, gruposReparto);
    const porGrupo = Math.floor(cant / g);
    const residuo = cant % g;
    let counter = 1;

    return (
      <div
        className="flex flex-wrap justify-center gap-4 py-2"
        role="img"
        aria-label={`${Math.max(1, total)} ${objeto} repartidos en ${Math.max(1, gruposReparto)} grupos`}
      >
        {Array.from({ length: g }).map((_, gIdx) => (
          <div
            key={`${uid}-group-${gIdx}`}
            className="flex flex-col items-center rounded-2xl border-2 border-ink bg-paper-deep p-3.5 shadow-hard min-w-[130px]"
          >
            <p className="font-display text-base font-bold text-ink">
              Grupo {gIdx + 1}
            </p>
            <div className="my-2 flex flex-wrap justify-center gap-2 max-w-[120px]">
              {Array.from({ length: porGrupo }).map(() => (
                <CountingItem
                  key={`${uid}-pot-${counter}`}
                  tipo={objeto}
                  numero={counter++}
                  color={color}
                />
              ))}
            </div>
            <p className="font-hand text-base font-bold text-teal">
              {porGrupo} {objeto !== "canica" ? objeto + "s" : "canicas"}
            </p>
          </div>
        ))}

        {residuo > 0 && (
          <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-coral bg-paper p-3.5 min-w-[130px]">
            <p className="font-display text-base font-bold text-coral-deep">
              Sobran (Residuo)
            </p>
            <div className="my-2 flex flex-wrap justify-center gap-2 max-w-[120px]">
              {Array.from({ length: residuo }).map(() => (
                <CountingItem
                  key={`${uid}-res-${counter}`}
                  tipo={objeto}
                  numero={counter++}
                  color="orange"
                />
              ))}
            </div>
            <p className="font-hand text-base font-bold text-coral-deep">
              {residuo} sueltas
            </p>
          </div>
        )}
      </div>
    );
  }

  if (modo === "drag-merge") {
    return (
      <div className="flex flex-col items-center gap-3 w-full max-w-xl">
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-ink bg-paper p-6 shadow-hard min-h-[180px] w-full">
          {mergeItems.map((item, idx) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => {
                setDraggedIdx(idx);
                e.dataTransfer.setData("text/plain", `${idx}`);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fromIdx = parseInt(
                  e.dataTransfer.getData("text/plain"),
                  10
                );
                if (
                  fromIdx !== idx &&
                  fromIdx >= 0 &&
                  fromIdx < mergeItems.length
                ) {
                  const nuevos = [...mergeItems];
                  nuevos[idx] = {
                    ...nuevos[idx],
                    value: nuevos[idx].value + nuevos[fromIdx].value,
                  };
                  nuevos.splice(fromIdx, 1);
                  setMergeItems(nuevos);
                  setDraggedIdx(null);
                }
              }}
              onDoubleClick={() => {
                if (item.value > 1) {
                  const count = item.value;
                  const nuevos = [...mergeItems];
                  nuevos.splice(idx, 1);
                  for (let k = 0; k < count; k++) {
                    nuevos.push({ id: `split-${Date.now()}-${k}`, value: 1 });
                  }
                  setMergeItems(nuevos);
                }
              }}
              className={`flex flex-col items-center rounded-xl border-2 border-ink bg-paper-deep p-2 shadow-hard cursor-grab transition-transform hover:scale-105 ${
                draggedIdx === idx ? "opacity-40" : "opacity-100"
              }`}
            >
              <CountingItem tipo={objeto} numero={item.value} color={color} />
              {item.value > 1 && (
                <span className="mt-1 font-display text-xs font-bold text-coral-deep">
                  Juntos: {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="font-hand text-lg font-bold text-ink-soft">
          👉 Arrastra uno sobre otro para juntarlos. Doble clic para separarlos.
        </p>
      </div>
    );
  }

  // Free counting mode
  const cant = Math.max(1, total);
  return (
    <div className="flex flex-wrap justify-center gap-3 rounded-2xl border-2 border-ink bg-paper-deep p-4 shadow-hard max-w-xl" role="img" aria-label={`${cant} ${objeto}`}>
      {Array.from({ length: cant }).map((_, i) => (
        <CountingItem key={`${uid}-free-${i}`} tipo={objeto} numero={i + 1} color={color} />
      ))}
    </div>
  );
}
