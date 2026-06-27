#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Stopping containers and removing volumes..."
docker compose down --volumes --remove-orphans 2>/dev/null || true

echo "Removing backend build output..."
rm -rf backend/build backend/.gradle

echo "Removing frontend build output..."
rm -rf frontend/.next frontend/node_modules

echo "Clean complete."
