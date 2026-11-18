#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# NEXUS / ARBIZU LABS — BACKUP INTEGRITY & CLEAN-DB RESTORE VERIFIER
# ==============================================================================
if [ $# -lt 1 ]; then
  echo "Usage: $0 <backup_dir>"
  exit 1
fi

BACKUP_DIR="$1"
if [ ! -d "${BACKUP_DIR}" ]; then
  echo "[ERROR] Backup directory not found: ${BACKUP_DIR}"
  exit 1
fi

echo "[1/3] Verifying SHA-256 checksums..."
(cd "${BACKUP_DIR}" && sha256sum -c SHA256SUMS.txt)

if [ -f "${BACKUP_DIR}/warroom.db" ]; then
  echo "[2/3] Verifying SQLite WAL integrity check..."
  if command -v sqlite3 >/dev/null 2>&1; then
    INTEGRITY="$(sqlite3 "${BACKUP_DIR}/warroom.db" "PRAGMA integrity_check;")"
    echo "  -> PRAGMA integrity_check: ${INTEGRITY}"
    [ "${INTEGRITY}" = "ok" ]
  fi
fi

SQL_DUMP="$(find "${BACKUP_DIR}" -maxdepth 1 -name 'supabase_public_*.sql' | head -n 1 || true)"
if [ -n "${SQL_DUMP}" ] && [ -n "${VERIFY_RESTORE_PG_URL:-}" ]; then
  echo "[3/3] Restoring SQL dump into isolated verification database..."
  psql "${VERIFY_RESTORE_PG_URL}" -v ON_ERROR_STOP=1 -f "${SQL_DUMP}"
  echo "  -> Clean PostgreSQL restore PASSED."
else
  echo "[3/3] [INFO] Set VERIFY_RESTORE_PG_URL to run live PostgreSQL clean-DB restore."
fi

echo "Verification finished successfully."
