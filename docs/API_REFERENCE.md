# Kiki eSIM — API reference

Two APIs matter: **our backend** (which the app talks to) and **Zetexa's**
(which our backend talks to). The app never calls Zetexa directly.

    app  ->  our backend  ->  Zetexa
                          ->  Stripe

**No credentials appear in this document, by design.** No access keys, no
reseller id, no passwords, no wallet balances, no wholesale prices. This is the
shape of the API, not the keys to it. Do not ask for the secrets and do not
suggest putting them in this repository.

Everything below is read out of the real backend source
(`src/providers/zetexa-client.ts`, `src/routes/*.ts`, `migrations/0001_init.sql`),
not from memory. The backend repo itself is private and stays private.

---

## 1. Our backend

**Stack:** Hono on Cloudflare Workers · Supabase Postgres · Stripe · Zetexa.
Brand-agnostic on purpose — no app name anywhere in it, so the app flips one
flag to point at it.

| Method | Path | What it does |
|---|---|---|
| `GET`  | `/` | service banner + which provider mode is live (`mock` / `live`) |
| `GET`  | `/health` | liveness |
| `POST` | `/auth/otp/start` | begin airline-email crew verification |
| `POST` | `/auth/otp/verify` | complete it |
| `POST` | `/orders` | create an order — **idempotent** on `flightNo + dutyDate` |
| `POST` | `/orders/:id/provision` | issue the eSIM, or top up the existing one |
| `POST` | `/orders/:id/payment-intent` | Stripe PaymentIntent for the app's sheet |
| `POST` | `/orders/:id/pay-test` | mark paid without Stripe (test mode only) |
| `GET`  | `/orders/:id` | order state |
| `GET`  | `/orders/:id/usage` | live data usage for that order's SIM |
| `POST` | `/webhooks/stripe` | payment confirmation |
| `POST` | `/webhooks/zetexa` | order-status / lifecycle callbacks |

### Order status has four INDEPENDENT axes

This is the single most important design fact. Stripe events and Zetexa events
never overwrite each other, because they write to different columns.

    payment_status     unpaid | paid | refunded | failed
    provision_status   none | ordering | provisioned | failed
    activation_status  inactive | active | expired
    cancel_status      none | requested | cancelled

**Provisioning is not activation.** Provisioned means Zetexa issued the profile.
Activated means the SIM actually attached to a network at the destination.

### Principles baked in

- **Server-authoritative.** Eligibility, payment, provisioning and cancellation
  are decided on the server, never in the app.
- **Idempotent** roster orders, keyed on flight number + duty date.
- Airline email and OTP are stored **hashed**.
- Card numbers never touch our server — the app uses Stripe's sheet directly.

### Tables (14)

    app_users · orders · payments · refunds · packages · provider_orders
    sim_profiles · duties · check_ins · otp_challenges · idempotency_keys
    wallet_ledger · webhook_events · outbox_jobs

---

## 2. Zetexa (the supplier)

**Zetexa Global Private Limited, India.** White-label eSIM supply.

    staging      https://apistg.zetexa.com
    production   https://api.zetexa.com
    public docs  https://documenter.getpostman.com/view/33743060/2sAYX6qhN7

### Auth — two headers on every call

    AccessToken     <permanent reseller access key>
    Authorization   Bearer <session token>

The session token is minted by `POST /v1/Create-Token` with the reseller email
and password, and is valid **10 days**, so the client caches and refreshes it.
Both values live outside this repo.

### Endpoints our client actually calls

| Endpoint | Method | Purpose |
|---|---|---|
| `/v1/Create-Token` | POST | mint the 10-day session token |
| `/v1/Packages-List` | GET | catalog, filterable by country or region |
| `/v1/Create-Order` | POST | **issue a new eSIM together with its first pack** |
| `/v1/Order-Details` | POST | order contents, including SIM data |
| `/v1/get-qrcode-details` | POST | ICCID + `lpa_server` + base64 PNG QR |
| `/v1/Topup-Plan` | POST | load another pack **onto the same ICCID** |
| `/v1/ESim-Usage` | POST | `sim_status` (`ACTIVE` = attached) + data used |
| `/v1/Reseller-Balance` | POST | wallet balance |
| `/v1/Plan-Refund` | POST | refund — only while a plan is **not** activated |

`Create-Order` body:

    package_id        the SKU
    country           ISO2
    first_name        required
    last_name         required
    address           required — MUST be at least 4 characters
    email             required
    reseller_orderid  optional, our own ref (flightNo:dutyDate)

### The provisioning sequence

    1. Create-Token                        -> session token (cached)
    2. Packages-List?country_code=XX       -> pick a package_id
    3. Create-Order                        -> order_id, and the eSIM is issued
    4. Order-Details / get-qrcode-details  -> ICCID + lpa_server + QR
    5. Topup-Plan(iccid, package_id)       -> every LATER pack, same SIM
    6. ESim-Usage / GetDataUsage           -> status and consumption
    7. Plan-Refund                         -> only if never activated

**First purchase for a crew member = Create-Order. Every purchase after that =
Topup-Plan onto the ICCID we already stored.** One SIM per person, for life,
many packs over time. Any design that implies one eSIM per trip is wrong.

---

## 3. Supplier constraints that shape the design

These are commercial and technical facts, not opinions. They are why the app
behaves the way it does.

- **No refund once a pack attaches to an ICCID.** So the app provisions only
  close to a confirmed flight — that is what the check-in gate exists for.
- **Usage webhooks fire at 0% and 90% only.** No 60/70% hooks. Anything finer
  has to be polled.
- **Webhooks are production-only.** Staging cannot forward them at all.
- **eKYC is disabled** for our reseller account, so no per-customer KYC prompt.
- One base SIM is a small one-time cost per crew member, charged once, for life.
- A prepaid wallet funds everything; it must hold credit before any real order.

---

## 4. What is actually verified

| Thing | State |
|---|---|
| Auth → catalog → Create-Order → Order-Details → QR, on **staging** | ✅ verified end-to-end |
| Deployed Worker provisioning through staging with `PROVIDER_MODE=live` | ✅ verified |
| Stripe test payment → provision → QR returned | ✅ verified |
| **A real, installable eSIM** | ❌ **not possible yet** |
| Production credentials | ❌ not issued yet |
| Usage / lifecycle webhooks | ❌ never exercised (production-only) |
| Any price in the app | ❌ **placeholder**, set against staging dummy packs |

**Staging returns test stubs** — ICCIDs beginning `1234123412…` and the profile
name `ZET-ESIM-TEST`. They are not installable on a real phone. Only Zetexa
production issues a working eSIM.

### Gotchas already hit and fixed

- `Create-Order` rejects an `address` shorter than 4 characters, and the client
  used to mask that as an HTTP 200. It now sends a valid address and surfaces
  Zetexa's `errors[]`.
- Staging's catalog is dummy data and only a few countries are configured, so a
  country returning no packs on staging means nothing about production.

---

## Rules for an AI reading this

- Do **not** claim a Zetexa capability is confirmed unless this document or the
  capability matrix says so. Nothing has been verified in production.
- Do **not** treat any in-app price as real.
- Do **not** propose putting keys, passwords, bank details or supplier pricing
  into this public repository.
- Related: [ZETEXA_CAPABILITY_MATRIX.md](ZETEXA_CAPABILITY_MATRIX.md) ·
  [BACKEND_JOURNEY.md](BACKEND_JOURNEY.md) ·
  [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md)
