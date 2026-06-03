# grabwhatyoulove

Animated single-page landing site for **grabwhatyoulove** — affordable-luxury
jewellery & perfume miniatures. Pink editorial-luxury theme in a "Sapphire"
style bento-grid layout.

Built with **Vite + React + Tailwind CSS v4 + Framer Motion**.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Project layout

```
public/images/      # all site imagery the app loads from /images/
public/raw/         # original product source photos (img1..img12)
src/components/     # one file per page section
src/lib/motion.jsx  # shared animation helpers (Reveal, WordReveal, count-up)
scripts/            # postprocess.mjs (sharp crops: logo, favicon, cat, insta)
gpt-image-mcp/      # tooling: MCP server + studio.mjs image-generation pipeline
```

## Image pipeline (optional)

Product images were art-directed and generated with OpenAI's `gpt-image-2` via
`gpt-image-mcp/studio.mjs`, then cropped with `scripts/postprocess.mjs`.
Regenerating requires an OpenAI key:

```bash
# from gpt-image-mcp/
OPENAI_API_KEY=sk-... node studio.mjs            # all shots
OPENAI_API_KEY=sk-... node studio.mjs hero-ring  # a single shot
npm run postprocess                              # refresh derived crops
```

> The API key is read from the environment only — never commit it.
