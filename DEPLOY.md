# ?? DEPLOY RUNBOOK — Arbizu Labs (arbizulabs.com)

> **Propósito:** Guía oficial de despliegue, actualización y rollback para el VPS de producción de `arbizulabs.com`.
> **Mantenida por:** Aldo Alberto Arbizu — `aldo@arbizulabs.com`
> **Última actualización:** 2026-08-21

---

## ?? Índice

1. [Variables de Entorno Requeridas](#variables-de-entorno-requeridas)
2. [Infraestructura del Servidor](#infraestructura-del-servidor)
3. [Actualización Estándar](#actualización-estándar-deploy-desde-github)
4. [Primer Despliegue desde Cero](#primer-despliegue-provisioning-desde-cero)
5. [Rollback de Emergencia](#rollback-de-emergencia)
6. [Verificación Post-Deploy](#verificación-post-deploy)
7. [Comandos de Diagnóstico](#comandos-de-diagnóstico-útiles)
8. [Historial de Versiones](#historial-de-versiones-desplegadas)

---

## ?? Variables de Entorno Requeridas

Archivo en el servidor: `/root/arbizu-labs/.env.local`

> ?? **NUNCA** subas este archivo a Git. Está en `.gitignore`.

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

## ??? Infraestructura del Servidor

| Componente | Detalle |
|---|---|
| **Directorio del proyecto** | `/root/arbizu-labs` |
| **Runtime** | Node.js 20 LTS |
| **Process Manager** | PM2 (nombre del proceso: `arbizu-labs`) |
| **Puerto interno** | `3002` |
| **Reverse Proxy** | Nexus Router (80/443 ? 3002) |
| **Dominio** | `arbizulabs.com` + `www.arbizulabs.com` |
| **DNS/CDN** | Cloudflare (proxied) |
| **Email Routing** | Cloudflare ? aldo@arbizulabs.com ? Gmail |

---

## ?? Actualización Estándar (Deploy desde GitHub)

```bash
# 1. Conectarse al VPS
ssh root@TU_IP_DE_VPS

# 2. Ir al directorio del proyecto
cd /root/arbizu-labs

# 3. Traer cambios desde GitHub
git pull origin main

# 4. Instalar/actualizar dependencias
npm install --omit=dev

# 5. Verificar que WARROOM_SECRET_KEY existe en .env.local
grep -q "WARROOM_SECRET_KEY" .env.local && echo "OK - Key presente" || echo "FALTA - ver sección Variables de Entorno"

# 5b. Si NO existe la key, agregarla (reemplaza con tu clave real):
# echo "WARROOM_SECRET_KEY=CLAVE_GENERADA_CON_OPENSSL" >> .env.local

# 6. Compilar la versión de producción
npm run build

# 7. Reiniciar el proceso PM2
pm2 restart arbizu-labs

# 8. Verificar que el servidor arrancó correctamente
pm2 logs arbizu-labs --lines 20 --nostream

# 9. Smoke test - verificar headers de seguridad
curl -I https://arbizulabs.com
```

**Resultado esperado del curl -I:**
```
HTTP/2 200
x-frame-options: DENY
x-content-type-options: nosniff
strict-transport-security: max-age=63072000; includeSubDomains; preload
```

---

## ?? Primer Despliegue (Provisioning desde Cero)

```bash
# 1. Conectarse al VPS
ssh root@TU_IP_DE_VPS

# 2. Instalar Node.js 20 LTS via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20 && nvm use 20 && nvm alias default 20
node --version  # v20.x.x

# 3. Instalar PM2 globalmente
npm install -g pm2

# 4. Clonar el repositorio
cd /root
git clone https://github.com/ArbizuAldoAlberto/arbizu-labs.git
cd arbizu-labs

# 5. Crear .env.local con las variables de entorno (editar valores reales)
nano .env.local

# 6. Instalar dependencias
npm install --omit=dev

# 7. Compilar
npm run build

# 8. Iniciar con PM2 en puerto 3002
PORT=3002 pm2 start npm --name "arbizu-labs" -- start
pm2 save
pm2 startup  # Ejecutar el comando que imprime para persistencia en reboot
```

---

## ? Rollback de Emergencia

```bash
cd /root/arbizu-labs

# Ver últimos commits
git log --oneline -10

# Opción A: Reversión segura (crea nuevo commit — recomendado)
git revert HEAD --no-edit
npm run build
pm2 restart arbizu-labs

# Opción B: Reset duro a commit específico (DESTRUCTIVO)
# git reset --hard <HASH_DEL_COMMIT_BUENO>
# npm run build
# pm2 restart arbizu-labs

pm2 logs arbizu-labs --lines 15 --nostream
```

---

## ? Verificación Post-Deploy

```bash
pm2 status
pm2 logs arbizu-labs --lines 20 --nostream
curl -I https://arbizulabs.com
curl https://arbizulabs.com/sitemap.xml | head -20
curl -I https://arbizulabs.com/warroom          # Debe devolver 302 ? /
curl -I https://arbizulabs.com/blog/why-offline-first-is-critical  # Debe ser 200
```

| Security Header | Valor Esperado |
|---|---|
| `x-frame-options` | `DENY` |
| `x-content-type-options` | `nosniff` |
| `strict-transport-security` | `max-age=63072000; includeSubDomains; preload` |
| `referrer-policy` | `strict-origin-when-cross-origin` |

---

## ?? Comandos de Diagnóstico Útiles

```bash
# PM2
pm2 status                                        # Estado de procesos
pm2 logs arbizu-labs                              # Logs en tiempo real
pm2 logs arbizu-labs --lines 50 --nostream        # Últimas 50 líneas
pm2 restart arbizu-labs                           # Restart
pm2 reload arbizu-labs                            # 0-downtime reload (producción)
pm2 monit                                         # Monitor CPU/RAM en tiempo real
pm2 save                                          # Persistir configuración

# Git
git log --oneline -10
git status
git diff HEAD~1 HEAD --name-only

# Sistema
node --version
df -h                                             # Espacio en disco
free -h                                           # RAM disponible
ss -tlnp | grep 3002                              # Verificar puerto activo
curl http://localhost:3002/api/status             # Health check interno
```

---

## ?? Historial de Versiones Desplegadas

| Fecha | Commit Hash | Descripción | Autor |
|---|---|---|---|
| 2026-08-21 | `bd74d16` | fix(security): patch warroom auth, add blog slug route, inject security headers | Aldo Arbizu |

> Actualizar esta tabla en cada deploy de producción para trazabilidad completa.

---

## ?? Contacto

- **Responsable:** Aldo Alberto Arbizu
- **Email:** aldo@arbizulabs.com
- **Repositorio:** https://github.com/ArbizuAldoAlberto/arbizu-labs
