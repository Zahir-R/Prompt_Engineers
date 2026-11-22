"use client";

import { useId } from "react";

export interface GeometryFigureProps {
  tipo?: "rectangle" | "square" | "triangle" | "pentagon" | "hexagon";
  anchoUnidades?: number;
  altoUnidades?: number;
  ladoUnidades?: number;
  modo?: "area" | "perimeter" | "vertices";
  mostrarNumeros?: boolean;
  tamanoCelda?: number;
}

export function GeometryFigure({
  tipo = "rectangle",
  anchoUnidades = 5,
  altoUnidades = 3,
  ladoUnidades = 4,
  modo = "area",
  mostrarNumeros = true,
  tamanoCelda = 36,
}: GeometryFigureProps) {
  const uid = useId();
  const anchoCanvas = 400;
  const altoCanvas = 320;
  const cx = anchoCanvas / 2;
  const cy = altoCanvas / 2;

  if (tipo === "rectangle" || tipo === "square") {
    const w = tipo === "square" ? anchoUnidades : anchoUnidades;
    const h = tipo === "square" ? anchoUnidades : altoUnidades;
    const totalW = w * tamanoCelda;
    const totalH = h * tamanoCelda;
    const startX = cx - totalW / 2;
    const startY = cy - totalH / 2;

    const corners = [
      [startX, startY],
      [startX + totalW, startY],
      [startX + totalW, startY + totalH],
      [startX, startY + totalH],
    ];

    let count = 1;

    return (
      <svg
        viewBox={`0 0 ${anchoCanvas} ${altoCanvas}`}
        className="h-auto w-full max-w-[400px] overflow-visible"
        role="img"
        aria-label={`${tipo === "square" ? "Cuadrado" : "Rectángulo"} de ${w} por ${h}`}
      >
        {/* Fondo del cuadrilátero */}
        <rect
          x={startX}
          y={startY}
          width={totalW}
          height={totalH}
          fill="#efe2c8"
          stroke="#2c2733"
          strokeWidth={3}
          rx={4}
        />

        {/* Cuadrícula de área */}
        {Array.from({ length: h }).map((_, r) =>
          Array.from({ length: w }).map((__, c) => {
            const cellX = startX + c * tamanoCelda;
            const cellY = startY + r * tamanoCelda;
            const cellFill =
              modo === "area"
                ? (r + c) % 2 === 0
                  ? "rgba(59, 130, 246, 0.16)"
                  : "rgba(59, 130, 246, 0.28)"
                : "transparent";

            const currentCount = count++;

            return (
              <g key={`${uid}-cell-${r}-${c}`}>
                <rect
                  x={cellX}
                  y={cellY}
                  width={tamanoCelda}
                  height={tamanoCelda}
                  fill={cellFill}
                  stroke="rgba(44, 39, 51, 0.25)"
                  strokeWidth={1.5}
                />
                {modo === "area" && mostrarNumeros && (
                  <text
                    x={cellX + tamanoCelda / 2}
                    y={cellY + tamanoCelda / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-display text-xs font-bold pointer-events-none fill-ink-soft"
                  >
                    {currentCount}
                  </text>
                )}
              </g>
            );
          })
        )}

        {/* Cotas de perímetro */}
        {modo === "perimeter" && (
          <>
            <text
              x={cx}
              y={startY - 14}
              textAnchor="middle"
              className="font-display text-sm font-bold fill-coral-deep"
            >
              Base: {w}
            </text>
            <text
              x={cx}
              y={startY + totalH + 22}
              textAnchor="middle"
              className="font-display text-sm font-bold fill-coral-deep"
            >
              Base: {w}
            </text>
            <text
              x={startX - 20}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display text-sm font-bold fill-coral-deep"
            >
              {h}
            </text>
            <text
              x={startX + totalW + 20}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display text-sm font-bold fill-coral-deep"
            >
              {h}
            </text>
          </>
        )}

        {/* Vértices */}
        {modo === "vertices" &&
          corners.map(([px, py], i) => (
            <g key={`${uid}-v-${i}`}>
              <circle
                cx={px}
                cy={py}
                r={7}
                fill="#e26352"
                stroke="#2c2733"
                strokeWidth={2.5}
              />
              <text
                x={px}
                y={py - 12}
                textAnchor="middle"
                className="font-display text-xs font-bold fill-coral-deep"
              >
                V{i + 1}
              </text>
            </g>
          ))}
      </svg>
    );
  }

  if (tipo === "triangle") {
    const p1 = [cx, cy - 80];
    const p2 = [cx - 95, cy + 65];
    const p3 = [cx + 95, cy + 65];

    return (
      <svg
        viewBox={`0 0 ${anchoCanvas} ${altoCanvas}`}
        className="h-auto w-full max-w-[400px] overflow-visible"
        role="img"
        aria-label="Triángulo"
      >
        <polygon
          points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}
          fill="rgba(249, 115, 22, 0.2)"
          stroke="#2c2733"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <line
          x1={cx}
          y1={p1[1]}
          x2={cx}
          y2={p2[1]}
          stroke="#2c2733"
          strokeDasharray="4 4"
          strokeWidth={2}
        />
        {modo === "vertices" &&
          [p1, p2, p3].map(([px, py], i) => (
            <circle
              key={`${uid}-tv-${i}`}
              cx={px}
              cy={py}
              r={7}
              fill="#e26352"
              stroke="#2c2733"
              strokeWidth={2}
            />
          ))}
      </svg>
    );
  }

  // Polígonos regulares (Pentágono, Hexágono)
  const sides = tipo === "pentagon" ? 5 : 6;
  const r = 85;
  const pts = Array.from({ length: sides }, (_, i) => {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });

  return (
    <svg
      viewBox={`0 0 ${anchoCanvas} ${altoCanvas}`}
      className="h-auto w-full max-w-[400px] overflow-visible"
      role="img"
      aria-label={`Polígono de ${sides} lados iguales de ${ladoUnidades} unidades`}
    >
      <polygon
        points={pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")}
        fill="rgba(16, 185, 129, 0.2)"
        stroke="#2c2733"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {pts.map(([px, py], i) => (
        <circle
          key={`${uid}-poly-v-${i}`}
          cx={px}
          cy={py}
          r={6}
          fill="#e26352"
          stroke="#2c2733"
          strokeWidth={2}
        />
      ))}
    </svg>
  );
}
