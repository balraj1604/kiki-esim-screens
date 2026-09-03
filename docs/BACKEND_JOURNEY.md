# Backend journey — intended vs. existing

Audit of the deployed backend against the roster → check-in → provisioning journey.
Source repo: `spicykiwi-backend` (private). **Nothing was modified during this audit.**

**Stack:** Hono on Cloudflare Workers · Supabase Postgres (project `esim-backend`, Mumbai,
service_role) · Stripe · Zetexa. Deliberately brand-agnostic — no app name anywhere; the app
flips one flag to use it. Schema `migrations/0001_init.sql`, **14 tables**, applied 2026-07-15.

**Deployed state:** live Worker, `PROVIDER_MODE=live`, pointed at Zetexa **staging**
(`apistg.zetexa.com`). Stripe on **test** keys.

---

## Capability audit

| Journey capability | Intended behaviour | Existing code / API | Current state | Missing work | Risk / decision |
|---|---|---|---|---|---|
| Personal account + auth | Tier-1 signup with a personal email, no crew questions | `routes/auth.ts`, `POST /auth/otp/start`, `/auth/otp/verify` | Implemented but staging-only | Production Stripe/identity wiring | Low |
| Airline-email OTP | One-time crew verification via company email | same OTP routes; email + OTP stored **hashed** | Implemented but staging-only | Airline-domain allow-list; anti-abuse | Domain list must not hard-code Emirates |
| Crew status / eligibility | Tier-2 flag drives 15% discount + free SIM | `crewBundle.ts`, `pricingPolicy.ts` (app side) | Partially implemented | Server-authoritative entitlement check | Discount must be enforced server-side, not in the client |
| Roster-derived trips | OCR roster → trips | `modules/roster-vision` (native Swift, Apple Vision), `lib/roster*.ts` — **on-device only** | Implemented, app-side | Sync trips to backend for check-in | Privacy promise: rosters are never uploaded |
| Planned destination packages | Trip held in a pending state | `orders` with 4 status axes | Partially implemented | "Planned" state ahead of payment | — |
| Manual check-in | User confirms ~3h before duty | `lib/checkin.ts` (app), `POST /orders/:id/provision` | Implemented but staging-only | Server-side time-window validation | 3h is **not locked** — see Open Questions |
| Auto check-in | Opt-in, provisions on user's behalf | consent UI exists in app | **UI-only / mocked** | Consent ledger (version, timestamp, trip, SKU, notification); final pre-provision notice | **Needs product decision** — default on/off not decided |
| Payment / entitlement | Stripe pays, or bundle covers it | `payments/stripe.ts`, `POST /webhooks/stripe` | Implemented, test keys | Live keys; subscription entitlement for the roster plan | Roster plan is a subscription; only one-off intents exist |
| Existing eSIM ownership | One crew SIM per user | first ICCID persisted on `sim_profiles` | Implemented and tested (staging) | — | Good |
| Initial eSIM order | `Create-Order` issues SIM + first pack | `providers/zetexa-client.ts` | Implemented and tested (staging) | Production catalog | — |
| Top-up onto existing SIM | `Topup-Plan(iccid, package_id)` | `providers/zetexa.ts` | Implemented and tested (staging) | Production SKUs | — |
| **Supplier idempotency** | Never double-issue a SIM | our own idempotency on `flightNo + dutyDate` | **Partially implemented** | Timeout reconciliation against `Order-Details` before any retry | 🔴 **`reseller_orderid` is NOT idempotent** — a blind retry issues a second SIM and debits the wallet twice |
| Provisioning status | Separate from payment/activation | 4 independent status axes | Implemented | — | Good design; keep it |
| Network activation | `sim_status == ACTIVE` | `ESim-Usage` poll | Partially implemented | Lifecycle webhook (production only) | Polling is the fallback |
| Usage tracking | Live consumption | `GET /orders/:id/usage`, `provider.usage(iccid)` | Implemented and tested (staging) | 0%/90% webhooks | Only two thresholds exist |
| Notifications | Check-in prompt, install success | `expo-notifications` in app | **Planned but absent** — no push entitlement on the binary | Push entitlement + server triggers | Blocks auto check-in's "final notice" |
| Cancellation / refund | Only before activation | `Plan-Refund` documented | **Planned but absent** | Refund policy engine matching Zetexa's limits | 🔴 Blocked by supplier: no refund after activation |
| Supplier webhooks | Order status, usage, lifecycle | `POST /webhooks/zetexa` handler exists | **Blocked by supplier** | Supply a callback URL to Zetexa | Cannot be tested until production |
| Stripe webhooks | Payment confirmation | `POST /webhooks/stripe` | Implemented, test mode | Live signing secret | — |
| Audit log / support evidence | Prove what happened and when | partial via order rows | Partially implemented | Consent + provisioning audit trail | Required before auto check-in ships |

---

## End-to-end sequence — who does what

```
1  APP       roster upload → on-device OCR → trips (roster never leaves the phone)
2  APP       trip list synced as PLANNED orders
3  BACKEND   idempotency key = flightNo + dutyDate; order created, nothing charged yet
4  BACKEND   ~3h before duty → CHECK-IN PENDING; push to app
5  APP       user confirms (or auto check-in fires on stored consent)
6  BACKEND   validate: trip real · crew eligible · SIM exists · payment/entitlement · SKU live
7  STRIPE    charge, or consume roster-plan entitlement
8  BACKEND   first SIM?  → Zetexa Create-Order  (issues SIM + first pack)
             existing?   → Zetexa Topup-Plan(iccid, package_id)
             ⚠ retry ONLY on non-200; on timeout reconcile via Order-Details first
9  ZETEXA    returns order_id, ICCID, lpa_server, base64 QR
10 BACKEND   persist; status → PROVISIONED  (payment / provision / activation / cancel stay separate)
11 APP       install via Apple eSIM Universal Link (no carrier entitlement needed)
12 NETWORK   user lands abroad → profile attaches → sim_status = ACTIVE
13 BACKEND   ACTIVE via lifecycle webhook (production) or ESim-Usage poll (fallback)
14 BACKEND   usage webhooks at 0% and 90% only → top-up prompt
15 BACKEND   trip ends → COMPLETED.  Refund possible ONLY if never activated.
```

**Axis rule (already correct in the code — do not collapse it):** payment, provisioning,
activation and cancellation are four independent axes, so a Stripe event and a Zetexa event can
never overwrite each other.

---

## The three things that block go-live

1. **Production Zetexa credentials.** Everything downstream waits on this. Staging returns
   stub ICCIDs that cannot be installed on a real phone.
2. **Supplier-retry safety.** Non-idempotent `reseller_orderid` must be handled before any real
   money moves, or a network blip double-charges a customer.
3. **Live Stripe keys + roster-plan subscription entitlement.** Only one-off payment intents
   exist today; the $26/mo roster plan has no subscription path yet.
