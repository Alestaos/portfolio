---
title: "Still Life Study — Blender Render"
summary: "My first finished Blender scene: a still-life painting recreated in 3D, with a blue glass bottle, mug, orange, knife and a draped cloth, rendered in Cycles."
year: 2026
cover: ../../assets/projects/blender-still-life/01-final-render.png
coverAlt: "Blender render of a still life: a tall dark-blue glass bottle with bright highlights, a white mug, an orange and a knife on a light wooden board, with a white cloth with navy stripes draped over the left side, against a dark olive background."
role: "3D modeller, texturing and lighting (coursework)"
engine: "Blender (Cycles)"
platforms: []
teamSize: 1
status: "released"
course: "MSc Computing (Games & XR), 3D Animation Pipeline"
tags: ["Blender", "3D modelling", "Texturing", "Lighting", "Coursework"]
featured: true
featuredOrder: 0
order: 0
draft: false
gallery:
  - src: ../../assets/projects/blender-still-life/01-final-render.png
    alt: "Full final render of the still life. A tall blue glass bottle stands behind an orange, with a white mug to its right, a knife across the front of a wooden board, and a striped cloth draped over the board's left edge."
    caption: "Final render, Cycles, 512 samples with denoising."
---

## What it is

My first complete Blender scene, made for the first assessment of my MSc in Computing (Games &
XR). The brief was to pick a still-life painting from a set of references and recreate it in 3D:
model, texture, light, frame and render it. I came into this with no prior Blender experience.

## How it was made

- **Modelling:** the bottle, mug, orange, knife and board were modelled from basic shapes, with
  support loops added so the Subdivision Surface modifier kept their shapes clean.
- **Cloth:** a cloth simulation draped over the board, then the modifier was applied and the
  folds shaped by hand with proportional editing.
- **Materials:** the board, table and wall use Poly Haven textures (CC0), recoloured to match
  the painting. The orange peel is a procedural bump, the bottle is a glass shader, and I made
  the cloth's stripe texture myself in Photoshop.
- **Camera:** the painting was set as the camera's background image, with an 85 mm lens to
  match its flatter perspective.
- **Lighting and render:** an area light for the long highlights on the glass, a point light
  for shape on the orange and cloth, rendered in Cycles with denoising.

## What I learned

The biggest lesson was scale. The scene ended up at about eight times real size, and that
decision showed up again in the cloth simulation, the bump detail and the light power. Next
time, real-world scale comes first.
