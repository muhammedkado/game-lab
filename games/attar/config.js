// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is the core loop fun on a phone, and does our fairness fix answer the players' top complaint?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },
  // The 96 levels are baked in levels.js (tools/attar-levels.js holds their shapes: scents, layers,
  // empty flasks, veil, wax-sealed flask). These three shape the daily flask and the drawing.
  empties: { value: 2, min: 1, max: 4, step: 1 },          // empty flasks in the daily flask
  capacity: { value: 4, min: 3, max: 6, step: 1 },         // layers in a normal flask (a level with fewer is drawn narrow, with more tall)
  narrow_capacity: { value: 3, min: 2, max: 5, step: 1 },  // layers in a narrow flask (the figures sheet)
  // Stars against the solver's par (round 2: gentler; was 3 stars at par, 2 stars at par+4)
  star3_extra: { value: 2, min: 0, max: 10, step: 1 },     // pours over par that still earn 3 stars
  star2_extra: { value: 6, min: 0, max: 20, step: 1 },     // pours over par that still earn 2 stars (keep it at or above star3_extra)
  veil_extra: { value: 2, min: 0, max: 10, step: 1 },      // round 3: a veiled level allows this many more pours for the same stars
  // Round 2 (research/re): honest labels, the free way out, the daily flask
  hard_par: { value: 22, min: 5, max: 60, step: 1 },       // a daily flask whose par is at least this many pours is labelled صعبة (levels carry their own label)
  extra_layers: { value: 2, min: 1, max: 3, step: 1 },     // layers in the free small flask offered once per attempt when no pour is left
  daily_scents: { value: 7, min: 2, max: 9, step: 1 },     // scents in the daily flask (seeded by the local date)
  daily_veil: { value: 1, min: 0, max: 1, step: 1 },       // 1: the daily flask has veiled layers
  // The solver
  solver_nodes: { value: 60000, min: 2000, max: 400000, step: 1000 }, // states the daily flask's solver may open per deal
  hint_nodes: { value: 40000, min: 1000, max: 400000, step: 1000 },   // states the hint may open
  dead_nodes: { value: 6000, min: 500, max: 100000, step: 500 },      // states the dead-end check may open after a pour
  hint_weight: { value: 1.4, min: 1, max: 5, step: 0.1 },  // A* weight for the hint (1 = shortest path)
  // Feel
  pour_time: { value: 0.62, min: 0.2, max: 1.5, step: 0.02 }, // seconds for one pour (tilt, stream, return)
  lift_px: { value: 46, min: 10, max: 100, step: 2 },        // how high a lifted flask rises (logical px)
  tilt: { value: 1.15, min: 0.5, max: 1.6, step: 0.05 },     // pour tilt (radians)
  stopper_time: { value: 0.5, min: 0.1, max: 1.5, step: 0.05 }, // seconds the gold stopper takes to drop in
  hint_time: { value: 4, min: 1, max: 12, step: 0.5 },       // seconds the hint glow stays
  idle_nudge: { value: 25, min: 0, max: 120, step: 5 },      // round 3: seconds without a pour before the hint button glows (0: never)
};
