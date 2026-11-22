import { getAvatarOption, getInitials } from "@/lib/demo";
import type { AvatarId } from "@/types/demo";
import { cn } from "@/lib/utils";

interface AvatarProps {
  alias: string;
  avatar: AvatarId;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "size-9 text-sm",
  md: "size-12 text-base",
  lg: "size-20 text-2xl",
};

export function Avatar({ alias, avatar, className, size = "md" }: AvatarProps) {
  const option = getAvatarOption(avatar);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[0.9rem_1.2rem_0.7rem_1rem] border-2 border-ink font-display font-black shadow-hard",
        option.bg,
        option.text,
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {getInitials(alias)}
    </span>
  );
}
