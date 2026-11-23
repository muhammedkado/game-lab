// PROTOTYPE - NOT FOR PRODUCTION
// Question: Do ten original trick riddles, each with a different kind of trick, feel clever rather than cheap, with free timed hints instead of ads?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Help (free, costs only time) ----
  hintDelay: { value: 20, min: 0, max: 120, step: 1 },     // seconds into a riddle before the first hint opens
  hint2Delay: { value: 20, min: 0, max: 120, step: 1 },    // seconds after the first hint before the second opens

  // ---- Feel ----
  dragStart: { value: 12, min: 2, max: 40, step: 1 },      // logical px a finger moves before a press becomes a drag
  dropReach: { value: 95, min: 40, max: 200, step: 5 },    // logical px: how near a drop must land to its target
  snapBack: { value: 0.25, min: 0.05, max: 1, step: 0.05 },// share of the way home a dropped thing moves each step
  shakeTime: { value: 0.35, min: 0.1, max: 1, step: 0.05 },// seconds a wrong tap shakes
  msgTime: { value: 2.4, min: 0.8, max: 6, step: 0.1 },    // seconds a kind word stays
  nextDelay: { value: 0.7, min: 0, max: 3, step: 0.1 },    // seconds after the tick before Next opens
  boil: { value: 0.13, min: 0.05, max: 0.5, step: 0.01 },  // seconds per boiling-line frame
  jitter: { value: 1.5, min: 0, max: 4, step: 0.1 },       // logical px each ink point wobbles

  // ---- Riddle numbers ----
  eggWait: { value: 9, min: 3, max: 30, step: 0.5 },       // seconds untouched before the chick hatches (riddle 4)
  meltTime: { value: 1.2, min: 0.3, max: 4, step: 0.1 },   // seconds the ice takes to melt by the flame (riddle 10)
};
