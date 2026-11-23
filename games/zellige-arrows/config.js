// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is reading the order of a dense arrow board satisfying on a phone with hearts, locks and a mosaic reveal, and no ads or forced ranked mode?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // The challenge
  hearts: { value: 3, min: 1, max: 6, step: 1 },          // blocked taps allowed per level
  guides: { value: 3, min: 0, max: 9, step: 1 },          // long-press lane guides per level
  longpress_s: { value: 0.38, min: 0.2, max: 1, step: 0.02 }, // hold this long for a guide (s)
  guide_s: { value: 1.6, min: 0.5, max: 4, step: 0.1 },   // guide stays this long after release (s)
  hint_s: { value: 2.8, min: 1, max: 6, step: 0.1 },      // hint glow time (s)
  again_s: { value: 0.9, min: 0.3, max: 2, step: 0.1 },   // pause before an out-of-hearts restart (s)
  undo_s: { value: 0.3, min: 0.1, max: 1, step: 0.05 },   // Z3: an undone ribbon slides back in this long (s)

  // Feel
  slide_speed: { value: 9, min: 2, max: 30, step: 0.5 },  // launch speed (cells/s)
  slide_accel: { value: 55, min: 0, max: 200, step: 5 },  // acceleration while sliding out (cells/s^2)
  slide_max: { value: 34, min: 5, max: 80, step: 1 },     // top speed (cells/s)
  bump_s: { value: 0.34, min: 0.15, max: 1, step: 0.01 }, // blocked bounce time (s), plus per gap cell below
  bump_gap_s: { value: 0.045, min: 0, max: 0.2, step: 0.005 }, // extra bounce time per empty cell (s)
  flip_s: { value: 0.36, min: 0.1, max: 1, step: 0.02 },  // tile flip time (s)
  wave_s: { value: 0.07, min: 0, max: 0.3, step: 0.01 },  // win reveal: delay per ring from the centre (s)

  // Look
  ribbon_width: { value: 0.42, min: 0.25, max: 0.6, step: 0.01 }, // ribbon thickness (share of a cell)
  board_px: { value: 660, min: 480, max: 700, step: 10 }, // largest board size (logical px)
  cell_px_max: { value: 112, min: 70, max: 140, step: 2 }, // largest cell (logical px)

  // Level builder
  gen_attempts: { value: 160, min: 10, max: 600, step: 10 }, // boards tried per level before taking the closest
  free_min: { value: 3, min: 1, max: 8, step: 1 },        // Z1: a board needs this many ribbons free at the start (level 1 exempt)
  straight_bias: { value: 0.42, min: 0, max: 1, step: 0.02 }, // chance a ribbon body keeps straight
  // The 12-level ramp (Z2: by dependency depth, with rest boards). n: board cells per side, r: ribbons,
  // d: chain depth range (removal rounds), f: ribbons free at the start (range), locks: knots,
  // len: longest ribbon (cells), block: chance a new ribbon is placed across an older ribbon's lane,
  // fill: share of cells covered. hard: 1 shows the "صعبة" badge before the level starts (S2);
  // rest: 1 marks the easier board that follows every two hard ones.
  levels: { value: [
    { n: 5, r: 4, d: [2, 2], f: [3, 3], locks: 0, len: 4, block: 0.30, fill: 0.55 },
    { n: 6, r: 8, d: [2, 2], f: [7, 7], locks: 0, len: 4, block: 0.15, fill: 0.62 },
    { n: 6, r: 12, d: [3, 3], f: [3, 6], locks: 0, len: 4, block: 0.55, fill: 0.82 },
    { n: 7, r: 20, d: [5, 5], f: [3, 9], locks: 0, len: 5, block: 0.60, fill: 0.90 },
    { n: 7, r: 24, d: [7, 8], f: [3, 8], locks: 0, len: 5, block: 0.75, fill: 0.94, hard: 1 },
    { n: 8, r: 28, d: [8, 9], f: [3, 9], locks: 0, len: 5, block: 0.75, fill: 0.94, hard: 1 },
    { n: 7, r: 18, d: [3, 4], f: [4, 9], locks: 1, len: 5, block: 0.45, fill: 0.88, rest: 1 },
    { n: 8, r: 30, d: [6, 7], f: [3, 10], locks: 2, len: 5, block: 0.65, fill: 0.93 },
    { n: 8, r: 32, d: [8, 10], f: [3, 10], locks: 2, len: 5, block: 0.75, fill: 0.95, hard: 1 },
    { n: 9, r: 40, d: [10, 12], f: [3, 12], locks: 2, len: 5, block: 0.75, fill: 0.95, hard: 1 },
    { n: 8, r: 26, d: [4, 5], f: [4, 10], locks: 2, len: 5, block: 0.50, fill: 0.90, rest: 1 },
    { n: 9, r: 42, d: [11, 13], f: [3, 12], locks: 3, len: 5, block: 0.80, fill: 0.96, hard: 1 },
  ] },
};
