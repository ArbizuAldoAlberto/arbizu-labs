# 🧠 NEXUS Control Node — Arbizu Labs (arbizulabs.com)

## 📌 Project Identity
*   **Project Name:** Arbizu Labs Landing Page & Boutique Central
*   **Production subdomain:** https://arbizulabs.com
*   **VPS Port (Assigned):** 3000
*   **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, TailwindCSS v4, Framer Motion
*   **Repository Location:** [portfolio/arbizu-labs](file:///E:/01_DESARROLLO/2026/01_ACTIVE/portfolio/arbizu-labs)
*   **Obsidian Hub Note:** [[02-PROYECTOS/01-ACTIVOS-COMERCIALES/ArbizuLabs/ArbizuLabs|ArbizuLabs.md]]

---

## 🛠️ Local Environment & State
*   **Environment variables:** Configuration in `.env.local`
*   **Dependencies:** npm packages installed, using SQLite database client (`@libsql/client`, `better-sqlite3`) for local lead tracking.
*   **Data store:** Leads are logged locally to JSON (`portfolio/arbizu-labs/data/arbizu_leads.json`) and database targets (`warroom.db` locally).
*   **Critical local commands:**
    *   Development server: `npm run dev`
    *   Build compilation: `npm run build`
    *   Linting: `npm run lint`

---

## 🔄 Active Lifecycle Phase
*   **Current Phase:** `MVP / Parcial` (Landing copy ready, leads schema defined in database layer, local Next.js build compiled).
*   **Production Deployment:** Built locally, Next.js server is not actively running in production yet (Staging/Production deployment pending on VPS).
*   **Last Audit Date:** 2026-06-26

---

## 🎯 Next High-Priority Actions (Monetization & Conversion)
1.  **Staging Deployment:** Upload build to production VPS on port 3000, routable via `vhost_router.js`.
2.  **Lead Capture Integration:** Connect Resend service API keys to `.env.local` to enable corporate audit requests email alerts.
3.  **Hormozi ROI Proposal:** Implement the transformation-centric copy layout of the 13 active services, offering the boutique custom development guarantee.
