# Custom World — Blender Auto Sync V1
# Downloads the reviewed builder from your GitHub repository and runs it in Blender background mode.
$ErrorActionPreference = "Stop"
$repo = "https://raw.githubusercontent.com/gmhomyai/Custom-World/main"
$root = Join-Path $env:USERPROFILE "Documents\CustomWorld"
$scriptDir = Join-Path $root "scripts"
New-Item -ItemType Directory -Force -Path $scriptDir | Out-Null
$builder = Join-Path $scriptDir "build_fantasy_cottage.py"
Write-Host "Downloading Custom World model builder..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "$repo/blender/build_fantasy_cottage.py" -OutFile $builder
$blender = Get-Command blender -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -First 1
if (-not $blender) {
    $found = @(Get-ChildItem "C:\Program Files\Blender Foundation" -Filter blender.exe -Recurse -ErrorAction SilentlyContinue | Sort-Object FullName -Descending)
    if ($found.Count -gt 0) { $blender = $found[0].FullName }
}
if (-not $blender) {
    Write-Host "Blender.exe not found. Enter the full path to blender.exe:" -ForegroundColor Yellow
    $blender = Read-Host "Blender path"
    $blender = $blender.Trim('"')
}
if (-not (Test-Path $blender)) { throw "Blender executable not found: $blender" }
Write-Host "Using Blender: $blender"
& $blender --background --factory-startup --python $builder
if ($LASTEXITCODE -ne 0) { throw "Blender failed with exit code $LASTEXITCODE" }
$out = Join-Path $root "assets\models\fantasy_cottage_v1.glb"
if (-not (Test-Path $out)) { throw "Expected GLB missing: $out" }
Write-Host "SUCCESS: $out" -ForegroundColor Green
