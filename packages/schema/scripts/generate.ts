import { mkdirSync, writeFileSync } from "node:fs";
import { z } from "zod";
import { BrandSpec, DesignSpec } from "../src/index.js";

const outDir = new URL("../published/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const schemas = {
  brand: BrandSpec,
  design: DesignSpec,
};

for (const [name, schema] of Object.entries(schemas)) {
  const json = JSON.stringify(z.toJSONSchema(schema), null, 2) + "\n";
  writeFileSync(new URL(`${name}.json`, outDir), json);
}
