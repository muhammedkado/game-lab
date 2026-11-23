// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is coiling bots on a phone fun, and does a closing sandstorm make a 3-minute round build to a climax?
// Date: 2026-11-23
// Every tuning value: value, min, max, step. The game reads them live through tune.<name>.
window.CONFIG = {
  seed: 11,
  speed: { value: 170, min: 80, max: 320, step: 5 },              // px per second, every serpent
  turn_rate: { value: 4.2, min: 1.5, max: 9, step: 0.1 },         // radians per second: limited turning
  boost_mult: { value: 1.9, min: 1.2, max: 3, step: 0.05 },       // speed while sprinting
  boost_cost: { value: 5, min: 1, max: 15, step: 0.5 },           // segments per second spent while sprinting
  min_boost_len: { value: 14, min: 4, max: 40, step: 1 },         // shorter than this: no sprint
  start_len: { value: 12, min: 4, max: 40, step: 1 },             // segments at spawn (player, foragers, cowards)
  coiler_start_len: { value: 26, min: 4, max: 60, step: 1 },      // coilers start longer than you
  seg_spacing: { value: 9, min: 4, max: 16, step: 0.5 },          // px between body segments
  base_radius: { value: 13, min: 6, max: 20, step: 0.5 },         // body half-width at spawn (px)
  radius_growth: { value: 0.035, min: 0, max: 0.1, step: 0.005 }, // extra half-width per segment
  radius_max_add: { value: 15, min: 0, max: 30, step: 1 },
  max_len: { value: 600, min: 100, max: 1200, step: 50 },
  bead_count: { value: 520, min: 100, max: 1500, step: 20 },      // natural beads in the full arena
  bead_growth: { value: 0.5, min: 0.1, max: 2, step: 0.05 },      // segments from one amber bead
  big_bead_growth: { value: 1.6, min: 0.5, max: 4, step: 0.1 },   // segments from one bead of a burst serpent
  death_share: { value: 0.55, min: 0.1, max: 1, step: 0.05 },     // share of a dead serpent's length left as beads
  magnet: { value: 46, min: 0, max: 120, step: 2 },               // px around the head that pulls beads in
  calm_time: { value: 25, min: 0, max: 60, step: 1 },             // seconds of peaceful foraging
  coil_start: { value: 40, min: 0, max: 120, step: 1 },           // coilers start hunting shorter serpents
  storm_start: { value: 60, min: 0, max: 150, step: 5 },          // sandstorm starts closing
  round_time: { value: 180, min: 60, max: 300, step: 10 },
  arena_radius: { value: 1500, min: 600, max: 2500, step: 50 },   // px
  storm_end_radius: { value: 300, min: 100, max: 800, step: 10 }, // px left at 3:00
  respawn_time: { value: 3, min: 0.5, max: 10, step: 0.5 },       // bots that die before the storm return after this
  coil_range: { value: 520, min: 100, max: 1200, step: 20 },      // px a coiler looks for shorter prey
  flee_range: { value: 280, min: 80, max: 600, step: 10 },        // px a coward keeps from longer serpents
  bot_skill_min: { value: 0.55, min: 0, max: 1, step: 0.05 },     // how far ahead bots look, as a share
  bot_skill_max: { value: 0.9, min: 0, max: 1, step: 0.05 },
  zoom_start: { value: 1.2, min: 0.5, max: 1.6, step: 0.05 },     // camera scale when short
  zoom_min: { value: 0.55, min: 0.3, max: 1, step: 0.05 },        // camera scale when very long
  zoom_per_seg: { value: 0.0035, min: 0, max: 0.01, step: 0.0005 },
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },
};
