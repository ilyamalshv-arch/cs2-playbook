"use client";
import { useState, useMemo } from "react";
import { DollarSign, Shield, Swords, Zap } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";

type Side = "t" | "ct";
type BuyType = "full_buy" | "force" | "semi_eco" | "eco";

const WEAPONS: Record<Side, { name: string; cost: number }[]> = {
  t: [
    { name: "AK-47", cost: 2700 },
    { name: "Galil AR", cost: 1800 },
    { name: "Tec-9", cost: 500 },
    { name: "AWP", cost: 4750 },
  ],
  ct: [
    { name: "M4A1-S", cost: 2900 },
    { name: "M4A4", cost: 3100 },
    { name: "FAMAS", cost: 2050 },
    { name: "AWP", cost: 4750 },
  ],
};

const ARMOR_KEVLAR = 650;
const ARMOR_FULL = 1000;
const KIT = 400;

function recommend(side: Side, cash: number, myScore: number, theirScore: number) {
  const rifleCost = side === "t" ? 2700 : 3000;
  const fullArmor = side === "ct" ? ARMOR_FULL : ARMOR_KEVLAR;
  const kit = side === "ct" ? KIT : 0;

  // Full buy: rifle + armor + kit + utility (~1000)
  const fullBuyCost = rifleCost + fullArmor + kit + 1000;
  const awpBuyCost = 4750 + fullArmor + kit + 500;

  const behind = theirScore - myScore;
  const ahead = myScore - theirScore;

  let type: BuyType;
  let title: string;
  let reason: string;
  let items: string[];
  let total = 0;

  if (cash >= fullBuyCost + 500) {
    type = "full_buy";
    title = "FULL BUY";
    const rifle = side === "t" ? "AK-47" : "M4A4";
    const util = side === "t" ? "smoke + flash + molly + he" : "smoke + flash + molly + he + kit";
    items = [
      `${rifle} — $${rifleCost}`,
      side === "ct" ? `Full Armor — $${fullArmor}` : `Kevlar — $${fullArmor}`,
      ...(side === "ct" ? [`Defuse Kit — $${kit}`] : []),
      `Full utility (${util}) — ~$1000`,
    ];
    total = rifleCost + fullArmor + kit + 1000;
    reason = behind >= 2
      ? "You're behind — but rich. Full buy, play anchor executes, no heroes."
      : ahead >= 2
      ? "You're ahead. Full buy, play safe for site, don't throw the lead."
      : "Balanced round. Standard full buy. Trust defaults.";
  } else if (cash >= 3500 && cash < fullBuyCost + 500) {
    type = "semi_eco";
    title = "SEMI-BUY";
    items = [
      side === "t" ? "Galil AR — $1800" : "FAMAS — $2050",
      `Kevlar — $${ARMOR_KEVLAR}`,
      "Light util (1 flash + 1 smoke) — ~$500",
    ];
    total = (side === "t" ? 1800 : 2050) + ARMOR_KEVLAR + 500;
    reason = "Not enough for full rifle + util. Galil/FAMAS delivers 90% of the firepower for 60% of the cost. Save what's left.";
  } else if (cash >= 1500 && cash < 3500) {
    type = "force";
    title = behind >= 3 ? "FORCE BUY" : "SEMI-ECO";
    items = behind >= 3 ? [
      "Tec-9 / Five-Seven — $500",
      `Kevlar — $${ARMOR_KEVLAR}`,
      "1 HE grenade — $300",
      "Stack a bomb site",
    ] : [
      "P250 / CZ — $200-$500",
      `Kevlar — $${ARMOR_KEVLAR}`,
      "Save the rest for next round",
    ];
    total = behind >= 3 ? 500 + ARMOR_KEVLAR + 300 : 500 + ARMOR_KEVLAR;
    reason = behind >= 3
      ? "You're behind enough that saving won't help. Force-buy and stack one site. Pistol-only kills double as gear-steal."
      : "Don't force here. Buy kevlar + pistol, stack for anti-eco, or save fully.";
  } else {
    type = "eco";
    title = "FULL ECO";
    items = [
      "Default pistol only",
      "No armor",
      "No utility",
      "Save everything for next round",
    ];
    total = 0;
    reason = "You can't afford to spend. Full save. Group up, play for damage and kit-steal. Don't die for free.";
  }

  return { type, title, items, total, reason };
}

const BUY_COLORS: Record<BuyType, { bg: string; text: string; icon: React.ElementType }> = {
  full_buy: { bg: "#2ECC71", text: "#0a0a0a", icon: Swords },
  semi_eco: { bg: "#F5A623", text: "#0a0a0a", icon: Shield },
  force: { bg: "#D0021B", text: "#fff", icon: Zap },
  eco: { bg: "#444", text: "#fff", icon: DollarSign },
};

export default function FoundationsClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [muted, setMuted] = useState(false);
  const [side, setSide] = useState<Side>("t");
  const [cash, setCash] = useState(4500);
  const [myScore, setMyScore] = useState(6);
  const [theirScore, setTheirScore] = useState(7);

  const rec = useMemo(() => recommend(side, cash, myScore, theirScore), [side, cash, myScore, theirScore]);
  const BuyIcon = BUY_COLORS[rec.type].icon;

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <HudBar
        lang={lang} muted={muted} onMute={() => setMuted((m) => !m)}
        backHref={`/${lang}`}
        title="FOUNDATIONS"
        subtitle="ECONOMY"
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />

      <section className="pt-24 pb-8 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">// 01 · A SITE · ECONOMY</div>
          <h1 className="cs2-display mt-2 text-4xl sm:text-5xl md:text-7xl text-white" style={{ letterSpacing: "0.01em" }}>
            BUY <span className="text-[#F5A623]">BRAIN</span>
          </h1>
          <p className="cs2-reveal cs2-mono text-base sm:text-lg max-w-2xl mt-4 text-[#aaa]" style={{ animationDelay: "0.15s" }}>
            The IGL calculator. Feed it your team's cash, the score, and your side. It tells you what to buy — and why. No more solo-rifling on an eco round.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
          {/* INPUTS */}
          <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 24 }}>
            <div className="cs2-mono text-[10px] tracking-[0.4em] mb-4 text-[#F5A623]">▸ ROUND PARAMETERS</div>

            {/* Side toggle */}
            <div className="mb-6">
              <div className="cs2-mono text-xs tracking-widest mb-2 text-[#666]">SIDE</div>
              <div className="grid grid-cols-2 gap-2">
                {(["t", "ct"] as Side[]).map((s) => (
                  <button key={s} onClick={() => setSide(s)}
                    className="cs2-mono text-sm tracking-widest py-3 transition-all"
                    style={{
                      background: side === s ? (s === "t" ? "#D0021B" : "#5dade2") : "transparent",
                      color: side === s ? (s === "t" ? "#fff" : "#0a0a0a") : "#888",
                      border: `1px solid ${side === s ? (s === "t" ? "#D0021B" : "#5dade2") : "#333"}`,
                    }}>
                    {s === "t" ? "T SIDE" : "CT SIDE"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cash */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <div className="cs2-mono text-xs tracking-widest text-[#666]">YOUR CASH</div>
                <div className="cs2-display text-2xl text-[#F5A623]">${cash.toLocaleString()}</div>
              </div>
              <input type="range" min="0" max="16000" step="100" value={cash} onChange={(e) => setCash(Number(e.target.value))}
                className="w-full accent-[#F5A623]"
                style={{ background: `linear-gradient(to right, #F5A623 0%, #F5A623 ${(cash / 16000) * 100}%, #1a1a1a ${(cash / 16000) * 100}%, #1a1a1a 100%)` }} />
              <div className="flex justify-between cs2-mono text-[10px] mt-1 text-[#444]">
                <span>$0</span>
                <span>$3.5k</span>
                <span>$8k</span>
                <span>$12k</span>
                <span>$16k</span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[800, 2400, 4500, 8000].map((v) => (
                  <button key={v} onClick={() => setCash(v)}
                    className="cs2-mono text-[10px] tracking-widest py-1.5 hover:text-white transition-colors"
                    style={{ border: "1px solid #333", color: cash === v ? "#F5A623" : "#666" }}>
                    ${v >= 1000 ? `${v / 1000}k` : v}
                  </button>
                ))}
              </div>
            </div>

            {/* Score */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="cs2-mono text-xs tracking-widest text-[#666]">YOUR SCORE</div>
                  <div className="cs2-display text-2xl text-white">{myScore}</div>
                </div>
                <input type="range" min="0" max="12" value={myScore} onChange={(e) => setMyScore(Number(e.target.value))}
                  className="w-full accent-[#F5A623]" />
              </div>
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="cs2-mono text-xs tracking-widest text-[#666]">THEIR SCORE</div>
                  <div className="cs2-display text-2xl text-white">{theirScore}</div>
                </div>
                <input type="range" min="0" max="12" value={theirScore} onChange={(e) => setTheirScore(Number(e.target.value))}
                  className="w-full accent-[#D0021B]" />
              </div>
            </div>

            <div className="mt-4 cs2-mono text-xs text-center py-3 border-t border-[#222]" style={{ color: theirScore > myScore ? "#D0021B" : theirScore < myScore ? "#2ECC71" : "#888" }}>
              {theirScore > myScore ? `▸ BEHIND BY ${theirScore - myScore}` : theirScore < myScore ? `▸ AHEAD BY ${myScore - theirScore}` : "▸ TIED"}
            </div>
          </div>

          {/* RECOMMENDATION */}
          <div>
            <div key={rec.type} className="cs2-popin" style={{ background: "#060606", border: `2px solid ${BUY_COLORS[rec.type].bg}`, padding: "28px 28px" }}>
              <div className="cs2-mono text-[10px] tracking-[0.4em]" style={{ color: BUY_COLORS[rec.type].bg }}>
                ▸ RECOMMENDED BUY
              </div>
              <div className="flex items-center gap-4 mt-2">
                <BuyIcon size={40} style={{ color: BUY_COLORS[rec.type].bg }} />
                <div className="cs2-display text-4xl sm:text-5xl" style={{ color: BUY_COLORS[rec.type].bg }}>
                  {rec.title}
                </div>
              </div>

              <div className="mt-6">
                <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#666]">▸ SHOPPING LIST</div>
                <div className="space-y-1.5">
                  {rec.items.map((item, i) => (
                    <div key={i} className="cs2-mono text-base flex items-start text-[#ddd]">
                      <span className="text-[#F5A623] mr-2">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {rec.total > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#222] flex justify-between items-baseline">
                    <span className="cs2-mono text-xs tracking-widest text-[#666]">APPROX. TOTAL</span>
                    <span className="cs2-display text-2xl text-white">${rec.total.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#666]">▸ COACH SAYS</div>
                <div className="cs2-mono text-base leading-relaxed text-[#aaa]">{rec.reason}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <InfoBox title="KEEP IN MIND" text="Your team's buy matters more than yours. If 2 teammates are eco, you should eco too — otherwise it's a 3v5." />
              <InfoBox title="REMEMBER" text="Cash isn't about this round. You're planning 3 rounds ahead. Sometimes saving now wins round 2 and 3." />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-mono text-xs tracking-[0.4em] mb-4 text-[#666]">// KEY BUY TYPES</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {([
              ["FULL BUY", "#2ECC71", "$4500+", "Rifle + full armor + full utility. The default when you can afford it."],
              ["SEMI-BUY", "#F5A623", "$3500-4500", "Galil/FAMAS + kevlar + partial util. 90% of firepower at 60% the cost."],
              ["FORCE BUY", "#D0021B", "$1500-3500", "Risky. Pistol + kevlar + maybe an SMG. Last resort when behind."],
              ["FULL ECO", "#888", "<$1500", "Save everything. Play for damage and weapon steals. Don't die cheap."],
            ] as [string, string, string, string][]).map(([name, color, range, desc]) => (
              <div key={name} style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 16 }}>
                <div className="cs2-display text-xl mb-1" style={{ color }}>{name}</div>
                <div className="cs2-mono text-xs mb-2 text-[#888]">{range}</div>
                <div className="cs2-mono text-sm leading-relaxed text-[#999]">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-4 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · FOUNDATIONS · ECONOMY</div>
          <div>next up: <span className="text-[#F5A623]">round timings · info priority · tempo control</span></div>
        </div>
      </footer>
    </div>
  );
}

function InfoBox({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 16 }}>
      <div className="cs2-mono text-[10px] tracking-[0.4em] mb-2 text-[#F5A623]">▸ {title}</div>
      <div className="cs2-mono text-xs leading-relaxed text-[#aaa]">{text}</div>
    </div>
  );
}
