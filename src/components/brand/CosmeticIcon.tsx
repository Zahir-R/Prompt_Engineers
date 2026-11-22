import { Rocket, Search, Star } from "lucide-react";
import type { CosmeticId } from "@/types/cosmetics";
import { cn } from "@/lib/utils";

const icons = {
  lupa: Search,
  cohete: Rocket,
  estrella: Star,
};

export function CosmeticIcon({
  id,
  className,
}: {
  id: CosmeticId;
  className?: string;
}) {
  const Icon = icons[id];
  return <Icon className={cn("size-4", className)} aria-hidden="true" />;
}
