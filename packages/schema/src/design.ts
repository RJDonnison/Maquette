import { z } from "zod";

export const DesignSpec = z.object({
  schema_version: z.string(),
  sections: z.array(z.object({ id: z.string(), kind: z.string() })),
});
