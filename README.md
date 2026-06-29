# 🔬 Arbizu Labs — Production Frontend & Products Hub

Welcome to the official frontend repository for **Arbizu Labs** ([arbizulabs.com](https://arbizulabs.com)), the commercial software hub hosting DeFi analytics, AgTech siloing dashboards, and physical prototype catalogs.

This repository runs as a Next.js production server managed by PM2 on a secure Hetzner VPS environment, serving as the client-facing gateway for Aureus, TitanFlow, and custom AgTech components.

---

## 🎨 Design System & UI Principles

The interface is built using a custom-tailored design system centered around **Glassmorphism & High-Contrast Dark Mode**:
- **Palette:** Curated HSL colors inspired by high-tech telemetry consoles.
- **Micro-interactions:** Framer Motion-powered transitions, active node status badges, and smooth scroll behaviors.
- **Aesthetics:** Clean layout hierarchy, responsive grid structures for multi-device monitoring, and strict typography optimization.

---

## ⚡ Key Modules & Features

### 1. Dynamic Service Monitor (`/status`)
Integrates a client-side React hook system that fetches real-time health checkpoints directly from the internal APIs. Displays status badges (Online / Offline / Degraded) for key services like Ollama, Supabase DB, and Titan-Flow process monitors.

### 2. Lead Capturing Action Engine (`/api/leads`)
Secure serverless endpoint routing user contact inquiries directly into the administrative funnel, built with server-side validations to mitigate spam attacks.

### 3. Localization Support (`next-intl`)
Ready-to-serve translations for multi-market operations (English and Spanish support natively integrated).

---

## 🛠️ Local Development & Scripts

### Installation
Clone the repository and install the production dependencies:
```bash
npm install
```

### Running the Development Environment
```bash
npm run dev
```

### Production Build & Launch
Build the optimized static assets and launch the local Node server:
```bash
npm run build
npm run start
```

---

## 🔒 Security & Deployment Architecture
- **Environment Separation:** API keys, database URLs, and server routes are strictly loaded from `.env.local` which is omitted from version control.
- **Process Orchestration:** Handled via PM2 daemon on the production node:
  ```bash
  PORT=3002 pm2 start npm --name "arbizu-labs" -- run start
  ```
- **Virtual Host Gateway:** Requests targeting `arbizulabs.com` are forwarded by the **NEXUS Gateway Router** over SSL/TLS port 443 directly to local port 3002.

---

*Arbizu Labs — Systems Built for High Availability.*
