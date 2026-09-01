# KORTEKS — Windows otokurulum. Yapımcı: SERDAR KAPTAN
$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

function Refresh-Path {
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
    [System.Environment]::GetEnvironmentVariable("Path", "User")
}

function Ensure-Node {
  Refresh-Path
  $node = Get-Command node -ErrorAction SilentlyContinue
  if ($node) {
    Write-Host "Node: $(node -v)"
    return
  }
  Write-Host "Node.js yok. LTS kuruluyor (winget)..."
  try {
    winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
  } catch {
    Write-Host "winget kurulamadı. https://nodejs.org adresinden Node 22 kurun, sonra KUR.bat'a tekrar basın."
    Start-Process "https://nodejs.org/en/download"
    Read-Host "Kurduktan sonra Enter"
  }
  Refresh-Path
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Node.js hâlâ yok. Node 22 kurup KUR.bat'ı yeniden çalıştırın."
  }
}

Write-Host "KORTEKS otokurulum"
Write-Host "Yapımcı: SERDAR KAPTAN"
Ensure-Node
if (-not (Test-Path "node_modules")) {
  Write-Host "Paketler kuruluyor (birkaç dakika)..."
  npm install
} else {
  Write-Host "Paketler var, atlandı. Eksikse: npm install"
}

Write-Host "Sunucu açılıyor. Tarayıcı 8080'e gidecek."
Start-Process "http://127.0.0.1:8080"
npm run dev
