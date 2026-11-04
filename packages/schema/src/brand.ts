import { z } from "zod";
import { SCHEMA_VERSION } from "./version.js";
import { ColorToken, FontFamilyToken, FontWeightToken } from "./tokens.js";

export const BrandColors = z
  .object({
    primary: ColorToken,
    surface: ColorToken,
    text: ColorToken,
    accent: ColorToken.optional(),
  })
  .catchall(ColorToken);

const FontSpec = z.strictObject({
  family: FontFamilyToken,
  weight: FontWeightToken,
  fallback: z.enum(["serif", "sans-serif", "monospace"]).default("sans-serif"),
});

export const BrandTypography = z
  .object({
    heading: FontSpec,
    body: FontSpec,
  })
  .catchall(FontSpec);

export const LockPath = z
  .string()
  .regex(
    /^(name|tagline|logo|colors\.[a-z0-9-]+|typography\.[a-z0-9-]+)$/,
    "e.g. name, logo, colors.primary, typography.heading",
  );

export const BrandSpec = z
  .strictObject({
    schema_version: z.literal(SCHEMA_VERSION),
    id: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "lowercase slug, e.g. fernwood"),
    name: z.string().min(1),
    tagline: z.string().optional(),
    logo: z
      .strictObject({
        asset: z.string(),
        minWidth: z.number().positive().optional(),
        maxWidth: z.number().positive().optional(),
      })
      .optional(),
    audience: z.string().optional(),
    personality: z.array(z.string()).min(1).max(6).optional(),
    colors: BrandColors,
    typography: BrandTypography,
    locked: z.array(LockPath).default([]),
  })
  .superRefine((brand, ctx) => {
    brand.locked.forEach((path, i) => {
      const [group, key] = path.split(".");
      const exists =
        group === "colors"
          ? key in brand.colors
          : group === "typography"
            ? key in brand.typography
            : group === "name"
              ? true
              : group === "tagline"
                ? brand.tagline !== undefined
                : group === "logo"
                  ? brand.logo !== undefined
                  : false;
      if (!exists) {
        ctx.addIssue({
          code: "custom",
          path: ["locked", i],
          message: `lock path "${path}" does not exist in this brand`,
        });
      }
    });
  });

export type BrandSpec = z.infer<typeof BrandSpec>;
