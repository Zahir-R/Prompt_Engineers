export type CosmeticId = "lupa" | "cohete" | "estrella";

export interface CosmeticSticker {
  id: CosmeticId;
  label: string;
  description: string;
  cost: number;
  bg: string;
  text: string;
}

export interface ProfileCosmetics {
  owned: CosmeticId[];
  equipped: CosmeticId | null;
}

export type CosmeticsByProfile = Record<string, ProfileCosmetics>;
