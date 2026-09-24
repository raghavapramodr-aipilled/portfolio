#!/usr/bin/env bash
# Publish this folder: commit, back up to GitHub, deploy live to Netlify.
# Usage:  ./deploy.sh "what changed"   (or double-click "Update Website" on the Desktop)
set -e
cd "$(dirname "$0")"
export PATH="$PATH:$HOME/.local/node/bin"      # where the netlify CLI lives

SITE_ID=84267549-98df-44d7-b883-01258ba32e83   # Netlify project raghavapramod.com
MSG="${1:-Site update $(date '+%b %-d, %H:%M')}"

# clear stale git lock/temp files left by interrupted commits
find .git -name '*.lock' -delete 2>/dev/null || true
find .git -name 'tmp_obj_*' -delete 2>/dev/null || true

# make sure we are on main
git symbolic-ref HEAD refs/heads/main

# CSS/JS changed since the last deploy? bump ?v= on every page so browsers fetch the new files
LAST="$(cat .git/last-deployed 2>/dev/null || echo HEAD)"
if ! git diff --quiet "$LAST" -- styles.css script.js; then
  V=$(grep -ho 'styles\.css?v=[0-9]*' *.html | grep -o '[0-9]*$' | sort -n | tail -1)
  V=$((V + 1))
  perl -pi -e "s/(styles\.css|script\.js)\?v=\d+/\1?v=$V/g" *.html
  echo "CSS/JS changed: cache version bumped to v=$V"
fi

# stop tracking notes/config that shouldn't be published
git rm -r --cached --quiet --ignore-unmatch .claude chatgpt-rewrite-prompt.md 2>/dev/null || true

git add -A
git commit -q -m "$MSG" && echo "Saved: $MSG" || echo "Nothing new to commit."

# GitHub is the backup; a missing login shouldn't block going live
GIT_TERMINAL_PROMPT=0 git push -q -u origin main 2>/dev/null \
  && echo "Backed up to GitHub." \
  || echo "GitHub backup skipped (no saved login) — deploying anyway."

# deploy exactly what's committed: no backups, zip or local notes
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
git archive HEAD | tar -x -C "$STAGE"
rm -f "$STAGE/deploy.sh" "$STAGE/.gitignore"
(cd "$STAGE" && netlify deploy --prod --no-build --dir . --site "$SITE_ID" --message "$MSG")

git rev-parse HEAD > .git/last-deployed
echo "Live at https://raghavapramod.com"
