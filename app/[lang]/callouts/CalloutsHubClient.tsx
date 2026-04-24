"use client";
import { useState } from "react";
import Link from "next/link";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { MIRAGE_CALLOUTS } from "@/lib/callouts-mirage";
import { INFERNO_CALLOUTS } from "@/lib/callouts-inferno";
import { DUST2_CALLOUTS } from "@/lib/callouts-dust2";
import { NUKE_CALLOUTS } from "@/lib/callouts-nuke";
import { ANUBIS_CALLOUTS } from "@/lib/callouts-anubis";
import { OVERPASS_CALLOUTS } from "@/lib/callouts-overpass";
import { ANCIENT_CALLOUTS } from "@/lib/callouts-ancient";

type MapCard = {
  slug: string;
  name: string;
  num: string;
  status: "live" | "soon";
  callouts?: typeof MIRAGE_CALLOUTS;
  vibe: string;
  style: string;
  year: string;
};

const MAPS: MapCard[] = [
  { slug: "mirage",   name: "MIRAGE",   num: "01", status: "live", callouts: MIRAGE_CALLOUTS,  vibe: "desert standoff", style: "long sightlines · smokes heavy", year: "2013" },
  { slug: "inferno",  name: "INFERNO",  num: "02", status: "live", callouts: INFERNO_CALLOUTS, vibe: "italian village", style: "narrow chokes · banana wars", year: "1999" },
  { slug: "dust2",    name: "DUST 2",   num: "03", status: "live", callouts: DUST2_CALLOUTS,   vibe: "the classic", style: "mid ↔ long ↔ tunnels", year: "2001" },
  { slug: "nuke",     name: "NUKE",     num: "04", status: "live", callouts: NUKE_CALLOUTS,    vibe: "vertical warfare", style: "two floors · ramp control", year: "2000" },
  { slug: "anubis",   name: "ANUBIS",   num: "05", status: "live", callouts: ANUBIS_CALLOUTS,  vibe: "egyptian mid", style: "water streams · palms", year: "2023" },
  { slug: "overpass", name: "OVERPASS", num: "06", status: "live", callouts: OVERPASS_CALLOUTS, vibe: "urban dutch sprawl", style: "long connect · bathrooms", year: "2013" },
  { slug: "ancient",  name: "ANCIENT",  num: "07", status: "live", callouts: ANCIENT_CALLOUTS, vibe: "jungle ruins", style: "donut & temple", year: "2021" },
];

export default function CalloutsHubClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [muted, setMuted] = useState(false);
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <HudBar
        lang={lang} muted={muted} onMute={() => setMuted((m) => !m)}
        backHref={`/${lang}`}
        title="CALLOUTS"
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />

      <section className="relative pt-24 pb-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">// 05 · CONNECTOR</div>
          <h1 className="cs2-display mt-2 text-5xl sm:text-7xl text-white" style={{ letterSpacing: "0.01em" }}>
            MAP <span className="text-[#F5A623]">ARSENAL</span>
          </h1>
          <p className="cs2-reveal cs2-mono text-base sm:text-lg max-w-2xl mt-4 text-[#aaa]" style={{ animationDelay: "0.15s" }}>
            Seven maps of the CS2 Active Duty pool. Trilingual callouts in English, Russian and Spanish. Pick your battleground.
          </p>
          <div className="cs2-reveal mt-6 flex flex-wrap gap-3 cs2-mono text-xs tracking-widest" style={{ animationDelay: "0.25s" }}>
            <span className="px-2 py-1 text-[#2ECC71]" style={{ border: "1px solid #2ECC71" }}>● 7 LIVE · ALL MAPS</span>
            <span className="px-2 py-1 text-[#F5A623]" style={{ border: "1px solid #F5A623" }}>EN / RU / ES</span>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MAPS.map((m, i) => {
            const isLive = m.status === "live";
            const isHover = hoverSlug === m.slug;
            const card = (
              <div
                onMouseEnter={() => setHoverSlug(m.slug)}
                onMouseLeave={() => setHoverSlug(null)}
                className="relative cs2-fadeup overflow-hidden transition-all duration-300"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  background: "linear-gradient(180deg, rgba(15,15,15,0.95), rgba(6,6,6,0.95))",
                  border: `1px solid ${isLive ? (isHover ? "#F5A623" : "#2a2a2a") : "#1a1a1a"}`,
                  transform: isLive && isHover ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: isLive && isHover ? "0 12px 40px -12px rgba(245,166,35,0.4)" : "none",
                  cursor: isLive ? "pointer" : "not-allowed",
                  opacity: isLive ? 1 : 0.55,
                }}
              >
                {/* status badge */}
                <div className="absolute top-3 right-3 cs2-mono text-[9px] tracking-widest z-10 px-2 py-0.5"
                  style={{
                    background: isLive ? "#2ECC71" : "#1a1a1a",
                    color: isLive ? "#0a0a0a" : "#666",
                  }}>
                  {isLive ? "● LIVE" : "○ SOON"}
                </div>

                {/* map preview */}
                <div className="relative" style={{ aspectRatio: "1 / 1", background: "#060606" }}>
                  {m.callouts ? (
                    <MiniMap callouts={m.callouts} active={isHover} />
                  ) : (
                    <PlaceholderMap />
                  )}
                  {/* overlay gradient on hover */}
                  {isLive && (
                    <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(ellipse at center, transparent 50%, rgba(245,166,35,0.12) 100%)",
                        opacity: isHover ? 1 : 0,
                      }} />
                  )}
                  {/* corner marks */}
                  {[[6, 6], [6, "6"], ["6", 6], ["6", "6"]].map(([l, t], idx) => {
                    const style: React.CSSProperties = { position: "absolute", width: 10, height: 10, borderColor: isHover && isLive ? "#F5A623" : "#333", borderStyle: "solid" };
                    if (idx === 0) { style.top = 6; style.left = 6; style.borderWidth = "1px 0 0 1px"; }
                    if (idx === 1) { style.top = 6; style.right = 6; style.borderWidth = "1px 1px 0 0"; }
                    if (idx === 2) { style.bottom = 6; style.left = 6; style.borderWidth = "0 0 1px 1px"; }
                    if (idx === 3) { style.bottom = 6; style.right = 6; style.borderWidth = "0 1px 1px 0"; }
                    return <div key={idx} style={style} />;
                  })}
                </div>

                {/* meta */}
                <div className="p-4">
                  <div className="flex items-center gap-2 cs2-mono text-[10px] tracking-widest text-[#666] mb-1">
                    <span>MAP · {m.num}</span>
                    <span className="text-[#333]">·</span>
                    <span>DE_{m.slug.toUpperCase()}</span>
                  </div>
                  <div className="cs2-display text-3xl text-white leading-none" style={{ color: isLive && isHover ? "#F5A623" : "#fff", transition: "color 200ms" }}>
                    {m.name}
                  </div>
                  <div className="cs2-mono text-sm mt-2 text-[#888]">&laquo; {m.vibe} &raquo;</div>
                  <div className="cs2-mono text-xs mt-3 pt-3 border-t border-[#1a1a1a] flex items-center justify-between">
                    <span className="text-[#666]">{m.style}</span>
                    <span className="text-[#444]">{m.year}</span>
                  </div>
                  {isLive && (
                    <div className="cs2-mono text-xs tracking-widest mt-3 flex items-center justify-between text-[#F5A623]">
                      <span>{m.callouts!.length} CALLOUTS</span>
                      <span>DEPLOY ▸</span>
                    </div>
                  )}
                </div>
              </div>
            );
            return isLive ? (
              <Link key={m.slug} href={`/${lang}/callouts/${m.slug}`}>{card}</Link>
            ) : (
              <div key={m.slug}>{card}</div>
            );
          })}
        </div>
      </section>

      <section className="px-6 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-mono text-xs tracking-[0.4em] mb-4 text-[#666]">// STATUS</div>
          <div className="cs2-mono text-sm leading-relaxed max-w-2xl text-[#888]">
            All seven Active Duty maps are live with full trilingual callouts and Headshot Challenge quizzes. 150+ zones across the pool. Mirage, Inferno, Dust 2, Nuke, Anubis, Overpass, Ancient — each with its own hand-drawn schematic and regional callout variants.
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-6 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · CALLOUTS · HUB</div>
          <div>seven maps · three languages · one playbook</div>
        </div>
      </footer>
    </div>
  );
}

// ── mini live SVG of a map, drawn from real callout polygons ──
function MiniMap({ callouts, active }: { callouts: typeof MIRAGE_CALLOUTS; active: boolean }) {
  const viewBox = 800;
  return (
    <svg viewBox={`0 0 ${viewBox} ${viewBox}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={`mini-grid-${callouts[0].id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245,166,35,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#0a0a0a" />
      <rect width="100%" height="100%" fill={`url(#mini-grid-${callouts[0].id})`} />
      {/* T / CT corner labels */}
      <text x="30" y="40" fontSize="18" fill="#D0021B" fontFamily="'VT323', monospace" letterSpacing="2" opacity="0.5">T</text>
      <text x="770" y="780" fontSize="18" fill="#5dade2" fontFamily="'VT323', monospace" textAnchor="end" letterSpacing="2" opacity="0.5">CT</text>
      {callouts.map((c) => (
        <polygon
          key={c.id}
          points={c.poly}
          fill={active ? "rgba(245,166,35,0.18)" : "rgba(245,166,35,0.06)"}
          stroke={active ? "#F5A623" : "rgba(245,166,35,0.3)"}
          strokeWidth={active ? 2 : 1}
          style={{ transition: "all 400ms ease-out" }}
        />
      ))}
      {/* center cross */}
      <line x1="400" y1="0" x2="400" y2="800" stroke="rgba(245,166,35,0.08)" strokeWidth="1" strokeDasharray="2 4" />
      <line x1="0" y1="400" x2="800" y2="400" stroke="rgba(245,166,35,0.08)" strokeWidth="1" strokeDasharray="2 4" />
    </svg>
  );
}

function PlaceholderMap() {
  return (
    <svg viewBox="0 0 800 800" className="w-full h-full">
      <rect width="100%" height="100%" fill="#060606" />
      {Array.from({ length: 17 }).map((_, i) => (
        <g key={i}>
          <line x1={i * 50} y1="0" x2={i * 50} y2="800" stroke="rgba(245,166,35,0.04)" strokeWidth="1" />
          <line x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="rgba(245,166,35,0.04)" strokeWidth="1" />
        </g>
      ))}
      <text x="400" y="410" fontSize="96" fill="#222" fontFamily="'Black Ops One', Impact, sans-serif" textAnchor="middle" letterSpacing="8">?</text>
    </svg>
  );
}
