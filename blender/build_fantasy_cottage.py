"""Custom World — Blender asset builder V1. Runs in background or Scripting workspace."""
import bpy, math, os
from pathlib import Path

OUT = Path.home() / "Documents" / "CustomWorld" / "assets" / "models"
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

def material(name, color, emission=0):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1)
    m.use_nodes=True
    bs=m.node_tree.nodes.get("Principled BSDF")
    bs.inputs["Base Color"].default_value=(*color,1)
    bs.inputs["Roughness"].default_value=.75
    if emission:
        bs.inputs["Emission Color"].default_value=(*color,1)
        bs.inputs["Emission Strength"].default_value=emission
    return m

plaster=material("warm plaster",(.72,.61,.44))
timber=material("dark timber",(.22,.12,.075))
roof=material("aubergine roof",(.31,.18,.34))
stone=material("stone foundation",(.34,.33,.4))
window=material("golden glowing windows",(1,.59,.18),2.5)
door=material("oak door",(.3,.17,.09))
chimney=material("chimney stone",(.43,.4,.4))

def cube(name, loc, scale, mat, bevel=0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    ob=bpy.context.object; ob.name=name
    ob.dimensions=scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    ob.data.materials.append(mat)
    if bevel:
        mod=ob.modifiers.new("soft edges","BEVEL");mod.width=bevel;mod.segments=1
        mod2=ob.modifiers.new("weighted normals","WEIGHTED_NORMAL")
    return ob

cube("foundation",(0,0,.24),(6.8,5.8,.48),stone,.08)
cube("plaster walls",(0,0,2.6),(6.3,5.2,4.3),plaster,.08)
for x in (-3.16,3.16):
    for y in (-2.65,2.65):
        cube("timber post",(x,y,2.75),(.3,.35,5.0),timber,.035)
for z in (.65,4.85):
    for y in (-2.68,2.68):
        cube("timber beam",(0,y,z),(6.6,.3,.25),timber,.03)
for x in (-3.18,3.18):
    for z in (1.4,3.85):
        cube("side timber",(x,0,z),(.26,5.55,.24),timber,.025)
cube("door frame",(0,-2.72,1.45),(1.8,.25,2.8),timber,.06)
cube("door",(0,-2.87,1.38),(1.48,.15,2.5),door,.03)
cube("door knob",(.5,-2.98,1.35),(.12,.12,.12),window)
for x in (-2.0,2.0):
    for y in (-2.74,2.74):
        cube("window light",(x,y,2.85),(1.0,.14,1.35),window,.04)
        cube("window horizontal trim",(x,y+(-.12 if y<0 else .12),2.85),(1.25,.13,.13),timber)
        cube("window vertical trim",(x,y+(-.12 if y<0 else .12),2.85),(.13,.13,1.6),timber)

# Two pitched roof slopes, using thin rotated cubes.
for side in (-1,1):
    ob=cube("steep roof slope",(side*1.65,0,5.9),(4.3,6.5,.28),roof,.08)
    ob.rotation_euler[1]=side * math.radians(43)
    for y in (-3.1,3.1):
        beam=cube("roof end timber",(side*1.65,y,5.9),(4.35,.22,.18),timber,.025)
        beam.rotation_euler[1]=side * math.radians(43)
cube("chimney",(2,1.3,7.2),(.95,1.05,2.5),chimney,.06)
cube("chimney cap",(2,1.3,8.5),(1.25,1.35,.25),stone,.04)

# Export selected house objects as a reusable glTF binary asset.
bpy.ops.object.select_all(action="SELECT")
path=OUT/"fantasy_cottage_v1.glb"
bpy.ops.export_scene.gltf(filepath=str(path), export_format="GLB", use_selection=True)
print("CUSTOM_WORLD_EXPORT_OK:",path)
