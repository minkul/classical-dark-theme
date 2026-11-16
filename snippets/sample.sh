#!/usr/bin/env bash
# Sample script covering Bash language tokens.

set -euo pipefail
IFS=$'\n\t'

# ── Variables and constants ──
readonly MAX_RETRIES=3
declare -i counter=0
declare -a numbers=(5 3 8 1 9)
declare -A scores=([alice]=90 [bob]=75)
export APP_ENV="production"
name="World"
single='No $expansion here'
escaped="Tab:\t Quote:\" Dollar:\$"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
today=`date +%Y-%m-%d`
default="${UNSET_VAR:-fallback}"
length="${#name}"
upper="${name^^}"
substring="${name:0:3}"

# ── Functions ──
log() {
  local level="$1"
  shift
  printf '[%s] %s: %s\n' "$(date +%T)" "$level" "$*" >&2
}

add() {
  local a=$1 b=${2:-0}
  echo $((a + b))
}

function cleanup {
  log INFO "Cleaning up"
  rm -f /tmp/sample.$$
}

trap cleanup EXIT

# ── Conditionals ──
if [[ -d "$script_dir" && -r "$script_dir" ]]; then
  log INFO "Script directory: $script_dir"
elif [ -f "/etc/hosts" ] || [ "$name" != "World" ]; then
  log WARN "Fallback branch"
else
  log ERROR "Unreachable"
fi

[[ "$APP_ENV" =~ ^prod ]] && echo "Production mode"
(( counter < MAX_RETRIES )) || echo "Too many retries"

case "$APP_ENV" in
  dev | development)
    echo "Development"
    ;;
  prod*)
    echo "Production"
    ;;
  *)
    echo "Unknown"
    ;;
esac

# ── Loops ──
for n in "${numbers[@]}"; do
  if (( n == 3 )); then
    continue
  fi
  (( n > 8 )) && break
  echo "Number: $n"
done

for key in "${!scores[@]}"; do
  echo "$key => ${scores[$key]}"
done

for ((i = 0; i < 3; i++)); do
  counter+=1
done

while read -r line; do
  echo "Line: $line"
done < <(printf 'one\ntwo\n')

until [[ $counter -le 0 ]]; do
  ((counter--))
done

# ── Pipes, redirection, here-docs ──
ls -la "$HOME" | grep -E '\.(sh|bash)$' | sort -r | head -n 5 > /dev/null 2>&1
echo "appended" >> /tmp/sample.$$
result=$(add 2 3)

cat <<EOF
Hello, ${name}!
Result is ${result}, today is ${today}.
EOF

cat <<'EOF'
Literal $name, not expanded.
EOF

# ── Commands and options ──
curl --silent --fail --location "https://example.com" -o /dev/null || true
find . -type f -name "*.json" -exec wc -l {} + 2>/dev/null
git log --oneline -n 3 2>/dev/null
sed -e 's/foo/bar/g' <<< "foo foo"
command -v node &>/dev/null && node --version

echo "$single $escaped $default $length $upper $substring $?"
exit 0
