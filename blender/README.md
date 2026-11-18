# Blender Auto Sync — Windows

The sync builds the **reviewed local** Python builder in a separate, disposable Blender process. It does not control or clear an open Blender project. Update this checkout through Git when you choose; the script does not download or execute remote code.

```powershell
cd D:\Projects\Custom-World
powershell -NoProfile -ExecutionPolicy Bypass -File .\blender\sync-custom-world.ps1
```

Blender is located on PATH or under `Program Files\Blender Foundation`. To override the executable or output:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\blender\sync-custom-world.ps1 -BlenderPath 'C:\Program Files\Blender Foundation\Blender 5.3\blender.exe' -OutputPath 'D:\Models\fantasy_cottage_v2.glb'
```

The default output is `assets/models/fantasy_cottage_v2.glb` in this checkout. A successful run replaces only that output; it leaves V1 and other files alone. A failed build leaves the previous output intact. Blender Python exceptions are treated as failures. Do not run the builder inside an interactive Blender session: it clears the temporary scene and refuses to run outside background mode.

This is a manual build, not continuous syncing, uploading, committing, or deployment. The output can be large and should be reviewed before committing.
