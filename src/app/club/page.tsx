import { Suspense } from "react";
import { ClubBoard } from "@/components/club/ClubBoard";

export default function ClubPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="font-hand text-2xl font-bold text-ink-soft">
            Encendiendo La Fogata...
          </p>
        </div>
      }
    >
      <ClubBoard />
    </Suspense>
  );
}
