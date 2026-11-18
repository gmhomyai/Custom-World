# Blender Auto Sync V1 — Windows

This first version runs Blender **in the background** and generates a reusable fantasy cottage GLB. It does not control the currently open Blender window.

## Run
1. Install Blender on Windows.
2. Download `blender/sync-custom-world.ps1` from this repository to your PC.
3. Right-click the downloaded file and select **Run with PowerShell**. If your policy blocks execution, open PowerShell in the downloaded folder and run `powershell -NoProfile -ExecutionPolicy Bypass -File .\\sync-custom-world.ps1` only after reviewing the script.
4. The tool downloads `blender/build_fantasy_cottage.py` from this repository and launches Blender with `--background --factory-startup --python`.
5. Output: `%USERPROFILE%\\Documents\\CustomWorld\\assets\\models\\fantasy_cottage_v1.glb`.

Rerun the same PowerShell file to fetch the latest builder. Blender must be installed in the standard location, on PATH, or provided via an executable path prompt.

**Security:** the PowerShell script downloads and executes Python code from the repository. Review the source and use only a repository you trust. This is a manual pull, not unattended remote control. It does not upload your local files. Future versions can add pinned revisions, verification, and automated asset publishing.

**Note:** the builder clears the scene it runs in, but `--background --factory-startup` creates a separate temporary Blender process so your open Blender project remains untouched.
