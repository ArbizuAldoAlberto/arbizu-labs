# 🚀 DEPLOY RUNBOOK — Arbizu Labs (arbizulabs.com)

> **Propósito:** Guía oficial de despliegue, actualización y rollback para el VPS de producción de `arbizulabs.com`.  
> **Mantenida por:** Aldo Alberto Arbizu — `aldo@arbizulabs.com`  
> **Última actualización:** 2026-08-21

---

## 📋 Índice

1. [Variables de Entorno Requeridas](#variables-de-entorno-requeridas)
2. [Infraestructura del Servidor](#infraestructura-del-servidor)
3. [Actualización Estándar (Deploy desde GitHub)](#actualización-estándar-deploy-desde-github)
4. [Rollback de Emergencia](#rollback-de-emergencia)
5. [Verificación Post-Deploy](#verificación-post-deploy)
6. [Comandos de Diagnóstico](#comandos-de-diagnóstico-útiles)
7. [Historial de Versiones](#historial-de-versiones-desplegadas)

---

## 🔐 Variables de Entorno Requeridas

Archivo en el servidor: `/var/www/arbizu-labs/.env.local`

> ⚠️ **NUNCA** subas este archivo a Git. Está en `.gitignore`.

```env
# CORREO TRANSACCIONAL
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_TO_EMAIL=aldo@arbizulabs.com

# ANALYTICS
NEXT_PUBLIC_GA_ID_ARBIZU=G-XXXXXXXXXX

# CALENDARIO
CALCOM_API_KEY=cal_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# SEGURIDAD: WAR ROOM
# Generar con: openssl rand -base64 32
WARROOM_SECRET_KEY=TU_CLAVE_SUPER_SEGURA_AQUI

# WEBHOOK INTERNO (NEXUS Router)
ARBIZU_LEADS_WEBHOOK=http://localhost:3002/api/leads
```

---

## 🏗️ Infraestructura del Servidor

| Componente | Detalle |
|---|---|
| **Directorio del proyecto** | `/var/www/arbizu-labs` |
| **Runtime** | Node.js 20 LTS |
| **Process Manager** | PM2 (nombre del proceso: `arbizu-labs`) |
| **Puerto interno** | `3002` |
| **Reverse Proxy** | Nexus Router (80/443 → 3002) |
| **Dominio** | `arbizulabs.com` + `www.arbizulabs.com` |
| **DNS/CDN** | Cloudflare (proxied) |
| **Email Routing** | Cloudflare → aldo@arbizulabs.com → Gmail |

---

## 🔄 Actualización Estándar (Deploy desde GitHub)

```bash
# 1. Conectarse al VPS
ssh root@TU_IP_DE_VPS

# 2. Ir al directorio del proyecto
cd /var/www/arbizu-labs

# 3. Traer cambios desde GitHub
git pull origin main

# 4. Instalar/actualizar dependencias
npm install --omit=dev

# 5. Verificar que WARROOM_SECRET_KEY existe en .env.local
grep -q "WARROOM_SECRET_KEY" .env.local && echo "OK - Key presente" || echo "FALTA - ver sección Variables de Entorno"

# 6. Compilar la versión de producción
npm run build

# 7. Reiniciar el proceso PM2
pm2 restart arbizu-labs

# 8. Verificar que el servidor arrancó correctamente
pm2 logs arbizu-labs --lines 20 --nostream

# 9. Smoke test - verificar headers de seguridad
curl -I https://arbizulabs.com
```

---

## ⏪ Rollback de Emergencia

```bash
cd /var/www/arbizu-labs

# Ver últimos commits
git log --oneline -10

# Opción A: Reversión segura (crea nuevo commit — recomendado)
git revert HEAD --no-edit
npm run build
pm2 restart arbizu-labs
```

---

## ✅ Verificación Post-Deploy

```bash
pm2 status
pm2 logs arbizu-labs --lines 20 --nostream
curl -I https://arbizulabs.com
curl https://arbizulabs.com/sitemap.xml | head -20
curl -I https://arbizulabs.com/warroom          # Debe devolver 302/307 -> /
curl -I https://arbizulabs.com/blog/why-offline-first-is-critical  # Debe ser 200
```

---

## 📋 Historial de Versiones Desplegadas

| Fecha | Commit Hash | Descripción | Autor |
|---|---|---|---|
| 2026-08-21 | `bd74d16` | fix(security): patch warroom auth, add blog slug route, inject security headers | Aldo Arbizu |
| 2026-08-21 | `ad26a15` | docs: add DEPLOY.md runbook and update NEXUS.md post-security-patch | Aldo Arbizu |
| 2026-08-21 | `7f902fc` | deploy: live release on VPS /var/www/arbizu-labs with 40 SSG routes & OWASP headers | Aldo Arbizu |
