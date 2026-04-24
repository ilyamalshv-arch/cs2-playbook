"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { FirstVisitGate } from "@/components/FirstVisitGate";
import { useSynth } from "@/lib/synth";

const ZONES = [
  { key: "foundations", href: "/foundations", points: "120,120 280,100 310,180 180,220", label: "FOUNDATIONS",  num: "01" },
  { key: "mechanics",   href: "/mechanics",   points: "290,180 400,170 410,280 300,290", label: "MECHANICS",    num: "02" },
  { key: "training",    href: "/training",    points: "420,120 560,140 540,240 430,230", label: "TRAINING",     num: "03" },
  { key: "tactics",     href: "/tactics",     points: "120,320 280,300 310,420 150,440", label: "TACTICS",      num: "04" },
  { key: "callouts",    href: "/callouts",    points: "300,300 420,290 440,410 320,430", label: "CALLOUTS",     num: "05" },
  { key: "mental",      href: "/mental",      points: "440,260 570,260 560,400 450,420", label: "MENTAL",       num: "06" },
  { key: "history",     href: "/history",     points: "180,460 430,450 450,540 200,550", label: "HISTORY",      num: "07" },
];

const centroid = (pts: string): [number, number] => {
  const coords = pts.split(" ").map((p) => p.split(",").map(Number));
  const n = coords.length;
  return [coords.reduce((s, [x]) => s + x, 0) / n, coords.reduce((s, [, y]) => s + y, 0) / n];
};

type TermLine = { kind: "sys" | "user" | "ok" | "err"; text: string };

export default function HomeClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [muted, setMuted] = useState(false);
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const [focusZone, setFocusZone] = useState<string | null>(null);
  const [termLines, setTermLines] = useState<TermLine[]>([]);
  const [termInput, setTermInput] = useState("");
  const [konami, setKonami] = useState<string[]>([]);
  const [devOpen, setDevOpen] = useState(false);
  const [online] = useState(() => 120 + Math.floor(Math.random() * 80));
  const [now, setNow] = useState<string>("");
  const { ensure, play } = useSynth(muted);
  const t = dict.home;

  // time updater
  useEffect(() => {
    const update = () => setNow(new Date().toISOString().slice(0, 16).replace("T", " "));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // terminal boot
  useEffect(() => {
    setTermLines([]);
    const timers: any[] = [];
    t.terminal_boot.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setTermLines((p) => [...p, { kind: "sys", text: line }]);
      }, 300 + i * 280));
    });
    return () => timers.forEach(clearTimeout);
  }, [lang]);

  // konami + dev console
  useEffect(() => {
    const CODE = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") { e.preventDefault(); setDevOpen(o => !o); return; }
      setKonami(prev => {
        const next = [...prev, e.key].slice(-CODE.length);
        if (next.join(",").toLowerCase() === CODE.join(",").toLowerCase()) {
          triggerFlash();
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, []);

  const triggerFlash = () => {
    ensure().then(() => play("flash"));
    const el = document.createElement("div");
    el.className = "cs2-flashbang";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
    setTimeout(() => {
      setTermLines(p => [...p,
        { kind: "sys", text: "> FLASHBANG!" },
        { kind: "ok", text: "> secret unlocked: /history/legends" },
      ]);
    }, 600);
  };

  const goto = async (key: string) => {
    await ensure();
    play("click");
    const zone = ZONES.find(z => z.key === key);
    if (!zone) return;
    setFocusZone(key);
    setTimeout(() => {
      window.location.href = `/${lang}${zone.href}`;
    }, 450);
  };

  const onZoneHover = async (key: string | null) => {
    await ensure();
    if (hoverZone !== key) {
      setHoverZone(key);
      if (key) play("hover");
    }
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    setTermLines(p => [...p, { kind: "user", text: `> ${raw}` }]);
    play("type");
    setTimeout(() => {
      const add = (text: string, kind: TermLine["kind"] = "sys") =>
        setTermLines(p => [...p, { kind, text }]);
      if (!cmd) return;
      if (cmd === "help") {
        add("available commands:");
        add("  help           — this message");
        add("  about          — what is this site");
        add("  random         — pick a random zone");
        add("  konami         — hint for the code");
        add("  rush           — you know what");
        add("  clear          — clear terminal");
        add("  sv_cheats 1    — ok cowboy");
      } else if (cmd === "about") {
        add("CS2 Playbook · a field manual for counter-strike 2.", "ok");
        add("written by Ilya · built with claude · no ads, no tracking.");
      } else if (cmd === "random") {
        const pick = ZONES[Math.floor(Math.random() * ZONES.length)].key;
        add(`rolling... → ${pick}`, "ok");
        setTimeout(() => goto(pick), 500);
      } else if (cmd === "konami") {
        add("up up down down left right left right b a", "ok");
      } else if (cmd === "rush" || cmd === "rush b") {
        add("RUSH B CYKA BLYAT", "err");
      } else if (cmd === "clear") {
        setTermLines([]);
      } else if (cmd === "sv_cheats 1") {
        add("CHEATS ENABLED (not really)", "err");
      } else if (cmd === "noclip") {
        add("you are not a flying dev, operator.", "err");
      } else if (cmd === "kill") {
        add("you died. respawn in 3...", "err");
      } else if (ZONES.find(z => z.key === cmd)) {
        add(`→ loading ${cmd}`, "ok");
        setTimeout(() => goto(cmd), 400);
      } else {
        add(`unknown command: "${cmd}". try "help".`, "err");
      }
    }, 80);
  };

  const hoveredMeta = hoverZone ? (t.zones as any)[hoverZone] : null;

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <FirstVisitGate lang={lang} />
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.4);} }
        .cs2-dot { animation: pulse-dot 2s ease-in-out infinite; }
        @keyframes sweep { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        .cs2-sweep { animation: sweep 6s linear infinite; transform-origin: 300px 300px; }
        .cs2-zone { fill: rgba(245,166,35,0.06); stroke: rgba(245,166,35,0.35); stroke-width: 1.5; transition: all 180ms ease-out; cursor: crosshair; }
        .cs2-zone:hover { fill: rgba(245,166,35,0.18); stroke: #F5A623; stroke-width: 2; filter: drop-shadow(0 0 12px rgba(245,166,35,0.6)); }
        .cs2-zone.focused { fill: rgba(245,166,35,0.4); stroke: #F5A623; stroke-width: 3; filter: drop-shadow(0 0 24px rgba(245,166,35,0.9)); animation: zone-lock 0.15s steps(2) 3; }
        @keyframes zone-lock { 0%{opacity:1;} 50%{opacity:0.2;} 100%{opacity:1;} }
        @keyframes grid-pan { from{background-position:0 0;} to{background-position:40px 40px;} }
        .cs2-grid { background-image: linear-gradient(rgba(245,166,35,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.06) 1px, transparent 1px); background-size: 40px 40px; animation: grid-pan 30s linear infinite; }
        .cs2-card { background: linear-gradient(180deg, rgba(20,20,20,0.9), rgba(10,10,10,0.9)); border: 1px solid #2a2a2a; transition: all 220ms ease-out; position: relative; overflow: hidden; }
        .cs2-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, transparent 60%, rgba(245,166,35,0.08) 100%); pointer-events: none; }
        .cs2-card:hover { border-color: #F5A623; transform: translateY(-3px); box-shadow: 0 12px 40px -12px rgba(245,166,35,0.35); }
        .cs2-card:hover .cs2-card-title { color: #F5A623; }
        .cs2-card:hover .cs2-card-corner { border-color: #F5A623; }
        .cs2-card-corner { position: absolute; width: 12px; height: 12px; border: 1px solid #555; transition: border-color 200ms; }
        @keyframes flashbang { 0%{opacity:0;} 3%{opacity:1;} 100%{opacity:0;} }
        .cs2-flashbang { position: fixed; inset: 0; background: #fff; z-index: 9999; pointer-events: none; animation: flashbang 2s ease-out forwards; }
        @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
        .cs2-marquee { animation: marquee 45s linear infinite; will-change: transform; }
        @keyframes arrow-bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(6px);} }
        .cs2-arrow-bounce { animation: arrow-bounce 1.4s ease-in-out infinite; }
      `}</style>

      <HudBar
        lang={lang}
        muted={muted}
        onMute={() => setMuted(m => !m)}
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
        extras={
          <>
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#555]">
              <span className="cs2-dot inline-block w-2 h-2 rounded-full" style={{ background: "#2ECC71" }} />
              <span>{t.online.replace("{n}", String(online))}</span>
            </div>
            <button onClick={() => setDevOpen(o => !o)} className="hidden sm:flex items-center gap-1 hover:text-white transition-colors">
              <Terminal size={14} /><span>[~]</span>
            </button>
          </>
        }
      />

      {/* marquee */}
      <div className="fixed top-[42px] left-0 right-0 overflow-hidden z-[99] border-b border-[#1a1a1a]" style={{ background: "rgba(20,8,8,0.9)", height: 22 }}>
        <div className="cs2-marquee whitespace-nowrap cs2-mono text-[11px] tracking-widest pt-[3px] text-[#D0021B]" style={{ width: "max-content" }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="inline-block pr-12">
              ⚠ WARNING · TILT DETECTED IN YOUR LOBBY · MUTE YOUR TEAMMATES · DRINK WATER · CHECK YOUR CROSSHAIR · WARMUP IS NOT OPTIONAL · MOM CALLED · RUSH B CYKA BLYAT · ⚠
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-40 sm:pt-48 pb-20 px-4 sm:px-10 overflow-hidden">
        <div className="absolute inset-0 cs2-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">{t.hero_eyebrow}</div>
          <h1 className="cs2-display mt-4 leading-[0.88]" style={{ fontSize: "clamp(64px, 13vw, 180px)", letterSpacing: "-0.01em" }}>
            <span className="cs2-reveal block text-white">{t.hero_title_1}</span>
            <span className="cs2-reveal block text-[#F5A623]" style={{ animationDelay: "0.25s" }}>{t.hero_title_2}</span>
          </h1>
          <div className="cs2-reveal cs2-mono text-base sm:text-lg mt-4 tracking-widest text-[#888]" style={{ animationDelay: "0.4s" }}>
            {t.hero_subtitle}
          </div>
          <p className="cs2-reveal max-w-xl mt-10 cs2-mono text-lg sm:text-xl leading-relaxed text-[#bbb]" style={{ animationDelay: "0.55s" }}>
            {t.hero_desc}
          </p>
          <div className="cs2-reveal mt-12 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.7s" }}>
            <div className="flex items-center gap-3">
              <div className="cs2-mono text-xs tracking-widest text-[#F5A623]">{t.hero_cta}</div>
              <div className="cs2-arrow-bounce text-[#F5A623]">▾</div>
            </div>
            <Link href={`/${lang}/intro`}
              className="cs2-mono text-xs tracking-widest px-4 py-2 transition-all hover:scale-105 flex items-center gap-2"
              style={{ border: "1px solid #F5A623", color: "#F5A623" }}>
              ▸ WATCH INTRO
            </Link>
          </div>
          <div className="cs2-reveal cs2-mono text-xs mt-2 text-[#555]" style={{ animationDelay: "0.8s" }}>{t.hero_hint}</div>

          <div className="absolute top-0 right-0 cs2-mono text-[10px] tracking-widest hidden md:block text-[#333]">
            <div>LAT 34°36'S</div>
            <div>LON 58°22'W</div>
            <div>ELEV 25M</div>
            <div className="mt-2 text-[#F5A623]">{now} UTC</div>
          </div>
        </div>
      </section>

      {/* RADAR */}
      <section className="relative px-4 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div className="relative">
            <div className="cs2-mono text-xs tracking-[0.3em] mb-3 text-[#555]">▸ RADAR · DE_PLAYBOOK</div>
            <div className="relative" style={{ background: "#060606", border: "1px solid #1a1a1a" }}>
              <div className="p-2 sm:p-4">
              <svg viewBox="0 0 600 600" className="w-full h-auto" onMouseLeave={() => setHoverZone(null)}>
                {Array.from({ length: 13 }).map((_, i) => (
                  <g key={i}>
                    <line x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="rgba(245,166,35,0.05)" strokeWidth="1" />
                    <line x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="rgba(245,166,35,0.05)" strokeWidth="1" />
                  </g>
                ))}
                {[80, 160, 240].map((r) => (
                  <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="rgba(245,166,35,0.1)" strokeWidth="1" strokeDasharray="2 4" />
                ))}
                <line x1="300" y1="0" x2="300" y2="600" stroke="rgba(245,166,35,0.08)" strokeWidth="1" />
                <line x1="0" y1="300" x2="600" y2="300" stroke="rgba(245,166,35,0.08)" strokeWidth="1" />
                <g className="cs2-sweep" style={{ pointerEvents: "none" }}>
                  <defs>
                    <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F5A623" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 300 300 L 540 300 A 240 240 0 0 0 380 75 Z" fill="url(#sweepGrad)" />
                </g>
                {ZONES.map(z => {
                  const [cx, cy] = centroid(z.points);
                  const isHover = hoverZone === z.key;
                  const isFocus = focusZone === z.key;
                  return (
                    <g key={z.key} onMouseEnter={() => onZoneHover(z.key)} onClick={() => goto(z.key)}>
                      <polygon points={z.points} className={`cs2-zone ${isFocus ? "focused" : ""}`} />
                      <text x={cx} y={cy - 6} textAnchor="middle" className="cs2-mono pointer-events-none" fill={isHover || isFocus ? "#F5A623" : "#666"} fontSize="10" letterSpacing="2">{z.num}</text>
                      <text x={cx} y={cy + 10} textAnchor="middle" className="cs2-mono pointer-events-none" fill={isHover || isFocus ? "#fff" : "#888"} fontSize="11" letterSpacing="1.5">{z.label}</text>
                      {isHover && (
                        <circle cx={cx} cy={cy} r="4" fill="#F5A623">
                          <animate attributeName="r" values="4;14;4" dur="1s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}
                <circle cx="300" cy="300" r="4" fill="#F5A623" />
                <circle cx="300" cy="300" r="10" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="10;28;10" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
                </circle>
                {[[10, 10], [580, 10], [10, 580], [580, 580]].map(([x, y], i) => (
                  <g key={i} stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.4">
                    <line x1={x + (x < 100 ? 0 : -12)} y1={y} x2={x + (x < 100 ? 12 : 0)} y2={y} />
                    <line x1={x} y1={y + (y < 100 ? 0 : -12)} x2={x} y2={y + (y < 100 ? 12 : 0)} />
                  </g>
                ))}
              </svg>
              <div className="flex items-center justify-between mt-3 cs2-mono text-[10px] tracking-widest text-[#444]">
                <span>N 0.0° · E 0.0°</span>
                <span className="flex items-center gap-2">
                  <span className="cs2-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#F5A623" }} />
                  <span>LIVE FEED</span>
                </span>
                <span>SCALE 1:150</span>
              </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 space-y-4">
            <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 20, minHeight: 260 }}>
              <div className="cs2-mono text-[10px] tracking-widest mb-3 text-[#F5A623]">▸ TARGET INFO</div>
              {hoveredMeta ? (
                <div className="cs2-fadeup" key={hoverZone}>
                  <div className="cs2-mono text-xs tracking-widest mb-1 text-[#666]">{hoveredMeta.tag}</div>
                  <div className="cs2-display text-2xl mb-3 text-white">{hoveredMeta.title}</div>
                  <div className="cs2-mono text-sm leading-relaxed mb-4 text-[#aaa]">{hoveredMeta.blurb}</div>
                  <div className="cs2-mono text-xs pt-3 border-t border-[#222] text-[#F5A623]">{hoveredMeta.stat}</div>
                </div>
              ) : (
                <div className="cs2-mono text-sm text-[#555]">
                  <div>▸ no target selected.</div>
                  <div className="mt-2">hover a zone on the radar to read the brief.</div>
                </div>
              )}
            </div>

            {/* terminal */}
            <div style={{ background: "#060606", border: "1px solid #1a1a1a" }}>
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#1a1a1a]">
                <div className="cs2-mono text-[10px] tracking-widest text-[#666]">▸ {t.terminal_title}</div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#555]" />
                  <span className="w-2 h-2 rounded-full bg-[#555]" />
                  <span className="w-2 h-2 rounded-full" style={{ background: "#F5A623" }} />
                </div>
              </div>
              <div className="p-3 cs2-mono text-sm h-48 overflow-y-auto text-[#d0d0d0]">
                {termLines.map((l, i) => (
                  <div key={i} style={{ color: l.kind === "ok" ? "#2ECC71" : l.kind === "err" ? "#D0021B" : l.kind === "user" ? "#F5A623" : "#aaa" }}>{l.text}</div>
                ))}
                <div className="flex items-center gap-1 text-[#F5A623]">
                  <span>›</span>
                  <input
                    value={termInput}
                    onChange={e => setTermInput(e.target.value)}
                    onFocus={() => ensure()}
                    onKeyDown={e => { if (e.key === "Enter") { runCommand(termInput); setTermInput(""); } }}
                    placeholder={t.terminal_help}
                    className="bg-transparent outline-none flex-1 cs2-mono text-sm text-white"
                  />
                  <span className="cs2-caret">▌</span>
                </div>
              </div>
              <div className="px-3 py-2 border-t border-[#1a1a1a] cs2-mono text-[10px] text-[#444]">{t.commands_hint}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="relative px-4 sm:px-10 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <div className="cs2-mono text-xs tracking-[0.4em] mb-2 text-[#F5A623]">// {t.zones_title}</div>
              <div className="cs2-mono text-sm text-[#666]">{t.zones_sub}</div>
            </div>
            <div className="cs2-mono text-xs tracking-widest text-[#333]">07 / 07 UNLOCKED</div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZONES.map((z, i) => {
              const meta = (t.zones as any)[z.key];
              return (
                <Link
                  key={z.key}
                  href={`/${lang}${z.href}`}
                  onMouseEnter={() => onZoneHover(z.key)}
                  onMouseLeave={() => onZoneHover(null)}
                  className="cs2-card text-left p-5 cs2-fadeup block"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="cs2-card-corner" style={{ top: 4, left: 4, borderRight: "none", borderBottom: "none" }} />
                  <div className="cs2-card-corner" style={{ top: 4, right: 4, borderLeft: "none", borderBottom: "none" }} />
                  <div className="cs2-card-corner" style={{ bottom: 4, left: 4, borderRight: "none", borderTop: "none" }} />
                  <div className="cs2-card-corner" style={{ bottom: 4, right: 4, borderLeft: "none", borderTop: "none" }} />
                  <div className="cs2-mono text-[10px] tracking-widest mb-4 text-[#F5A623]">{meta.tag}</div>
                  <div className="cs2-display cs2-card-title text-3xl mb-3 transition-colors text-white">{meta.title}</div>
                  <div className="cs2-mono text-sm leading-relaxed mb-5 text-[#999]" style={{ minHeight: "4em" }}>{meta.blurb}</div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#222]">
                    <div className="cs2-mono text-[10px] tracking-widest text-[#666]">{meta.stat}</div>
                    <div className="cs2-mono text-xs text-[#F5A623]">DEPLOY ▸</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-4 sm:px-10 py-12">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · {t.footer_built}</div>
          <div>{t.footer_copy}</div>
          <div className="flex items-center gap-2">
            <span className="text-[#333]">hint:</span>
            <span className="text-[#F5A623]">[~]</span>
            <span>or ↑↑↓↓←→←→BA</span>
            <span className="text-[#333] ml-2">·</span>
            <Link href={`/${lang}/intro`} className="text-[#F5A623] hover:text-white transition-colors">replay intro</Link>
          </div>
        </div>
      </footer>

      {devOpen && (
        <div className="fixed inset-x-0 top-[64px] z-[200] px-4 sm:px-10 cs2-fadeup">
          <div className="max-w-3xl mx-auto" style={{ background: "#050505", border: "1px solid #F5A623" }}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a1a]">
              <div className="cs2-mono text-xs tracking-widest text-[#F5A623]">▸ {t.dev_title}</div>
              <button onClick={() => setDevOpen(false)} className="cs2-mono text-xs hover:text-white text-[#888]">[ESC] close</button>
            </div>
            <div className="p-4">
              <div className="cs2-mono text-xs mb-3 text-[#666]">{t.commands_hint}</div>
              <div className="flex items-center gap-2 cs2-mono text-lg text-[#F5A623]">
                <span>›</span>
                <input
                  autoFocus
                  value={termInput}
                  onChange={e => setTermInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") { runCommand(termInput); setTermInput(""); }
                    if (e.key === "Escape") setDevOpen(false);
                  }}
                  placeholder={t.dev_placeholder}
                  className="bg-transparent outline-none flex-1 cs2-mono text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
