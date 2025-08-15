import { Variant } from "./variant";

export interface VariantGroup {
  topVariantName: string;
  topVariantId: number;
  options: Variant[];
}