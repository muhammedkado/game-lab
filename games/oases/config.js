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
  // Round 2 (research/re): adaptive pick by solve time, honest labels, rest puzzles, no near-duplicates
  target_5: { value: 45, min: 10, max: 600, step: 5 },      // target median solve time (s) at 5x5
  target_6: { value: 70, min: 10, max: 600, step: 5 },      // ... at 6x6
  target_7: { value: 110, min: 10, max: 600, step: 5 },     // ... at 7x7
  target_8: { value: 160, min: 10, max: 900, step: 5 },     // ... at 8x8
  target_9: { value: 220, min: 10, max: 900, step: 5 },     // ... at 9x9
  adapt_after: { value: 3, min: 0, max: 10, step: 1 },      // puzzles solved before the pick adapts (the grace period)
  adapt_fast: { value: 0.7, min: 0.3, max: 1, step: 0.05 }, // median of the last 3 solves (time / its size's target) at or under this: the harder candidate
  adapt_slow: { value: 1.4, min: 1, max: 3, step: 0.05 },   // at or over this: the easier candidate
  hard_score: { value: 8, min: 2, max: 20, step: 0.5 },     // a board whose solver score is at least this × its size is labelled صعبة
  rest_after: { value: 2, min: 1, max: 6, step: 1 },        // hard puzzles solved in a row before one easier rest puzzle of the same size
  dup_window: { value: 20, min: 0, max: 60, step: 1 },      // served puzzles a new candidate is compared with (0 = off)
  dup_shape: { value: 2, min: 0, max: 10, step: 1 },        // near-duplicate when the sorted oasis sizes differ by at most this many cells...
  dup_steps: { value: 2, min: 0, max: 10, step: 1 },        // ...and the deduction-step profile by at most this many steps
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
