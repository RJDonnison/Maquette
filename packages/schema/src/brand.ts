import { z } from "zod";

export const BrandSpec = z.object({
  name: z.string(),
  tagline: z.string().optional(),
});
