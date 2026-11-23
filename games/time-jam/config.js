// PROTOTYPE - NOT FOR PRODUCTION
// Question: Do five visibly different eras, each harder, keep the jam-and-board loop fresh for 25 levels on a phone?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // The stops and the rules (Sky Taxi's, unchanged)
  gates: { value: 4, min: 2, max: 6, step: 1 },          // stops along the bottom of the lot
  undos: { value: 3, min: 0, max: 9, step: 1 },          // free undos per level
  seats_small: { value: 3, min: 2, max: 3, step: 1 },    // seats on a small vehicle (1 cell): camel, donkey, motorbike, car, air taxi
  seats_big: { value: 6, min: 3, max: 6, step: 1 },      // seats on a big vehicle (2 cells): howdah, cart, tuk-tuk, van, air shuttle
  levels: { value: 25, min: 5, max: 25, step: 5 },       // levels in the game, 5 per era

  // The 25-level ramp, one row per level (levels 1-5 camels, 6-10 donkeys, 11-15 motorbikes,
  // 16-20 taxis, 21-25 air taxis). Each row is
  //   [vehicles, colours, lot cols, lot rows, big vehicles, covered, depth lo, depth hi, traps lo, traps hi]
  // The dealer keeps a deal only when its chain depth and its trap count (free taps after which the
  // level can no longer be won) fall inside the row's bands. Every row raises vehicles, colours or
  // lot size over the row before and lowers none, and each band starts where the one before ends,
  // so no level can come out easier than the one before it (evidence/dealer-proof.txt).
  // Keep vehicles <= 26 (the solver's bitmasks) and lots <= 8x8 (cells stay >= 72 px to tap).
  level_table: [
    [4, 2, 3, 4, 0, 0, 1, 1, 0, 0],             // 1  camels: every lane clear
    [5, 2, 3, 4, 0, 0, 2, 2, 0, 0],             // 2  one camel blocks another
    [6, 3, 4, 4, 0, 0, 2, 2, 0, 0],             // 3  a third colour
    [7, 3, 4, 4, 1, 0, 2, 2, 0, 0],             // 4  the first howdah camel
    [8, 3, 4, 5, 2, 0, 2, 3, 0, 2],             // 5  hard
    [9, 3, 4, 5, 2, 0, 3, 3, 2, 2],             // 6  donkeys
    [10, 3, 5, 5, 3, 0, 3, 3, 2, 2],            // 7
    [11, 3, 5, 5, 3, 2, 3, 3, 2, 2],            // 8  covered donkeys arrive
    [12, 3, 5, 6, 3, 3, 3, 3, 2, 3],            // 9
    [13, 3, 5, 6, 4, 3, 3, 3, 3, 5],            // 10  hard
    [14, 3, 6, 6, 4, 3, 3, 3, 5, 6],            // 11  motorbikes
    [14, 4, 6, 6, 4, 4, 3, 3, 6, 8],            // 12  a fourth colour
    [15, 4, 6, 7, 5, 4, 3, 3, 8, 9],            // 13
    [16, 4, 6, 7, 5, 4, 3, 3, 9, 12],           // 14
    [17, 4, 6, 7, 5, 5, 3, 4, 12, 17],          // 15  hard
    [18, 4, 7, 7, 6, 5, 4, 4, 17, 17],          // 16  taxis
    [19, 4, 7, 7, 6, 5, 4, 4, 17, 19],          // 17
    [20, 4, 7, 8, 6, 6, 4, 4, 19, 20],          // 18
    [21, 4, 7, 8, 6, 6, 4, 4, 20, 22],          // 19
    [22, 4, 7, 8, 7, 6, 4, 4, 22, 30],          // 20  hard
    [22, 5, 8, 8, 7, 6, 4, 4, 30, 36],          // 21  air taxis, a fifth colour
    [23, 5, 8, 8, 7, 7, 4, 4, 36, 40],          // 22
    [24, 5, 8, 8, 7, 7, 4, 4, 40, 45],          // 23
    [25, 5, 8, 8, 8, 8, 4, 4, 45, 54],          // 24
    [26, 5, 8, 8, 8, 8, 4, 99, 54, 999],        // 25  hard, the last
  ],
  plan_gates: { value: 3, min: 1, max: 4, step: 1 },     // stops the dealer's own winning order holds at once (higher = tighter)
  tight_from: { value: 4, min: 2, max: 26, step: 1 },    // from this level the dealer's order holds every stop at once (plan = stops): wrong taps cost more
  solver_nodes: { value: 60000, min: 5000, max: 400000, step: 5000 }, // search budget per dealt level
  deal_attempts: { value: 4000, min: 100, max: 8000, step: 100 },     // deals tried before the dealer keeps the nearest one
  // For seed 1 and the values above: the attempt where each level's scan ends (written by the
  // offline proof, evidence/dealer-proof.txt). Only a shortcut: the game re-checks that deal against
  // its bands and scans from the start if it no longer fits (another seed, a changed value).
  deal_bookmarks: [0, 0, 1, 0, 2, 190, 53, 11, 11, 70, 20, 59, 10, 1, 36, 7, 27, 0, 19, 32, 15, 21, 97, 12, 24],

  // Free help, honest labels, covered vehicles, queueing (Sky Taxi's round 2)
  extra_gates: { value: 1, min: 0, max: 1, step: 1 },      // free extra stop offered once per level when stuck
  hard_every: { value: 5, min: 2, max: 10, step: 1 },      // every Nth level is marked "صعبة": the last of each era (5, 10, 15, 20, 25)
  hard_candidates: { value: 5, min: 1, max: 12, step: 1 }, // in-band deals compared on a hard level; the one with the most traps is kept
  trap_nodes: { value: 30000, min: 5000, max: 200000, step: 5000 }, // search budget for counting one deal's traps
  reveal_time: { value: 0.4, min: 0.1, max: 1, step: 0.05 },   // seconds for a cover to slide off
  fly_gap: { value: 10, min: 0, max: 40, step: 2 },        // logical px kept between vehicles queueing on the lanes

  // Feel (seconds, logical px per second)
  speed_walk: { value: 820, min: 300, max: 2000, step: 20 },   // camels and donkeys from their cell to a stop
  speed_drive: { value: 1000, min: 300, max: 2500, step: 50 }, // motorbikes, tuk-tuks, cars and vans
  glide_speed: { value: 1150, min: 400, max: 3000, step: 50 }, // air taxis
  bob: { value: 0.035, min: 0, max: 0.1, step: 0.005 },        // how much a walking animal bobs (scale)
  hover_alt: { value: 0.14, min: 0, max: 0.4, step: 0.02 },    // how high a gliding air taxi hovers (scale and shadow)
  spin_time: { value: 0.3, min: 0.05, max: 1, step: 0.05 },    // air taxi rotors spinning up before lift-off
  rise_time: { value: 0.5, min: 0.1, max: 1.5, step: 0.05 },   // the air taxi's rise and turn at its stop
  fly_speed: { value: 950, min: 300, max: 2500, step: 50 },    // full air taxi flying off the top of the screen
  rev_time: { value: 0.22, min: 0, max: 1, step: 0.02 },       // a full ground vehicle readies (engine rev, the animal shakes) before it leaves
  leave_time: { value: 0.55, min: 0.2, max: 1.5, step: 0.05 }, // a full ground vehicle passing out through its stop
  board_interval: { value: 0.13, min: 0.04, max: 0.5, step: 0.01 }, // gap between boarding riders
  board_flight: { value: 0.26, min: 0.08, max: 0.8, step: 0.02 },   // a rider's walk to the vehicle
  depart_delay: { value: 0.2, min: 0, max: 1, step: 0.02 },         // pause before a full vehicle leaves
  cell_max: { value: 120, min: 72, max: 140, step: 2 },             // largest cell (early levels)
  bay_cell: { value: 80, min: 50, max: 84, step: 1 },               // vehicle size at the stops
  rider_h: { value: 62, min: 40, max: 66, step: 1 },                // rider height in the line
  queue_ease: { value: 12, min: 3, max: 30, step: 1 },              // how fast the line shuffles forward
  unlock_time: { value: 1.4, min: 0.4, max: 3, step: 0.1 },         // the new era's vehicle arriving on the "انتقلت إلى" screen
};
