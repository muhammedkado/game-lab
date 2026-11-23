// PROTOTYPE - NOT FOR PRODUCTION
// Question: Is the risk of a long loop versus a safe short one exciting on a phone against five readable bots?
// Date: 2026-11-23
// Every tuning value: value, min, max, step. The game reads them live through tune.<name>.
window.CONFIG = {
  seed: 7,
  speed: { value: 8.5, min: 4, max: 14, step: 0.5 },            // cells per second, every rider (constant)
  turn_rate: { value: 7.5, min: 2, max: 16, step: 0.5 },        // radians per second: how fast a rider swings to the stick
  stick_radius: { value: 80, min: 40, max: 160, step: 5 },      // logical px: how far the drawn stick base trails the finger
  round_short: { value: 120, min: 60, max: 240, step: 10 },     // the title's three round lengths (s): short chip
  round_time: { value: 180, min: 60, max: 300, step: 10 },      // middle chip, picked on a first visit
  round_long: { value: 300, min: 120, max: 600, step: 10 },     // long chip
  win_percent: { value: 50, min: 20, max: 80, step: 1 },        // reaching this share ends the round at once
  oasis_bonus: { value: 2.5, min: 0, max: 6, step: 0.5 },       // percent added for each oasis whose pool you own
  safe_time: { value: 20, min: 0, max: 60, step: 1 },           // seconds the bots stay small and in their corners
  safe_radius: { value: 15, min: 8, max: 40, step: 1 },         // cells from its camp a bot may roam while safe
  hunt_start_min: { value: 30, min: 0, max: 120, step: 1 },     // the hunter wakes between these two times (s)
  hunt_start_max: { value: 45, min: 0, max: 150, step: 1 },
  hunt_trail: { value: 25, min: 5, max: 80, step: 1 },          // cells of trail that draw the hunter
  hunt_range: { value: 45, min: 10, max: 120, step: 5 },        // cells: how far the hunter looks for prey
  hunt_time: { value: 9, min: 2, max: 20, step: 1 },            // seconds one chase lasts before it gives up
  // R1: bots by perception, not speed. Each temperament is a set of chances (rolled once per enemy, per
  // outing): notice an enemy near you or your trail (then defend: go home), notice a long trail,
  // and commit to an attack race it can win.
  look_time: { value: 0.3, min: 0.1, max: 1, step: 0.05 },      // seconds between a bot's looks around
  greedy_see_enemy: { value: 0.35, min: 0, max: 1, step: 0.05 },
  hunter_see_enemy: { value: 0.6, min: 0, max: 1, step: 0.05 },
  cautious_see_enemy: { value: 0.9, min: 0, max: 1, step: 0.05 },
  greedy_see_trail: { value: 0.35, min: 0, max: 1, step: 0.05 },
  hunter_see_trail: { value: 0.9, min: 0, max: 1, step: 0.05 },
  cautious_see_trail: { value: 0.25, min: 0, max: 1, step: 0.05 },
  greedy_attack: { value: 0.4, min: 0, max: 1, step: 0.05 },
  hunter_attack: { value: 0.9, min: 0, max: 1, step: 0.05 },
  cautious_attack: { value: 0.15, min: 0, max: 1, step: 0.05 },
  attack_after: { value: 50, min: 0, max: 180, step: 5 },       // greedy and cautious bots attack only after this (s)
  attack_range: { value: 22, min: 5, max: 80, step: 1 },        // cells they look for long trails (the hunter: hunt_range)
  race_margin: { value: 0.9, min: 0.3, max: 2, step: 0.05 },    // attack only when its time to the trail <= owner's time home x this
  // R2: fair adaptive bots. Skill n of 5 scales every chance above; from the round after the grace
  // rounds, the last results nudge it one step (then a fresh window of results is needed).
  skill_start: { value: 3, min: 1, max: 5, step: 1 },
  skill_min: { value: 1, min: 1, max: 5, step: 1 },
  skill_max: { value: 5, min: 1, max: 5, step: 1 },
  skill_step: { value: 0.2, min: 0, max: 0.5, step: 0.05 },     // each skill step moves every chance by this share
  grace_rounds: { value: 3, min: 0, max: 10, step: 1 },         // finished rounds before the first nudge
  skill_lookback: { value: 3, min: 1, max: 6, step: 1 },        // results read for a nudge
  hard_skill: { value: 4, min: 1, max: 5, step: 1 },            // S2: from this skill the round card says "صعبة"
  respawn_time: { value: 3, min: 0.5, max: 10, step: 0.5 },     // seconds before a cut-down bot returns
  bot_speed: { value: 1, min: 0.6, max: 1.3, step: 0.05 },      // bots' speed as a share of the player's
  greedy_loop: { value: 22, min: 8, max: 40, step: 1 },         // longest leg of a greedy bot's loop (cells)
  hunter_loop: { value: 12, min: 4, max: 30, step: 1 },
  cautious_loop: { value: 8, min: 3, max: 20, step: 1 },
  greedy_flee: { value: 5, min: 0, max: 20, step: 1 },          // cells: an enemy this close sends the bot home
  hunter_flee: { value: 9, min: 0, max: 20, step: 1 },
  cautious_flee: { value: 13, min: 0, max: 25, step: 1 },
  greedy_trail: { value: 110, min: 20, max: 200, step: 5 },     // trail length that sends the bot home anyway
  hunter_trail: { value: 45, min: 10, max: 120, step: 5 },
  cautious_trail: { value: 30, min: 8, max: 80, step: 2 },
  unroll_step: { value: 0.05, min: 0.01, max: 0.2, step: 0.01 }, // seconds per cell ring of the rug unroll
  camp_radius: { value: 2, min: 1, max: 4, step: 1 },           // camp is (2r+1) cells square
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },
};
