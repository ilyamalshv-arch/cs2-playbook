"use client";
import { useState, useEffect, useRef } from "react";
import { Crosshair, Eye, Target, Zap, Volume2 as AudioIcon } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { SPRAY_PATTERNS, PEEK_TYPES, CROSSHAIR_EXAMPLES } from "@/lib/mechanics-data";

type Section = "crosshair" | "peek" | "spray" | "strafe" | "audio";

export default function MechanicsClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [muted, setMuted] = useState(false);
  const [section, setSection] = useState<Section>("crosshair");

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <HudBar
        lang={lang} muted={muted} onMute={() => setMuted((m) => !m)}
        backHref={`/${lang}`}
        title="MECHANICS"
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />

      <section className="pt-24 pb-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">// 02 · MID · MECHANICS</div>
          <h1 className="cs2-display mt-2 text-5xl sm:text-7xl text-white" style={{ letterSpacing: "0.01em" }}>
            THE <span className="text-[#F5A623]">FUNDAMENTALS</span>
          </h1>
          <p className="cs2-reveal cs2-mono text-base sm:text-lg max-w-2xl mt-4 text-[#aaa]" style={{ animationDelay: "0.15s" }}>
            Crosshair placement. Peek types. Spray control. The stuff NiKo drills for 90 minutes before scrims. Interactive. Hands-on.
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-10 mb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {([
              ["crosshair", Crosshair, "CROSSHAIR"],
              ["peek", Eye, "PEEK TYPES"],
              ["spray", Target, "SPRAY PATTERNS"],
              ["strafe", Zap, "COUNTER-STRAFE"],
              ["audio", AudioIcon, "AUDIO"],
            ] as [Section, any, string][]).map(([s, Icon, label]) => (
              <button key={s} onClick={() => setSection(s)}
                className={`cs2-mono text-xs tracking-widest px-4 py-2 flex items-center gap-2 transition-all ${section === s ? "" : "hover:text-white"}`}
                style={{
                  background: section === s ? "#F5A623" : "transparent",
                  color: section === s ? "#0a0a0a" : "#888",
                  border: `1px solid ${section === s ? "#F5A623" : "#333"}`,
                }}>
                <Icon size={12} />{label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          {section === "crosshair" && <CrosshairSection />}
          {section === "peek" && <PeekSection />}
          {section === "spray" && <SpraySection />}
          {section === "strafe" && <StrafeSection />}
          {section === "audio" && <AudioSection />}
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-6 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · MECHANICS</div>
          <div>fundamentals · drilled daily</div>
        </div>
      </footer>
    </div>
  );
}

// ─────────── CROSSHAIR PLACEMENT ───────────
function CrosshairSection() {
  const [selected, setSelected] = useState("correct");
  const current = CROSSHAIR_EXAMPLES.find(c => c.id === selected)!;

  return (
    <div className="cs2-fadeup grid lg:grid-cols-[1fr_320px] gap-6">
      <div>
        <div className="cs2-mono text-xs tracking-[0.3em] mb-3 text-[#555]">▸ CORRIDOR · MIRAGE MID</div>
        <div className="relative" style={{ background: "#060606", border: "1px solid #1a1a1a", aspectRatio: "16 / 10" }}>
          {/* crude corridor scene */}
          <svg viewBox="0 0 800 500" className="w-full h-full">
            <defs>
              <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a1f10" />
                <stop offset="100%" stopColor="#1a1310" />
              </linearGradient>
              <linearGradient id="wall-l" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2a2420" />
                <stop offset="100%" stopColor="#1a1612" />
              </linearGradient>
            </defs>
            {/* sky */}
            <rect width="800" height="180" fill="#1a1812" />
            {/* floor */}
            <polygon points="0,350 800,350 800,500 0,500" fill="url(#floor)" />
            <line x1="0" y1="350" x2="800" y2="350" stroke="#3a2f20" strokeWidth="1" />
            {/* perspective lines */}
            <line x1="0" y1="180" x2="400" y2="250" stroke="#2a2420" strokeWidth="1" />
            <line x1="800" y1="180" x2="400" y2="250" stroke="#2a2420" strokeWidth="1" />
            <line x1="0" y1="350" x2="400" y2="300" stroke="#3a2f20" strokeWidth="1" />
            <line x1="800" y1="350" x2="400" y2="300" stroke="#3a2f20" strokeWidth="1" />
            {/* walls */}
            <polygon points="0,180 400,250 400,300 0,350" fill="url(#wall-l)" opacity="0.7" />
            <polygon points="800,180 400,250 400,300 800,350" fill="url(#wall-l)" opacity="0.7" />
            {/* doorway — the corner to pre-aim */}
            <rect x="370" y="220" width="60" height="85" fill="#000" />
            <rect x="370" y="220" width="60" height="85" fill="none" stroke="#F5A623" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            {/* "enemy head will appear here" marker */}
            <circle cx="400" cy="240" r="6" fill="#D0021B" opacity="0.3">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="400" y="320" textAnchor="middle" fill="#555" fontSize="10" fontFamily="VT323, monospace" letterSpacing="2">ENEMY HEAD LEVEL</text>

            {/* crosshair */}
            <g transform={`translate(400 ${current.crosshairY * 500})`}>
              <line x1="0" y1="-14" x2="0" y2="-4" stroke={current.color} strokeWidth="2" />
              <line x1="0" y1="14" x2="0" y2="4" stroke={current.color} strokeWidth="2" />
              <line x1="-14" y1="0" x2="-4" y2="0" stroke={current.color} strokeWidth="2" />
              <line x1="14" y1="0" x2="4" y2="0" stroke={current.color} strokeWidth="2" />
              <circle cx="0" cy="0" r="1.5" fill={current.color} />
            </g>
          </svg>
        </div>
        <div className="cs2-mono text-xs mt-3 text-[#555]">▸ move through the presets — watch the crosshair move</div>
      </div>

      <div className="space-y-3">
        <div className="cs2-mono text-[10px] tracking-[0.4em] mb-2 text-[#F5A623]">▸ PLACEMENT PRESETS</div>
        {CROSSHAIR_EXAMPLES.map((ex) => (
          <button key={ex.id} onClick={() => setSelected(ex.id)}
            className="w-full text-left p-4 transition-all"
            style={{
              background: selected === ex.id ? "rgba(245,166,35,0.08)" : "#060606",
              border: `1px solid ${selected === ex.id ? ex.color : "#1a1a1a"}`,
            }}>
            <div className="flex items-baseline justify-between mb-1">
              <div className="cs2-display text-xl" style={{ color: ex.color }}>{ex.label}</div>
              <div className="cs2-mono text-[10px] text-[#555]">{ex.subtitle}</div>
            </div>
            {selected === ex.id && (
              <div className="cs2-mono text-sm leading-relaxed mt-2 text-[#aaa]">{ex.note}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────── PEEK TYPES ───────────
function PeekSection() {
  const [selected, setSelected] = useState(PEEK_TYPES[0].id);
  const [animKey, setAnimKey] = useState(0);
  const current = PEEK_TYPES.find((p) => p.id === selected)!;

  useEffect(() => { setAnimKey((k) => k + 1); }, [selected]);

  return (
    <div className="cs2-fadeup grid lg:grid-cols-[1fr_1fr] gap-6">
      <div className="space-y-3">
        <div className="cs2-mono text-[10px] tracking-[0.4em] mb-2 text-[#F5A623]">▸ 4 PEEK TYPES</div>
        {PEEK_TYPES.map((p) => (
          <button key={p.id} onClick={() => setSelected(p.id)}
            className="w-full text-left p-4 transition-all"
            style={{
              background: selected === p.id ? "rgba(245,166,35,0.08)" : "#060606",
              border: `1px solid ${selected === p.id ? p.color : "#1a1a1a"}`,
            }}>
            <div className="flex items-baseline justify-between mb-2">
              <div className="cs2-display text-xl" style={{ color: p.color }}>{p.name.toUpperCase()}</div>
              <div className="cs2-mono text-[10px] tracking-widest" style={{ color: p.color }}>{p.duration}</div>
            </div>
            {selected === p.id && (
              <div className="mt-3 space-y-3">
                <div>
                  <div className="cs2-mono text-[10px] tracking-widest text-[#666]">▸ WHEN TO USE</div>
                  <div className="cs2-mono text-sm leading-relaxed text-[#ddd]">{p.use}</div>
                </div>
                <div>
                  <div className="cs2-mono text-[10px] tracking-widest text-[#666]">▸ RISK</div>
                  <div className="cs2-mono text-sm leading-relaxed text-[#ddd]">{p.risk}</div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div>
        <div className="cs2-mono text-xs tracking-[0.3em] mb-3 text-[#555]">▸ TOP-DOWN VIEW</div>
        <div className="relative" style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 20 }}>
          <svg key={animKey} viewBox="0 0 400 400" className="w-full h-auto">
            <style>{`
              @keyframes peek-wide {
                0%,15% { transform: translate(80px, 200px); opacity: 0.3; }
                40% { transform: translate(300px, 200px); opacity: 1; }
                55% { transform: translate(300px, 200px); opacity: 1; }
                80% { transform: translate(80px, 200px); opacity: 0.3; }
                100% { transform: translate(80px, 200px); opacity: 0.3; }
              }
              @keyframes peek-jiggle {
                0%,20% { transform: translate(80px, 200px); opacity: 1; }
                30% { transform: translate(200px, 200px); opacity: 1; }
                40% { transform: translate(80px, 200px); opacity: 1; }
                60% { transform: translate(80px, 200px); opacity: 1; }
                100% { transform: translate(80px, 200px); opacity: 1; }
              }
              @keyframes peek-shoulder {
                0%,20% { transform: translate(80px, 200px); opacity: 1; }
                40% { transform: translate(160px, 200px); opacity: 1; }
                60% { transform: translate(80px, 200px); opacity: 1; }
                100% { transform: translate(80px, 200px); opacity: 1; }
              }
              @keyframes peek-static {
                0%,100% { transform: translate(140px, 150px); opacity: 1; }
              }
              .cs2-peek-wide { animation: peek-wide 3s ease-in-out infinite; }
              .cs2-peek-jiggle { animation: peek-jiggle 2s ease-in-out infinite; }
              .cs2-peek-shoulder { animation: peek-shoulder 2.5s ease-in-out infinite; }
              .cs2-peek-static { animation: peek-static 2s ease-in-out infinite; }
            `}</style>
            {/* grid */}
            <rect width="400" height="400" fill="#0a0a0a" />
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={i}>
                <line x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="rgba(245,166,35,0.04)" strokeWidth="1" />
                <line x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(245,166,35,0.04)" strokeWidth="1" />
              </g>
            ))}
            {/* wall (cover) */}
            <rect x="100" y="180" width="20" height="40" fill="#3a2f20" />
            <text x="110" y="175" textAnchor="middle" fill="#666" fontSize="9" fontFamily="VT323, monospace">WALL</text>
            {/* enemy position */}
            <circle cx="320" cy="200" r="12" fill="#D0021B" opacity="0.5" />
            <circle cx="320" cy="200" r="4" fill="#D0021B" />
            <text x="320" y="180" textAnchor="middle" fill="#D0021B" fontSize="10" fontFamily="VT323, monospace" letterSpacing="2">ENEMY</text>
            <line x1="318" y1="200" x2="130" y2="200" stroke="#D0021B" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
            {/* you */}
            <g className={`cs2-peek-${selected === "off_angle" ? "static" : current.id === "wide" ? "wide" : current.id === "jiggle" ? "jiggle" : "shoulder"}`}>
              <circle r="14" fill={current.color} opacity="0.3" />
              <circle r="6" fill={current.color} />
              <line x1="0" y1="0" x2="18" y2="0" stroke={current.color} strokeWidth="2" />
            </g>
            <text x="80" y="250" textAnchor="middle" fill={current.color} fontSize="10" fontFamily="VT323, monospace" letterSpacing="2">YOU</text>
          </svg>
          <div className="cs2-mono text-xs mt-3 text-center text-[#555]">
            ▸ {current.name} · {current.duration}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────── SPRAY PATTERNS ───────────
function SpraySection() {
  const [weaponId, setWeaponId] = useState(SPRAY_PATTERNS[0].id);
  const [replaying, setReplaying] = useState(false);
  const [bulletIdx, setBulletIdx] = useState(-1);
  const weapon = SPRAY_PATTERNS.find((w) => w.id === weaponId)!;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const replay = () => {
    setReplaying(true);
    setBulletIdx(-1);
    let i = 0;
    const interval = 60_000 / weapon.rpm; // ms per bullet
    timerRef.current = setInterval(() => {
      setBulletIdx(i);
      i++;
      if (i >= weapon.bullets) {
        if (timerRef.current) clearInterval(timerRef.current);
        setReplaying(false);
      }
    }, interval);
  };

  useEffect(() => {
    setBulletIdx(-1);
    if (timerRef.current) clearInterval(timerRef.current);
    setReplaying(false);
  }, [weaponId]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const VB_W = 300;
  const VB_H = 260;
  const CX = VB_W / 2;
  const CY = 30;

  return (
    <div className="cs2-fadeup grid lg:grid-cols-[1fr_1.1fr] gap-6">
      <div>
        <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#F5A623]">▸ SELECT WEAPON</div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {SPRAY_PATTERNS.map((w) => (
            <button key={w.id} onClick={() => setWeaponId(w.id)}
              className="cs2-mono text-sm tracking-widest py-3 transition-all"
              style={{
                background: weaponId === w.id ? w.color : "transparent",
                color: weaponId === w.id ? "#fff" : "#888",
                border: `1px solid ${weaponId === w.id ? w.color : "#333"}`,
              }}>
              {w.name}
            </button>
          ))}
        </div>
        <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 20 }}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="cs2-mono text-[10px] tracking-widest text-[#666]">BULLETS</div>
              <div className="cs2-display text-2xl text-white">{weapon.bullets}</div>
            </div>
            <div>
              <div className="cs2-mono text-[10px] tracking-widest text-[#666]">RPM</div>
              <div className="cs2-display text-2xl text-white">{weapon.rpm}</div>
            </div>
          </div>
          <div className="cs2-mono text-sm leading-relaxed text-[#aaa] pt-3 border-t border-[#222]">
            {weapon.desc}
          </div>
          <button onClick={replay} disabled={replaying}
            className="cs2-mono text-sm tracking-widest mt-4 px-5 py-2 w-full transition-all hover:scale-[1.02] disabled:opacity-50"
            style={{ background: weapon.color, color: "#fff" }}>
            {replaying ? `FIRING... ${bulletIdx + 1}/${weapon.bullets}` : "▸ REPLAY SPRAY"}
          </button>
        </div>
      </div>

      <div>
        <div className="cs2-mono text-[10px] tracking-[0.3em] mb-3 text-[#555]">▸ PATTERN · 0 COMPENSATION</div>
        <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 12 }}>
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto">
            {/* grid */}
            {Array.from({ length: 13 }).map((_, i) => (
              <g key={i}>
                <line x1={i * 25} y1="0" x2={i * 25} y2={VB_H} stroke="rgba(245,166,35,0.05)" strokeWidth="1" />
                <line x1="0" y1={i * 25} x2={VB_W} y2={i * 25} stroke="rgba(245,166,35,0.05)" strokeWidth="1" />
              </g>
            ))}
            {/* aim point */}
            <line x1={CX - 12} y1={CY} x2={CX + 12} y2={CY} stroke="#2ECC71" strokeWidth="1" />
            <line x1={CX} y1={CY - 12} x2={CX} y2={CY + 12} stroke="#2ECC71" strokeWidth="1" />
            <circle cx={CX} cy={CY} r="14" fill="none" stroke="#2ECC71" strokeWidth="1" opacity="0.5" />
            <text x={CX} y={CY - 18} textAnchor="middle" fill="#2ECC71" fontSize="8" fontFamily="VT323, monospace" letterSpacing="2">AIM POINT</text>

            {/* pattern path */}
            <polyline
              points={weapon.pattern.map(([x, y], i) => {
                if (bulletIdx >= 0 && i > bulletIdx) return "";
                return `${CX + x},${CY + y}`;
              }).filter(Boolean).join(" ")}
              fill="none" stroke={weapon.color} strokeWidth="1.5" opacity="0.6"
            />

            {/* bullet dots */}
            {weapon.pattern.map(([x, y], i) => {
              const shown = bulletIdx < 0 || i <= bulletIdx;
              const isLast = i === bulletIdx;
              return (
                <g key={i} opacity={shown ? 1 : 0.1}>
                  <circle cx={CX + x} cy={CY + y} r={isLast ? 5 : 3}
                    fill={weapon.color}
                    style={{ transition: "r 100ms" }} />
                  {i === 0 && (
                    <text x={CX + x + 10} y={CY + y + 3} fill={weapon.color} fontSize="8" fontFamily="VT323, monospace">1</text>
                  )}
                  {i === weapon.bullets - 1 && (
                    <text x={CX + x + 10} y={CY + y + 3} fill={weapon.color} fontSize="8" fontFamily="VT323, monospace">{weapon.bullets}</text>
                  )}
                </g>
              );
            })}

            {/* legend */}
            <text x="10" y={VB_H - 8} fill="#444" fontSize="9" fontFamily="VT323, monospace" letterSpacing="2">KICK → DRAG DOWN-OPPOSITE TO COMPENSATE</text>
          </svg>
        </div>
        <div className="cs2-mono text-xs mt-3 text-[#666]">
          ▸ the line shows WHERE THE BULLETS GO without compensation. To spray accurately, drag your mouse in the OPPOSITE direction.
        </div>
      </div>
    </div>
  );
}

// ─────────── COUNTER-STRAFE ───────────
function StrafeSection() {
  const [mode, setMode] = useState<"wrong" | "right">("right");
  const [key, setKey] = useState(0);

  useEffect(() => { setKey((k) => k + 1); }, [mode]);

  return (
    <div className="cs2-fadeup">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        <div>
          <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#F5A623]">▸ THE ONE RULE</div>
          <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 24 }}>
            <div className="cs2-display text-3xl text-white leading-tight mb-4">
              Moving <span className="text-[#D0021B]">= inaccurate.</span><br />
              Stopping <span className="text-[#2ECC71]">= accurate.</span>
            </div>
            <div className="cs2-mono text-sm leading-relaxed text-[#ccc] mb-4">
              CS has a velocity threshold. Below ~60 units/sec, your bullets are accurate. Above it, they spray everywhere. Releasing a movement key takes ~200ms to slow down.
            </div>
            <div className="cs2-mono text-sm leading-relaxed text-[#aaa] mb-4 pt-4 border-t border-[#222]">
              <span className="text-[#F5A623]">Counter-strafe:</span> instead of waiting to slow down, tap the OPPOSITE key for one frame. Your velocity drops to zero instantly. Shot lands.
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setMode("wrong")}
                className="cs2-mono text-xs tracking-widest px-4 py-2 flex-1 transition-all"
                style={{
                  background: mode === "wrong" ? "#D0021B" : "transparent",
                  color: mode === "wrong" ? "#fff" : "#888",
                  border: `1px solid ${mode === "wrong" ? "#D0021B" : "#333"}`,
                }}>
                ✗ NO COUNTER-STRAFE
              </button>
              <button onClick={() => setMode("right")}
                className="cs2-mono text-xs tracking-widest px-4 py-2 flex-1 transition-all"
                style={{
                  background: mode === "right" ? "#2ECC71" : "transparent",
                  color: mode === "right" ? "#0a0a0a" : "#888",
                  border: `1px solid ${mode === "right" ? "#2ECC71" : "#333"}`,
                }}>
                ✓ COUNTER-STRAFE
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="cs2-mono text-[10px] tracking-[0.3em] mb-3 text-[#555]">▸ TIMELINE · MOVEMENT → SHOT</div>
          <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 20 }}>
            <svg key={key} viewBox="0 0 400 280" className="w-full h-auto">
              <style>{`
                @keyframes csf-wrong {
                  0% { transform: translateX(80px); }
                  40% { transform: translateX(260px); }
                  60% { transform: translateX(280px); }
                  80% { transform: translateX(285px); }
                  100% { transform: translateX(285px); }
                }
                @keyframes csf-right {
                  0% { transform: translateX(80px); }
                  40% { transform: translateX(260px); }
                  42% { transform: translateX(260px); }
                  100% { transform: translateX(260px); }
                }
                .cs2-run-wrong { animation: csf-wrong 2.6s ease-out forwards; }
                .cs2-run-right { animation: csf-right 2.6s ease-out forwards; }
              `}</style>
              {/* keys shown */}
              <text x="200" y="30" textAnchor="middle" fill="#888" fontSize="11" fontFamily="VT323, monospace" letterSpacing="2">
                {mode === "wrong" ? "HELD D → RELEASED → SHOT (inaccurate)" : "HELD D → TAPPED A → SHOT (accurate)"}
              </text>
              {/* track */}
              <line x1="60" y1="140" x2="340" y2="140" stroke="#333" strokeWidth="1" strokeDasharray="3 3" />
              {/* keystroke markers */}
              <g>
                <rect x="60" y="200" width="40" height="24" fill="none" stroke="#F5A623" strokeWidth="1" />
                <text x="80" y="217" textAnchor="middle" fill="#F5A623" fontSize="11" fontFamily="VT323, monospace">D</text>
                <text x="80" y="240" textAnchor="middle" fill="#555" fontSize="9" fontFamily="VT323, monospace">HELD</text>

                {mode === "wrong" ? (
                  <>
                    <rect x="220" y="200" width="40" height="24" fill="none" stroke="#D0021B" strokeWidth="1" />
                    <text x="240" y="217" textAnchor="middle" fill="#D0021B" fontSize="11" fontFamily="VT323, monospace">—</text>
                    <text x="240" y="240" textAnchor="middle" fill="#555" fontSize="9" fontFamily="VT323, monospace">RELEASE</text>
                    <text x="240" y="254" textAnchor="middle" fill="#D0021B" fontSize="9" fontFamily="VT323, monospace">200ms decel</text>
                  </>
                ) : (
                  <>
                    <rect x="220" y="200" width="40" height="24" fill="none" stroke="#2ECC71" strokeWidth="1" />
                    <text x="240" y="217" textAnchor="middle" fill="#2ECC71" fontSize="11" fontFamily="VT323, monospace">A</text>
                    <text x="240" y="240" textAnchor="middle" fill="#555" fontSize="9" fontFamily="VT323, monospace">TAP 1F</text>
                    <text x="240" y="254" textAnchor="middle" fill="#2ECC71" fontSize="9" fontFamily="VT323, monospace">instant stop</text>
                  </>
                )}
              </g>
              {/* player */}
              <g className={mode === "wrong" ? "cs2-run-wrong" : "cs2-run-right"}>
                <circle cx="0" cy="140" r="12" fill={mode === "wrong" ? "#D0021B" : "#2ECC71"} />
                <circle cx="0" cy="140" r="6" fill="#fff" />
              </g>
              {/* shot marker */}
              <g transform={mode === "wrong" ? "translate(285 140)" : "translate(260 140)"}>
                <circle r="20" fill="none" stroke={mode === "wrong" ? "#D0021B" : "#2ECC71"} strokeWidth="2" opacity="0.4">
                  <animate attributeName="r" values="15;25;15" dur="1s" repeatCount="indefinite" />
                </circle>
                <line x1="-10" y1="-10" x2="10" y2="10" stroke={mode === "wrong" ? "#D0021B" : "#2ECC71"} strokeWidth="2" />
                <line x1="-10" y1="10" x2="10" y2="-10" stroke={mode === "wrong" ? "#D0021B" : "#2ECC71"} strokeWidth="2" />
              </g>
              {/* result */}
              <text x="200" y="100" textAnchor="middle" fill={mode === "wrong" ? "#D0021B" : "#2ECC71"} fontSize="16" fontFamily="Black Ops One, Impact, sans-serif" letterSpacing="2">
                {mode === "wrong" ? "SPRAY EVERYWHERE" : "HEADSHOT"}
              </text>
            </svg>
          </div>
          <div className="cs2-mono text-xs mt-3 text-[#666]">
            ▸ to counter-strafe: moving D → release D, tap A for ONE frame, shoot. Velocity = 0.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────── AUDIO ───────────
function AudioSection() {
  const SURFACES = [
    { surface: "Concrete",   loudness: 95, note: "Loudest. Every footstep audible across a site." },
    { surface: "Wood",       loudness: 85, note: "Loud with distinct click. Inferno Apps, Mirage Ramps." },
    { surface: "Tile",       loudness: 75, note: "Medium. Anubis, Nuke hallways." },
    { surface: "Carpet",     loudness: 55, note: "Quiet. Rare on competitive maps. Hard to hear." },
    { surface: "Water",      loudness: 90, note: "Obvious splash. Overpass Long, Anubis canal." },
    { surface: "Grass/Dirt", loudness: 65, note: "Muffled. Dust 2 Long, Ancient cave approaches." },
  ];
  const RELOAD = [
    { weapon: "AK-47",   time: "2.43s", mag: 30, note: "Never reload in the open mid-fight. Take cover." },
    { weapon: "M4A4",    time: "3.10s", mag: 30, note: "Longer than AK. Count your bullets." },
    { weapon: "M4A1-S",  time: "3.10s", mag: 20, note: "Smaller mag. 20 bullets goes fast in a spray." },
    { weapon: "AWP",     time: "3.70s", mag: 10, note: "A full reload takes forever. Reload one at a time if safe." },
    { weapon: "Desert Eagle", time: "2.20s", mag: 7, note: "Pistol rounds: 7 shots = 7 kills or rebuy." },
  ];

  return (
    <div className="cs2-fadeup grid lg:grid-cols-2 gap-6">
      <div>
        <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#F5A623]">▸ SURFACE → LOUDNESS</div>
        <div style={{ background: "#060606", border: "1px solid #1a1a1a" }}>
          {SURFACES.map((s, i) => (
            <div key={s.surface} className="p-4 border-b border-[#1a1a1a] last:border-b-0">
              <div className="flex items-baseline justify-between mb-2">
                <div className="cs2-display text-lg text-white">{s.surface.toUpperCase()}</div>
                <div className="cs2-mono text-sm text-[#F5A623]">{s.loudness}<span className="text-[#444]">/100</span></div>
              </div>
              <div className="h-1 bg-[#1a1a1a] mb-2">
                <div className="h-full" style={{ width: `${s.loudness}%`, background: `linear-gradient(90deg, #2ECC71, #F5A623 50%, #D0021B)` }} />
              </div>
              <div className="cs2-mono text-xs text-[#888]">{s.note}</div>
            </div>
          ))}
        </div>
        <div className="cs2-mono text-xs mt-3 text-[#666]">
          ▸ walk-key (Shift) reduces noise by ~75%. Useful on concrete and water. Useless on carpet.
        </div>
      </div>

      <div>
        <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#F5A623]">▸ RELOAD TIMINGS</div>
        <div style={{ background: "#060606", border: "1px solid #1a1a1a" }}>
          {RELOAD.map((r) => (
            <div key={r.weapon} className="p-4 border-b border-[#1a1a1a] last:border-b-0">
              <div className="flex items-baseline justify-between mb-2">
                <div className="cs2-display text-lg text-white">{r.weapon.toUpperCase()}</div>
                <div className="flex gap-3 cs2-mono text-sm">
                  <span className="text-[#F5A623]">{r.time}</span>
                  <span className="text-[#666]">{r.mag} rds</span>
                </div>
              </div>
              <div className="cs2-mono text-xs text-[#888]">{r.note}</div>
            </div>
          ))}
        </div>
        <div className="cs2-mono text-xs mt-3 text-[#666]">
          ▸ pro tip: <span className="text-[#F5A623]">count your bullets</span>. Reload during rotation, not during fights. If you must reload in contact — side-strafe into cover first.
        </div>
      </div>
    </div>
  );
}
