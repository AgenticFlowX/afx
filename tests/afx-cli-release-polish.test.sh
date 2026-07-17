#!/usr/bin/env bash

set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
CLI="$ROOT/afx-cli"
TMP_ROOT=$(mktemp -d /private/tmp/afx-cli-release-polish.XXXXXX)
trap 'rm -rf "$TMP_ROOT"' EXIT

export HTTPS_PROXY=http://127.0.0.1:9
export HTTP_PROXY=http://127.0.0.1:9
export ALL_PROXY=http://127.0.0.1:9

fail() {
    echo "FAIL: $1" >&2
    exit 1
}

assert_contains() {
    local expected="$1"
    local actual="$2"
    local message="$3"
    [[ "$actual" == *"$expected"* ]] || fail "$message (missing: $expected)"
}

assert_equal() {
    local expected="$1"
    local actual="$2"
    local message="$3"
    [[ "$actual" == "$expected" ]] \
        || fail "$message (expected: $expected, actual: $actual)"
}

assert_file() {
    local path="$1"
    local message="$2"
    [[ -f "$path" ]] || fail "$message (missing: $path)"
}

assert_not_exists() {
    local path="$1"
    local message="$2"
    [[ ! -e "$path" ]] || fail "$message (still exists: $path)"
}

catalog_version=$(awk -F'"' '/"version"[[:space:]]*:/ { print $4; exit }' "$ROOT/skills.json")
local_target="$TMP_ROOT/local-version"
mkdir -p "$local_target"
local_output=$("$CLI" --source "$ROOT" --yes --no-vscode-tip "$local_target")
assert_contains \
    "AFX Installer v${catalog_version}" \
    "$local_output" \
    "a local install must report the source catalog version"
hello_summary_count=$(printf '%s\n' "$local_output" | grep -c '.agents/skills/afx-hello')
assert_equal \
    "1" \
    "$hello_summary_count" \
    "a shared default skill must appear once in the install summary"
assert_contains \
    "Synced 18 skill(s)" \
    "$local_output" \
    "the sync summary must count unique default skills"

# Simulate an upstream standard skill previously fetched by the QA pack. A
# local/offline refresh cannot re-download it, so it must preserve the cache,
# both provider copies, and the existing single-owner metadata.
"$CLI" --source "$ROOT" --pack qa --yes --no-vscode-tip "$local_target" >/dev/null
upstream_name="webapp-testing"
upstream_canonical="$local_target/.afx/skills/qa/$upstream_name"
obsolete_name="obsolete-qa-afx"
obsolete_canonical="$local_target/.afx/skills/qa/$obsolete_name"
mkdir -p \
    "$upstream_canonical" \
    "$local_target/.agents/skills/$upstream_name" \
    "$local_target/.claude/skills/$upstream_name" \
    "$obsolete_canonical" \
    "$local_target/.agents/skills/$obsolete_name" \
    "$local_target/.claude/skills/$obsolete_name"
printf '%s\n' \
    '---' \
    'name: webapp-testing' \
    'description: Cached upstream standard-skill fixture.' \
    '---' \
    > "$upstream_canonical/SKILL.md"
cp "$upstream_canonical/SKILL.md" "$local_target/.agents/skills/$upstream_name/"
cp "$upstream_canonical/SKILL.md" "$local_target/.claude/skills/$upstream_name/"
printf '%s\n' \
    '---' \
    'name: obsolete-qa-afx' \
    'description: AFX-authored skill removed from the current QA manifest.' \
    '---' \
    > "$obsolete_canonical/SKILL.md"
cp "$obsolete_canonical/SKILL.md" "$local_target/.agents/skills/$obsolete_name/"
cp "$obsolete_canonical/SKILL.md" "$local_target/.claude/skills/$obsolete_name/"
awk '
    !inserted && /^packs:/ {
        print "  - name: webapp-testing"
        print "    category: qa"
        print "    source: afx-pack-qa"
        print "    item_type: skill"
        print "  - name: obsolete-qa-afx"
        print "    category: qa"
        print "    source: afx-pack-qa"
        print "    item_type: afx"
        inserted = 1
    }
    { print }
' "$local_target/.afx.yaml" > "$local_target/.afx.yaml.tmp"
mv "$local_target/.afx.yaml.tmp" "$local_target/.afx.yaml"

if ! pack_update_output=$(
    "$CLI" --source "$ROOT" --update --packs \
        --yes --no-vscode-tip "$local_target" 2>&1
); then
    fail "a local pack update must complete with the network forced offline"
fi
assert_file \
    "$upstream_canonical/SKILL.md" \
    "a local pack update must preserve cached upstream canonical content"
assert_file \
    "$local_target/.agents/skills/$upstream_name/SKILL.md" \
    "a local pack update must preserve the upstream Codex provider copy"
assert_file \
    "$local_target/.claude/skills/$upstream_name/SKILL.md" \
    "a local pack update must preserve the upstream Claude provider copy"
assert_not_exists \
    "$obsolete_canonical" \
    "a local pack update must remove AFX skills absent from the current manifest"
assert_not_exists \
    "$local_target/.agents/skills/$obsolete_name" \
    "a local pack update must remove the obsolete Codex provider copy"
pack_count=$(grep -c '^  - name: afx-pack-' "$local_target/.afx.yaml")
assert_equal \
    "3" \
    "$pack_count" \
    "a local pack update must retain default and external packs"
diff -q "$ROOT/skills.json" "$local_target/.afx/.cache/lastIndex.json" >/dev/null \
    || fail "a local pack update must cache the local skills index"
millisecond_timestamp_count=$(
    grep -Ec '^    installed_at: [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$' \
        "$local_target/.afx.yaml" || true
)
assert_equal \
    "$pack_count" \
    "$millisecond_timestamp_count" \
    "every generated pack timestamp must use ISO 8601 millisecond precision"
assert_contains \
    "installed_at: 2026-03-14T10:00:00.000Z" \
    "$(grep 'installed_at:' "$local_target/.afx/.afx.yaml")" \
    "the installed configuration example must document millisecond precision"
if grep -ERq \
    'installed_at: [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$' \
    "$ROOT/.afx.yaml.template" "$ROOT/docs"; then
    fail "shipped pack timestamp examples must use millisecond precision"
fi
if grep -ERq \
    '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z' \
    "$ROOT/.afx.yaml.template" "$ROOT/docs" "$ROOT/examples" \
    "$ROOT/prompts" "$ROOT/skills"; then
    fail "all shipped document timestamp examples must use millisecond precision"
fi

shared_pack_output=$(
    "$CLI" --source "$ROOT" --pack dev --pack architect \
        --yes --no-vscode-tip "$local_target"
)
shared_summary_count=$(
    printf '%s\n' "$shared_pack_output" \
        | grep -c '.agents/skills/afx-architecture-patterns'
)
assert_equal \
    "1" \
    "$shared_summary_count" \
    "a skill shared by external role packs must appear once in the pack summary"

echo "PASS: local/offline release polish"
