#!/usr/bin/env bash
set -euo pipefail
DEST="${1:?Usage: ./deploy.sh user@host:/path/to/webroot}"
rsync -avz --delete \
  --exclude node_modules \
  --exclude .git \
  --exclude .cursor \
  --exclude .vscode \
  --exclude package.json \
  --exclude package-lock.json \
  ./ "$DEST"
