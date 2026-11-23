// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is planning which item to pick, with the next two box labels visible, a fun cozy puzzle on a phone?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // The rules
  table_spots: { value: 6, min: 3, max: 6, step: 1 },   // spots on the side table (layout holds 6) (M1: was 5)
  undos: { value: 3, min: 0, max: 9, step: 1 },         // free undos per room
  shuffles: { value: 1, min: 0, max: 3, step: 1 },      // free pile shuffles per room
  preview: { value: 2, min: 0, max: 2, step: 1 },       // next box labels shown
  levels: { value: 8, min: 3, max: 8, step: 1 },        // rooms in the slice

  // The ramp (rooms 1..8). Items per room: first, +step_early to room 3, +step_late after; multiples of 3.
  items_first: { value: 12, min: 6, max: 30, step: 3 },
  items_step_early: { value: 9, min: 0, max: 15, step: 3 },
  items_step_late: { value: 7.5, min: 0, max: 15, step: 0.5 },
  items_max: { value: 60, min: 30, max: 60, step: 3 },  // the bitset solver holds up to 60
  kinds_ratio: { value: 0.78, min: 0.3, max: 1, step: 0.02 }, // kinds per box label (more kinds = fewer repeats)
  kinds_max: { value: 16, min: 4, max: 16, step: 1 },
  layers_max: { value: 5, min: 1, max: 5, step: 1 },    // heap layers on the last rooms
  similar_from: { value: 5, min: 2, max: 9, step: 1 },  // room where look-alike pairs (book/notebook, glass/candle...) share a room
  park_chance: { value: 0.32, min: 0, max: 0.8, step: 0.02 }, // how often the dealer's own way through parks an item
  table_plan: { value: 3, min: 0, max: 5, step: 1 },   // most table spots the dealer's own way through uses
  solver_nodes: { value: 40000, min: 2000, max: 300000, step: 2000 }, // search budget per dealt room
  shuffle_tries: { value: 40, min: 5, max: 200, step: 5 },          // shuffles tried until a winnable one is found

  // Round 2 (design/re-improvements.md): idle hint, honest labels
  hint_idle: { value: 15, min: 5, max: 60, step: 1 },     // seconds with no pick before one item that fits an open box pulses (M2)
  hints_per_room: { value: 3, min: 0, max: 9, step: 1 },  // most idle hints in one room
  hint_nodes: { value: 4000, min: 500, max: 40000, step: 500 }, // search budget to check a hinted pick keeps the room winnable
  hard_from: { value: 3, min: 2, max: 8, step: 1 },       // first room marked "صعبة" (S2)
  hard_every: { value: 2, min: 1, max: 7, step: 1 },      // then every Nth room after it (3, 5, 7)
  hard_table_plan: { value: 4, min: 0, max: 6, step: 1 }, // on a hard room, most table spots the dealer's own way through uses
  hard_park_chance: { value: 0.45, min: 0, max: 0.8, step: 0.02 }, // on a hard room, how often that way parks an item

  // Feel (seconds, logical px)
  fly_time: { value: 0.32, min: 0.1, max: 0.8, step: 0.02 },   // item from pile to box or table
  jump_time: { value: 0.45, min: 0.15, max: 1, step: 0.05 },   // parked item into a new box
  flap_time: { value: 0.3, min: 0.1, max: 0.8, step: 0.05 },   // flaps fold
  tape_time: { value: 0.35, min: 0.1, max: 0.8, step: 0.05 },  // tape zips across
  slide_time: { value: 0.35, min: 0.1, max: 0.8, step: 0.05 }, // box slides out / next box slides in
  item_size: { value: 1.12, min: 0.8, max: 1.25, step: 0.02 }, // pile item scale (1 = 100 px)
  pile_sx: { value: 104, min: 90, max: 120, step: 2 },          // heap spacing across
  pile_sy: { value: 98, min: 84, max: 116, step: 2 },           // heap spacing down
};
