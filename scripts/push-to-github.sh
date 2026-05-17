#!/bin/bash
set -e

REPO_NAME="${1:-summer-scott-portfolio}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is not installed."
  echo "Install from https://cli.github.com/ or run: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Log in to GitHub first:"
  gh auth login
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote 'origin' already exists. Pushing..."
  git push -u origin main
else
  gh repo create "$REPO_NAME" --public --description "Summer Scott — Graphic Design portfolio" --source=. --remote=origin --push
fi

echo ""
echo "Done! View your repo:"
gh repo view --web
