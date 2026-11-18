# SECURITY_LAUNCH.md — Checklist de Lanzamiento Seguro (ARBIZU LABS & NEXUS)

## 1. Secretos Críticos y Variables de Entorno Obligatorias
Nunca desplegar a producción (`NODE_ENV=production`) sin configurar explícitamente:
- `WARROOM_SECRET_KEY`: Clave maestra de al menos 32 bytes aleatorios (`openssl rand -hex 32`). Si falta en producción, `src/middleware.ts` y `src/lib/auth.ts` operan en modo **fail-closed** bloqueando `/warroom` y `/api/warroom`.
- `PADDLE_WEBHOOK_SECRET`: Secreto HMAC para verificación de webhooks de pago en `src/app/api/warroom/sales/route.ts`.
- `AI_KILL_SWITCH`: Establecer `true` para cortar inmediatamente toda invocación a LLMs en `LLMCircuitBreaker` y Edge Functions (`ingest`, `sos`).
- `EDGE_KILL_SWITCH`: Interruptor dedicado para suspender Edge Functions de `SentinelOS`.
- `RESEND_API_KEY` & `RESEND_TO_EMAIL`: Credenciales de correo transaccional B2B.
- `GEMINI_API_KEY`: Solo en servidor / backend (prohibido el prefijo `NEXT_PUBLIC_` o `VITE_`).
- `NEXUS_CAREER_OPS_DIR` / `WARROOM_DB_PATH` / `NEXUS_INVOICES_DIR`: Rutas explícitas para entorno Linux VPS (`/root/nexus/career-ops/...`).

---

## 2. Límites Duros de Gasto Mensual (Hard Spend Limits)
Configurar obligatoriamente antes de abrir tráfico público:
1. **Google AI Studio / Gemini API (`gemini-2.5-flash`):**
   - Activar cuota máxima diaria de tokens y presupuesto tope mensual en Google Cloud Billing (recomendado: `$10 USD/mes` con alerta al `50%`, `80%` y corte al `100%`).
   - En código: `LLMCircuitBreaker` prioriza Ollama local (`$0`) y aplica `AI_KILL_SWITCH`.
2. **Resend (Emails Transaccionales):**
   - Mantener dentro del tier gratuito (`3,000 emails/mes`, `100/día`) o límite duro de facturación desactivando overages automáticos.
   - Protegido en código mediante `/api/leads` (`5 req / 10 min` por IP, tope `16KB`, honeypot y deduplicación por `Idempotency-Key`).
3. **Supabase (`AgroMarket_Pro` & `SentinelOS`):**
   - Desactivar auto-scaling sin tope de gasto (*Spend Cap: ON*).
   - Edge Functions `ingest` y `sos` protegidas por JWT/HMAC-SHA256, tope `64KB` y rate-limit por tenant.

---

## 3. Entregabilidad de Email y Registros DNS (`arbizulabs.com` / `aldoarbizu.com`)
Para evitar que correos de contacto y entrega de licencias caigan en Spam:

### SPF (TXT en raíz `@`)
```text
v=spf1 include:_spf.resend.com ~all
```

### DKIM (Registros CNAME / TXT provistos por Resend)
```text
resend._domainkey.arbizulabs.com  TXT  <clave-publica-dkim-resend>
```

### DMARC (`_dmarc.arbizulabs.com` TXT)
```text
v=DMARC1; p=quarantine; rua=mailto:aldo@arbizulabs.com; ruf=mailto:aldo@arbizulabs.com; pct=100; adkim=s; aspf=s
```
*(Una vez verificados 14 días sin falsos positivos en reportes `rua`, elevar a `p=reject`.)*

---

## 4. Verificación Perimetral Pre-Deploy
1. Ejecutar `node sentinelos/scripts/audit-rls-intrusion.mjs` -> debe devolver `EXIT 0` (60/60 PASS).
2. Ejecutar `npx tsc --noEmit && npm run build` en `arbizu-labs` y `dark-orbital` -> ambos `EXIT 0`.
3. Ejecutar `scripts/backup-restore/backup-full.sh` y validar con `verify-restore.sh` antes de cualquier migración SQL.
