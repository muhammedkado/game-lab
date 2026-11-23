// PROTOTYPE - NOT FOR PRODUCTION
// Question: Do geared rings make alignment a real puzzle on a phone, and does a guaranteed par with a fair move budget remove the "impossible level" feeling?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // The challenge
  budget_mult: { value: 2, min: 1, max: 4, step: 0.5 },   // move budget = par x this + budget_add
  budget_add: { value: 2, min: 0, max: 10, step: 1 },
  star3_over: { value: 0, min: 0, max: 5, step: 1 },      // 3 stars at par + this many moves or fewer
  star2_over: { value: 3, min: 0, max: 10, step: 1 },     // 2 stars at par + this many moves or fewer
  again_s: { value: 1.1, min: 0.3, max: 3, step: 0.1 },   // pause before an out-of-moves restart (s)
  win_hold_s: { value: 1.6, min: 0.5, max: 4, step: 0.1 }, // the lit astrolabe shows this long before results (s)

  // Feel
  snap_rate: { value: 16, min: 4, max: 40, step: 1 },     // how fast a ring eases to its step (1/s)
  drag_dead_deg: { value: 6, min: 1, max: 20, step: 1 },  // a press that turns less than this is a tap (degrees)
  tap_max_px: { value: 16, min: 4, max: 40, step: 1 },    // a press that moves less than this is a tap (logical px)
  beam_speed: { value: 1500, min: 200, max: 5000, step: 50 }, // starlight racing outward (px/s)

  // Look
  outer_r: { value: 312, min: 240, max: 330, step: 2 },   // outer edge of the rings (logical px)
  core_r: { value: 66, min: 40, max: 120, step: 2 },      // smallest lapis core radius (logical px)
  max_band: { value: 100, min: 40, max: 120, step: 2 },   // widest ring band (logical px)
  gap_deg: { value: 17, min: 8, max: 26, step: 1 },       // width of a ring's cut-out (degrees)

  // Level maker
  gen_attempts: { value: 12, min: 1, max: 60, step: 1 },  // layouts tried per level before taking the closest par
  // The 12-level ramp. rings, sockets, links: gear links added at random (fixed: [driver, driven, +1 same | -1 opposite]),
  // opp: chance a random link turns the other way, gaps: cut-outs per ring (range), par: wanted optimal moves (range),
  // only: 'outer' scrambles the outer ring alone.
  levels: { value: [
    { rings: 2, sockets: 1, links: 0, opp: 0, gaps: [1, 1], par: [2, 2], only: 'outer' },
    { rings: 3, sockets: 1, links: 0, opp: 0, gaps: [1, 2], par: [3, 4] },
    { rings: 3, sockets: 1, links: 0, fixed: [[1, 2, -1]], opp: 1, gaps: [1, 1], par: [3, 4] },
    { rings: 3, sockets: 1, links: 2, opp: 0.8, gaps: [1, 2], par: [4, 6] },
    { rings: 4, sockets: 1, links: 2, opp: 0.7, gaps: [1, 2], par: [5, 6] },
    { rings: 4, sockets: 1, links: 3, opp: 0.6, gaps: [1, 2], par: [5, 7] },
    { rings: 4, sockets: 2, links: 1, opp: 0.5, gaps: [2, 3], par: [5, 7] },
    { rings: 4, sockets: 2, links: 2, opp: 0.5, gaps: [2, 3], par: [6, 8] },
    { rings: 4, sockets: 2, links: 2, opp: 0.6, gaps: [2, 3], par: [6, 8] },
    { rings: 4, sockets: 2, links: 3, opp: 0.5, gaps: [2, 3], par: [7, 9] },
    { rings: 5, sockets: 3, links: 2, opp: 0.5, gaps: [3, 3], par: [7, 10] },
    { rings: 5, sockets: 3, links: 3, opp: 0.5, gaps: [3, 3], par: [8, 11] },
  ] },
};
