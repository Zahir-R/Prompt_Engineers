"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ClipboardList,
  GraduationCap,
  House,
  Route,
  Sparkles,
} from "lucide-react";
import { DiagnosisModal } from "@/components/companion/DiagnosisModal";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio", icon: House },
  { href: "/ruta", label: "Ruta", icon: Route },
  { href: "/docente", label: "Docente", icon: GraduationCap },
];

export function AppHeader() {
  const pathname = usePathname();
  const [diagnosisOpen, setDiagnosisOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold text-slate-900">
                Mates
              </span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-blue-600">
                Modo Desglose
              </span>
            </span>
          </Link>

          <nav className="ml-auto flex items-center gap-1" aria-label="Principal">
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-colors",
                    active
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setDiagnosisOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-900 transition-colors hover:bg-amber-200"
          >
            <ClipboardList className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Ver Diagnóstico para Acompañante</span>
            <span className="sm:hidden">Diagnóstico</span>
          </button>
        </div>
      </header>

      <DiagnosisModal
        open={diagnosisOpen}
        onClose={() => setDiagnosisOpen(false)}
      />
    </>
  );
}
