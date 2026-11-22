"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  House,
  LayoutDashboard,
  LogIn,
  MessageCircle,
  Route,
  Star,
  UserRound,
} from "lucide-react";
import { Avatar } from "@/components/brand/Avatar";
import { Mascot } from "@/components/brand/Mascot";
import { useApp } from "@/context/AppProvider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio", icon: House },
  { href: "/hoja-de-ruta", label: "Ruta", icon: Route },
  { href: "/club", label: "La Fogata", icon: MessageCircle },
  { href: "/perfil", label: "Mi perfil", icon: UserRound },
];

export function AppHeader() {
  const pathname = usePathname();
  const { activeProfile, cosmetics, ready } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-2 sm:gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Mascot className="size-12 shrink-0" />
          <span className="leading-none">
            <span className="block font-display text-2xl font-semibold text-ink">
              Mates
            </span>
            <span className="mt-0.5 block font-hand text-lg font-bold text-coral-deep">
              cuaderno de aventuras
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
                aria-label={label}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-[0.8rem_1rem_0.7rem_1.1rem] border-2 px-2 py-1.5 text-[11px] font-black leading-none transition-transform sm:flex-row sm:gap-2 sm:px-3 sm:py-2 sm:text-sm",
                  active
                    ? "-rotate-1 border-ink bg-mustard/60 text-ink shadow-hard"
                    : "border-transparent text-ink-soft hover:-rotate-1 hover:border-ink hover:bg-paper-deep hover:text-ink",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {!ready ? (
          <span className="h-10 w-24 rounded-xl border-2 border-ink/20 bg-paper-deep/50" />
        ) : activeProfile?.role === "teacher" ? (
          <Link
            href="/panel"
            className="ml-auto flex items-center gap-2 rounded-[1rem_0.7rem_1.1rem_0.8rem] border-2 border-ink bg-[#e2d8f2] px-3 py-2 text-sm font-black text-ink shadow-hard sm:ml-0"
          >
            <LayoutDashboard className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Panel de guía</span>
            <span className="sm:hidden">Panel</span>
          </Link>
        ) : activeProfile ? (
          <Link
            href="/perfil"
            className="ml-auto flex items-center gap-2 rounded-[1rem_0.7rem_1.1rem_0.8rem] border-2 border-ink bg-paper px-2 py-1.5 text-sm font-black text-ink shadow-hard sm:ml-0"
          >
            <Avatar
              alias={activeProfile.alias}
              avatar={activeProfile.avatar}
              sticker={cosmetics.equipped}
              size="sm"
            />
            <span className="hidden max-w-20 truncate md:inline">
              {activeProfile.alias}
            </span>
            <span className="flex items-center gap-1 text-xs text-coral-deep">
              <Flame className="size-3.5" aria-hidden="true" />
              {activeProfile.streakCurrent}
            </span>
            <span className="flex items-center gap-1 text-xs text-sky">
              <Star className="size-3.5" aria-hidden="true" />
              {activeProfile.xp}
            </span>
          </Link>
        ) : (
          <Link
            href="/entrar"
            className="ml-auto flex items-center gap-2 rounded-[1rem_0.7rem_1.1rem_0.8rem] border-2 border-ink bg-[#cce9e3] px-3 py-2 text-sm font-black text-ink shadow-hard sm:ml-0"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
