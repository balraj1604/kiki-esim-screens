# Open questions

Only unresolved items. Anything answered lives in `ZETEXA_CAPABILITY_MATRIX.md`.

---

## A · Blocking — ask Zetexa

| # | Question | Why it blocks | Asked? |
|---|---|---|---|
| A1 | **Production credentials** — where are they? | No real eSIM can be issued. Staging returns stub ICCIDs. Their stated SLA was 48h from the onboarding form (submitted 2026-08-30). | Form submitted; country list sent 2026-09-03 |
| A2 | **Can you issue an empty eSIM profile (no package)? At what cost, via which API call?** | The **$2 SIM-install SKU** in the app depends on it. No documented flow does this. | ❌ **Never asked** |
| A3 | **Minimum initial wallet top-up? Turnaround? Invoice per funding? Auto-top-up or credit terms?** | Cannot fund production without it. | Asked 2026-08-03 — **only partly answered** (bank transfer preferred, Stripe costs 7%) |
| A4 | **Is the 2GB/36h pack configured, for which of the 56 countries?** | It is the hero SKU the product is built around. | Promised 2026-08-03; list sent 2026-09-03 — unconfirmed |
| A5 | **MSA fee terms** — June terms, or $0.50/SIM with no floor for year 1? | $500/mo-or-$0.50-per-SIM from month 7, waiver bar $20k/mo. | Asked 2026-07-04 — **never answered** |
| A6 | **What happens to an activated pack if the roster changes?** | Determines who eats the cost. | ❌ Never asked |
| A7 | **Overlapping packages / multi-country trips** — behaviour? | Crew hit several countries per pairing. | ❌ Never asked |
| A8 | **Validity clock** — does it start at attach, at activation, or at first network use? | Changes when we can safely provision. | ❌ Never asked |

> A2, A6, A7 and A8 have never been put to Zetexa. They are all cheap to ask in one email and
> each one currently sits behind a product decision.

---

## B · Product decisions Balraj must make

| # | Decision | Options | Note |
|---|---|---|---|
| B1 | **Auto check-in default** | on / off / prompt at first roster upload | Must not be decided silently. Consent ledger is required either way. |
| B2 | **Is 3 hours the right check-in window?** | 3h / 6h / airline-dependent | Not locked. Depends on A8 and on operational reality. |
| B3 | **Refund policy shown to the customer** | mirror Zetexa exactly / absorb some cost as goodwill | Zetexa gives **no refund after activation**. The 6-scenario matrix locked in May predates that. |
| B4 | **Crew-verification airline scope** | Emirates only / any verifiable airline domain | Architecture must not hard-code Emirates. Broad gating expands TAM 5–10×. |
| B5 | **Consumer brand** | SORU / ROMU / DRIFTO | Still unlocked. App currently ships as "Kiki eSIM". |
| B6 | **Roster-plan subscription mechanics** | Stripe subscription / entitlement credits | $26/mo plan has no subscription path in the backend yet. |

---

## C · Unverified assumptions carried by the product

1. Zetexa can issue a bare profile — **assumed, unverified** (A2).
2. eKYC will actually be off in production — **promised, unobserved**.
3. Webhooks will actually fire — **never exercised**; polling is the only proven path.
4. Real ICCIDs will install via the Apple Universal Link — **never tested with a real profile**.
5. In-app prices reconcile to real wholesale — **every number in `esimCatalog.ts` /
   `pricing.ts` is a PLACEHOLDER** against staging dummy packs.
6. The roster predicts trips reliably enough to pre-provision — roster is a *prediction* layer,
   not proof a duty will operate.
7. Top-ups land fast enough to keep the wallet non-empty during a launch spike — untested.

---

## D · Housekeeping

- **Go-live date.** The stated 15 August 2026 target was missed and **no new date has been
  communicated to Zetexa.**
- **Push entitlement.** The binary ships `expo-notifications` with no push entitlement, so the
  check-in prompt — the core mechanic — cannot actually reach a user yet.
- **Expo SDK.** Tree is on **54**; `AGENTS.md` and the August Codex prompts say read **v56** docs.
  Resolve before the next native change.
- **Founders' Agreement with Akito is unsigned.** The LLC is 100% Balraj on paper.
