// PROTOTYPE - NOT FOR PRODUCTION
// Question: Does the modern air-taxi world make the proven jam-then-board loop feel fresh and readable on a phone?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // The gates and the rules
  gates: { value: 4, min: 2, max: 6, step: 1 },          // boarding gates along the terminal
  undos: { value: 3, min: 0, max: 9, step: 1 },          // free undos per level
  seats_small: { value: 3, min: 2, max: 3, step: 1 },    // seats on a small air taxi (1 cell)
  seats_big: { value: 6, min: 3, max: 6, step: 1 },      // seats on a long air shuttle (2 cells)
  levels: { value: 10, min: 3, max: 10, step: 1 },       // levels in the slice

  // The ramp (level 1 = first)
  taxis_first: { value: 4, min: 2, max: 10, step: 1 },   // taxis on level 1
  taxis_step: { value: 2, min: 0, max: 4, step: 1 },     // more taxis each level
  taxis_max: { value: 20, min: 8, max: 24, step: 1 },    // cap (bitmask solver: keep <= 24)
  grid_first_cols: { value: 3, min: 3, max: 6, step: 1 },// deck columns on level 1 (rows = cols + 1); +1 every two levels
  grid_max_cols: { value: 6, min: 4, max: 7, step: 1 },  // 6 columns x 7 rows of pads at the top of the ramp
  colours3_from: { value: 3, min: 2, max: 10, step: 1 }, // level where a third colour arrives
  colours4_from: { value: 6, min: 3, max: 10, step: 1 }, // fourth colour
  colours5_from: { value: 9, min: 4, max: 11, step: 1 }, // fifth colour
  big_from: { value: 5, min: 2, max: 10, step: 1 },      // level where long shuttles arrive
  big_share: { value: 0.3, min: 0, max: 0.6, step: 0.05 }, // share of long shuttles from then on
  chain_from: { value: 4, min: 2, max: 10, step: 1 },    // level where chains 3 taxis deep are required
  plan_gates: { value: 3, min: 1, max: 4, step: 1 },     // gates the dealer's own winning order holds at once (higher = tighter)
  solver_nodes: { value: 60000, min: 5000, max: 400000, step: 5000 }, // search budget per dealt level

  // Round 2 (design/re-improvements.md): free help, honest labels, covered taxis, queueing
  extra_gates: { value: 1, min: 0, max: 1, step: 1 },      // free extra gate offered once per level when stuck (C1)
  hard_from: { value: 4, min: 2, max: 10, step: 1 },       // first level marked "صعبة" (S2)
  hard_every: { value: 3, min: 1, max: 9, step: 1 },       // then every Nth level after it (4, 7, 10)
  hard_candidates: { value: 8, min: 1, max: 12, step: 1 }, // solvable deals compared on a hard level; the one with the most traps is kept (8: 1-pad taxis block fewer lanes than 2-3 cell pieces)
  trap_nodes: { value: 30000, min: 5000, max: 200000, step: 5000 }, // search budget for counting one deal's traps (free taps that lose the level)
  hidden_from: { value: 6, min: 2, max: 11, step: 1 },     // level where covered (charging) taxis arrive (11 = never) (C2)
  hidden_intro: { value: 2, min: 1, max: 6, step: 1 },     // covered taxis on that first level
  hidden_share: { value: 0.25, min: 0, max: 0.5, step: 0.05 }, // share of taxis covered on the levels after it
  reveal_time: { value: 0.4, min: 0.1, max: 1, step: 0.05 },   // seconds for the charging cover to slide off
  fly_gap: { value: 10, min: 0, max: 40, step: 2 },        // logical px kept between taxis queueing on the flight lanes (C3)

  // Feel (seconds, logical px per second)
  glide_speed: { value: 1150, min: 400, max: 3000, step: 50 }, // taxi from its pad to a gate
  hover_alt: { value: 0.14, min: 0, max: 0.4, step: 0.02 },    // how high a gliding taxi hovers (scale and shadow)
  spin_time: { value: 0.3, min: 0.05, max: 1, step: 0.05 },    // rotors spinning up before lift-off
  rise_time: { value: 0.5, min: 0.1, max: 1.5, step: 0.05 },   // the vertical rise and turn at the gate
  fly_speed: { value: 950, min: 300, max: 2500, step: 50 },    // full taxi flying off the top of the screen
  board_interval: { value: 0.13, min: 0.04, max: 0.5, step: 0.01 }, // gap between boarding travellers
  board_flight: { value: 0.26, min: 0.08, max: 0.8, step: 0.02 },   // a traveller's walk to the taxi
  depart_delay: { value: 0.2, min: 0, max: 1, step: 0.02 },         // pause before a full taxi spins up
  cell_max: { value: 120, min: 72, max: 140, step: 2 },             // largest pad (early levels)
  bay_cell: { value: 80, min: 50, max: 84, step: 1 },               // taxi size at the gates
  rider_h: { value: 62, min: 40, max: 66, step: 1 },                // traveller height in the line
  queue_ease: { value: 12, min: 3, max: 30, step: 1 },              // how fast the line shuffles forward
};
