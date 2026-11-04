import { z } from "zod";
import { SCHEMA_VERSION } from "./version.js";

export const DesignSpec = z.object({
  schema_version: z.literal(SCHEMA_VERSION),
  sections: z.array(z.object({ id: z.string(), kind: z.string() })),
});
