#!/usr/bin/env bash
# KORTEKS — Linux/Mac otokurulum. Ubuntu 24.04 için Node 22.
# Yapımcı: SERDAR KAPTAN
set -euo pipefail
cd "$(dirname "$0")"

echo "KORTEKS otokurulum"
echo "Yapımcı: SERDAR KAPTAN"

node_major() {
  node -v 2>/dev/null | sed -E 's/^v([0-9]+).*/\1/' || echo 0
}

need_node=0
if ! command -v node >/dev/null 2>&1; then
  need_node=1
elif [ "$(node_major)" -lt 22 ]; then
  echo "Node $(node -v) eski. 22 gerekiyor."
  need_node=1
fi

if [ "$need_node" = 1 ]; then
  ID=""; ID_LIKE=""
  # shellcheck disable=SC1091
  [ -f /etc/os-release ] && . /etc/os-release
  if echo "${ID} ${ID_LIKE}" | grep -qiE 'ubuntu|debian'; then
    echo "Ubuntu/Debian: Node 22 kuruluyor. sudo şifresi sorabilir."
    sudo apt-get update -y
    sudo apt-get install -y ca-certificates curl gnupg
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
  elif command -v brew >/dev/null 2>&1; then
    echo "Homebrew ile Node 22 kuruluyor..."
    brew install node@22 || brew install node
  else
    echo "Node 22 yok. https://nodejs.org — sonra ./KUR.sh"
    exit 1
  fi
  hash -r || true
fi

if ! command -v node >/dev/null 2>&1 || [ "$(node_major)" -lt 22 ]; then
  echo "Node 22 kurulamadı. Ubuntu: curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs"
  exit 1
fi

echo "Node: $(node -v)  npm: $(npm -v)"
if [ ! -d node_modules ]; then
  echo "Paketler kuruluyor (birkaç dakika)..."
  npm install
fi

url="http://127.0.0.1:8080"
( sleep 4
  command -v xdg-open >/dev/null && xdg-open "$url" && exit 0
  command -v open >/dev/null && open "$url" && exit 0
) >/dev/null 2>&1 &

echo "Sunucu açılıyor. Tarayıcı $url adresine gidecek."
npm run dev
