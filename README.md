# Kiki eSIM — visual review

Numbered screen library for **Kiki eSIM**, built so a voice conversation can point at an exact
screen and an exact part of it.

**Live:** https://balraj1604.github.io/kiki-esim-screens/

Build **1.0.24 (27)** · iPhone 17 Pro simulator · iOS 26.5 · **78 screens**

---

## Read this first

**[`KIKI_ESIM_SHARED_HANDOVER.md`](KIKI_ESIM_SHARED_HANDOVER.md)** — give this to ChatGPT,
Claude or Codex before any screen discussion or implementation prompt.

Then, as needed:

| File | What it holds |
|---|---|
| [`docs/SCREEN_INDEX.md`](docs/SCREEN_INDEX.md) | Every screen, its permanent id, tier, state and route |
| [`docs/BACKEND_JOURNEY.md`](docs/BACKEND_JOURNEY.md) | Intended journey vs. what the backend actually does today |
| [`docs/ZETEXA_CAPABILITY_MATRIX.md`](docs/ZETEXA_CAPABILITY_MATRIX.md) | What the supplier can do, with evidence and confidence tags |
| [`docs/OPEN_QUESTIONS.md`](docs/OPEN_QUESTIONS.md) | Only what is still unresolved |
| [`data/screens.json`](data/screens.json) | Machine-readable metadata for all 78 screens |

---

## How to talk about a screen

- **“Open S012.”** — the search box takes `12`, `012`, `S012`, a screen name, or a route.
- **“Look at S012-B.”** — the upper-content band of that screen.
- **“Change the area around Y 220 to Y 340.”** — logical points on the original screenshot.
- **“Keep S012-D unchanged.”** — the bottom navigation.

Hover the original to read live X/Y in points and pixels. Every screen has a deep link (`…#S012`).

---

## Conventions

- **IDs are permanent.** New screens take the next free number. Nothing is renumbered, ever.
- **Originals are untouched** — byte-for-byte as captured. Never cropped, recoloured or labelled.
- Annotated sheets are **derived files** sitting beside them, never overwriting the original.
- Coordinates are **logical points**; native pixels are 3× (1206 × 2622 px = 402 × 874 pt).
- Region ids `-A` / `-B` / `-C` / `-D` are **coordinate bands, not component names**. They let a
  sentence point at part of a screen; they are not a claim about what a widget does.
- `route` is `null` unless the screen matched a real route in the app. Routes are never guessed.

---

## Structure

```
├── KIKI_ESIM_SHARED_HANDOVER.md
├── index.html · styles.css · app.js
├── data/screens.json
├── screens/original/   S001-….png          (exact captures)
├── screens/annotated/  S001-…-annotated.png (review sheets)
└── docs/
```

---

## Safety

This repository is **public-safe by construction**: screenshots and derived metadata only.

No API keys, passwords, tokens, OTPs, certificates, bank details, legal identity documents or
supplier pricing appear here — and none may ever be added. The canonical app
(`spicykiwi-app-live`) and backend (`spicykiwi-backend`) are private and stay private.

Screens were captured with a safety boundary: no account was deleted, no purchase submitted, and
no real OTP email sent — so the crew-verification sequence stops at the filled-email state.
