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

## 📧 Integración de Resend (Contacto y Leads)
*   **API Service:** Utilizamos Resend para el envío programático de notificaciones de formularios de contacto corporativo.
*   **Configuración de Destinatario:** Las notificaciones se envían a la dirección especificada en `RESEND_TO_EMAIL` (configurada en `.env.local`). 
*   **Flujo Corporativo:** Para mantener el profesionalismo B2B, usamos el correo corporativo `RESEND_TO_EMAIL="aldo@arbizulabs.com"`.
*   **Recepción y Lectura (Cloudflare Email Routing):** El dominio de Cloudflare intercepta todo el correo enviado a `aldo@arbizulabs.com` y lo reenvía automáticamente a la bandeja de entrada personal `arbizualdoalberto@gmail.com`. De esta forma, gestionamos todo en una sola bandeja de entrada de Gmail sin pagar por infraestructura extra ni tener problemas de rebote por "mailbox not found" en Resend.

---

## 🔄 Active Lifecycle Phase
*   **Current Phase:** `Deployed / Live` (Active on production VPS, serving corporate services and contact endpoints).
*   **Production Deployment:** Running on production VPS port 3002 via PM2 (`arbizu-labs`). Mapped to `arbizulabs.com` and `www.arbizulabs.com` via Nexus Router on port 80.
*   **Last Audit Date:** 2026-07-06

---

## 🎯 Next High-Priority Actions (Monetization & Conversion)
1.  **Hormozi ROI Proposal:** Implement the transformation-centric copy layout of the 13 active services, offering the boutique custom development guarantee.
