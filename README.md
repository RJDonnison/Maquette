# Maquette

A TypeScript harness for designing, rendering, evaluating and revising
websites using a structured **DesignSpec**. It is the toolchain around the
[Kern](https://github.com/RJDonnison/Kern) design model, but works with any OpenAI-compatible model.

> Status: early planning / proof of concept.

## What it does

- Defines `BrandSpec` and `DesignSpec` (Zod schemas, exported as JSON Schema)
- Renders specs to deterministic desktop and mobile previews
- Runs hard-gate checks: overflow, contrast, accessibility, required elements
- Applies versioned, lock-aware revision patches
- Generates controlled degraded variants for critique/repair data
- Evaluates models on held-out briefs
- Exports JSONL training data for Kern

## Requirements

- Node.js LTS, pnpm
- A Chromium install (`CHROMIUM_PATH`, default `/usr/bin/chromium`)
- Pinned fonts in `fonts/`

## Setup

```bash
pnpm install
pnpm -r build
pnpm -r test
```

## Layout

```
packages/   schema, renderer, validators, patch, degrade,
            model-client, store, eval, controller, mcp
apps/       cli, review
data/       briefs, brands, specs, renders, exports (generated data git-ignored)
docs/       scope, provenance
fonts/      pinned font files
```

## Configuration

Copy `maquette.config.example.json` to `maquette.config.json`:

```json
{
  "modelEndpoint": "http://localhost:8000/v1",
  "modelName": "kern-2b",
  "exportDir": "./data/exports",
  "chromiumPath": "/usr/bin/chromium"
}
```

## Licence

Apache-2.0. See `LICENSE` and `NOTICE`. Third-party fonts and assets keep
their own licences; see `docs/provenance.md`.
