// 90-day training plan split into 3 stages of 30 days.
// Each day has a warmup routine; stages have weekly themes.

export type TrainingDay = {
  day: number;
  stage: 1 | 2 | 3;
  title: string;
  tasks: string[]; // task descriptions
  xp: number;
};

export type TrainingStage = {
  num: 1 | 2 | 3;
  name: string;
  range: string;
  color: string;
  focus: string;
  skin: string; // unlockable reward
};

export const STAGES: TrainingStage[] = [
  { num: 1, name: "SILVER PROTOCOL",      range: "Days 1–30",  color: "#888",    focus: "Fundamentals · warmup habit · aim foundation",   skin: "USP | Cortex (trainee)" },
  { num: 2, name: "NOVA PROTOCOL",        range: "Days 31–60", color: "#F5A623", focus: "Tactics · utility · gamesense · map reads",       skin: "AK-47 | Redline" },
  { num: 3, name: "ELITE PROTOCOL",       range: "Days 61–90", color: "#D0021B", focus: "Competitive · IGL pods · solo queue domination",  skin: "AWP | Asiimov" },
];

const COMMON_WARMUP = [
  "Aim Botz: 500 one-taps at head level (~10 min)",
  "Recoil Master: AK + M4 spray control, 3 mags each (~5 min)",
  "Pre-aim routine: 5 common angles on your main map (~5 min)",
];

function mkDay(day: number, stage: 1 | 2 | 3, title: string, tasks: string[], xp = 100): TrainingDay {
  return { day, stage, title, tasks, xp };
}

export const TRAINING_DAYS: TrainingDay[] = [
  // ─── STAGE 1: SILVER PROTOCOL (Days 1-30) ───
  mkDay(1,  1, "The first lap",              [...COMMON_WARMUP, "Play 1 unranked match. No pressure."]),
  mkDay(2,  1, "Build the habit",            [...COMMON_WARMUP, "Play 1 match. Write 1 mistake after."]),
  mkDay(3,  1, "Aim isolation",              ["Aim Botz: 1000 one-taps at head level", "Fast Aim: random humans, 10 min", "Play 1 DM, focus on crosshair placement"]),
  mkDay(4,  1, "Crosshair placement drill",  [...COMMON_WARMUP, "DM for 20 min: pre-aim every corner, don't look at the floor"]),
  mkDay(5,  1, "Spray theory",               [...COMMON_WARMUP, "Recoil Master: AK to 90% accuracy on 10/10 mags"]),
  mkDay(6,  1, "Burst fire drill",           [...COMMON_WARMUP, "Deathmatch: 3-5 bullet bursts only, no full sprays"]),
  mkDay(7,  1, "Rest or active recovery",    ["20-min warmup only", "Watch 1 HLTV demo of a pro on your rank map"]),

  mkDay(8,  1, "Counter-strafe drill",       [...COMMON_WARMUP, "Practice stop-and-shoot on bots: A-D-A pattern × 100"]),
  mkDay(9,  1, "Peek types (wide)",          [...COMMON_WARMUP, "Retakes server: 5 rounds focused on wide swings"]),
  mkDay(10, 1, "Peek types (jiggle)",        [...COMMON_WARMUP, "DM: jiggle-peek every corner before committing"]),
  mkDay(11, 1, "First rifle round drill",    [...COMMON_WARMUP, "Play 1 match, focus on winning pistol AND first gun round"]),
  mkDay(12, 1, "Map: master 1 map fully",    ["Pick one Active Duty map. Learn all callouts using this playbook.", "DM 20 min on that map only"]),
  mkDay(13, 1, "Demo review",                ["Watch your own demo from yesterday. Note 3 positioning mistakes."]),
  mkDay(14, 1, "Rest / movement drill",      ["KZ server: 1 easy map to practice strafing/bhop"]),

  mkDay(15, 1, "AWP fundamentals",           [...COMMON_WARMUP, "No-scope bots: 100 kills. Quick-scope: 100 kills"]),
  mkDay(16, 1, "Pistol round",               [...COMMON_WARMUP, "Glock/USP only DM for 20 min. Headshots only."]),
  mkDay(17, 1, "Smoke theory",               ["Learn 5 essential smokes for your main map (YouTube tutorial)", "Practice in offline server × 10 each"]),
  mkDay(18, 1, "Flash theory",               ["Learn 3 pop-flashes for your main map", "Practice in offline server until consistent"]),
  mkDay(19, 1, "Utility line-ups solo",      [...COMMON_WARMUP, "MM: use at least 1 learned utility every round"]),
  mkDay(20, 1, "Econ awareness",             [...COMMON_WARMUP, "Play 1 match. Explicitly call buys with team."]),
  mkDay(21, 1, "Rest / VOD review",          ["Watch 1 pro match on your main map. Focus on rotations."]),

  mkDay(22, 1, "Clutch practice",            [...COMMON_WARMUP, "Retakes server: 10 rounds. Survive = count."]),
  mkDay(23, 1, "1v1 server",                 [...COMMON_WARMUP, "1v1 arena: 30 duels. Track win-rate."]),
  mkDay(24, 1, "Movement refresh",           ["Surf map: 20 min", "DM with emphasis on bunny-hopping corners"]),
  mkDay(25, 1, "Scrim or stack",             [...COMMON_WARMUP, "Play 1 match with a premade duo/trio"]),
  mkDay(26, 1, "Analyze week",               ["Review all wins/losses this week", "Identify your worst map — practice it tomorrow"]),
  mkDay(27, 1, "Weakest map drill",          [...COMMON_WARMUP, "DM + 1 MM on your weakest map only"]),
  mkDay(28, 1, "Wide-peek day",              [...COMMON_WARMUP, "Match: take 10 wide peeks with purpose, note results"]),
  mkDay(29, 1, "Rest",                       ["Active rest. Hydrate. Sleep 8+ hours."]),
  mkDay(30, 1, "STAGE 1 FINALE · promo",     ["Play 2 matches. Evaluate rank change. Celebrate — you made it 30 days."], 300),

  // ─── STAGE 2: NOVA PROTOCOL (Days 31-60) ───
  mkDay(31, 2, "Role selection",             [...COMMON_WARMUP, "Pick your primary role: entry, AWP, support, lurker, IGL", "Play 1 match committed to that role"]),
  mkDay(32, 2, "Entry fragger day",          [...COMMON_WARMUP, "Match as entry: take first duels on T-side"]),
  mkDay(33, 2, "Support utility day",        [...COMMON_WARMUP, "Match as support: throw utility for teammates, not yourself"]),
  mkDay(34, 2, "Lurker mindset",             [...COMMON_WARMUP, "Match lurking: time your flank for bomb plant"]),
  mkDay(35, 2, "AWP positioning",            [...COMMON_WARMUP, "Retakes as AWP-only. Focus on angle holds."]),
  mkDay(36, 2, "IGL mini-day",               [...COMMON_WARMUP, "Match: call at least 1 strat per round, even solo queue"]),
  mkDay(37, 2, "Rest / tactics study",       ["Watch 1 pro match. Note 3 T-side strats your team could copy."]),

  mkDay(38, 2, "Smoke execution A",          ["Learn 3 NEW smokes for A on your main map", "DM + 1 match, use them"]),
  mkDay(39, 2, "Smoke execution B",          ["Learn 3 NEW smokes for B on your main map", "DM + 1 match, use them"]),
  mkDay(40, 2, "Flash setups",               ["Learn 5 pop-flashes across your main map", "Offline practice × 10 each"]),
  mkDay(41, 2, "Molotov lineups",            ["Learn 4 molly/incendiary lineups for post-plant", "Offline practice"]),
  mkDay(42, 2, "HE damage",                  ["Learn 3 HE-damage lineups for common hiding spots", "Offline practice"]),
  mkDay(43, 2, "Full utility round",         [...COMMON_WARMUP, "Match: every round has at least 3 utility throws"]),
  mkDay(44, 2, "Rest / mental",              ["Take the tilt test on this site. Adjust based on result."]),

  mkDay(45, 2, "Mid-control map",            [...COMMON_WARMUP, "Focus on mid control. Don't execute — own middle first."]),
  mkDay(46, 2, "Default rounds",             [...COMMON_WARMUP, "Match: play slow defaults, plant with 35+ seconds"]),
  mkDay(47, 2, "Fast executes",              [...COMMON_WARMUP, "Match: force 5 fast executes — get in fast, commit"]),
  mkDay(48, 2, "Retake drills",              ["Retakes server: 15 rounds", "Practice post-plant utility coordination"]),
  mkDay(49, 2, "2v4 clutch scenarios",       ["Retakes: practice 2v4 setups", "Focus on trading"]),
  mkDay(50, 2, "Economic warfare",           [...COMMON_WARMUP, "Match: force-buy 2 rounds when low. Gauge outcomes."]),
  mkDay(51, 2, "Rest / highlight scroll",    ["Scroll CS highlights for 15 min. Note 3 ideas to try."]),

  mkDay(52, 2, "Fake execute drill",         [...COMMON_WARMUP, "Match: fake-execute at least once per half"]),
  mkDay(53, 2, "Trade kill positioning",     [...COMMON_WARMUP, "Match: every entry should have a trade 2m away"]),
  mkDay(54, 2, "Info calling drill",         [...COMMON_WARMUP, "Match: call information every 10 seconds, calm voice"]),
  mkDay(55, 2, "Multi-role day",             [...COMMON_WARMUP, "Match: play 2 different roles. Note which feels right."]),
  mkDay(56, 2, "Rank-up match",              ["Warmup 30 min min.", "Play 1 ranked/MM match at full focus"]),
  mkDay(57, 2, "VOD of YOU",                 ["Record your own POV. Watch it tomorrow."]),
  mkDay(58, 2, "Your VOD review",            ["Watch yesterday's VOD. Write 5 specific mistakes."]),
  mkDay(59, 2, "Apply mistakes",             [...COMMON_WARMUP, "Match: consciously fix the 5 mistakes from yesterday"]),
  mkDay(60, 2, "STAGE 2 FINALE · promo",     ["Play 2 matches. Evaluate rank. You've doubled your commitment — respect."], 300),

  // ─── STAGE 3: ELITE PROTOCOL (Days 61-90) ───
  mkDay(61, 3, "Competitive commitment",     [...COMMON_WARMUP, "Find a team or stable duo. Commit 1 scrim this week."]),
  mkDay(62, 3, "IGL fundamentals",           ["Watch a video on IGLing (gla1ve, b1t3r, FalleN)", "Play 1 match as caller"]),
  mkDay(63, 3, "Opening strat library",      ["Learn 3 T-side opening strats per map (your mains)", "Test 1 in scrim/match"]),
  mkDay(64, 3, "Anti-strat day",             ["Read opponent tendencies in-round", "Adjust CT setup mid-match"]),
  mkDay(65, 3, "Default evolution",          [...COMMON_WARMUP, "Match: play default, but shift positions R3/R7/R11"]),
  mkDay(66, 3, "Timeouts & pauses",          ["Learn when to call tactical pauses", "Use 1 in next scrim"]),
  mkDay(67, 3, "Rest / theory",              ["Read 1 CS strategy article (HLTV long-form)"]),

  mkDay(68, 3, "Solo queue grind",           ["Full 30-min warmup", "Play 2 MM matches, full effort"]),
  mkDay(69, 3, "Solo queue grind",           ["Full 30-min warmup", "Play 2 MM matches, full effort"]),
  mkDay(70, 3, "Demo of your best match",    ["Review your best match demo", "Extract 3 repeatable patterns"]),
  mkDay(71, 3, "Demo of your worst match",   ["Review your worst match demo", "Identify the exact round it tilted"]),
  mkDay(72, 3, "Tilt management drill",      ["Full warmup", "Match: if you lose 3 rounds in a row, force a 30s breath break"]),
  mkDay(73, 3, "Communication audit",        [...COMMON_WARMUP, "Record your voice in a match. Listen back. Cringe. Improve."]),
  mkDay(74, 3, "Rest / physical",            ["Stretch wrists, neck, back. Drink water. Sleep."]),

  mkDay(75, 3, "New map drill",              [...COMMON_WARMUP, "Play 1 match on your LEAST played map. Embrace the loss."]),
  mkDay(76, 3, "Anti-eco mastery",           ["Retakes: 10 rounds anti-eco mindset", "Focus on survival, not kills"]),
  mkDay(77, 3, "Fast exec timing",           [...COMMON_WARMUP, "Match: time every fast execute against a stopwatch — under 15s"]),
  mkDay(78, 3, "Mid-round calling",          [...COMMON_WARMUP, "Match as IGL: make 3+ mid-round adjustments per half"]),
  mkDay(79, 3, "Clutch focus",               [...COMMON_WARMUP, "Retakes: explicitly practice 1vX clutches"]),
  mkDay(80, 3, "Tournament warmup sim",      ["90-min full warmup like a pro match day", "2 back-to-back MM matches"]),
  mkDay(81, 3, "Rest",                       ["Sleep 10 hours. Zero CS."]),

  mkDay(82, 3, "Mock LAN day 1",             ["Treat next 3 days as a LAN tournament", "No solo queue, only scrims/FACEIT"]),
  mkDay(83, 3, "Mock LAN day 2",             ["Continue LAN simulation", "Focus: win the one match that matters"]),
  mkDay(84, 3, "Mock LAN finale",            ["Final mock-LAN match. Give 100%."]),
  mkDay(85, 3, "Decompression",              ["Watch pros play. Chill. Eat good."]),
  mkDay(86, 3, "Skill audit",                ["Compare Day 1 you vs Day 86 you", "Update goals for next cycle"]),
  mkDay(87, 3, "Teach someone",              ["Teach a Silver something you learned", "Teaching solidifies knowledge."]),
  mkDay(88, 3, "Content creation",           ["Clip 3 of your best moments. Post somewhere. Own your identity as a player."]),
  mkDay(89, 3, "Pre-graduation",             [...COMMON_WARMUP, "1 final match, full focus. Graduation is tomorrow."]),
  mkDay(90, 3, "GRADUATION · you made it",   ["You just did 90 days of disciplined CS work.", "The skin is yours. Go take someone's lunch money in MM.", "Restart the cycle if you want. You know how now."], 500),
];
