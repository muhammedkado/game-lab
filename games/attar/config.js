// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is the core loop fun on a phone, and does our fairness fix answer the players' top complaint?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },
  // The ramp: scents per level (levels 1-12); flasks = scents + empties
  scents_1: { value: 2, min: 2, max: 9, step: 1 },
  scents_2: { value: 3, min: 2, max: 9, step: 1 },
  scents_3: { value: 4, min: 2, max: 9, step: 1 },
  scents_4: { value: 5, min: 2, max: 9, step: 1 },
  scents_5: { value: 5, min: 2, max: 9, step: 1 },
  scents_6: { value: 6, min: 2, max: 9, step: 1 },
  scents_7: { value: 7, min: 2, max: 9, step: 1 },
  scents_8: { value: 6, min: 2, max: 9, step: 1 },
  scents_9: { value: 7, min: 2, max: 9, step: 1 },
  scents_10: { value: 8, min: 2, max: 9, step: 1 },
  scents_11: { value: 8, min: 2, max: 9, step: 1 },
  scents_12: { value: 9, min: 2, max: 9, step: 1 },
  empties: { value: 2, min: 1, max: 4, step: 1 },          // empty flasks per level (level 1 has first_empties)
  first_empties: { value: 1, min: 1, max: 3, step: 1 },    // empty flasks on level 1
  first_par: { value: 4, min: 2, max: 8, step: 1 },        // level 1 is dealt so the best solution is this many pours
  trap_levels: { value: 4, min: 0, max: 12, step: 1 },     // levels 3..this are dealt with a proven trap (a pour that dead-ends)
  veil_from: { value: 5, min: 1, max: 13, step: 1 },       // first level with veiled layers
  narrow_from: { value: 8, min: 1, max: 13, step: 1 },     // first level with narrow 3-layer flasks
  narrow_every: { value: 3, min: 1, max: 6, step: 1 },     // narrow levels: narrow_from, then every this many levels
  capacity: { value: 4, min: 3, max: 6, step: 1 },         // layers in a flask
  narrow_capacity: { value: 3, min: 2, max: 5, step: 1 },  // layers in a narrow flask
  // Stars against the solver's par
  star2_extra: { value: 4, min: 0, max: 20, step: 1 },     // pours over par that still earn 2 stars
  // The solver
  solver_nodes: { value: 60000, min: 2000, max: 400000, step: 1000 }, // states the dealer's solver may open per deal
  hint_nodes: { value: 40000, min: 1000, max: 400000, step: 1000 },   // states the hint may open
  dead_nodes: { value: 6000, min: 500, max: 100000, step: 500 },      // states the dead-end check may open after a pour
  hint_weight: { value: 1.4, min: 1, max: 5, step: 0.1 },  // A* weight for the hint (1 = shortest path)
  // Feel
  pour_time: { value: 0.62, min: 0.2, max: 1.5, step: 0.02 }, // seconds for one pour (tilt, stream, return)
  lift_px: { value: 46, min: 10, max: 100, step: 2 },        // how high a lifted flask rises (logical px)
  tilt: { value: 1.15, min: 0.5, max: 1.6, step: 0.05 },     // pour tilt (radians)
  stopper_time: { value: 0.5, min: 0.1, max: 1.5, step: 0.05 }, // seconds the gold stopper takes to drop in
  hint_time: { value: 4, min: 1, max: 12, step: 0.5 },       // seconds the hint glow stays
};
