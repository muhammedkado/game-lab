// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is the core loop fun on a phone, and does our fairness fix answer the players' top complaint?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },
  // The challenge: hearts and the size ramp (first puzzle number at each size)
  hearts: { value: 3, min: 1, max: 5, step: 1 },            // wrong tents allowed per puzzle
  ramp_6: { value: 3, min: 2, max: 10, step: 1 },           // first 6x6 puzzle
  ramp_7: { value: 6, min: 3, max: 15, step: 1 },           // first 7x7 puzzle (first real trouble)
  ramp_8: { value: 10, min: 4, max: 20, step: 1 },          // first 8x8 puzzle
  ramp_9: { value: 15, min: 5, max: 30, step: 1 },          // first 9x9 puzzle
  hard_size: { value: 7, min: 5, max: 9, step: 1 },         // from this size: no one-cell oasis, needs region-row reasoning
  daily_size: { value: 7, min: 5, max: 9, step: 1 },        // board size of the daily puzzle
  auto_mark_puzzles: { value: 1, min: 0, max: 5, step: 1 }, // puzzles that start with auto-marks on
  // The generator
  candidates: { value: 4, min: 1, max: 12, step: 1 },       // valid puzzles found per level, ranked by solver steps
  gen_batch: { value: 6, min: 1, max: 60, step: 1 },        // generator attempts per 1/60 s step
  gen_tries: { value: 1500, min: 100, max: 30000, step: 100 }, // attempts before the strict filter relaxes
  repairs: { value: 24, min: 0, max: 80, step: 1 },        // oasis-border repairs per attempt before it is thrown away
  grow_min: { value: 0.2, min: 0.02, max: 1, step: 0.02 },  // slowest oasis growth rate (0..1); lower = more uneven oases
  max_set: { value: 4, min: 2, max: 5, step: 1 },           // largest "k oases in k rows" deduction the solver uses
  // Touch and feel
  long_press: { value: 0.35, min: 0.2, max: 0.8, step: 0.05 }, // seconds to put a sand mark
  hint_time: { value: 6, min: 2, max: 15, step: 0.5 },      // seconds a hint's reason stays up
  shake_time: { value: 0.4, min: 0.1, max: 1, step: 0.05 }, // seconds the board shakes on a wrong tent
  shake_px: { value: 14, min: 0, max: 40, step: 1 },        // shake distance (logical px)
  lost_pause: { value: 1.6, min: 0.5, max: 4, step: 0.1 },  // seconds the "out of hearts" note shows before the restart
  win_pause: { value: 1.6, min: 0.3, max: 4, step: 0.1 },   // seconds of celebration before the results card
  palm_sway: { value: 0.16, min: 0, max: 0.5, step: 0.01 }, // palm sway amplitude (radians) on a finished oasis
  rule_fade: { value: 0.6, min: 0.1, max: 2, step: 0.1 },   // seconds the rule card takes to fade
};
