import { z } from "zod";

const Hex = z
  .string()
  .regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "expected #rrggbb or #rrggbbaa");

export const ColorToken = z.strictObject({
  $type: z.literal("color"),
  $value: Hex,
  $description: z.string().optional(),
});
export type ColorToken = z.infer<typeof ColorToken>;

export const FontFamilyToken = z.strictObject({
  $type: z.literal("fontFamily"),
  $value: z.array(z.string().min(1)).min(1).max(4), // first is the font, rest are fallbacks
});
export type FontFamilyToken = z.infer<typeof FontFamilyToken>;

export const FontWeightToken = z.strictObject({
  $type: z.literal("fontWeight"),
  $value: z.number().int().min(100).max(900),
});
export type FontWeightToken = z.infer<typeof FontWeightToken>;
