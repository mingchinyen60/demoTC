# TimeCubic Server Capability & Programming Language Assessment
**Document Purpose:** Architectural reference and technical compatibility guide for the TimeCubic website redesign.  
**Assessment Date:** November 2026  
**Target Domain:** `www.timecubic.com` (IP: `199.34.228.77`)  

---

## 1. Executive Summary & Production Environment Audit

Our network probe, DNS trace, and HTTP header inspection of the live `timecubic.com` server reveal the following infrastructure:

| Infrastructure Layer | Live Environment Component | Diagnostic Evidence |
| :--- | :--- | :--- |
| **Edge / CDN Layer** | **Cloudflare Reverse Proxy & CDN** | `Server: cloudflare`, `CF-Ray: a557c30b5c4aa9c2-TPE`, `CF-Cache-Status` |
| **Origin Host / CMS** | **Weebly (Square Inc.) SaaS** | `X-Host: blu20.sf2p.intern.weebly.net`, Reverse DNS: `pages-custom-29.weebly.com` |
| **Origin IP** | `199.34.228.77` | Standard Weebly multi-tenant shared IP block |
| **Security / Transport** | TLS 1.3 / HTTP/2, Cloudflare Bot Management | `__cf_bm` cookie active, Cloudflare email protection |
| **Local Dev Tooling** | Node.js `v24.19.0`, npm `11.17.0`, Python `3.14.7` | Ready for modern build tooling & bundlers |

---

## 2. Server-Side vs. Client-Side Language Support Matrix

Because the origin server is on **Weebly SaaS**, there are strict boundaries between what can run server-side vs. client-side:

### A. Server-Side Execution (Backend / Origin)

| Language / Runtime | Supported on Origin? | Technical Detail & Implications |
| :--- | :---: | :--- |
| **Node.js / JavaScript Backend** | ❌ **NO** | No Node.js runtime, PM2, or container execution on Weebly origin. You **cannot** host an Express.js, NestJS, or Next.js SSR server on the current origin. |
| **Custom PHP** | ❌ **NO** | User-uploaded `.php` files return `404 Not Found`. Only closed internal Weebly scripts (such as `/ajax/apps/formSubmit.php`) are executed. |
| **Python / Ruby / Java / Go** | ❌ **NO** | No CGI or WSGI / ASGI interface available for backend code execution. |
| **Server-Side SQL / NoSQL DB** | ❌ **NO** | No direct database connection (PostgreSQL, MySQL, MongoDB) on the origin host. |

> [!IMPORTANT]
> **Key Architectural Takeaway:** The current production host is purely a **static asset web host** with a proprietary CMS templating engine. Any custom business logic, interactive calculations, or dynamic behaviors **must run client-side (in the browser)** or communicate via external REST APIs / Serverless functions.

---

### B. Client-Side Execution (In-Browser Runtimes)

The browser environment has **no restrictions** on what client-side technologies we can use:

| Client-Side Capability | Feasibility | Application for the New Design |
| :--- | :---: | :--- |
| **Modern JavaScript (ES6+ / ES2024)** |  **100% Full Support** | Vanilla JavaScript or bundled frameworks (React, Vue, Alpine.js, Svelte) execute smoothly. |
| **Interactive 3D / WebGL (Three.js)** |  **100% Full Support** | Can render an interactive 3D model of the TimeCubic oscillator cubes (e.g. Q100, Q200) with rotatable views, pin highlights, and internal shielding visualization. |
| **Interactive Charting Engines (Chart.js / ApexCharts / ECharts)** |  **100% Full Support** | Replace static screenshot graphs with real-time, interactive performance plots (Allan deviation $\sigma_y(\tau)$, phase noise curves, temperature drift simulation, holdover countdowns). |
| **Tailwind CSS & PostCSS** |  **100% Full Support** | Can be loaded via CDN for rapid prototyping or pre-compiled into a production CSS bundle for maximum performance. |
| **WebAssembly (WASM)** |  **100% Full Support** | High-performance subsea drift simulation or timekeeping calculations compiled from C++/Rust can run directly in the user's browser. |
| **Service Workers & PWA** |  **100% Full Support** | Cache datasheets (PDFs) and assets locally for offline viewing by field engineers. |

---

## 3. Recommended Architectural Paths for the New Design

Depending on deployment strategy, there are two primary paths:

### Path A: Zero-Migration Path (Stay on Weebly Origin)
If TimeCubic wants to keep their current Weebly subscription and DNS configuration unchanged:

1. **Architecture:** Jamstack (Pre-built Static Site).
2. **Build Pipeline:**
   - Use our local Node.js (`v24.19.0`) environment with Vite / Tailwind CSS / Alpine.js or React.
   - Run `npm run build` to generate pure static files (`index.html`, `main.css`, `app.js`).
   - Upload the static bundle into Weebly's "Edit HTML/CSS" theme editor or embed sections.
3. **Form Handling & Lead Gen:**
   - Use Weebly's built-in form endpoint (`/ajax/apps/formSubmit.php`), or
   - Integrate modern serverless form endpoints such as **Web3Forms**, **Formspree**, or **Resend API**.
4. **Interactive Features:**
   - Client-side JavaScript embeds for product selection filters, parametric search, and interactive Allan deviation graphers.

---

### Path B: Modern Decoupled / Serverless Path (Recommended Upgrade)
If TimeCubic is open to modernizing their hosting (which can be done with zero downtime and at $0 - $10/month hosting cost):

1. **Recommended Platforms:**
   - **Cloudflare Pages** (Natural fit since `timecubic.com` already uses Cloudflare DNS and Edge).
   - **Vercel** or **Netlify**.
   - **Firebase Hosting** (Google Cloud ecosystem).
2. **Advantages:**
   - **Edge Functions / Serverless JavaScript**: Full support for Node.js / TypeScript edge functions for quote requests, NDA verification, or automated PDF datasheet generation.
   - **Sub-50ms Global TTFB**: Fast global edge delivery, critical for international oil & gas / aerospace clients.
   - **Automated CI/CD**: Automatic staging & preview deployments directly from Git commits.
   - **Dynamic Server-Side Rendering (SSR)** or Static Site Generation (SSG) via Next.js, Astro, or Vite.

---

## 4. Design & Technology Stack Recommendations for New Implementation

| Module / Page Component | Recommended Technology | Why It Fits |
| :--- | :--- | :--- |
| **CSS Framework** | **Tailwind CSS v3/v4** | Clean engineering aesthetic, grid patterns, high performance, fully compatible with both Weebly themes and modern hosts. |
| **Product Modals & Tabs** | **Vanilla JS / Alpine.js** | Lightweight (<15 KB), zero compilation needed, easy to integrate directly into HTML templates. |
| **Performance Curves** | **Chart.js** or **SVG Vector Charts** | Interactive tooltips for Frequency Stability vs. Temp, Allan Deviation, Phase Noise vs. Offset. |
| **3D Hardware Viewer** | **Three.js** / **model-viewer** | Interactive rotating view of Q050 / Q100 / Q200 hardware enclosures with pinout callouts. |
| **RFQ / Spec Inquiries** | **Client-side JS Form + Webhook** | Collects user specs (operating temp, frequency, supply voltage) and dispatches clean formatted requests to engineering sales. |

---

## 5. Summary Checklist for Developers

- [x] **Origin identified:** Weebly SaaS (`pages-custom-29.weebly.com` / `199.34.228.77`).
- [x] **CDN identified:** Cloudflare (active).
- [x] **Server-side script execution:** Unavailable on origin host (no arbitrary Node/PHP/Python).
- [x] **Client-side JavaScript capabilities:** Fully unconstrained (ES6+, WebGL, Charting, WASM).
- [x] **Local dev environment:** Node.js v24.19.0, npm 11.17.0, Python 3.14.7 installed.
- [x] **Design strategy:** Implement as a high-performance, client-side driven static web application compatible with both Weebly injection and modern Jamstack hosting.
