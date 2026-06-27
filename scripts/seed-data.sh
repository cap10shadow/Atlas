#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! docker compose ps postgres --status running >/dev/null 2>&1; then
	echo "PostgreSQL is not running. Start it first with scripts/start-dev.sh" >&2
	exit 1
fi

echo "Copying demo content into storage/uploads..."
mkdir -p storage/uploads
for dir in demo/*/; do
	name="$(basename "$dir")"
	if [ -n "$(find "$dir" -type f ! -name '.gitkeep')" ]; then
		mkdir -p "storage/uploads/$name"
		cp -r "$dir"* "storage/uploads/$name/" 2>/dev/null || true
		echo "  copied $name"
	fi
done

echo "Demo content staged in storage/uploads."
echo "Database seeding will be implemented once schema migrations exist (Gate 3+)."
