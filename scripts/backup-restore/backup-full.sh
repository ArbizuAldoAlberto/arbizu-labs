#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# NEXUS / ARBIZU LABS — FULL SOVEREIGN BACKUP SCRIPT (SQLite WAL + Supabase)
# ==============================================================================
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP_ROOT="${BACKUP_ROOT:-./backups}"
OUT_DIR="${BACKUP_ROOT}/${TIMESTAMP}"
mkdir -p "${OUT_DIR}"

echo "[1/3] Backing up SQLite WAL databases..."
SQLITE_DB="${WARROOM_DB_PATH:-../../nexus/nexus/career-ops/data/warroom.db}"
if [ -f "${SQLITE_DB}" ]; then
  if command -v sqlite3 >/dev/null 2>&1; then
    sqlite3 "${SQLITE_DB}" ".backup '${OUT_DIR}/warroom.db'"
  else
    cp "${SQLITE_DB}" "${OUT_DIR}/warroom.db"
  fi
  echo "  -> SQLite snapshot saved: ${OUT_DIR}/warroom.db"
else
  echo "  -> [SKIP] SQLite DB not found at ${SQLITE_DB}"
fi

echo "[2/3] Backing up PostgreSQL / Supabase (Schema, RLS, Functions & Data)..."
if [ -n "${SUPABASE_DB_URL:-}" ]; then
  if command -v pg_dump >/dev/null 2>&1; then
    pg_dump "${SUPABASE_DB_URL}" --schema=public --format=plain --no-owner --no-privileges > "${OUT_DIR}/supabase_public_${TIMESTAMP}.sql"
    pg_dump "${SUPABASE_DB_URL}" --schema=storage --data-only --table=storage.buckets --format=plain --no-owner > "${OUT_DIR}/supabase_storage_buckets_${TIMESTAMP}.sql" || true
    echo "  -> pg_dump saved: ${OUT_DIR}/supabase_public_${TIMESTAMP}.sql"
  else
    echo "  -> [WARN] pg_dump not installed; install postgresql-client to export Supabase."
  fi
else
  echo "  -> [SKIP] SUPABASE_DB_URL not set."
fi

echo "[3/3] Generating SHA-256 manifest..."
(cd "${OUT_DIR}" && sha256sum * > SHA256SUMS.txt)
echo "Backup completed cleanly at ${OUT_DIR}"
