// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is the jam-then-board loop fun when every level is proven solvable and the seats always match the travellers?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // The gate and the rules
  posts: { value: 4, min: 2, max: 6, step: 1 },          // loading posts at the gate
  undos: { value: 3, min: 0, max: 9, step: 1 },          // free undos per level
  seats_small: { value: 3, min: 2, max: 6, step: 1 },    // seats on a one-hump camel (2 cells)
  seats_big: { value: 6, min: 3, max: 9, step: 1 },      // seats on a two-hump camel (3 cells)
  levels: { value: 10, min: 3, max: 10, step: 1 },       // levels in the slice

  // The ramp (level 1 = first)
  camels_first: { value: 4, min: 2, max: 10, step: 1 },  // camels on level 1
  camels_step: { value: 2, min: 0, max: 4, step: 1 },    // more camels each level
  camels_max: { value: 20, min: 8, max: 24, step: 1 },   // cap (bitmask solver: keep <= 24)
  grid_first_cols: { value: 5, min: 3, max: 8, step: 1 },// courtyard columns on level 1 (rows = cols + 1)
  grid_max_cols: { value: 8, min: 5, max: 8, step: 1 },  // 8 columns x 9 rows at the top of the ramp
  colours3_from: { value: 3, min: 2, max: 10, step: 1 }, // level where a third robe colour arrives
  colours4_from: { value: 6, min: 3, max: 10, step: 1 }, // fourth colour
  colours5_from: { value: 9, min: 4, max: 11, step: 1 }, // fifth colour
  big_from: { value: 5, min: 2, max: 10, step: 1 },      // level where two-hump camels arrive
  big_share: { value: 0.3, min: 0, max: 0.6, step: 0.05 }, // share of big camels from then on
  chain_from: { value: 4, min: 2, max: 10, step: 1 },    // level where chains 3 camels deep are required
  plan_posts: { value: 3, min: 1, max: 4, step: 1 },     // posts the dealer's own winning order holds at once (higher = tighter)
  solver_nodes: { value: 60000, min: 5000, max: 400000, step: 5000 }, // search budget per dealt level

  // Feel (seconds, logical px per second)
  walk_speed: { value: 1350, min: 400, max: 3000, step: 50 },  // camel from courtyard to post
  leave_speed: { value: 560, min: 200, max: 1500, step: 20 },  // full camel out through the arch
  board_interval: { value: 0.13, min: 0.04, max: 0.5, step: 0.01 }, // gap between boarding travellers
  board_flight: { value: 0.24, min: 0.08, max: 0.8, step: 0.02 },   // a traveller's walk to the camel
  depart_delay: { value: 0.28, min: 0, max: 1, step: 0.02 },        // pause before a full camel leaves
  cell_max: { value: 112, min: 60, max: 130, step: 2 },             // largest courtyard cell (early levels)
  bay_cell: { value: 50, min: 36, max: 60, step: 1 },               // camel size at the posts
  queue_ease: { value: 12, min: 3, max: 30, step: 1 },              // how fast the line shuffles forward
};
