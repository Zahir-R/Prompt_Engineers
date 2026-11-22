import { CosmeticIcon } from "@/components/brand/CosmeticIcon";
import { getAvatarOption, getInitials } from "@/lib/demo";
import type { AvatarId } from "@/types/demo";
import type { CosmeticId } from "@/types/cosmetics";
import { cn } from "@/lib/utils";

interface AvatarProps {
  alias: string;
  avatar: AvatarId;
  sticker?: CosmeticId | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "size-9 text-sm",
  md: "size-12 text-base",
  lg: "size-20 text-2xl",
};

export function Avatar({
  alias,
  avatar,
  sticker,
  className,
  size = "md",
}: AvatarProps) {
  const option = getAvatarOption(avatar);

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink font-display font-black shadow-hard",
          option.bg,
          option.text,
          sizes[size],
        )}
        aria-hidden="true"
      >
        {getInitials(alias)}
      </span>
      {sticker && (
        <span className="absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink shadow-hard">
          <CosmeticIcon id={sticker} className="size-3" />
        </span>
      )}
    </span>
  );
}
