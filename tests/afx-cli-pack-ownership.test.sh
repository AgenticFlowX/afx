#!/usr/bin/env bash

set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
CLI="$ROOT/afx-cli"
TMP_ROOT=$(mktemp -d /private/tmp/afx-cli-pack-ownership.XXXXXX)
trap 'rm -rf "$TMP_ROOT"' EXIT

export HTTPS_PROXY=http://127.0.0.1:9
export HTTP_PROXY=http://127.0.0.1:9
export ALL_PROXY=http://127.0.0.1:9

new_project() {
    local name="$1"
    local target="$TMP_ROOT/$name"
    mkdir -p "$target"
    "$CLI" --source "$ROOT" --yes --no-vscode-tip "$target" >/dev/null
    echo "$target"
}

install_pack() {
    local target="$1"
    local pack="$2"
    local source="${3:-$ROOT}"
    "$CLI" --source "$source" --pack "$pack" --yes --no-vscode-tip "$target" >/dev/null
}

remove_pack() {
    local target="$1"
    local pack="$2"
    "$CLI" --source "$ROOT" --pack-remove "$pack" --yes --no-vscode-tip "$target" >/dev/null
}

skill_source() {
    local target="$1"
    local skill="$2"
    awk -v skill="$skill" '
        $0 == "  - name: " skill { in_skill = 1; next }
        in_skill && /^  - name:/ { exit }
        in_skill && /^    source:/ { print $2; exit }
    ' "$target/.afx.yaml"
}

set_skill_owner() {
    local target="$1"
    local skill="$2"
    local category="$3"
    local source="$4"
    local yaml="$target/.afx.yaml"
    awk -v skill="$skill" -v category="$category" -v source="$source" '
        $0 == "  - name: " skill { in_skill = 1 }
        in_skill && /^    category:/ { print "    category: " category; next }
        in_skill && /^    source:/ { print "    source: " source; in_skill = 0; next }
        { print }
    ' "$yaml" > "$yaml.tmp"
    mv "$yaml.tmp" "$yaml"
}

assert_file() {
    local path="$1"
    local message="$2"
    if [[ ! -f "$path" ]]; then
        echo "FAIL: $message" >&2
        echo "Missing: $path" >&2
        exit 1
    fi
}

assert_not_exists() {
    local path="$1"
    local message="$2"
    if [[ -e "$path" ]]; then
        echo "FAIL: $message" >&2
        echo "Still exists: $path" >&2
        exit 1
    fi
}

assert_equal() {
    local expected="$1"
    local actual="$2"
    local message="$3"
    if [[ "$actual" != "$expected" ]]; then
        echo "FAIL: $message" >&2
        echo "Expected: $expected" >&2
        echo "Actual:   $actual" >&2
        exit 1
    fi
}

assert_same() {
    local expected="$1"
    local actual="$2"
    local message="$3"
    if ! diff -q "$expected" "$actual" >/dev/null; then
        echo "FAIL: $message" >&2
        echo "Expected canonical file: $expected" >&2
        echo "Actual installed file:  $actual" >&2
        exit 1
    fi
}

make_stale_starter_source() {
    local source="$TMP_ROOT/stale-starter-source"
    mkdir -p "$source/packs" "$source/skills/agenticflowx/afx-hello"
    cp "$ROOT/packs/afx-pack-starter.yaml" "$source/packs/"
    printf '%s\n' \
        '---' \
        'name: stale-hello-fixture' \
        'description: Simulates a duplicate skill fetched from a stale pack ref.' \
        '---' \
        '' \
        '# Stale hello fixture' \
        > "$source/skills/agenticflowx/afx-hello/SKILL.md"
    echo "$source"
}

make_custom_skill_download_fixture() {
    local fixture_root="$TMP_ROOT/custom-skill-archive/repo-main"
    local fake_bin="$TMP_ROOT/fake-bin"
    local archive="$TMP_ROOT/custom-skill.tar.gz"
    mkdir -p "$fixture_root/skills/afx-hello" "$fake_bin"
    printf '%s\n' \
        '---' \
        'name: custom-hello-fixture' \
        'description: Simulates a same-name standard skill download.' \
        '---' \
        '' \
        '# Custom hello fixture' \
        > "$fixture_root/skills/afx-hello/SKILL.md"
    tar -czf "$archive" -C "$TMP_ROOT/custom-skill-archive" repo-main
    printf '%s\n' \
        '#!/bin/bash' \
        'case "$*" in' \
        '  *codeload.github.com*) /bin/cat "$AFX_TEST_TARBALL" ;;' \
        '  *) printf "%s\\n" "## [2.6.0]" ;;' \
        'esac' \
        > "$fake_bin/curl"
    chmod +x "$fake_bin/curl"
    echo "$fake_bin:$archive"
}

# Bundled/core priority: Starter reuses the protected AgenticFlowX copy.
starter_target=$(new_project starter-removal)
assert_equal \
    "afx-pack-agenticflowx" \
    "$(skill_source "$starter_target" afx-hello)" \
    "the protected AgenticFlowX pack must own duplicate workflow skills"
set_skill_owner "$starter_target" afx-hello starter afx-pack-starter
assert_equal \
    "afx-pack-starter" \
    "$(skill_source "$starter_target" afx-hello)" \
    "legacy single-owner fixture must model the pre-fix config shape"
remove_pack "$starter_target" afx-pack-starter
assert_file \
    "$starter_target/.agents/skills/afx-hello/SKILL.md" \
    "removing Starter must retain afx-hello owned by AgenticFlowX"
assert_equal \
    "afx-pack-agenticflowx" \
    "$(skill_source "$starter_target" afx-hello)" \
    "removing Starter must transfer afx-hello ownership"
assert_same \
    "$starter_target/.afx/skills/agenticflowx/afx-hello/SKILL.md" \
    "$starter_target/.agents/skills/afx-hello/SKILL.md" \
    "the installed afx-hello must remain byte-identical to the protected AgenticFlowX copy"

stale_starter_source=$(make_stale_starter_source)
install_pack "$starter_target" afx-pack-starter "$stale_starter_source"
assert_equal \
    "afx-pack-agenticflowx" \
    "$(skill_source "$starter_target" afx-hello)" \
    "a stale duplicate ref must not replace protected ownership metadata"
assert_same \
    "$starter_target/.afx/skills/agenticflowx/afx-hello/SKILL.md" \
    "$starter_target/.agents/skills/afx-hello/SKILL.md" \
    "a stale duplicate ref must not replace protected installed content"

custom_fixture=$(make_custom_skill_download_fixture)
fake_bin=${custom_fixture%%:*}
custom_archive=${custom_fixture#*:}
PATH="$fake_bin:$PATH" AFX_TEST_TARBALL="$custom_archive" \
    "$CLI" --add-skill example/skills:skills/afx-hello \
    --yes --no-vscode-tip "$starter_target" >/dev/null
assert_equal \
    "afx-pack-agenticflowx" \
    "$(skill_source "$starter_target" afx-hello)" \
    "a same-name standard skill must not replace protected ownership metadata"
assert_same \
    "$starter_target/.afx/skills/agenticflowx/afx-hello/SKILL.md" \
    "$starter_target/.agents/skills/afx-hello/SKILL.md" \
    "a same-name standard skill must not replace protected installed content"

final_sweep_target="$TMP_ROOT/final-canonical-sweep"
mkdir -p "$final_sweep_target/.afx/skills/custom/afx-help"
printf '%s\n' \
    '---' \
    'name: custom-help-fixture' \
    'description: Simulates a stale same-name canonical directory.' \
    '---' \
    '' \
    '# Custom help fixture' \
    > "$final_sweep_target/.afx/skills/custom/afx-help/SKILL.md"
"$CLI" --source "$ROOT" --yes --no-vscode-tip "$final_sweep_target" >/dev/null
assert_equal \
    "afx-pack-agenticflowx" \
    "$(skill_source "$final_sweep_target" afx-help)" \
    "the final canonical sweep must retain protected ownership metadata"
assert_same \
    "$final_sweep_target/.afx/skills/agenticflowx/afx-help/SKILL.md" \
    "$final_sweep_target/.agents/skills/afx-help/SKILL.md" \
    "the final canonical sweep must install content from the recorded owner"
assert_same \
    "$final_sweep_target/.agents/skills/afx-help/SKILL.md" \
    "$final_sweep_target/.claude/skills/afx-help/SKILL.md" \
    "the final canonical sweep must keep provider copies identical"

# External-pack compatibility fixture: role packs remain independently
# installable/discoverable and may share a skill without bundling it as core.
dev_target=$(new_project dev-removal)
install_pack "$dev_target" afx-pack-dev
install_pack "$dev_target" afx-pack-architect
shared_listing_count=$(
    "$CLI" --source "$ROOT" --pack-list --yes --no-vscode-tip "$dev_target" |
        grep -c 'afx-architecture-patterns'
)
assert_equal \
    "2" \
    "$shared_listing_count" \
    "pack listing must show a shared skill under every owning pack"
remove_pack "$dev_target" afx-pack-dev
assert_file \
    "$dev_target/.agents/skills/afx-architecture-patterns/SKILL.md" \
    "removing Dev must retain afx-architecture-patterns owned by Architect"
assert_equal \
    "afx-pack-architect" \
    "$(skill_source "$dev_target" afx-architecture-patterns)" \
    "removing Dev must transfer afx-architecture-patterns ownership"
remove_pack "$dev_target" afx-pack-architect
assert_not_exists \
    "$dev_target/.agents/skills/afx-architecture-patterns" \
    "removing the final owning pack must remove the shared skill"

architect_target=$(new_project architect-removal)
install_pack "$architect_target" afx-pack-dev
install_pack "$architect_target" afx-pack-architect
remove_pack "$architect_target" afx-pack-architect
assert_file \
    "$architect_target/.agents/skills/afx-architecture-patterns/SKILL.md" \
    "removing Architect must retain afx-architecture-patterns owned by Dev"
assert_not_exists \
    "$architect_target/.afx/skills/architect" \
    "removing Architect must remove its canonical cache"
assert_equal \
    "afx-pack-dev" \
    "$(skill_source "$architect_target" afx-architecture-patterns)" \
    "removing Architect must preserve Dev ownership"

reverse_target=$(new_project reverse-install-order)
install_pack "$reverse_target" afx-pack-architect
install_pack "$reverse_target" afx-pack-dev
remove_pack "$reverse_target" afx-pack-architect
assert_file \
    "$reverse_target/.agents/skills/afx-architecture-patterns/SKILL.md" \
    "shared external skills must survive removal in reverse install order"
assert_equal \
    "afx-pack-dev" \
    "$(skill_source "$reverse_target" afx-architecture-patterns)" \
    "reverse install order must transfer ownership to Dev"

partial_cache_target=$(new_project partial-owner-cache)
install_pack "$partial_cache_target" afx-pack-dev
install_pack "$partial_cache_target" afx-pack-architect
rm -rf "$partial_cache_target/.afx/skills/dev"
remove_pack "$partial_cache_target" afx-pack-dev
assert_file \
    "$partial_cache_target/.agents/skills/afx-architecture-patterns/SKILL.md" \
    "a partial legacy cache must rehome a shared external skill"
assert_equal \
    "afx-pack-architect" \
    "$(skill_source "$partial_cache_target" afx-architecture-patterns)" \
    "partial-cache recovery must transfer ownership to Architect"

echo "PASS: canonical AgenticFlowX ownership and external pack overlap survive removal"
