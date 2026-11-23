// PROTOTYPE - NOT FOR PRODUCTION
// Question: Do five visibly different eras, each harder, keep the jam-and-board loop fresh for 25 levels on a phone?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // The stops and the rules (round 3: three stops, bigger vehicles, more seats)
  gates: { value: 3, min: 2, max: 5, step: 1 },          // stops along the bottom (the free extra one makes 4)
  undos: { value: 3, min: 0, max: 9, step: 1 },          // free undos per level
  seats_small: { value: 4, min: 2, max: 4, step: 1 },    // seats on a small vehicle (2 cells): camel, donkey, motorbike, car, air taxi
  seats_big: { value: 8, min: 4, max: 8, step: 1 },      // seats on a big vehicle (3 cells): howdah, cart, tuk-tuk, van, air shuttle
  levels: { value: 25, min: 5, max: 25, step: 5 },       // levels in the game, 5 per era

  // The 25-level ramp, one row per level (levels 1-5 camels, 6-10 donkeys, 11-15 motorbikes,
  // 16-20 taxis, 21-25 air taxis). Each row is
  //   [vehicles, colours, lot cols, lot rows, big, covered, garages, garage stock, depth lo, depth hi, traps lo, traps hi]
  // vehicles counts the garages' stock too. The dealer keeps a deal only when its chain depth and its
  // trap count (free taps after which the level can no longer be won) fall inside the row's bands.
  // Every row raises something over the row before and lowers nothing, and each band starts where
  // the one before ends, so no level can come out easier than the one before it
  // (evidence/dealer-proof.txt). Keep vehicles <= 52 (the solver's sets) and lots <= 8x10 (cells >= 76 px).
  level_table: [
    [6, 2, 4, 5, 0, 0, 0, 0, 1, 1, 0, 0],         // 1  camels: every lane clear, one tap fills one camel
    [7, 2, 4, 5, 0, 0, 0, 0, 2, 2, 1, 3],         // 2  صعبة: one camel blocks another, three stops only
    [8, 3, 5, 5, 1, 0, 0, 0, 2, 2, 3, 6],         // 3  the howdah camel: 3 cells, 8 riders; a third colour
    [9, 3, 5, 6, 1, 0, 0, 0, 2, 2, 6, 10],        // 4  صعبة
    [10, 3, 5, 6, 2, 0, 0, 0, 2, 3, 10, 14],      // 5  صعبة جداً
    [11, 3, 6, 6, 2, 0, 0, 0, 3, 3, 14, 16],      // 6  donkeys and carts
    [12, 3, 6, 6, 3, 0, 0, 0, 3, 3, 16, 18],      // 7  صعبة
    [13, 3, 6, 7, 3, 2, 0, 0, 3, 3, 18, 20],      // 8  covered donkeys arrive
    [14, 4, 6, 7, 3, 2, 0, 0, 3, 3, 20, 30],      // 9  صعبة, a fourth colour
    [15, 4, 6, 8, 4, 3, 0, 0, 3, 4, 30, 38],      // 10 صعبة جداً
    [17, 4, 6, 8, 4, 3, 1, 3, 4, 5, 38, 42],      // 11 motorbikes: the first garage
    [19, 4, 7, 8, 4, 3, 1, 4, 5, 5, 42, 50],      // 12 صعبة
    [21, 4, 7, 8, 5, 4, 2, 5, 5, 5, 50, 58],      // 13 two garages
    [23, 4, 7, 9, 5, 4, 2, 6, 5, 5, 58, 66],      // 14 صعبة
    [25, 4, 7, 9, 6, 4, 2, 7, 5, 5, 66, 80],      // 15 صعبة جداً
    [26, 4, 7, 10, 6, 5, 3, 8, 5, 5, 80, 84],     // 16 taxis: three garages
    [27, 4, 8, 10, 6, 5, 3, 9, 5, 5, 84, 90],     // 17 صعبة
    [29, 5, 8, 10, 7, 5, 3, 10, 5, 5, 90, 105],   // 18 a fifth colour
    [30, 5, 8, 10, 7, 6, 3, 10, 5, 5, 105, 118],  // 19 صعبة
    [31, 5, 8, 10, 8, 6, 4, 11, 5, 5, 118, 135],  // 20 صعبة جداً
    [32, 5, 8, 10, 8, 6, 4, 12, 5, 5, 135, 145],  // 21 air taxis
    [33, 5, 8, 10, 8, 7, 4, 12, 5, 5, 145, 152],  // 22 صعبة
    [34, 5, 8, 10, 9, 7, 4, 13, 5, 6, 152, 160],  // 23
    [35, 5, 8, 10, 9, 7, 5, 14, 6, 6, 160, 170],  // 24 صعبة
    [36, 5, 8, 10, 10, 8, 5, 15, 6, 99, 170, 999],// 25 صعبة جداً, the last
  ],

  // Each era's five levels by tier: 0 plain, 1 "صعبة" (levels 2 and 4), 2 "صعبة جداً" (level 5, a red banner first).
  tiers: [0, 1, 0, 1, 2],
  hard_candidates: { value: 4, min: 1, max: 12, step: 1 },  // in-band deals compared on a "صعبة" level; the one with the most traps is kept
  super_candidates: { value: 8, min: 1, max: 20, step: 1 }, // the same for a "صعبة جداً" level
  plan_gates: { value: 2, min: 1, max: 5, step: 1 },        // stops the dealer's own winning order holds at once before tight_from
  tight_from: { value: 2, min: 2, max: 26, step: 1 },       // from this level that order holds every stop at once: wrong taps cost more
  solver_nodes: { value: 60000, min: 5000, max: 400000, step: 5000 }, // search budget per dealt level
  trap_nodes: { value: 30000, min: 5000, max: 200000, step: 5000 },   // search budget for counting one deal's traps
  deal_attempts: { value: 4000, min: 100, max: 8000, step: 100 },     // deals tried before the dealer keeps the nearest one
  // For seed 1 and the values above, per level: [the attempt where its scan ends, that deal's trap
  // count, the deal's hash] (written by the offline proof, evidence/dealer-proof.txt). Only a
  // shortcut: the game deals that attempt and, when its hash matches, takes the measured trap count
  // instead of counting again on the phone; otherwise it counts, and scans from 0 if it no longer fits.
  deal_bookmarks: [
    [5, 0, 'scf1cp'], // 1
    [10, 2, '1n1d7aw'], // 2
    [1, 6, 'uio0y9'], // 3
    [6, 10, 'ngieu1'], // 4
    [4, 14, '1iy28pv'], // 5
    [59, 14, '1qjourx'], // 6
    [6, 18, '8jsfjp'], // 7
    [11, 20, '1s88pzi'], // 8
    [16, 30, 'tebvsx'], // 9
    [9, 36, 'a32ekc'], // 10
    [1, 42, 'xjbho2'], // 11
    [41, 50, '1pej0oo'], // 12
    [17, 57, '1j6bjee'], // 13
    [55, 66, 'bl5r6'], // 14
    [38, 80, '1sp16pa'], // 15
    [6, 84, 'eeni45'], // 16
    [20, 89, '11end6z'], // 17
    [5, 101, 'kuehgf'], // 18
    [40, 118, 'iiungn'], // 19
    [40, 135, '1ojwc7b'], // 20
    [11, 140, 'o2pkc7'], // 21
    [74, 152, '8sg2fe'], // 22
    [22, 152, '1u33plj'], // 23
    [40, 163, 'bc7xar'], // 24
    [161, 200, '1564ojh'], // 25
  ],

  // Free help, honest labels, covered vehicles, queueing
  extra_gates: { value: 1, min: 0, max: 1, step: 1 },      // free extra stop offered once per level when stuck
  warn_time: { value: 2.6, min: 0.8, max: 6, step: 0.2 },  // seconds the red "صعبة جداً" banner stays before a very hard level (a tap ends it)
  reveal_time: { value: 0.4, min: 0.1, max: 1, step: 0.05 },   // seconds for a cover to slide off
  fly_gap: { value: 8, min: 0, max: 40, step: 2 },         // logical px kept between vehicles on the road

  // The line's patience: riders get cross when nothing comes for them (one star less, never a loss)
  patience_time: { value: 16, min: 4, max: 60, step: 1 },  // seconds of waiting from calm to cross
  patience_grace: { value: 3, min: 0, max: 10, step: 0.5 }, // seconds after the last tap or boarding before patience runs down
  calm_per_board: { value: 0.06, min: 0, max: 0.3, step: 0.01 }, // how much each boarding rider calms the line

  // Sizes (logical px; the canvas is 720 x 1280)
  cell_max: { value: 112, min: 76, max: 140, step: 2 },       // largest lot cell (early levels); 8x10 lots give 76
  veh_fill: { value: 0.92, min: 0.7, max: 1, step: 0.01 },    // a sprite's length as a share of its footprint
  veh_fill_w: { value: 0.94, min: 0.6, max: 1.1, step: 0.01 },// a sprite's width as a share of a cell
  squeeze_min: { value: 0.82, min: 0.6, max: 1, step: 0.02 }, // the most a too-wide sprite is narrowed before it is drawn shorter
  bay_cell: { value: 66, min: 40, max: 72, step: 1 },         // vehicle cell size at the stops (a big one must fit its bay)
  rider_h: { value: 62, min: 40, max: 66, step: 1 },          // rider height in the line

  // The trip to the stop (logical px, px per second, seconds)
  speed_walk: { value: 700, min: 300, max: 2000, step: 20 },   // camels and donkeys
  speed_drive: { value: 860, min: 300, max: 2500, step: 20 },  // motorbikes, tuk-tuks, cars and vans
  glide_speed: { value: 940, min: 300, max: 3000, step: 20 },  // air taxis
  trip_ease: { value: 0.26, min: 0.05, max: 0.5, step: 0.01 }, // share of a trip spent speeding up, and again braking
  corner_r: { value: 56, min: 10, max: 120, step: 2 },         // radius of the road's rounded corners
  approach: { value: 150, min: 80, max: 260, step: 5 },        // length of the S that swings a vehicle into its bay
  bump_time: { value: 0.32, min: 0.1, max: 0.8, step: 0.02 },  // the squash and dock bump on arrival
  bob: { value: 0.035, min: 0, max: 0.1, step: 0.005 },        // how much a walking animal bobs (scale)
  hover_alt: { value: 0.14, min: 0, max: 0.4, step: 0.02 },    // how high a gliding air taxi hovers (scale and shadow)
  roll_time: { value: 0.45, min: 0.1, max: 1.2, step: 0.05 },  // a garage vehicle rolling out onto its strip

  // Boarding and leaving
  board_interval: { value: 0.12, min: 0.04, max: 0.5, step: 0.01 }, // gap between riders hopping on, one at a time
  board_flight: { value: 0.3, min: 0.08, max: 0.8, step: 0.02 },    // a rider's hop from the line to its seat
  hop_h: { value: 70, min: 0, max: 200, step: 5 },                  // how high the hop arcs
  squash: { value: 0.06, min: 0, max: 0.2, step: 0.01 },            // how much each landing rider squashes the vehicle
  combo_window: { value: 2, min: 0.5, max: 5, step: 0.1 },          // full vehicles this close together build a combo ("رائع!", "ممتاز!")
  depart_delay: { value: 0.16, min: 0, max: 1, step: 0.02 },        // pause before a full vehicle celebrates
  celebrate_time: { value: 0.36, min: 0, max: 1, step: 0.02 },      // its bounce of joy before it drives off
  leave_speed: { value: 800, min: 300, max: 2500, step: 50 },      // a full ground vehicle driving off along the road
  spin_time: { value: 0.3, min: 0.05, max: 1, step: 0.05 },         // air taxi rotors spinning up before lift-off
  rise_time: { value: 0.45, min: 0.1, max: 1.5, step: 0.05 },       // the air taxi's rise at its stop
  fly_speed: { value: 1000, min: 300, max: 2500, step: 50 },        // a full air taxi climbing away
  queue_ease: { value: 12, min: 3, max: 30, step: 1 },              // how fast the line shuffles forward
  unlock_time: { value: 1.4, min: 0.4, max: 3, step: 0.1 },         // the new era's vehicle arriving on the "انتقلت إلى" screen
};
