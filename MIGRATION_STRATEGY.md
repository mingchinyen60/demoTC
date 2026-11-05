# TimeCubic Website Migration Strategy & Step-by-Step Plan

**Target Architecture:** Modern High-Performance Jamstack on Cloudflare Pages  
**Current Origin:** Weebly SaaS (`199.34.228.77`) proxied via Cloudflare  
**Objective:** Zero-downtime transition, preservation of SEO & business emails, and elevation to a world-class precision timing manufacturer web experience.

---

## 1. Strategic Target Architecture: Cloudflare Pages

### Why Cloudflare Pages is the Optimal Platform
1. **Existing DNS Ecosystem:** `timecubic.com` is **already routed through Cloudflare edge nodes**. Migrating to Cloudflare Pages requires **zero registrar transfer** and **zero propagation delay** (switchover happens in < 5 seconds).
2. **Zero Hosting Overhead:** Unlimited bandwidth, automated global edge caching (300+ PoPs), and free automated SSL.
3. **Serverless Capabilities:** Native Cloudflare Workers integration provides JavaScript/TypeScript edge functions for RFQ processing, email notification, and rate limiting.
4. **Git CI/CD Pipeline:** Commits to GitHub automatically generate preview branch deployments and instantaneous rollbacks if needed.

---

## 2. Risk Mitigation & Pre-Migration Principles

> **Zero Disruption to Corporate Email (MX Records):**
> TimeCubic business communications (`info@timecubic.com`, executive inboxes) depend on existing DNS records. The migration plan explicitly isolates web routing (`A` / `CNAME` records for `timecubic.com` and `www`) from all mail exchange (`MX`, `TXT/SPF`, `DKIM`, `DMARC`) records.

> **Preservation of Datasheets & Legacy URLs (301 Redirect Rules):**
> Many subsea exploration, avionics, and defense clients have bookmarked direct PDF datasheet links. We will maintain exact path aliases for legacy paths (`/uploads/1/3/8/8/138843707/*`) directly mapping to `/assest/pdf/*`.

---

## 3. Step-by-Step Migration Execution Plan

### Phase 1: Local Prototype Assembly & Asset Integration (Current Phase)
* [x] **Step 1.1 — Asset Harvesting:** All official PDFs, product photographs, performance curves, diagrams, and brand assets downloaded to local `assest/` folder.
* [x] **Step 1.2 — Server Runtime Audit:** Verified current Weebly constraints and established client-side architecture requirements in `SERVER_CAPABILITIES_AND_TECH_STACK.md`.
* [ ] **Step 1.3 — Component Integration:** Replace temporary SVG placeholders in design options (`example_index.html`, `option_b_thinksrs.html`) with real downloaded assets:
  - Embed official product images (`product_q050_transparent.png`, `product_q100_q101.png`, etc.).
  - Wire up official PDF datasheets to download buttons (`q050_datasheet_rev_b.pdf`, etc.).
  - Implement interactive Chart.js / SVG telemetry for Allan deviation and phase noise.
* [ ] **Step 1.4 — Responsive & SEO Optimization:** Add OpenGraph tags, JSON-LD structured data for precision timing products, and mobile navigation.

---

### Phase 2: Staging Deployment (Zero Risk, Zero DNS Impact)
* [ ] **Step 2.1 — Git Repository Setup:** Initialize clean Git repository tracking the static web application and assets.
* [ ] **Step 2.2 — Deploy to Cloudflare Pages Staging:** 
  - Connect repository to Cloudflare Pages (or deploy via Wrangler CLI).
  - Generates a private, secure staging URL (e.g., `timecubic-preview.pages.dev`).
  - **Live production traffic remains 100% on Weebly at this stage.**

---

### Phase 3: Stakeholder Review & Quality Assurance
* [ ] **Step 3.1 — Interactive Feature Testing:** Verify product tab switching, specification comparison tables, and interactive performance charts.
* [ ] **Step 3.2 — PDF & Asset Integrity:** Confirm all datasheet download links trigger proper binary downloads.
* [ ] **Step 3.3 — Lead Gen / RFQ Form Testing:** Test quote submission forms using serverless endpoints (e.g., Cloudflare Workers + Resend API or Web3Forms) with spam prevention (Cloudflare Turnstile).
* [ ] **Step 3.4 — Mobile & Cross-Browser Audit:** Verify performance on Chrome, Safari, Edge, Firefox, iOS, and Android.

---

### Phase 4: Credentials Acquisition & DNS Cutover (Live Switchover)
*(To be executed once you obtain Cloudflare / Domain credentials)*

```
Required Credentials Checklist:
[ ] Cloudflare Account Login (or Domain Registrar if Cloudflare is delegated)
[ ] Contact Form Notification Email (e.g., sales@timecubic.com destination)
```

* [ ] **Step 4.1 — Backup Current DNS Configuration:**
  - Export full BIND DNS zone file from Cloudflare as a fallback rollback snapshot.
  - Record existing `A` records (`199.34.228.77`).
* [ ] **Step 4.2 — Configure Cloudflare Pages Custom Domain:**
  - In Cloudflare Pages dashboard, add `timecubic.com` and `www.timecubic.com`.
  - Cloudflare automatically routes traffic internally to the Pages build.
* [ ] **Step 4.3 — Configure 301 Redirect Rules in `_redirects`:**
  ```text
  # Legacy page redirects
  /products.html    /products    301
  /q050.html        /q050        301
  /q100.html        /q100        301
  /q101.html        /q101        301
  /q200.html        /q200        301
  /a100.html        /a100        301
  /about.html       /about       301
  /partners.html    /partners    301
  /contact.html     /contact     301

  # Legacy PDF upload links
  /uploads/1/3/8/8/138843707/q050.rev_b.pdf    /assest/pdf/q050_datasheet_rev_b.pdf    301
  /uploads/1/3/8/8/138843707/q052_rev._c.pdf   /assest/pdf/q052_datasheet_rev_c.pdf   301
  /uploads/1/3/8/8/138843707/q100.rev_o.pdf    /assest/pdf/q100_datasheet_rev_o.pdf    301
  /uploads/1/3/8/8/138843707/q100.rev_k.pdf    /assest/pdf/q100_datasheet_rev_k.pdf    301
  /uploads/1/3/8/8/138843707/q101rev_c.pdf     /assest/pdf/q101_datasheet_rev_c.pdf    301
  /uploads/1/3/8/8/138843707/q200.rev_j.pdf    /assest/pdf/q200_datasheet_rev_j.pdf    301
  ```
* [ ] **Step 4.4 — Instantaneous DNS Switch:**
  - Update `CNAME` for `www` and apex `@` to point to `timecubic.pages.dev`.
  - Because proxying is managed on Cloudflare, the cutover takes effect immediately without waiting for standard 24-48 hr DNS propagation.

---

### Phase 5: Post-Launch Verification & Weebly Decommissioning
* [ ] **Step 5.1 — Global Health Check:** Verify SSL certificate status, HTTPS enforcement, and HTTP/3 performance across worldwide edge locations.
* [ ] **Step 5.2 — Mail Deliverability Check:** Send test emails to and from `@timecubic.com` to confirm zero disruption to MX records.
* [ ] **Step 5.3 — Form Dispatch Verification:** Submit a live RFQ test inquiry and verify email notification receipt.
* [ ] **Step 5.4 — Decommissioning Weebly:**
  - Keep the Weebly site dormant for 14-30 days as a warm backup.
  - Cancel Weebly renewal once post-launch stability is verified.

---

## 4. Rollback Plan (Zero Risk Guarantee)
If any unforeseen issue arises during cutover:
1. Revert Cloudflare DNS `A` records back to `199.34.228.77`.
2. Traffic reverts to the Weebly site within 10 seconds.
3. No data or communication loss is possible.
