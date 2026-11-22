import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppProvider } from "@/context/AppProvider";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mates | Aprende con el Modo Desglose",
  description:
    "Plataforma de nivelación matemática para primaria con explicaciones visuales paso a paso.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppProvider>
          <AppHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white/70 px-4 py-6 text-center text-sm text-slate-500">
            Abstracthon 2026 · Educación · Modo Desglose
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
