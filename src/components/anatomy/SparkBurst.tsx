import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";

const sparks = [
  { x: -34, y: -30, delay: 0 },
  { x: 30, y: -34, delay: 40 },
  { x: -42, y: 6, delay: 80 },
  { x: 42, y: 4, delay: 20 },
  { x: -18, y: 34, delay: 60 },
  { x: 22, y: 32, delay: 100 },
];

export function SparkBurst() {
  return (
    <span
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {sparks.map((spark, index) => (
        <Sparkles
          key={index}
          className="spark-float absolute size-4 text-mustard"
          style={
            {
              "--dx": `${spark.x}px`,
              "--dy": `${spark.y}px`,
              animationDelay: `${spark.delay}ms`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}
