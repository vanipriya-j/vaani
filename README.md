# Teaching Playground

Browser-native teaching decks for two instructor-led sessions:

1. **Session 3 — Building and Debugging RAG for DevOps**
2. **Session 4 — CAG and Enterprise Knowledge Systems**

Subtitle: **RAG, CAG and Enterprise Knowledge Systems**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

## Routes

- `/` — session launcher
- `/session-3/deck` — Session 3 teaching deck
- `/session-4/deck` — Session 4 teaching deck
- `/demo/rag-pipeline`
- `/demo/chunking`
- `/demo/break-rag`
- `/demo/rag-vs-cag`
- `/demo/knowledge-router`
- `/demo/incident-simulator`

## Deck controls

- `←` / `→` — previous / next slide
- `Space` / `Enter` — reveal next content (or advance when fully revealed)
- `R` — reveal all content on the current slide
- `N` — toggle presenter notes
- `O` — slide overview
- `F` — browser fullscreen
- `Esc` — close overlays

Slide position is stored in the URL, for example `/session-3/deck?slide=9`.

## Notes

- Fully client-side
- Deterministic local teaching data
- No authentication, database, API routes or external AI services
