# Kiki eSIM — shared handover

**Read this first.** Give this file to ChatGPT, Claude or Codex before any screen-by-screen
discussion or implementation prompt. It is the shared baseline, not the company history.

Build documented here: **1.0.24 (27)**, iPhone 17 Pro simulator, iOS 26.5.
Live screen review: **https://balraj1604.github.io/kiki-esim-screens/**

---

## 1 · What Kiki eSIM is

A **crew-first travel eSIM app**, operated by **Spicy Kiwi, LLC** (Delaware). The eSIM is the
wedge, not the product. The product is the crew layer on top: roster-aware data planning,
layover intel, crew picks, layover hotels, days-abroad and savings tracking.

Beachhead is **Emirates** cabin crew and pilots, then Etihad → JAL → ANA. The architecture must
**not** hard-code Emirates.

Direct competitor: **Crew SIM** (eSIM Mobile GmbH, ~5K users, email-only support). Price is not
the wedge — the roster workflow is.

---

## 2 · The three user tiers

| Tier | Who | How they get there | What they get |
|---|---|---|---|
| **1** | Standard user | Downloads the app, signs up with a personal email. We do not know if they fly. | Browse, buy, install and use normal destination eSIMs. **No crew questions at first launch** — deliberately, so nobody feels pressured to hand over an airline email before understanding the app. |
| **2** | Verified crew | Chooses *Verify as Crew* later, from inside the app. One-time airline-company email + OTP. | Same purchase journey, plus crew benefits — currently **free SIM install** and **15% off** eligible plans. |
| **3** | Crew with roster | Verified crew uploads a monthly roster. | A curated monthly **crew bundle** covering the outstation countries in that roster. |

**Personal login identity and airline-employment verification are separate concepts.** A user
has one account; crew status is an attribute on it, not a different account.

---

## 3 · One eSIM, many packages

Zetexa was chosen for exactly this: **one long-lived eSIM profile / ICCID receives multiple
destination packages over time.** One install, then packs are added as needed.

Never model this as one eSIM per trip. A user with seven roster destinations should *see* seven
destinations prepared — but the system must **not** provision all seven up front, because rosters
change and Zetexa gives no refund once a pack activates.

---

## 4 · Roster → check-in → provisioning

```
roster predicts a duty
   → destination plan sits in PLANNED / pending
   → ~3h before departure, app prompts CHECK-IN
   → user confirms (or auto check-in fires)
   → backend validates trip, eligibility, eSIM state, payment, SKU
   → backend attaches the Zetexa SKU to the existing eSIM
   → user lands; pack becomes usable per Zetexa's activation rules
```

**The roster is a prediction layer, not proof a trip will operate.** The check-in gate exists
because provisioning is financially irreversible.

**The 3-hour window is not locked.** It depends on Zetexa's validity-clock behaviour, which is
still unverified (see `docs/OPEN_QUESTIONS.md` A8, B2).

---

## 5 · Auto check-in

Opt-in only. When enabled, the system may confirm and provision an upcoming roster trip on the
user's behalf.

Non-negotiable requirements:
- An **auditable consent record**: consent version, timestamp, trip, destination, SKU,
  provisioning time, notifications sent.
- A **final advance notification** before irreversible provisioning.
- A refund and roster-change policy that matches Zetexa's real limits — not the softer May-2026
  6-scenario matrix, which predates the no-refund-after-activation finding.

**The on/off default is an open product decision.** Do not assume it. See `OPEN_QUESTIONS.md` B1.

---

## 6 · Lifecycle state model

Four **independent axes** — payment · provisioning · activation · cancellation. Never collapse
them into one status; the existing backend already separates them, so a Stripe event and a
Zetexa event cannot overwrite each other.

```
planned → check-in pending → confirmed (user | auto) → provisioning → provisioned
        → active → completed
        ↘ cancelled | failed
refund:  eligible (not yet activated) | ineligible (activated) | requested
```

---

## 7 · Verified Zetexa capabilities

Full evidence table with per-claim source: **`docs/ZETEXA_CAPABILITY_MATRIX.md`**.

Confirmed:
- One ICCID holds multiple country packages; `Topup-Plan` adds a SKU with no re-install. **[docs]**
- End-to-end order → QR works on staging. **[tested 2026-07-23]**
- Auth is two headers: permanent `AccessToken` + 10-day bearer from `Create-Token`. **[tested]**
- Charged at **package attachment** — wallet debits on order/top-up. **[observed]**
- Usage webhooks fire at **0% and 90% only**. **[email]**
- eKYC will be disabled for our account. **[email promise, unobserved]**

**Nothing is verified in production.** No production credential has been issued as of 2026-09-03.

---

## 8 · Supplier constraints that shape the product

1. 🔴 **`reseller_orderid` is NOT idempotent.** Zetexa corrected this on 2026-07-23: every retry
   creates a new order. Retry **only** on a non-200; on a timeout, reconcile via `Order-Details`
   before retrying. A blind retry issues a second SIM and debits the wallet twice.
2. 🔴 **No refund once a pack activates.** Refund is possible only while un-activated. We carry
   the customer-facing liability.
3. 🟠 **No scheduling primitive.** Zetexa cannot queue a future package — our backend must hold
   pending state and call at the right moment.
4. 🟠 **Staging is dummy-only**: stub ICCIDs (not installable), France/UAE/US only, no webhooks.
5. 🟠 **Wallet is prepaid**, min recharge $1,000; Stripe top-ups cost 7%, so bank transfer.
6. 🟡 Wasted data per country is **not pooled** across destinations.

---

## 9 · Existing backend status

Full table: **`docs/BACKEND_JOURNEY.md`**.

Deployed Cloudflare Worker (Hono) + Supabase (Mumbai) + Stripe + Zetexa. 14 tables live.
Provisioning works end-to-end against Zetexa **staging** with `PROVIDER_MODE=live`.

Go-live is intended to be **configuration, not a rewrite**. The real gaps: production credentials,
supplier-retry safety, live Stripe keys, roster-plan subscription entitlement, push entitlement,
and the auto-check-in consent ledger.

---

## 10 · Open questions and unverified assumptions

See **`docs/OPEN_QUESTIONS.md`**. The four never-asked supplier questions are: empty-profile
issuance, roster-change handling after provisioning, overlapping packages, and when the validity
clock starts.

**Every price in the app is a placeholder** (`src/data/esimCatalog.ts`, `pricing.ts`) — they were
set against staging dummy packs, not real wholesale.

---

## 11 · Visual-review repository conventions

- Every screen has a **permanent id**: `S001` … `S078`. **IDs never change.** A new screen gets
  the next free number; nothing is renumbered.
- Each screen has two files: the **original** (byte-for-byte as captured, never cropped,
  recoloured or relabelled) and an **annotated review sheet**.
- The annotated sheet shows the id and name, the dimensions, an **X/Y ruler in logical points**,
  and four stable region ids: `-A` top/header, `-B` upper content, `-C` lower content,
  `-D` bottom/navigation.
- **Regions are coordinate bands, not verified component names.** They exist so a sentence can
  point at part of a screen. Do not treat `S012-B` as a claim about what that widget does.
- Coordinates are **logical points**; native pixels are 3× (1206 × 2622 px = 402 × 874 pt).
- Metadata per screen lives in `data/screens.json`: id, name, category, tier, state, route,
  source file, dimensions, regions. `route` is `null` unless it matched a real route in the app —
  routes are never guessed.

---

## 12 · How to reference a screen out loud

- "Open **S012**." → the search box accepts `12`, `012`, `S012`, a name, or a route.
- "Look at **S012-B**." → the upper-content band of screen 12.
- "Change the area around **Y 220 to Y 340**." → logical points, measured on the original.
- "Keep **S012-D** unchanged." → leave the bottom navigation alone.

Hovering the original image shows live X/Y in both points and pixels, plus which region the
cursor is in. Each screen has a copyable deep link (`…#S012`).

---

## 13 · Safety rules for anyone working on this

- **Never** put API keys, passwords, bearer tokens, OTPs, certificates, backup codes, bank
  details or legal identity documents in this repository or in any generated HTML.
- **Never** publish Zetexa or any supplier pricing sheet. Those are NDA'd and marked
  CONFIDENTIAL.
- This repository is **public-safe by construction**: screenshots and derived metadata only.
- The canonical app (`spicykiwi-app-live`) and backend (`spicykiwi-backend`) are **private and
  must stay private**. Do not make them public to host anything.
- Do not push to the canonical app or backend without explicit approval. Do not email suppliers
  without explicit approval.
- Do not claim a Zetexa capability is confirmed unless an original source or a successful test
  supports it. Tag it `[?]` instead.

---

*Generated 2026-09-03. Screens from build 1.0.24 (27).*
