#!/usr/bin/env bash
set -euo pipefail

psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f schema.sql
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f seed.sql
echo "Applied schema and seed."
