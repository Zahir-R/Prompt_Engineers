export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function createId(prefix = "custom"): string {
  return `${prefix}_${Date.now().toString(36)}`;
}
