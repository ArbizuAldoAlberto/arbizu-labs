# 🧠 NEXUS Control Node — Arbizu Labs (arbizulabs.com)

## 📌 Project Identity
*   **Project Name:** Arbizu Labs Landing Page & Boutique Central
*   **Production URL:** https://arbizulabs.com
*   **VPS Port (Internal):** 3002
*   **PM2 Process Name:** `arbizu-labs`
*   **Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript, TailwindCSS v4, Framer Motion
*   **Repository:** https://github.com/ArbizuAldoAlberto/arbizu-labs
*   **Obsidian Hub Note:** [[02-PROYECTOS/01-ACTIVOS-COMERCIALES/ArbizuLabs/ArbizuLabs|ArbizuLabs.md]]

---

## 🛠️ Local Environment & State
*   **Environment variables:** Configuration in `.env.local` (see `DEPLOY.md` for full template)
*   **Dependencies:** npm packages installed. Uses `gray-matter` + `react-markdown` for MDX rendering, `better-sqlite3` / `@libsql/client` for local lead tracking.
*   **Data store:** Leads logged locally to JSON (`data/arbizu_leads.json`) and `warroom.db`.
*   **Critical local commands:**
    *   Development server: `npm run dev`
    *   Build: `npm run build`
    *   TypeScript check: `npx tsc --noEmit`
    *   Lint: `npm run lint`

---

## 📧 Integración de Resend (Contacto y Leads)
*   **API Service:** Resend para envío de notificaciones de formularios corporativos.
*   **Destinatario:** `RESEND_TO_EMAIL=aldo@arbizulabs.com` (configurado en `.env.local`).
*   **Recepción:** Cloudflare Email Routing intercepta `aldo@arbizulabs.com` → reenvía a `arbizualdoalberto@gmail.com`.

---

## 🔐 Seguridad (Post-Patch 2026-08-21)
*   **War Room Auth:** La ruta `/warroom` está protegida por middleware en `src/middleware.ts`. Sin cookie válida → redirect a `/`.
*   **Auth Endpoint:** `POST /api/auth/warroom` valida contra `WARROOM_SECRET_KEY` (variable de entorno — nunca hardcodeada).
*   **Cookie:** `warroom_session` — HttpOnly, Secure, SameSite=Strict, vigencia 7 días.
*   **Security Headers:** HSTS, X-Frame-Options: DENY, nosniff, Referrer-Policy, Permissions-Policy — inyectados via `next.config.ts`.
*   **WARROOM_SECRET_KEY:** Debe configurarse en el `.env.local` del VPS. Generar con `openssl rand -base64 32`.

---

## 🔄 Active Lifecycle Phase
*   **Current Phase:** `Deployed / Live — Post-Security Patch`
*   **Production Deployment:** PM2 (`arbizu-labs`) en puerto 3002 via Nexus Router.
*   **Last Deploy:** 2026-08-21 — Commit `bd74d16`
*   **Last Audit Date:** 2026-08-21
*   **Deploy Guide:** Ver [`DEPLOY.md`](./DEPLOY.md) para el runbook completo de actualización, provisioning y rollback.

---

## 📁 Estructura de Contenido Dinámico
*   **Case Studies MDX:** `src/data/cases/*.mdx` → Renderizados en `/cases/[slug]`
*   **Blog Posts MDX:** `src/data/blog/*.mdx` → Renderizados en `/blog/[slug]`
    *   `why-offline-first-is-critical`
    *   `sub-10ms-latency-titanflow-optimization`
    *   `sqlite-wal-vs-watermelondb-performance`
    *   `building-multichain-defi-ethers`
    *   `n8n-vs-zapier-open-source-automation`
*   **Sitemap dinámico:** `src/app/sitemap.ts` indexa automáticamente todos los slugs de `/cases` y `/blog`.

---

## 🎯 Next High-Priority Actions
1.  **Configurar `WARROOM_SECRET_KEY` en el VPS** antes del próximo restart de PM2.
2.  **Ejecutar el deploy de producción** siguiendo el runbook en `DEPLOY.md`.
3.  **Verificar Security Headers** con `curl -I https://arbizulabs.com` post-deploy.
4.  **Hormozi ROI Proposal:** Implementar el layout de copy de transformación para los 13 servicios activos.
