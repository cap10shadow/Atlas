#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Checking required tooling..."

require() {
	if ! command -v "$1" >/dev/null 2>&1; then
		echo "Missing required tool: $1" >&2
		exit 1
	fi
	echo "  found $1"
}

require docker
require node
require npm
require java

if [ ! -f .env ]; then
	cp .env.example .env
	echo "Created .env from .env.example"
else
	echo ".env already exists, leaving it untouched"
fi

echo "Installing frontend dependencies..."
(cd frontend && npm install)

echo "Setup complete."
