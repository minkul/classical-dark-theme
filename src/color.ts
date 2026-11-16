// ─────────────────────────────────────────────────────────────────────────────
// Color helpers shared by the theme palettes. Colors are "#RRGGBB" hex.
// ─────────────────────────────────────────────────────────────────────────────

type Rgb = [number, number, number];

const toRgb = (hex: string): Rgb =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;

const toHex = (channels: number[]): string =>
  "#" +
  channels
    .map((v) =>
      Math.max(0, Math.min(255, Math.round(v)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")
    .toUpperCase();

/** Opaque blend of `weight` parts `fg` over `bg`. */
export function mix(fg: string, bg: string, weight: number): string {
  const f = toRgb(fg);
  const b = toRgb(bg);
  return toHex(f.map((v, i) => v * weight + b[i] * (1 - weight)));
}

/**
 * Translucent color that, drawn at `alpha` over `base`, composites back to
 * exactly `target`. VS Code requires most editor decorations to be
 * non-opaque; this keeps their on-screen color identical to the palette.
 */
export function overlay(target: string, alpha: number, base: string): string {
  const t = toRgb(target);
  const b = toRgb(base);
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return toHex(t.map((v, i) => (v - (1 - alpha) * b[i]) / alpha)) + alphaHex;
}

/**
 * `overlay` at the lowest alpha that can still reach `target` from `base`
 * (one channel ends up at 0 or 255). Whatever lies beneath the layer, such as
 * the selection under a diff fill, keeps as much of its own color as
 * possible.
 */
export function layer(target: string, base: string): string {
  return overlay(target, lowestAlpha(target, base), base);
}

/**
 * `overlay` at `alpha`, raised to the lowest alpha that can still reach
 * `target` from `base` when `alpha` cannot. For colors VS Code wants
 * non-opaque (overview ruler and minimap marks, chat fills) that should
 * nonetheless look solid: the on-screen color stays exactly `target`.
 */
export function veil(target: string, alpha: number, base: string): string {
  return overlay(target, Math.max(alpha, lowestAlpha(target, base)), base);
}

/** Lowest alpha (in 1/255 steps, never fully opaque) that reaches `target` from `base`. */
function lowestAlpha(target: string, base: string): number {
  const t = toRgb(target);
  const b = toRgb(base);
  const needed = Math.max(
    ...t.map((v, i) =>
      v > b[i] ? (v - b[i]) / (255 - b[i]) : v < b[i] ? (b[i] - v) / b[i] : 0,
    ),
  );
  return Math.min(254, Math.max(1, Math.ceil(needed * 255))) / 255;
}

/**
 * `overlay`, `layer` and `veil` with `base` defaulting to `defaultBase` — normally the
 * theme's editor background, which most decorations are drawn over.
 */
export function compositingOver(defaultBase: string) {
  return {
    overlay: (target: string, alpha: number, base: string = defaultBase) =>
      overlay(target, alpha, base),
    layer: (target: string, base: string = defaultBase) => layer(target, base),
    veil: (target: string, alpha: number, base: string = defaultBase) =>
      veil(target, alpha, base),
  };
}
