"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, LogIn, LogOut, Sparkles } from "lucide-react";
import { Avatar } from "@/components/brand/Avatar";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";
import { Sticker } from "@/components/brand/Sticker";
import { useApp } from "@/context/AppProvider";
import { AVATAR_OPTIONS, getSolvedCount } from "@/lib/demo";
import type { AvatarId } from "@/types/demo";
import { cn } from "@/lib/utils";

export default function EntrarPage() {
  const router = useRouter();
  const {
    ready,
    activeProfile,
    enterClass,
    logout,
    getProfileProgress,
  } = useApp();
  const [code, setCode] = useState("");
  const [alias, setAlias] = useState("");
  const [avatar, setAvatar] = useState<AvatarId>("teal");
  const [error, setError] = useState("");
  const [imported, setImported] = useState<number | null>(null);
  const guestSolved = getSolvedCount(getProfileProgress("guest"));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setImported(null);

    const result = enterClass(code, alias, avatar);
    if (!result.ok) {
      setError(result.error ?? "No pudimos entrar.");
      return;
    }

    if (result.imported) {
      setImported(result.imported);
    }

    router.push("/perfil");
  };

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-hand text-2xl font-bold text-ink-soft">
          Preparando tu carnet...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <PaperCard strong className="relative p-6 sm:p-8">
          <div className="tape -top-3 left-10" aria-hidden="true" />
          <Sticker tone="teal">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Cuenta de aventura
          </Sticker>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-none text-ink">
            Elige tu alias
          </h1>
          <p className="mt-3 font-semibold leading-relaxed text-ink-soft">
            Los cursos están abiertos para todos. El alias solo sirve para
            guardar racha, XP y participar en La Fogata.
          </p>

          {activeProfile ? (
            <div className="mt-6 rounded-2xl border-2 border-ink bg-paper-deep/50 p-5">
              <div className="flex items-center gap-3">
                <Avatar
                  alias={activeProfile.alias}
                  avatar={activeProfile.avatar}
                  size="md"
                />
                <div>
                  <p className="font-display text-2xl font-semibold text-ink">
                    {activeProfile.alias}
                  </p>
                  <p className="text-sm font-bold text-ink-soft">
                    {activeProfile.role === "teacher"
                      ? "Cuenta de guía"
                      : "Aventurero del club"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/perfil"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-mustard px-4 py-2.5 text-sm font-black text-ink shadow-hard"
                >
                  Ir a mi carnet
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setImported(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-paper px-4 py-2.5 text-sm font-black text-ink shadow-hard"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Cambiar de perfil
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="codigo" className="text-sm font-black text-ink">
                  Código de clase
                </label>
                <input
                  id="codigo"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="MATES-3A"
                  autoComplete="off"
                  className="mt-1 h-12 w-full rounded-[0.7rem_1rem_0.8rem_1.1rem] border-2 border-ink bg-paper-deep/35 px-3 font-black uppercase tracking-wide text-ink focus:border-sky focus:bg-paper focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="alias" className="text-sm font-black text-ink">
                  Tu alias
                </label>
                <input
                  id="alias"
                  value={alias}
                  onChange={(event) => setAlias(event.target.value)}
                  placeholder="Ej. ZorroVeloz"
                  autoComplete="off"
                  maxLength={20}
                  className="mt-1 h-12 w-full rounded-[0.7rem_1rem_0.8rem_1.1rem] border-2 border-ink bg-paper-deep/35 px-3 font-black text-ink focus:border-sky focus:bg-paper focus:outline-none"
                />
                <p className="mt-1 text-xs font-semibold text-ink-soft">
                  No uses tu nombre completo. Elige un alias divertido.
                </p>
              </div>

              <div>
                <p className="text-sm font-black text-ink">Tu color</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setAvatar(option.id)}
                      aria-label={`Elegir color ${option.label}`}
                      aria-pressed={avatar === option.id}
                      className={cn(
                        "rounded-xl border-2 p-1 transition-transform",
                        avatar === option.id
                          ? "border-ink shadow-hard"
                          : "border-transparent opacity-70 hover:opacity-100",
                      )}
                    >
                      <Avatar alias={alias || "Tú"} avatar={option.id} size="sm" />
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="rounded-xl border-2 border-coral bg-[#f8d8d1] p-3 text-sm font-bold text-ink">
                  {error}
                </p>
              )}

              {guestSolved > 0 && (
                <p className="rounded-xl border-2 border-mustard bg-[#fbe7b8] p-3 text-sm font-bold text-ink">
                  Encontramos {guestSolved} hoja{guestSolved === 1 ? "" : "s"}{" "}
                  resuelta{guestSolved === 1 ? "" : "s"} en este navegador.
                  Podemos traerlas a tu carnet al entrar.
                </p>
              )}

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-coral-deep px-4 text-base font-black text-paper shadow-hard"
              >
                <LogIn className="size-5" aria-hidden="true" />
                Entrar al club
              </button>
              <p className="text-center text-xs font-semibold text-ink-soft">
                Demo local: no hay contraseña ni correo. Código de ejemplo:{" "}
                <strong className="text-ink">MATES-3A</strong>.
              </p>
            </form>
          )}
        </PaperCard>

        <div className="relative mx-auto w-full max-w-xs">
          <Mascot className="mx-auto size-48" />
          <div className="paper-note mt-2 rotate-1 p-4">
            <p className="font-hand text-xl font-bold leading-tight text-ink">
              “Tu alias no necesita tu nombre. Solo tiene que ser tuyo.”
            </p>
          </div>
          {imported !== null && (
            <p className="mt-3 text-center text-sm font-bold text-teal">
              Trajimos {imported} hoja{imported === 1 ? "" : "s"} a tu carnet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
