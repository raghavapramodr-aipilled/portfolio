#!/usr/bin/env bash
# Publish this folder to GitHub; Netlify builds it automatically.
# Usage:  ./deploy.sh "what changed"
set -e
cd "$(dirname "$0")"

# clear stale git lock/temp files (Claude can create files here but not delete them)
find .git -name '*.lock' -delete 2>/dev/null || true
find .git -name 'tmp_obj_*' -delete 2>/dev/null || true

# make sure we are on main
git symbolic-ref HEAD refs/heads/main

# stop tracking notes/config that shouldn't be published
git rm -r --cached --quiet --ignore-unmatch .claude chatgpt-rewrite-prompt.md 2>/dev/null || true

git add -A
git commit -m "${1:-Update site}" || echo "Nothing new to commit."
git push -u origin main
echo "Pushed to github.com/raghavapramodr-aipilled/portfolio — Netlify builds in about a minute."
