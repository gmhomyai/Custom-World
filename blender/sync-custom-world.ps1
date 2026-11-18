# Build the reviewed local builder in a separate Blender process on Windows.
[CmdletBinding()]
param(
    [string]$BlenderPath,
    [string]$OutputPath
)
$ErrorActionPreference = 'Stop'
if (-not $OutputPath) { $OutputPath = Join-Path $PSScriptRoot '..\assets\models\fantasy_cottage_v2.glb' }
$builder = Join-Path $PSScriptRoot 'build_fantasy_cottage.py'
if (-not (Test-Path -LiteralPath $builder -PathType Leaf)) { throw "Builder not found: $builder" }
if (-not $BlenderPath) {
    $command = Get-Command blender.exe -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($command) { $BlenderPath = $command.Source }
}
if (-not $BlenderPath) {
    $root = Join-Path $env:ProgramFiles 'Blender Foundation'
    $found = @(Get-ChildItem -Path $root -Filter blender.exe -Recurse -File -ErrorAction SilentlyContinue |
        Sort-Object { $_.VersionInfo.FileVersionRaw } -Descending)
    if ($found.Count) { $BlenderPath = $found[0].FullName }
}
if (-not $BlenderPath -or -not (Test-Path -LiteralPath $BlenderPath -PathType Leaf)) {
    throw 'Blender not found. Supply -BlenderPath with the full path to blender.exe.'
}
$OutputPath = [IO.Path]::GetFullPath($OutputPath)
if ([IO.Path]::GetExtension($OutputPath) -ne '.glb') { throw 'OutputPath must end in .glb' }
$directory = Split-Path -Parent $OutputPath
New-Item -ItemType Directory -Force -Path $directory | Out-Null
$tempOutput = Join-Path $directory ('.cottage-' + [guid]::NewGuid().ToString('N') + '.glb')
try {
    Write-Host "Using Blender: $BlenderPath"
    & $BlenderPath --background --factory-startup --python-exit-code 1 --python $builder -- --output $tempOutput
    if ($LASTEXITCODE -ne 0) { throw "Blender failed with exit code $LASTEXITCODE" }
    if (-not (Test-Path -LiteralPath $tempOutput -PathType Leaf) -or (Get-Item -LiteralPath $tempOutput).Length -lt 20) {
        throw 'Blender did not produce a valid-sized GLB.'
    }
    Move-Item -LiteralPath $tempOutput -Destination $OutputPath -Force
    Write-Host "SUCCESS: $OutputPath" -ForegroundColor Green
} finally {
    if (Test-Path -LiteralPath $tempOutput) { Remove-Item -LiteralPath $tempOutput -Force }
}
