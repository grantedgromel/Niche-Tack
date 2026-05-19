/* Deterministic moodboard imagery.

   The prototype sourced photos from picsum.photos; that makes the build
   depend on an external host that egress policies routinely block. Instead
   we generate a soft, layered OKLCH gradient per seed — self-contained,
   reproducible, and on-brand for the "ethereal gradient" aesthetic. */

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** A layered, soft-focus gradient — two light blooms over a tinted field. */
export function seededGradient(seed: string): string {
  const h = hash(seed);
  const at = (shift: number, span: number, min: number) =>
    min + ((h >>> shift) % span);

  const hueBase = h % 360;
  const hueGlowA = (hueBase + 28 + at(4, 90, 0)) % 360;
  const hueGlowB = (hueBase + 168 + at(8, 110, 0)) % 360;

  const ax = at(3, 46, 14);
  const ay = at(6, 40, 10);
  const bx = at(9, 40, 52);
  const by = at(12, 44, 46);
  const angle = at(15, 150, 105);
  const baseLoL = (0.5 + at(19, 18, 0) / 100).toFixed(2);

  return [
    `radial-gradient(56% 52% at ${ax}% ${ay}%, oklch(0.88 0.09 ${hueGlowA}) 0%, transparent 66%)`,
    `radial-gradient(52% 56% at ${bx}% ${by}%, oklch(0.82 0.1 ${hueGlowB}) 0%, transparent 68%)`,
    `linear-gradient(${angle}deg, oklch(0.81 0.07 ${hueBase}) 0%, oklch(${baseLoL} 0.1 ${(hueBase + 24) % 360}) 100%)`,
  ].join(", ");
}
