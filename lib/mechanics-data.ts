// Spray patterns — simplified, recognizable shape of the first 30 bullets.
// Coordinates are (offset from aim point) in abstract units.
// Real patterns are similar in shape but this captures the characteristic "snake then swing" motion.

export type SprayWeapon = {
  id: string;
  name: string;
  color: string;
  bullets: number;
  rpm: number;
  pattern: [number, number][]; // [x, y] per bullet, y+ = kick up
  desc: string;
};

export const SPRAY_PATTERNS: SprayWeapon[] = [
  {
    id: "ak47",
    name: "AK-47",
    color: "#8b4513",
    bullets: 30,
    rpm: 600,
    desc: "Straight up for ~7 bullets, then right-left-right snake. Hardest to master, most rewarding.",
    pattern: [
      [0, 0], [0, 12], [0, 28], [0, 45], [0, 65], [0, 85], [2, 105],
      [-5, 120], [-15, 135], [-25, 148], [-32, 155], [-25, 160], [-10, 163],
      [5, 165], [22, 168], [35, 170], [42, 170], [30, 172], [15, 175],
      [-5, 177], [-25, 178], [-38, 180], [-28, 182], [-10, 184], [12, 185],
      [30, 186], [40, 187], [25, 188], [5, 189], [-15, 190],
    ],
  },
  {
    id: "m4a4",
    name: "M4A4",
    color: "#2a4d5c",
    bullets: 30,
    rpm: 666,
    desc: "Similar to AK but tamer. Straight up for ~10, gentler horizontal snake. Forgiving.",
    pattern: [
      [0, 0], [0, 10], [0, 22], [0, 35], [0, 50], [0, 65], [0, 80], [1, 95], [-2, 108], [-6, 120],
      [-14, 130], [-22, 138], [-18, 145], [-8, 150], [4, 155],
      [18, 158], [28, 162], [20, 166], [8, 170], [-6, 173],
      [-20, 176], [-28, 178], [-18, 180], [-4, 182], [12, 184],
      [26, 186], [32, 187], [20, 188], [5, 189], [-10, 190],
    ],
  },
  {
    id: "m4a1s",
    name: "M4A1-S",
    color: "#3a3a3a",
    bullets: 20,
    rpm: 600,
    desc: "20-bullet mag, quieter, tighter. Less horizontal than M4A4. Preferred for long range.",
    pattern: [
      [0, 0], [0, 8], [0, 18], [0, 30], [0, 44], [0, 58], [0, 72], [-2, 85], [-6, 96], [-12, 106],
      [-18, 115], [-14, 122], [-4, 128], [6, 133], [16, 138],
      [22, 142], [14, 146], [2, 150], [-10, 153], [-20, 156],
    ],
  },
  {
    id: "ump45",
    name: "UMP-45",
    color: "#654321",
    bullets: 25,
    rpm: 666,
    desc: "Compact SMG spray. Goes up and slightly right. Good for close-range anti-eco.",
    pattern: [
      [0, 0], [0, 6], [0, 14], [0, 24], [0, 36], [2, 48], [4, 60], [6, 72], [8, 84], [10, 94],
      [12, 104], [14, 112], [16, 120], [16, 126], [14, 132],
      [10, 138], [8, 144], [12, 150], [16, 155], [18, 160],
      [14, 165], [10, 168], [6, 172], [8, 175], [12, 178],
    ],
  },
];

// Peek types with visual schematics
export const PEEK_TYPES = [
  {
    id: "wide",
    name: "Wide Swing",
    duration: "~300ms",
    color: "#D0021B",
    use: "When you KNOW an AWP is holding. Momentum carries you across their angle before they react.",
    risk: "If they flick back, you're dead in the open.",
    path: "sharp-diagonal",
  },
  {
    id: "jiggle",
    name: "Jiggle Peek",
    duration: "~80ms",
    color: "#F5A623",
    use: "Gather info without dying. Bait the AWP into missing, or hear a shot fire.",
    risk: "Low. This is the safest peek on the list.",
    path: "quick-in-out",
  },
  {
    id: "shoulder",
    name: "Shoulder Peek",
    duration: "~150ms",
    color: "#5dade2",
    use: "Fake a full peek. Peek shoulder for half a second, retreat. Bait the shot, push after.",
    risk: "Timing — too slow and you die, too fast and you get no info.",
    path: "half-expose",
  },
  {
    id: "off_angle",
    name: "Off-Angle Peek",
    duration: "static",
    color: "#2ECC71",
    use: "Hold an unexpected position — pixel walk, crouch, weird height. Force pre-aim miss.",
    risk: "Predictable if overused. Rotate the spot every few rounds.",
    path: "hold-unexpected",
  },
];

export const CROSSHAIR_EXAMPLES = [
  {
    id: "correct",
    label: "CORRECT",
    subtitle: "head level, pre-aimed",
    color: "#2ECC71",
    crosshairY: 0.45, // % from top (head level)
    note: "Crosshair at head height, exactly where an enemy head will appear. Zero mouse movement = instant headshot.",
  },
  {
    id: "floor",
    label: "ON THE FLOOR",
    subtitle: "classic silver move",
    color: "#D0021B",
    crosshairY: 0.85,
    note: "Crosshair on the ground. When an enemy peeks, you drag up, miss, die. Most common beginner mistake.",
  },
  {
    id: "sky",
    label: "ON THE SKY",
    subtitle: "recoil-tilt mode",
    color: "#D0021B",
    crosshairY: 0.15,
    note: "Crosshair too high. You overshoot when an enemy peeks. You look at the ceiling while you're dying.",
  },
  {
    id: "middle",
    label: "CENTER-SCREEN",
    subtitle: "lazy but workable",
    color: "#F5A623",
    crosshairY: 0.55,
    note: "Chest height. Works at distance but fails when enemy is peeking fast — you have to drag up for headshot.",
  },
];
