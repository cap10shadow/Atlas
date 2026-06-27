#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -f .env ]; then
	set -a
	# shellcheck disable=SC1091
	source .env
	set +a
fi

DB_NAME="${DB_NAME:-atlas}"
DB_USERNAME="${DB_USERNAME:-atlas}"

BACKUP_DIR="$ROOT_DIR/storage/exports"
mkdir -p "$BACKUP_DIR"

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_FILE="$BACKUP_DIR/atlas_${TIMESTAMP}.sql"

echo "Backing up database '$DB_NAME' to $BACKUP_FILE..."
docker compose exec -T postgres pg_dump -U "$DB_USERNAME" "$DB_NAME" > "$BACKUP_FILE"

echo "Backup complete: $BACKUP_FILE"
