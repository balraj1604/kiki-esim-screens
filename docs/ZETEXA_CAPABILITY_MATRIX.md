# Zetexa capability matrix

Supplier: **Zetexa Global Private Limited** (India). "AbleTo" was a partnerships front for the
same company — confirmed, not a separate supplier.

Evidence tags used below:
- **[E]** Verified in email / contract
- **[D]** Verified in API documentation (Postman collection)
- **[S]** Verified by staging test
- **[P]** Verified in production
- **[I]** Inferred, not confirmed
- **[?]** Open question requiring Zetexa confirmation

> Nothing here is tagged **[P]**. As of 2026-09-03 no production credential has been issued, so
> **no Zetexa behaviour has been observed in production.** Every "verified" claim below is
> staging, documentation, or an email promise.

---

## 1 · Core eSIM model

| # | Question | Answer | Tag | Source |
|---|---|---|---|---|
| 1 | Can one eSIM/ICCID hold multiple country packages? | Yes — the product is sold on exactly this. `Topup-Plan{iccid, package_id}` loads further packs onto an existing SIM. | **[D]** | Postman collection; `spicykiwi-backend/ZETEXA_INTEGRATION.md` |
| 2 | Add a new SKU without reinstalling the profile? | Yes — `Topup-Plan` targets the existing ICCID; no re-install, no new QR. | **[D]** | Postman collection |
| 3 | Can Zetexa issue an **empty** eSIM profile (no package)? | **Unknown.** `Create-Order` takes a `package_id` and issues the SIM *with* its first pack. No documented flow issues a bare profile. | **[?]** | Absence in Postman docs; never asked in any email thread |
| 8 | Package validity / activation-start rules | Validity is per-SKU (`validityDays`). Start-of-validity behaviour is not documented and not tested. | **[?]** | — |
| 9 | Overlapping packages / multi-country in one trip | Not documented, not tested. Wasted data per country is **not pooled**. | **[?] / [E]** | 2026-06-16 supplier consult |

> **#3 is commercially load-bearing.** The app currently sells a **$2 SIM install** as a
> standalone product (`SIM_ISSUANCE = { feeUsd: 2 }` in `src/data/esimCatalog.ts`). If Zetexa
> cannot issue a bare profile, that SKU has no supplier primitive behind it. eSIM Go documents an
> issue-then-attach pattern, so it is industry-plausible — but it is **not confirmed for Zetexa**.

---

## 2 · Money, cancellation, refunds

| # | Question | Answer | Tag | Source |
|---|---|---|---|---|
| 4 | When are we charged? | At **package attachment** — wallet debits on `Create-Order` / `Topup-Plan`. Observed live: staging wallet fell $1,000 → $992.97 → $959.78 across test orders. | **[S]** | Zetexa wallet-alert emails, 2026-07-22 to 07-24 |
| 5 | What is refundable, and until when? | `Plan-Refund` works **only while the plan is not activated**. Once a pack attaches to an ICCID and activates, there is **no refund**. | **[D] / [E]** | Postman; `🔐 Security/zetexa-spicykiwi.md` |
| 6 | Roster changes after provisioning? | Not addressed by Zetexa. Commercially this lands on us — Zetexa will not reverse an activated pack. | **[?]** | — |
| 16 | Production wallet: funding, minimum, turnaround | Funding by **bank transfer or Stripe; Stripe deducts 7%**, so they push bank transfer. Minimum top-up, turnaround, per-funding invoices, auto-top-up and credit terms were **asked and not answered**. | **[E] (partial)** | Sunil, 2026-08-03 |
| 17 | Platform / minimum fees | May-2026 MSA: **$500/mo-or-$0.50-per-SIM, whichever is higher**, from month 7, O&M waiver bar raised to **$20k/mo**. Balraj asked for the earlier June terms or $0.50/SIM with no floor for year 1 — **unanswered**. | **[E] disputed** | MSA; Balraj's 2026-07-04 pushback |

> **Refund asymmetry is the core commercial risk.** We can be charged at attach, cannot recover
> after activation, and carry the customer-facing refund liability ourselves. This is precisely
> why the app provisions at check-in (~3h before duty) rather than at roster upload.

---

## 3 · Provisioning, retries, idempotency

| # | Question | Answer | Tag | Source |
|---|---|---|---|---|
| 7 | Can a future package be scheduled by Zetexa? | **No.** There is no scheduling primitive. Spicy Kiwi must hold the trip in a pending state and call `Topup-Plan` at the right moment. | **[D]** | Postman collection |
| 11 | Required endpoints | `Create-Token` → `Packages-List` → `Create-Order` → `Order-Details` / `get-qrcode-details` → `Topup-Plan` → `ESim-Usage` / `GetDataUsage` → `Plan-Refund` → `Reseller-Balance`. | **[D] / [S]** | Postman; staging run 2026-07-23 |
| 10 | Production auth | Two headers on every call: `AccessToken` (permanent 64-byte hex) **and** `Authorization: Bearer <session_token>` from `Create-Token`, valid **10 days** — cache and refresh. | **[D] / [S]** | Postman; working staging client |

### ⚠️ `reseller_orderid` is NOT idempotent — Zetexa corrected themselves

Sunil gave two contradictory answers six hours apart on 2026-07-23:

- 11:27 — *"You should send the order id in the retry."*
- 17:53 — **CORRECTION:** *"reseller_orderid is not idempotent, every retry will create new order,
  you should retry only if response is non 200."*

**The 17:53 correction is authoritative.** Consequence: any blind retry of `Create-Order` issues a
**second SIM and debits the wallet twice**. The backend's own idempotency (`flightNo + dutyDate`)
protects our order records but does **not** protect the supplier call. Retry only on a non-200,
and treat a timeout as *unknown* — reconcile against `Order-Details` before retrying.

Tag: **[E]** — Sunil Reddy, 2026-07-23 17:53.

---

## 4 · Webhooks, eKYC, environments

| # | Question | Answer | Tag | Source |
|---|---|---|---|---|
| 12 | Webhooks in production | *"In production it can be evaluated, you need to share call back url."* We have **not yet supplied a callback URL**. Payloads said to be in the Postman collection. | **[E]** | Sunil, 2026-08-03 |
| 13 | Usage thresholds | **0% and 90% only** — no 60/70%. | **[E]** | `🔐 Security/zetexa-spicykiwi.md` |
| 14 | eKYC in production | *"We will be disabling eKYC for your account, means we are not going to prompt for any eKYC."* Promised, not yet observed in production. | **[E]** | Sunil, 2026-08-03 |
| 15 | Staging vs production | Staging = **dummy packs only**, minimum countries (**France / UAE / US** work; Japan, UK, SG, TH, AU return nothing **by design**), **stub ICCIDs** (`1234123412…`, profile `ZET-ESIM-TEST`, not installable on a real phone), and **no webhooks at all**. | **[E] / [S]** | Sunil, 2026-07-23; staging run |
| 18 | 2GB / 36h custom pack | *"Agree the same would be configured"* for production. Country list (**56 countries**) sent 2026-09-03. Not yet confirmed configured. | **[E] pending** | Sunil 2026-08-03; Balraj 2026-09-03 |

---

## 5 · What is actually proven by test

**Proven on staging (2026-07-23), end to end:**
auth → catalog read → `Create-Order` → `Order-Details` → QR returned.
Order `025ecbbc-21b5-40c2-843f-62622bb37141`; US catalog returned "US 1 Day Unlimited" $3.92;
wallet drew down correctly. Deployed Cloudflare Worker provisioned through it with
`PROVIDER_MODE=live` against `apistg.zetexa.com`; Stripe test payment `pi_3TwIlO…` attached.

**Gotcha found and fixed:** `Create-Order` rejects an `address` shorter than 4 characters
(*"String should have at least 4 characters"*), and the client had been masking it as HTTP 200.
The client now sends a valid address and surfaces Zetexa's `errors[]`.

**Still only assumed:**
real installable ICCIDs · webhook delivery · eKYC actually disabled · the 2GB/36h SKU existing ·
top-up latency · empty-profile issuance · overlapping-package behaviour · refund mechanics in
anger.

---

## 6 · Relationship timeline (evidence trail)

| Date | Event |
|---|---|
| 2026-06-16 | Discovery call (Jatin Deshwal). One-lifetime-SIM model identified as best crew fit. |
| 2026-06-16 | NDA in hand. |
| 2026-06-18 | Pricing sheet + MSA received. |
| 2026-07-07 | MSA countersigned. |
| 2026-07-09 | Amit Agarwal (Founder & CEO) routes onboarding to Sunil. |
| 2026-07-13 | Staging credentials issued; reseller `backend@spicykiwi.co`; eKYC verified. |
| 2026-07-22 → 24 | Integration built; wallet alerts track live drawdown. |
| 2026-07-23 | Sunil's inline answers; **idempotency correction**; end-to-end staging success. |
| 2026-07-31 | Sunil asks for go-live status. |
| 2026-08-03 | Sunil answers all five production questions. |
| 2026-08-30 | Production onboarding form submitted (`partners.zetexa.com/onboard/form`). |
| 2026-08-31 | eKYC re-verified for the production account. |
| 2026-09-01 / 09-02 | Sunil asks twice which countries/packages to open. |
| 2026-09-03 | 56-country list sent. **Awaiting production credentials.** |

Zetexa contacts: **Sunil Reddy** (AVP, working PoC) · **Amit Agarwal** (Founder & CEO) ·
Vidya Bhushan · Srujan Yeleti · Jatin Deshwal (first contact).

---

*No credentials, keys, passwords or supplier pricing appear in this document by design.
Those live only in `🔐 Security/zetexa-spicykiwi.md` on Balraj's machine.*
