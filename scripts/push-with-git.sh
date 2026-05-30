#!/bin/bash
# Push to an existing empty GitHub repo (no gh required).
# Usage: ./scripts/push-with-git.sh YOUR_GITHUB_USERNAME

set -e

USERNAME="$1"
REPO_NAME="${2:-summer-portfolio-website}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$USERNAME" ]; then
  echo "Usage: ./scripts/push-with-git.sh YOUR_GITHUB_USERNAME [repo-name]"
  echo "Example: ./scripts/push-with-git.sh summerscott"
  exit 1
fi

cd "$ROOT"

if git remote get-url origin >/dev/null 2>&1; then
  echo "Pushing to existing remote..."
else
  git remote add origin "https://github.com/${USERNAME}/${REPO_NAME}.git"
fi

git branch -M main
git push -u origin main

echo ""
echo "Live at: https://github.com/${USERNAME}/${REPO_NAME}"
