# Interactive Image Hotspot Calibration

This protocol keeps a teaching annotation attached to the same physical object at every rendered size. Coordinates are measured once on the accepted native image and stored as percentages; the browser must display the full image without cropping.

## 1. Freeze the Source Image

1. Accept the scientific content and composition before annotation.
2. Record native width `W` and height `H` in pixels.
3. Do not crop, pad or regenerate the image after coordinates are measured.
4. Web compression may change encoding, but not pixel dimensions or aspect ratio.

## 2. Measure Each Object

At native resolution, record a tight rectangular object box:

- left edge `L`, right edge `R`;
- top edge `T`, bottom edge `B`;
- one clear arrow landing point `A = (Ax, Ay)` inside the physical object;
- one callout origin `C = (Cx, Cy)` in nearby negative space.

Convert pixels to normalized percentages:

```text
x  = 100 * Ax / W
y  = 100 * Ay / H
rx = 50  * (R - L) / W
ry = 50  * (B - T) / H
labelX = 100 * Cx / W
labelY = 100 * Cy / H
```

Use an ellipse for a localized component and a polygon only when the object is strongly non-elliptical. The arrow must terminate inside the object, not on a nearby label or beam.

## 3. Sidecar Record

Keep one editable JSON sidecar beside each accepted source image:

```json
{
  "image": "photo-science-cell-high-na.png",
  "nativeSize": { "width": 3840, "height": 2160 },
  "coordinateSystem": "normalized-percent",
  "hotspots": [
    {
      "id": "high-na-objective",
      "x": 48.0,
      "y": 18.0,
      "rx": 7.5,
      "ry": 10.0,
      "labelX": 68.0,
      "labelY": 12.0
    }
  ]
}
```

Geometry remains language-neutral. The Chinese image already contains short first-pass labels; expanded Chinese and English explanations belong in the website content model, not this geometry file.

## 4. Browser Contract

- Image and overlay share the same positioned container.
- Image uses `width: 100%; height: auto; object-fit: contain`.
- Overlay uses `position: absolute; inset: 0` and the same full dimensions.
- SVG uses `viewBox="0 0 100 100"` and no content crop.
- Visible target is a ring or polygon; the invisible pointer target is at least 28 px desktop and 32 px touch.
- Stroke uses `vector-effect="non-scaling-stroke"` so it remains legible without changing the selected physical region.
- Only one primary callout is open at a time. Keyboard selection and `aria-pressed` must mirror pointer selection.
- Hotspot rings and callouts must not cover the image's title, numbered labels, parameter boxes or acceptance text.

If a design uses `object-fit: cover`, responsive art direction, or source cropping, this coordinate system is invalid. Create a separate coordinate set for each crop rather than applying offsets by eye.

## 5. Precision Acceptance

Verify every hotspot at rendered image widths of 1280 px, 768 px and 360 px:

- ring center remains inside its intended object;
- ellipse contains the named component without swallowing an adjacent component;
- arrow lands inside the ring and does not cross essential image detail;
- callout stays within the image and does not cover the selected component;
- pointer and keyboard activation select the same hotspot;
- ring-center drift is no more than 2% of the rendered object width between viewports;
- Chinese first-pass labels remain readable in the image, while expanded bilingual HTML text switches without reloading the image.

For crowded mobile figures, keep the precise ring, provide a selected-region magnification, and move expanded text below the image. Do not enlarge the physical hotspot geometry merely to satisfy touch-target size; enlarge only the transparent button hit area. The magnified crop must include the selected object and its embedded Chinese label whenever possible.

## Existing Reference Calibration

The current `171Yb` reference map implements this protocol for five regions: 399 nm, 556 nm, 578 nm, approximately 302 nm and 369.5 nm. Its overlay exposes `data-coordinate-system="normalized-percent"` for automated checks.
