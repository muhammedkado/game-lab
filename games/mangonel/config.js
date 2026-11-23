// PROTOTYPE - NOT FOR PRODUCTION
// Question: Does a 2D mangonel with exact aiming and three ammo kinds give the chain-reaction joy of the trend without its unfairness?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Physics world (metres, seconds) ----
  gravity: { value: 10, min: 4, max: 20, step: 0.5 },          // m/s^2, downward
  substeps: { value: 2, min: 1, max: 4, step: 1 },             // solver sub-steps per 1/60 s step
  iterations: { value: 10, min: 4, max: 20, step: 1 },         // impulse iterations per sub-step
  biasFactor: { value: 0.2, min: 0.05, max: 0.4, step: 0.01 }, // how fast overlap is pushed out (Baumgarte)
  slop: { value: 0.01, min: 0, max: 0.05, step: 0.005 },       // metres of overlap allowed before pushing
  sandDensity: { value: 2.0, min: 0.5, max: 5, step: 0.1 },    // kg per m^2 (2D)
  woodDensity: { value: 0.9, min: 0.2, max: 3, step: 0.1 },
  jarDensity: { value: 0.8, min: 0.2, max: 3, step: 0.1 },
  stoneDensity: { value: 6, min: 1, max: 15, step: 0.5 },      // stone radius 0.28 m -> about 1.5 kg
  boulderDensity: { value: 11, min: 2, max: 25, step: 0.5 },   // boulder radius 0.42 m -> about 6 kg
  fireDensity: { value: 3.5, min: 1, max: 10, step: 0.5 },     // fire pot radius 0.3 m -> about 1 kg

  // ---- Throwing ----
  minSpeed: { value: 4, min: 1, max: 10, step: 0.5 },          // m/s at 0% power
  maxSpeed: { value: 14.5, min: 8, max: 25, step: 0.5 },       // m/s at 100% power
  boulderSpeed: { value: 0.9, min: 0.5, max: 1, step: 0.05 },  // the heavy boulder leaves this much slower
  dragMax: { value: 330, min: 150, max: 600, step: 10 },       // logical px of pull for 100% power
  dragMin: { value: 40, min: 10, max: 120, step: 5 },          // a shorter pull cancels the throw
  previewTime: { value: 0.85, min: 0.2, max: 3, step: 0.05 },  // seconds of flight the dotted arc shows
  aimKeySpeed: { value: 30, min: 5, max: 90, step: 5 },        // degrees per second while Up/Down is held
  powerKeySpeed: { value: 0.5, min: 0.1, max: 2, step: 0.05 }, // power per second while Left/Right is held
  swingTime: { value: 0.13, min: 0.05, max: 0.5, step: 0.01 }, // arm swing before release, seconds
  recoverTime: { value: 0.65, min: 0.2, max: 2, step: 0.05 },  // arm return and reload, seconds

  // ---- Breaking ----
  jarBreakSpeed: { value: 3.0, min: 1, max: 8, step: 0.1 },    // m/s of impact (or a fall of about 0.45 m) breaks a jar
  woodStrength: { value: 30, min: 10, max: 80, step: 1 },      // impact speed x hitter mass that breaks wood (stone max ~24, boulder ~60+)
  sandStrength: { value: 55, min: 20, max: 150, step: 1 },     // the same for sandstone: only a hard boulder hit
  breakThrough: { value: 0.7, min: 0, max: 1, step: 0.05 },    // share of speed a hitter keeps when it smashes through
  burstRadius: { value: 2.8, min: 1, max: 5, step: 0.1 },      // metres: fire pot breaks every jar and lights every wood piece inside
  burstPush: { value: 6, min: 0, max: 15, step: 0.5 },         // m/s the burst pushes things at its centre
  burnTime: { value: 0.8, min: 0.2, max: 3, step: 0.1 },       // seconds a lit wood piece burns before it falls apart

  // ---- Settling and the end of a level ----
  settleSpeed: { value: 0.12, min: 0.02, max: 0.5, step: 0.01 }, // m/s under which a body counts as still
  settleTime: { value: 0.6, min: 0.2, max: 2, step: 0.1 },       // seconds everything must stay still
  settleCap: { value: 9, min: 3, max: 20, step: 1 },             // seconds after the last throw when it counts as settled anyway
  winDelay: { value: 1.2, min: 0, max: 3, step: 0.1 },           // seconds of debris after the last jar before the stars
  restSlowTime: { value: 1.0, min: 0.3, max: 3, step: 0.1 },     // a spent projectile resting this long is cleared away
  stoneRoll: { value: 3, min: 0, max: 10, step: 0.5 },           // rolling resistance per second for a stone on the ground
  boulderRoll: { value: 0.8, min: 0, max: 10, step: 0.1 },       // the boulder rolls far
  shake: { value: 1, min: 0, max: 3, step: 0.1 },                // screen shake strength

  // ---- Ammo per level (a good plan plus one spare) ----
  l1Stone: { value: 4, min: 1, max: 9, step: 1 },
  l2Stone: { value: 4, min: 1, max: 9, step: 1 },
  l3Stone: { value: 1, min: 0, max: 9, step: 1 },
  l3Boulder: { value: 2, min: 1, max: 9, step: 1 },
  l4Stone: { value: 1, min: 0, max: 9, step: 1 },
  l4Fire: { value: 2, min: 1, max: 9, step: 1 },
  l5Stone: { value: 3, min: 1, max: 9, step: 1 },
  l5Boulder: { value: 1, min: 1, max: 9, step: 1 },
  l5Fire: { value: 1, min: 1, max: 9, step: 1 },
};
