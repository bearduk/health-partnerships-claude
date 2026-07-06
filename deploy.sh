#!/usr/bin/env bash
set -euo pipefail
DEST="${1:?Usage: ./deploy.sh user@host:/path/to/webroot}"

[[ -d public ]] || { echo "Run npm run prod first."; exit 1; }

rsync -avz --delete ./public/ "$DEST"
