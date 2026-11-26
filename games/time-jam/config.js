// PROTOTYPE - NOT FOR PRODUCTION
// Question: Do five visibly different eras, each harder, keep the jam-and-board loop fresh for 25 levels on a phone?
// Date: 2026-11-23
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },
  music_vol: { value: 0.55, min: 0, max: 1, step: 0.05 },   // the music under the sounds (0 = no music); it follows the era and the level's difficulty
  // Boats (the sea world): how they ride the water
  boat_rock: { value: 0.02, min: 0, max: 0.08, step: 0.005 },   // a moored boat's roll, radians
  boat_bob: { value: 0.012, min: 0, max: 0.05, step: 0.002 },   // and its rise and fall, as a share of its size
  boat_swell: { value: 1.7, min: 0.2, max: 5, step: 0.1 },      // how quick the swell is
  boat_heel: { value: 0.035, min: 0, max: 0.12, step: 0.005 },  // a moving boat's heel, radians
  wake_len: { value: 0.34, min: 0, max: 1.5, step: 0.05 },       // the wake behind a moving boat, as a share of its length
  sled_sway: { value: 0.03, min: 0, max: 0.12, step: 0.005 },   // a moving sled's sway on its runners, radians
  sled_trot: { value: 0.012, min: 0, max: 0.05, step: 0.002 },  // the bob of a team (dogs, reindeer, horses) pulling it, as a share of its size
  track_len: { value: 0.55, min: 0, max: 1.5, step: 0.05 },     // the two tracks behind a moving sled, as a share of its length
  snow_flakes: { value: 44, min: 0, max: 160, step: 4 },        // flakes in the air over a snow world's lot
  snow_fall: { value: 70, min: 10, max: 300, step: 5 },         // how fast they fall, px a second
  snow_wind: { value: 14, min: -80, max: 80, step: 2 },         // and drift sideways

  // The stops and the rules (round 3: three stops, bigger vehicles, more seats)
  gates: { value: 3, min: 2, max: 5, step: 1 },          // stops along the bottom (the free extra one makes 4)
  undos: { value: 3, min: 0, max: 9, step: 1 },          // free undos per level
  hints_free: { value: 1, min: 0, max: 9, step: 1 },     // free hints per level attempt (the button shows a move that still wins)
  hint_ad: { value: 1, min: 0, max: 1, step: 1 },        // after the free ones: 1 a hint for watching an ad, 0 no more hints
  hint_nodes: { value: 120000, min: 5000, max: 400000, step: 5000 }, // how far the hint's search may look before it settles for a guess
  seats_small: { value: 4, min: 2, max: 4, step: 1 },    // seats on a small vehicle (2 cells): camel, donkey, motorbike, car, air taxi
  seats_big: { value: 8, min: 4, max: 8, step: 1 },      // seats on a big vehicle (3 cells): howdah, cart, tuk-tuk, van, air shuttle
  glow_free: { value: 1, min: 0, max: 2, step: 0.1 },      // a soft light round every vehicle that can leave right now (0: none)
  seat_style: { value: 1, min: 0, max: 1, step: 1 },     // 1: one number on each vehicle, its free seats, counting down to 0; 0: a ring per seat
  levels: { value: 200, min: 5, max: 200, step: 5 },     // levels in the game: 5 per era, 25 per season (a season is one trip through the five eras)
  // Seasons after the first deal from a later stretch of the table below: season k's 25 levels spread over
  // rows season_start[k]+1 .. 25 (the last entry serves every later season), so each season opens with a
  // breather and climbs to the hardest rows again. Their deals differ (the seed takes the level).
  season_start: [0, 5, 8, 10],

  // The 25-level ramp, one row per level (levels 1-5 camels, 6-10 donkeys, 11-15 motorbikes,
  // 16-20 taxis, 21-25 air taxis). Each row is
  //   [vehicles, colours, lot cols, lot rows, big, covered, garages, garage stock, depth lo, depth hi, traps lo, traps hi]
  // vehicles counts the garages' stock too. The dealer keeps a deal only when its chain depth and its
  // trap count (free taps after which the level can no longer be won) fall inside the row's bands.
  // Every row raises something over the row before and lowers nothing, and each band starts where
  // the one before ends, so no level can come out easier than the one before it
  // (evidence/dealer-proof.txt). Keep vehicles <= 52 (the solver's sets) and lots <= 8x10 (cells >= 71 px).
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
    // season 2 (levels 26-50): table rows 6-25, scanned offline 2026-11-25 (evidence/dealer-proof-seasons.txt)
    [30, 15, '18tlwuu'], // 26
    [70, 18, '1ix3guo'], // 27
    [24, 19, '1eat1ge'], // 28
    [11, 30, 'e2z04'], // 29
    [22, 28, 'j3hj2k'], // 30
    [10, 35, 'b22xp4'], // 31
    [9, 41, 'wse7ph'], // 32
    [17, 49, '16unoud'], // 33
    [17, 58, 'slybxl'], // 34
    [62, 58, 'zqxgri'], // 35
    [0, 65, '1b6xmaj'], // 36
    [35, 79, 'vzfka6'], // 37
    [18, 83, '2wfk99'], // 38
    [8, 90, '16bjicm'], // 39
    [74, 90, '1r6tvtk'], // 40
    [16, 104, '8vf42'], // 41
    [91, 116, '1pxyw2b'], // 42
    [17, 135, '9027re'], // 43
    [14, 145, 'a8ysvb'], // 44
    [89, 145, '45q4pf'], // 45
    [57, 145, '8mwxxa'], // 46
    [161, 159, 'xix9wm'], // 47
    [14, 169, '1q33ie6'], // 48
    [55, 199, '1ul7mq1'], // 49
    [52, 223, '1rc5s0l'], // 50
    // season 3 (levels 51-75): table rows 9-25, scanned offline 2026-11-25 (evidence/dealer-proof-seasons.txt)
    [6, 27, '1enlud6'], // 51
    [9, 37, '1nu7vtw'], // 52
    [1, 42, '1ucf52l'], // 53
    [12, 40, '1ongth5'], // 54
    [56, 48, '1o574ke'], // 55
    [16, 52, 'kg12cl'], // 56
    [38, 56, 'ffotz9'], // 57
    [0, 61, '1gmv02w'], // 58
    [31, 79, '7076a4'], // 59
    [93, 80, 'j8esed'], // 60
    [76, 81, '1ad9fyg'], // 61
    [7, 89, 'aiys1q'], // 62
    [4, 84, 'ub8c2e'], // 63
    [34, 103, '1ekgcgv'], // 64
    [147, 118, 'q8kmd3'], // 65
    [26, 118, '3352k5'], // 66
    [0, 132, '16hoqkc'], // 67
    [22, 142, 'rf7qdt'], // 68
    [19, 141, '1anhbo7'], // 69
    [232, 152, '1pzi7s6'], // 70
    [9, 154, 'z0uqkn'], // 71
    [15, 159, '1pxqx3r'], // 72
    [154, 166, '1iwrfo1'], // 73
    [73, 214, 'trjdo2'], // 74
    [136, 212, '1n6qh8v'], // 75
    // season 4 (levels 76-100): table rows 11-25, scanned offline 2026-11-25 (evidence/dealer-proof-seasons.txt)
    [4, 39, '1driol0'], // 76
    [66, 47, 'gnum7w'], // 77
    [5, 47, '1lehymn'], // 78
    [56, 55, 'gxe26j'], // 79
    [80, 58, '6biy5o'], // 80
    [15, 64, '1hddcmx'], // 81
    [7, 80, '1txd961'], // 82
    [6, 80, '1cnpgic'], // 83
    [85, 84, '50lt6g'], // 84
    [48, 84, 'ccqc4j'], // 85
    [14, 89, '2azgxp'], // 86
    [13, 104, '10hr9ne'], // 87
    [26, 92, '1bfch05'], // 88
    [10, 113, 'ac9smj'], // 89
    [26, 117, '102dn49'], // 90
    [1, 120, '1rs2ozz'], // 91
    [44, 145, '17705c4'], // 92
    [15, 136, 'a4upco'], // 93
    [13, 152, '1gdj5wk'], // 94
    [23, 152, 'qh4vin'], // 95
    [33, 154, 'gdcoir'], // 96
    [114, 169, 'n3fzbd'], // 97
    [13, 163, '8lelwn'], // 98
    [124, 194, 'pr90z9'], // 99
    [6, 256, '3f0za9'], // 100
    // season 5 (levels 101-125): table rows 11-25, scanned offline 2026-11-25 (evidence/dealer-proof-seasons.txt)
    [19, 42, '7d4dzd'], // 101
    [13, 48, 'dr1np'], // 102
    [12, 46, '15xumy4'], // 103
    [21, 58, '18425qg'], // 104
    [78, 58, 'asswwn'], // 105
    [18, 66, '7fdl2l'], // 106
    [16, 79, '1nai67a'], // 107
    [2, 66, 'uiuhn1'], // 108
    [39, 83, '1pkb79a'], // 109
    [310, 84, 'imib4g'], // 110
    [25, 84, 'yyl1x3'], // 111
    [46, 105, '6a2yjs'], // 112
    [16, 99, '1sub78x'], // 113
    [54, 115, '1tq2cx9'], // 114
    [51, 118, 'mouhvb'], // 115
    [16, 130, '1wmr6kd'], // 116
    [11, 143, '1rqelvy'], // 117
    [55, 141, '1ld4wm4'], // 118
    [43, 150, '1rrgc9c'], // 119
    [160, 152, '2v02wo'], // 120
    [9, 159, '1742vl9'], // 121
    [38, 169, '19l893t'], // 122
    [25, 161, '1o5nbdo'], // 123
    [84, 241, 'mn534q'], // 124
    [16, 247, '17ab6b7'], // 125
    // season 6 (levels 126-150): table rows 11-25, scanned offline 2026-11-25 (evidence/dealer-proof-seasons.txt)
    [4, 40, '2ut28v'], // 126
    [8, 48, '1ciln2e'], // 127
    [15, 46, '1ce8nng'], // 128
    [34, 57, 'cso0rz'], // 129
    [73, 58, 'p7lxmy'], // 130
    [15, 64, 'u85tjd'], // 131
    [0, 77, '1h9u5wz'], // 132
    [5, 78, '1paeg8w'], // 133
    [72, 84, '7irugv'], // 134
    [140, 84, '1123pbv'], // 135
    [15, 87, '18tvajd'], // 136
    [74, 103, 'ghi3gd'], // 137
    [35, 100, 'pkdx6'], // 138
    [144, 118, 'xg3lgx'], // 139
    [59, 117, 'r45kvv'], // 140
    [1, 127, 'kgzywh'], // 141
    [24, 143, '1lqyvoa'], // 142
    [74, 144, 'c7en4c'], // 143
    [87, 152, '1h4x1hg'], // 144
    [183, 151, 'knyor0'], // 145
    [0, 154, 'bs2dtn'], // 146
    [65, 170, 'lnfzyj'], // 147
    [9, 163, 'gzgfzm'], // 148
    [41, 198, 'uz5muz'], // 149
    [119, 216, '1ji6nel'], // 150
    // season 7 (levels 151-175): table rows 11-25, scanned offline 2026-11-25 (evidence/dealer-proof-seasons.txt)
    [2, 40, '1lj563i'], // 151
    [41, 50, '1kegtfw'], // 152
    [20, 43, '1rl8fdq'], // 153
    [92, 57, 'qzyvbd'], // 154
    [58, 58, '1yatpns'], // 155
    [4, 61, '16tm1gc'], // 156
    [62, 79, '19no1q7'], // 157
    [2, 68, '1pcxyll'], // 158
    [92, 84, 'kztrzq'], // 159
    [1, 84, 'rgsq94'], // 160
    [18, 88, 's05rj'], // 161
    [56, 99, '17r04fn'], // 162
    [4, 100, '15sl3pe'], // 163
    [0, 118, '15lx6sh'], // 164
    [87, 117, '19f8p32'], // 165
    [0, 127, '2kgzij'], // 166
    [37, 144, '19gnqsz'], // 167
    [1, 135, '1tfwaxf'], // 168
    [164, 150, '14etxye'], // 169
    [337, 152, '1z52wm'], // 170
    [50, 157, '16d2l4a'], // 171
    [68, 168, '14gt66x'], // 172
    [102, 168, 'stoxy3'], // 173
    [112, 217, '1by87nm'], // 174
    [226, 221, '175kmbr'], // 175
    // season 8 (levels 176-200): table rows 11-25, scanned offline 2026-11-25 (evidence/dealer-proof-seasons.txt)
    [5, 38, 'b8n66c'], // 176
    [2, 50, 'd6c8y3'], // 177
    [6, 48, 'ayga90'], // 178
    [37, 57, '1xq67ih'], // 179
    [11, 58, 'hm3kuz'], // 180
    [11, 59, '65reip'], // 181
    [14, 77, '13fq92s'], // 182
    [1, 67, '1suozgz'], // 183
    [24, 83, '1co7zkt'], // 184
    [116, 84, '1tkrx4y'], // 185
    [55, 88, 'u0ra6z'], // 186
    [80, 100, '55ad6u'], // 187
    [0, 105, '194me2g'], // 188
    [70, 117, '1e23ztf'], // 189
    [194, 118, '1spth4x'], // 190
    [16, 133, '1arpwjn'], // 191
    [3, 143, '1u10yns'], // 192
    [2, 139, '6vx0ue'], // 193
    [70, 147, 'hrfeh0'], // 194
    [14, 152, 'j8flo2'], // 195
    [9, 156, '1orcfm6'], // 196
    [111, 167, '1xjszpa'], // 197
    [60, 166, '13xq8gu'], // 198
    [114, 222, '1vnz8wo'], // 199
    [184, 233, '10wgc87'], // 200
  ],

  // Free help, honest labels, covered vehicles, queueing
  extra_gates: { value: 1, min: 0, max: 1, step: 1 },      // an extra stop offered once per attempt when stuck, for watching an ad

  // Ads (ads.js shows test cards until a real network is wired in). Chosen ads give help; the only forced ad
  // sits between levels after a win. Never after a loss, on a restart, before the win screen or a new era's opening.
  ads_on: { value: 1, min: 0, max: 1, step: 1 },               // 0 = no ads at all: the help is simply given
  ad_undos: { value: 3, min: 0, max: 9, step: 1 },             // undos given for one ad when the free ones are used up (once per attempt)
  skip_after: { value: 2, min: 0, max: 10, step: 1 },          // stuck screens on one level before "skip the level" is offered for an ad, on both stuck screens (0 = never)
  ads_first_level: { value: 3, min: 1, max: 25, step: 1 },     // no between-levels ad until this level has been won
  ads_every_wins: { value: 2, min: 1, max: 10, step: 1 },      // wins since the last ad (of any kind) before a between-levels ad
  ads_gap: { value: 150, min: 0, max: 600, step: 10 },         // seconds since the last ad (of any kind) before a between-levels ad
  ads_session_cap: { value: 6, min: 0, max: 30, step: 1 },     // most between-levels ads in one visit
  ads_test_seconds: { value: 5, min: 0.2, max: 30, step: 0.2 }, // how long a test card runs
  ads_test_skip: { value: 2, min: 0, max: 30, step: 0.5 },     // seconds before a between-levels test card can be skipped
  warn_time: { value: 2.6, min: 0.8, max: 6, step: 0.2 },  // seconds the red "صعبة جداً" banner stays before a very hard level (a tap ends it)
  reveal_time: { value: 0.4, min: 0.1, max: 1, step: 0.05 },   // seconds for a cover to slide off
  fly_gap: { value: 8, min: 0, max: 40, step: 2 },         // logical px kept between vehicles on the road

  patience: { value: 0, min: 0, max: 1, step: 1 },         // 0: a calm game, nothing is lost by taking your time; 1: the line loses patience (below)
  // The line's patience: riders get cross when nothing comes for them (one star less, never a loss)
  patience_time: { value: 16, min: 4, max: 60, step: 1 },  // seconds of waiting from calm to cross
  patience_grace: { value: 3, min: 0, max: 10, step: 0.5 }, // seconds after the last tap or boarding before patience runs down
  calm_per_board: { value: 0.06, min: 0, max: 0.3, step: 0.01 }, // how much each boarding rider calms the line

  // Sizes (logical px; the canvas is 720 x 1280)
  cell_max: { value: 112, min: 76, max: 140, step: 2 },       // largest lot cell (early levels); 8x10 lots give 71
  veh_fill: { value: 0.92, min: 0.7, max: 1, step: 0.01 },    // a sprite's length as a share of its footprint
  veh_fill_w: { value: 0.94, min: 0.6, max: 1.1, step: 0.01 },// a sprite's width as a share of a cell
  squeeze_min: { value: 0.82, min: 0.6, max: 1, step: 0.02 }, // the most a too-wide sprite is narrowed before it is drawn shorter
  bay_cell: { value: 66, min: 40, max: 72, step: 1 },         // vehicle cell size at the stops (a big one must fit its bay)
  rider_h: { value: 62, min: 40, max: 66, step: 1 },          // rider height on the way to a seat
  line_scale: { value: 1.24, min: 1, max: 1.4, step: 0.02 },   // riders standing in the line are this much bigger (one row of ten)

  // The trip to the stop (logical px, px per second, seconds)
  // trip speed to the stop, logical px per second: every era quicker than the one before
  speed_camels: { value: 560, min: 200, max: 2000, step: 10 },     // era 1: a brisk camel walk you can follow
  speed_donkeys: { value: 680, min: 200, max: 2000, step: 10 },    // era 2: donkeys trot
  speed_motorbikes: { value: 900, min: 300, max: 2500, step: 20 }, // era 3: motorbikes and tuk-tuks
  speed_taxis: { value: 1060, min: 300, max: 2500, step: 20 },     // era 4: cars and vans
  speed_air: { value: 1240, min: 300, max: 3000, step: 20 },       // era 5: air taxis
  trip_ease: { value: 0.26, min: 0.05, max: 0.5, step: 0.01 }, // share of a trip spent speeding up, and again braking
  corner_r: { value: 56, min: 10, max: 120, step: 2 },         // radius of the road's rounded corners
  river_flow: { value: 46, min: 0, max: 160, step: 2 },        // water worlds: how fast the current carries the glints (px/s)
  river_glints: { value: 44, min: 0, max: 120, step: 2 },      // and how many glints ride on the river
  approach: { value: 150, min: 80, max: 260, step: 5 },        // length of the S that swings a vehicle into its bay
  bump_time: { value: 0.32, min: 0.1, max: 0.8, step: 0.02 },  // the squash and dock bump on arrival
  bob: { value: 0.02, min: 0, max: 0.15, step: 0.005 },         // how much a walking animal bobs (scale)
  sway: { value: 0.035, min: 0, max: 0.25, step: 0.005 },        // how far a walking animal's body swings side to side (radians)
  stride: { value: 68, min: 10, max: 120, step: 1 },             // logical px walked per half step (shorter = quicker steps)
  drive_bounce: { value: 0.025, min: 0, max: 0.08, step: 0.005 }, // a road vehicle's suspension bounce (scale) under way
  drive_roll: { value: 0.05, min: 0, max: 0.2, step: 0.005 },     // a road vehicle's body roll side to side (radians)
  rumble: { value: 1.6, min: 0, max: 5, step: 0.1 },              // engine rumble shake (logical px)
  streak_len: { value: 0, min: 0, max: 1.2, step: 0.05 },      // speed streaks behind a moving vehicle (share of its length)
  road_scale: { value: 0.9, min: 0.4, max: 1.2, step: 0.05 },    // a vehicle's size on the road, as a share of its lot size
  dock_shrink: { value: 140, min: 20, max: 400, step: 10 },     // logical px before the stop over which it shrinks to the bay size
  fx: { value: 1.2, min: 0, max: 3, step: 0.1 },                // strength of dust, exhaust smoke and rotor wash
  leg_swing: { value: 0.07, min: 0, max: 0.12, step: 0.005 },  // how far each hind leg steps along the body (share of its length)
  neck_swing: { value: 0.17, min: 0, max: 0.35, step: 0.01 },   // how far the head and neck swing side to side (radians)
  step_vol: { value: 1, min: 0, max: 2, step: 0.05 },           // loudness of the animals' footfalls
  step_gap: { value: 0.07, min: 0, max: 0.3, step: 0.01 },       // shortest gap between two footfall sounds (s), so a crowd stays a rhythm
  coin_vol: { value: 1, min: 0, max: 2, step: 0.05 },           // loudness of the coin as each rider pays, and the till when a vehicle is full
  voice_vol: { value: 0.45, min: 0, max: 1.5, step: 0.05 },      // loudness of the camels' groans and the donkeys' brays
  voice_gap: { value: 2.5, min: 0.5, max: 10, step: 0.5 },       // shortest gap between two animal calls (s), so they stay a treat
  print_life: { value: 2.6, min: 0, max: 6, step: 0.1 },        // seconds a hoofprint stays in the ground
  hover_alt: { value: 0.14, min: 0, max: 0.4, step: 0.02 },    // how high a gliding air taxi hovers (scale and shadow)
  roll_time: { value: 0.45, min: 0.1, max: 1.2, step: 0.05 },  // a garage vehicle rolling out onto its strip

  // Boarding and leaving
  board_interval: { value: 0.12, min: 0.04, max: 0.5, step: 0.01 }, // gap between riders leaving the line, one at a time (the first of a run)
  board_accel: { value: 0.86, min: 0.6, max: 1, step: 0.01 },       // each next rider of a run leaves this much sooner (1: a steady pace)
  board_min: { value: 0.045, min: 0.02, max: 0.3, step: 0.005 },    // but never closer together than this
  board_flight: { value: 0.24, min: 0.08, max: 0.8, step: 0.02 },   // a rider's jump from the kerb down into its seat
  hop_h: { value: 70, min: 0, max: 200, step: 5 },                  // how high that jump arcs
  // Riders in motion (round 4): they walk up the line, run along the kerb to their vehicle and jump in
  run_speed: { value: 1150, min: 300, max: 3000, step: 50 },        // a boarding rider's run along the kerb, logical px per second
  run_stride: { value: 17, min: 6, max: 60, step: 1 },              // logical px per running step (shorter = quicker legs)
  run_lane: { value: 18, min: 0, max: 40, step: 1 },                // how far in front of the line the runners pass (logical px below its feet)
  rider_stride: { value: 13, min: 4, max: 40, step: 1 },            // logical px per step when the line walks forward
  fidget_every: { value: 4.5, min: 1, max: 20, step: 0.5 },         // about how often a waiting rider shuffles its feet (s)
  cheer_time: { value: 0.5, min: 0.2, max: 1.5, step: 0.05 },       // a rider's jump for joy when a vehicle in its colour pulls in
  cheer_riders: { value: 6, min: 0, max: 24, step: 1 },             // how many riders in that colour jump
  scene_fade: { value: 0.22, min: 0, max: 1, step: 0.02 },          // a new screen fades in from the dark (s)
  panel_pop: { value: 0.26, min: 0.02, max: 1, step: 0.02 },        // a panel over the lot (results, stuck) pops in (s)
  squash: { value: 0.06, min: 0, max: 0.2, step: 0.01 },            // how much each landing rider squashes the vehicle
  combo_window: { value: 2, min: 0.5, max: 5, step: 0.1 },          // full vehicles this close together build a combo ("رائع!", "ممتاز!")
  depart_delay: { value: 0.06, min: 0, max: 1, step: 0.02 },        // pause before a full vehicle celebrates
  celebrate_time: { value: 0.22, min: 0, max: 1, step: 0.02 },      // its bounce of joy before it drives off
  leave_boost: { value: 1.15, min: 0.5, max: 2.5, step: 0.05 },   // a full ground vehicle leaves this much quicker than its era's trip speed
  spin_time: { value: 0.2, min: 0.05, max: 1, step: 0.05 },         // air taxi rotors spinning up before lift-off
  rise_time: { value: 0.35, min: 0.1, max: 1.5, step: 0.05 },       // the air taxi's rise at its stop
  fly_speed: { value: 1000, min: 300, max: 2500, step: 50 },        // a full air taxi climbing away
  queue_ease: { value: 12, min: 3, max: 30, step: 1 },              // how fast the line shuffles forward
  unlock_time: { value: 1.4, min: 0.4, max: 3, step: 0.1 },         // the new era's vehicle arriving on the "انتقلت إلى" screen
};
