"use client";

import { useEffect } from "react";
import { AnatomyPanel } from "@/components/anatomy/AnatomyPanel";
import type { Exercise } from "@/types/exercise";

interface DeconstructionModalProps {
  exercise: Exercise;
  open: boolean;
  onClose: () => void;
}

export function DeconstructionModal({
  exercise,
  open,
  onClose,
}: DeconstructionModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Modo desglose de ${exercise.titulo}`}
        className="w-full max-w-2xl"
      >
        <AnatomyPanel
          key={exercise.id}
          exercise={exercise}
          mode="modal"
          onClose={onClose}
        />
      </div>
    </div>
  );
}
