"use client";

import { useId, useState } from "react";

export interface FractionFigureProps {
  modo?: "standard" | "fusion";
  tipo?: "circulo" | "barra" | "ambos";
  denominador: number;
  numerador?: number;
  num1?: number;
  num2?: number;
  seleccionadas?: boolean[];
  color?: "blue" | "orange" | "green" | "purple" | "yellow" | "teal";
  interactivo?: boolean;
  mostrarEtiquetas?: boolean;
  onCambio?: (datos: {
    numerador: number;
    denominador: number;
    seleccionadas: boolean[];
    porcentaje: number;
  }) => void;
  onFusion?: (datos: {
    n1: number;
    n2: number;
    denominador: number;
    resultado: number;
  }) => void;
}

const COLOR_MAP = {
  blue: "#3b82f6",
  orange: "#f97316",
  green: "#10b981",
  purple: "#8b5cf6",
  yellow: "#f59e0b",
  teal: "#24887b",
};

export function FractionFigure({
  modo = "standard",
  tipo = "ambos",
  denominador,
  numerador = 1,
  num1 = 1,
  num2 = 2,
  seleccionadas,
  color = "purple",
  interactivo = true,
  mostrarEtiquetas = true,
  onCambio,
  onFusion,
}: FractionFigureProps) {
  const uid = useId();
  const den = Math.max(1, denominador);

  const [fused, setFused] = useState(false);
  const [estadoLocal, setEstadoLocal] = useState<boolean[]>(() => {
    if (seleccionadas && seleccionadas.length === den) {
      return seleccionadas;
    }
    return Array.from({ length: den }, (_, i) => i < numerador);
  });

  const activeColor = COLOR_MAP[color] || COLOR_MAP.purple;
  const numActual = estadoLocal.filter(Boolean).length;

  if (modo === "fusion") {
    const totalSuma = num1 + num2;
    return (
      <div className="flex flex-col items-center gap-4 py-2 w-full">
        {!fused ? (
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setFused(true);
                onFusion?.({ n1: num1, n2: num2, denominador: den, resultado: totalSuma });
              }}
              className="flex flex-col items-center rounded-2xl border-2 border-ink bg-paper p-4 shadow-hard"
            >
              <span className="font-display text-sm font-bold text-sky mb-2">
                Fracción A ({num1}/{den})
              </span>
              <FractionFigure
                tipo={tipo === "barra" ? "barra" : "circulo"}
                denominador={den}
                numerador={num1}
                color="blue"
                interactivo={false}
              />
            </div>

            <span className="font-display text-4xl font-black text-coral-deep">+</span>

            <div
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", "fraction-b")}
              className="flex flex-col items-center rounded-2xl border-2 border-dashed border-coral bg-paper-deep p-4 shadow-hard cursor-grab"
            >
              <span className="font-display text-sm font-bold text-coral-deep mb-2">
                Fracción B ({num2}/{den}) ✋ Arrastra
              </span>
              <FractionFigure
                tipo={tipo === "barra" ? "barra" : "circulo"}
                denominador={den}
                numerador={num2}
                color="orange"
                interactivo={false}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setFused(true);
                onFusion?.({ n1: num1, n2: num2, denominador: den, resultado: totalSuma });
              }}
              className="rounded-xl border-2 border-ink bg-teal px-4 py-2 text-sm font-black text-white shadow-hard hover:opacity-95"
            >
              Juntar y Sumar
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border-4 border-emerald-500 bg-paper p-6 shadow-hard animate-fadeIn">
            <p className="font-display text-2xl font-bold text-teal mb-4">
              <span className="text-sky">{num1}/{den}</span> +{" "}
              <span className="text-coral-deep">{num2}/{den}</span> ={" "}
              <span className="text-emerald-700">{totalSuma}/{den}</span>
              {totalSuma === den && " 🎉 ¡1 Entero Completo!"}
            </p>
            <FractionFigure
              tipo={tipo === "barra" ? "barra" : "circulo"}
              denominador={den}
              numerador={totalSuma}
              color="green"
              interactivo={false}
            />
            <button
              type="button"
              onClick={() => setFused(false)}
              className="mt-4 text-xs font-black text-coral-deep underline decoration-2 underline-offset-4"
            >
              ↩ Separar fracciones de nuevo
            </button>
          </div>
        )}
      </div>
    );
  }

  const togglePart = (index: number) => {
    if (!interactivo) return;
    const nuevo = [...estadoLocal];
    nuevo[index] = !nuevo[index];
    setEstadoLocal(nuevo);

    if (onCambio) {
      const cant = nuevo.filter(Boolean).length;
      onCambio({
        numerador: cant,
        denominador: den,
        seleccionadas: nuevo,
        porcentaje: Math.round((cant / den) * 100),
      });
    }
  };

  const renderCirculo = () => {
    const size = 240;
    const r = 100;
    const cx = size / 2;
    const cy = size / 2;

    return (
      <div className="flex flex-col items-center">
        <span className="mb-2 font-hand text-xl font-bold text-ink-soft">
          Círculo ({numActual} de {den})
        </span>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          role="img"
          aria-label={`Fracción circular ${numActual} de ${den}`}
        >
          {Array.from({ length: den }, (_, i) => {
            const isSel = estadoLocal[i];
            const fill = isSel ? activeColor : "#fbf6ea";
            const a1 = (i * 2 * Math.PI) / den - Math.PI / 2;
            const a2 = ((i + 1) * 2 * Math.PI) / den - Math.PI / 2;
            const x1 = cx + r * Math.cos(a1);
            const y1 = cy + r * Math.sin(a1);
            const x2 = cx + r * Math.cos(a2);
            const y2 = cy + r * Math.sin(a2);
            const largeArc = a2 - a1 > Math.PI ? 1 : 0;
            const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

            const midA = (a1 + a2) / 2;
            const lr = r * 0.65;
            const lx = cx + lr * Math.cos(midA);
            const ly = cy + lr * Math.sin(midA);

            return (
              <g
                key={`${uid}-slice-${i}`}
                onClick={() => togglePart(i)}
                className={interactivo ? "cursor-pointer transition-all hover:brightness-105" : ""}
              >
                <path
                  d={d}
                  fill={fill}
                  stroke="#2c2733"
                  strokeWidth={2.5}
                />
                {mostrarEtiquetas && (
                  <text
                    x={lx.toFixed(2)}
                    y={ly.toFixed(2)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-display text-xs font-bold pointer-events-none"
                    fill={isSel ? "#ffffff" : "#2c2733"}
                  >
                    1/{den}
                  </text>
                )}
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r={5} fill="#2c2733" />
        </svg>
      </div>
    );
  };

  const renderBarra = () => {
    const barW = 320;
    const barH = 56;
    const cellW = barW / den;

    return (
      <div className="flex flex-col items-center">
        <span className="mb-2 font-hand text-xl font-bold text-ink-soft">
          Barra ({numActual} de {den})
        </span>
        <svg
          width={barW}
          height={barH + 10}
          viewBox={`0 0 ${barW} ${barH + 10}`}
          className="overflow-visible"
          role="img"
          aria-label={`Barra fraccionaria ${numActual} de ${den}`}
        >
          {Array.from({ length: den }, (_, i) => {
            const isSel = estadoLocal[i];
            const fill = isSel ? activeColor : "#fbf6ea";
            const x = i * cellW;

            return (
              <g
                key={`${uid}-bar-${i}`}
                onClick={() => togglePart(i)}
                className={interactivo ? "cursor-pointer transition-all hover:brightness-105" : ""}
              >
                <rect
                  x={x.toFixed(2)}
                  y={0}
                  width={cellW.toFixed(2)}
                  height={barH}
                  fill={fill}
                  stroke="#2c2733"
                  strokeWidth={2.5}
                />
                {mostrarEtiquetas && (
                  <text
                    x={(x + cellW / 2).toFixed(2)}
                    y={(barH / 2).toFixed(2)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-display text-xs font-bold pointer-events-none"
                    fill={isSel ? "#ffffff" : "#2c2733"}
                  >
                    1/{den}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-2">
      {(tipo === "ambos" || tipo === "circulo") && renderCirculo()}
      {(tipo === "ambos" || tipo === "barra") && renderBarra()}
    </div>
  );
}
