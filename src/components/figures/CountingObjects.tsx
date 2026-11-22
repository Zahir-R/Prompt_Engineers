import { SVGProps } from "react";

export type CountingObjectType =
  | "canica"
  | "manzana"
  | "balon"
  | "lapiz"
  | "conejo"
  | "casa"
  | "sol";

export function LapizIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="-5 -25 200 50"
      className={className}
      role="img"
      aria-label="Lápiz"
      {...props}
    >
      <rect x="30" y="-20" width="135" height="40" fill="#FFD93D" stroke="#2D3436" strokeWidth="2" />
      <polygon points="0,0 30,-20 30,20" fill="#F5CBA7" stroke="#2D3436" strokeWidth="2" />
      <polygon points="0,0 10,-7 10,7" fill="#2D3436" />
      <rect x="165" y="-20" width="5" height="40" fill="#B2BEC3" stroke="#2D3436" strokeWidth="1" />
      <rect x="170" y="-20" width="20" height="40" rx="4" fill="#FD79A8" stroke="#2D3436" strokeWidth="2" />
    </svg>
  );
}

export function BalonIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="-55 -55 110 110"
      className={className}
      role="img"
      aria-label="Balón"
      {...props}
    >
      <circle cx="0" cy="0" r="50" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3" />
      <polygon points="0,-16 15.2,-4.9 9.4,13 -9.4,13 -15.2,-4.9" fill="#2D3436" />
      <circle cx="0" cy="-40" r="7" fill="#2D3436" />
      <circle cx="38" cy="-12" r="7" fill="#2D3436" />
      <circle cx="24" cy="32" r="7" fill="#2D3436" />
      <circle cx="-24" cy="32" r="7" fill="#2D3436" />
      <circle cx="-38" cy="-12" r="7" fill="#2D3436" />
    </svg>
  );
}

export function ConejoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="-50 -115 100 220"
      className={className}
      role="img"
      aria-label="Conejo"
      {...props}
    >
      <ellipse cx="36" cy="60" rx="10" ry="10" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
      <ellipse cx="-22" cy="88" rx="16" ry="9" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
      <ellipse cx="22" cy="88" rx="16" ry="9" fill="#FFFFFF" stroke="#2D3436" strokeWidth="2" />
      <ellipse cx="0" cy="40" rx="42" ry="48" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3" />
      <ellipse cx="-12" cy="-75" rx="10" ry="32" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3" />
      <ellipse cx="12" cy="-75" rx="10" ry="32" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3" />
      <ellipse cx="-12" cy="-75" rx="5" ry="22" fill="#FD79A8" />
      <ellipse cx="12" cy="-75" rx="5" ry="22" fill="#FD79A8" />
      <circle cx="0" cy="-20" r="32" fill="#FFFFFF" stroke="#2D3436" strokeWidth="3" />
      <circle cx="-12" cy="-26" r="5" fill="#2D3436" />
      <circle cx="12" cy="-26" r="5" fill="#2D3436" />
      <circle cx="0" cy="-10" r="4" fill="#FD79A8" />
    </svg>
  );
}

export function ManzanaIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="-60 -55 120 110"
      className={className}
      role="img"
      aria-label="Manzana"
      {...props}
    >
      <path d="M0,-30 C-40,-50 -60,0 -40,30 C-25,55 -5,40 0,35 C5,40 25,55 40,30 C60,0 40,-50 0,-30 Z" fill="#FF6B6B" stroke="#2D3436" strokeWidth="3" />
      <line x1="0" y1="-30" x2="5" y2="-50" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="18" cy="-46" rx="14" ry="7" fill="#1DD1A1" stroke="#2D3436" strokeWidth="2" transform="rotate(-20 18 -46)" />
    </svg>
  );
}

export function CasaIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="-80 -75 160 160"
      className={className}
      role="img"
      aria-label="Casa"
      {...props}
    >
      <rect x="-60" y="-10" width="120" height="90" fill="#FFD93D" stroke="#2D3436" strokeWidth="3" />
      <polygon points="-75,-10 0,-70 75,-10" fill="#FF6B6B" stroke="#2D3436" strokeWidth="3" />
      <rect x="-15" y="30" width="30" height="50" fill="#8B5E3C" stroke="#2D3436" strokeWidth="2" />
      <rect x="-45" y="5" width="22" height="22" fill="#74B9FF" stroke="#2D3436" strokeWidth="2" />
      <rect x="23" y="5" width="22" height="22" fill="#74B9FF" stroke="#2D3436" strokeWidth="2" />
    </svg>
  );
}

export function SolIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="-80 -80 160 160"
      className={className}
      role="img"
      aria-label="Sol"
      {...props}
    >
      <g stroke="#FFD93D" strokeWidth="6" strokeLinecap="round">
        <line x1="50" y1="0" x2="75" y2="0" />
        <line x1="35.36" y1="35.36" x2="53.03" y2="53.03" />
        <line x1="0" y1="50" x2="0" y2="75" />
        <line x1="-35.36" y1="35.36" x2="-53.03" y2="53.03" />
        <line x1="-50" y1="0" x2="-75" y2="0" />
        <line x1="-35.36" y1="-35.36" x2="-53.03" y2="-53.03" />
        <line x1="0" y1="-50" x2="0" y2="-75" />
        <line x1="35.36" y1="-35.36" x2="53.03" y2="-53.03" />
      </g>
      <circle cx="0" cy="0" r="40" fill="#FFD93D" stroke="#2D3436" strokeWidth="3" />
      <circle cx="-14" cy="-8" r="4" fill="#2D3436" />
      <circle cx="14" cy="-8" r="4" fill="#2D3436" />
      <path d="M-12,8 Q0,18 12,8" fill="none" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function CountingItem({
  tipo = "canica",
  numero,
  className = "size-9",
  color = "blue",
}: {
  tipo?: CountingObjectType;
  numero?: number;
  className?: string;
  color?: string;
}) {
  if (tipo === "manzana") return <div className="relative inline-flex items-center justify-center"><ManzanaIcon className={className} />{numero && <span className="absolute -bottom-1 -right-1 rounded-md bg-ink px-1 text-[10px] font-bold text-white">{numero}</span>}</div>;
  if (tipo === "balon") return <div className="relative inline-flex items-center justify-center"><BalonIcon className={className} />{numero && <span className="absolute -bottom-1 -right-1 rounded-md bg-ink px-1 text-[10px] font-bold text-white">{numero}</span>}</div>;
  if (tipo === "lapiz") return <div className="relative inline-flex items-center justify-center"><LapizIcon className="h-6 w-14" />{numero && <span className="absolute -bottom-1 -right-1 rounded-md bg-ink px-1 text-[10px] font-bold text-white">{numero}</span>}</div>;
  if (tipo === "conejo") return <div className="relative inline-flex items-center justify-center"><ConejoIcon className="h-12 w-8" />{numero && <span className="absolute -bottom-1 -right-1 rounded-md bg-ink px-1 text-[10px] font-bold text-white">{numero}</span>}</div>;
  if (tipo === "casa") return <div className="relative inline-flex items-center justify-center"><CasaIcon className={className} />{numero && <span className="absolute -bottom-1 -right-1 rounded-md bg-ink px-1 text-[10px] font-bold text-white">{numero}</span>}</div>;
  if (tipo === "sol") return <div className="relative inline-flex items-center justify-center"><SolIcon className={className} />{numero && <span className="absolute -bottom-1 -right-1 rounded-md bg-ink px-1 text-[10px] font-bold text-white">{numero}</span>}</div>;

  const marbleColor = color === "orange"
    ? "bg-[radial-gradient(circle_at_35%_35%,#fb923c,#ea580c)]"
    : "bg-[radial-gradient(circle_at_35%_35%,#60a5fa,#2563eb)]";

  return (
    <div className={`relative flex items-center justify-center rounded-full border border-ink text-xs font-black text-white shadow-sm ${marbleColor} ${className}`}>
      {numero}
    </div>
  );
}
