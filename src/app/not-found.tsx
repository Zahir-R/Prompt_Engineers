import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
      <span className="flex size-16 items-center justify-center rounded-3xl bg-blue-100 text-blue-700">
        <SearchX className="size-8" aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-display text-3xl font-semibold text-slate-900">
        No encontramos esta página
      </h1>
      <p className="mt-2 font-semibold text-slate-600">
        Revisa el enlace o vuelve al inicio para seguir aprendiendo.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-bold text-white"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver al inicio
      </Link>
    </div>
  );
}
