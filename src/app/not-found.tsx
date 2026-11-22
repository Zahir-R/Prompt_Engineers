import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";
import { PaperCard } from "@/components/brand/PaperCard";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
      <PaperCard strong className="relative w-full p-8">
        <div className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden="true" />
        <Mascot className="mx-auto size-36" />
        <span className="mx-auto mt-4 flex size-14 items-center justify-center rounded-2xl border-2 border-ink bg-[#fbe7b8] text-ink shadow-hard">
          <SearchX className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          Esta hoja no está en el cuaderno
        </h1>
        <p className="mt-2 font-semibold text-ink-soft">
          Revisa el enlace o vuelve al inicio para seguir aprendiendo.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink bg-mustard px-4 py-2.5 font-black text-ink shadow-hard"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al inicio
        </Link>
      </PaperCard>
    </div>
  );
}
