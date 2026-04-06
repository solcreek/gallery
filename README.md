# Creek Template Gallery

Browsable template gallery for [Creek](https://creek.dev). Fork this repo to create your own template marketplace.

**Live:** [templates.creek.dev](https://templates.creek.dev)

## Quick Start

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # Output to dist/
```

## Fork & Customize

Two files to edit:

### 1. `src/gallery.config.ts`

Brand name, deploy URL, nav links:

```typescript
export const config = {
  brand: "your-brand",
  deployUrl: "https://your-platform.com/deploy?template={slug}",
  cliCommand: "npx your-cli deploy --template {slug}",
  sourceUrl: "https://github.com/your-org/templates/tree/main",
  // ...
};
```

### 2. `public/templates.json`

Template catalog (no rebuild needed to update):

```json
{
  "templates": [
    {
      "slug": "my-template",
      "name": "My Template",
      "description": "What it does",
      "type": "app",
      "capabilities": ["d1", "ai"],
      "screenshotUrl": null
    }
  ]
}
```

## Deploy on Creek

```bash
npx creek deploy
```

Or deploy anywhere that serves static files.

## Tech Stack

Vite + React 19 + TanStack Router + Tailwind 4. Six production dependencies.

## License

Apache-2.0
