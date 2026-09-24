#!/usr/bin/env bash
# Publish this folder: commit, back up to GitHub, deploy live to Netlify.
# Usage:  ./deploy.sh "what changed"
set -e
cd "$(dirname "$0")"

SITE_ID=84267549-98df-44d7-b883-01258ba32e83   # Netlify project raghavapramod.com
MSG="${1:-Update site}"

# clear stale git lock/temp files left by interrupted commits
find .git -name '*.lock' -delete 2>/dev/null || true
find .git -name 'tmp_obj_*' -delete 2>/dev/null || true

# make sure we are on main
git symbolic-ref HEAD refs/heads/main

# stop tracking notes/config that shouldn't be published
git rm -r --cached --quiet --ignore-unmatch .claude chatgpt-rewrite-prompt.md 2>/dev/null || true

git add -A
git commit -m "$MSG" || echo "Nothing new to commit."

# GitHub is the backup; a missing login shouldn't block going live
GIT_TERMINAL_PROMPT=0 git push -u origin main \
  || echo "GitHub push skipped (no saved login) — deploying anyway."

# deploy exactly what's committed: no backups, zip or local notes
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
git archive HEAD | tar -x -C "$STAGE"
rm -f "$STAGE/deploy.sh" "$STAGE/.gitignore"
(cd "$STAGE" && netlify deploy --prod --no-build --dir . --site "$SITE_ID" --message "$MSG")
echo "Live at https://raghavapramod.com"
