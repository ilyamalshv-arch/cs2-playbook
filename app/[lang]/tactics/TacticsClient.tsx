"use client";
import { useState, useMemo } from "react";
import { Swords, Shield, ChevronDown } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { TACTICS, MAP_ORDER, type Tactic } from "@/lib/tactics-data";

type Side = "all" | "t" | "ct";
type MapFilter = "all" | typeof MAP_ORDER[number];

const MAP_LABELS: Record<string, string> = {
  mirage: "MIRAGE", inferno: "INFERNO", dust2: "DUST 2",
  nuke: "NUKE", anubis: "ANUBIS", overpass: "OVERPASS", ancient: "ANCIENT",
};

export default function TacticsClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [muted, setMuted] = useState(false);
  const [side, setSide] = useState<Side>("all");
  const [mapFilter, setMapFilter] = useState<MapFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return TACTICS.filter((t) => {
      if (side !== "all" && t.side !== side) return false;
      if (mapFilter !== "all" && t.map !== mapFilter) return false;
      return true;
    });
  }, [side, mapFilter]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <HudBar
        lang={lang} muted={muted} onMute={() => setMuted((m) => !m)}
        backHref={`/${lang}`}
        title="TACTICS"
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />

      <section className="pt-24 pb-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">// 04 · B SITE · TACTICS</div>
          <h1 className="cs2-display mt-2 text-5xl sm:text-7xl text-white" style={{ letterSpacing: "0.01em" }}>
            THE <span className="text-[#F5A623]">PLAYBOOK</span>
          </h1>
          <p className="cs2-reveal cs2-mono text-base sm:text-lg max-w-2xl mt-4 text-[#aaa]" style={{ animationDelay: "0.15s" }}>
            21 executes. Both sides. All 7 maps. Utility, steps, counter-plays. Copy-paste for your next 5-stack.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-6 sm:px-10 mb-6">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="cs2-mono text-[10px] tracking-[0.4em] mr-2 text-[#666]">▸ SIDE</div>
            <button onClick={() => setSide("all")}
              className="cs2-mono text-xs tracking-widest px-3 py-1.5 transition-all"
              style={{
                background: side === "all" ? "#F5A623" : "transparent",
                color: side === "all" ? "#0a0a0a" : "#888",
                border: `1px solid ${side === "all" ? "#F5A623" : "#333"}`,
              }}>ALL</button>
            <button onClick={() => setSide("t")}
              className="cs2-mono text-xs tracking-widest px-3 py-1.5 transition-all flex items-center gap-2"
              style={{
                background: side === "t" ? "#D0021B" : "transparent",
                color: side === "t" ? "#fff" : "#D0021B",
                border: `1px solid #D0021B`,
              }}><Swords size={11} /> T-SIDE</button>
            <button onClick={() => setSide("ct")}
              className="cs2-mono text-xs tracking-widest px-3 py-1.5 transition-all flex items-center gap-2"
              style={{
                background: side === "ct" ? "#5dade2" : "transparent",
                color: side === "ct" ? "#0a0a0a" : "#5dade2",
                border: `1px solid #5dade2`,
              }}><Shield size={11} /> CT-SIDE</button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="cs2-mono text-[10px] tracking-[0.4em] mr-2 text-[#666]">▸ MAP</div>
            <button onClick={() => setMapFilter("all")}
              className="cs2-mono text-[10px] tracking-widest px-3 py-1.5 transition-all"
              style={{
                background: mapFilter === "all" ? "#F5A623" : "transparent",
                color: mapFilter === "all" ? "#0a0a0a" : "#888",
                border: `1px solid ${mapFilter === "all" ? "#F5A623" : "#333"}`,
              }}>ALL MAPS</button>
            {MAP_ORDER.map((m) => (
              <button key={m} onClick={() => setMapFilter(m)}
                className="cs2-mono text-[10px] tracking-widest px-3 py-1.5 transition-all"
                style={{
                  background: mapFilter === m ? "#F5A623" : "transparent",
                  color: mapFilter === m ? "#0a0a0a" : "#888",
                  border: `1px solid ${mapFilter === m ? "#F5A623" : "#333"}`,
                }}>{MAP_LABELS[m]}</button>
            ))}
            <div className="ml-auto cs2-mono text-xs tracking-widest text-[#444]">
              {filtered.length} / {TACTICS.length}
            </div>
          </div>
        </div>
      </section>

      {/* TACTICS GRID */}
      <section className="px-6 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-3">
          {filtered.map((t) => (
            <TacticCard key={t.id} tactic={t} expanded={expandedId === t.id} onToggle={() => setExpandedId(expandedId === t.id ? null : t.id)} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full cs2-mono text-center py-16 text-[#555]">
              <div className="text-2xl mb-2">▸ NO TACTICS MATCH</div>
              <div>Try another filter.</div>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-6 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · TACTICS · 21 EXECUTES</div>
          <div>steal shamelessly · win consistently</div>
        </div>
      </footer>
    </div>
  );
}

function TacticCard({ tactic, expanded, onToggle }: { tactic: Tactic; expanded: boolean; onToggle: () => void }) {
  const sideColor = tactic.side === "t" ? "#D0021B" : "#5dade2";
  const sideLabel = tactic.side === "t" ? "T-SIDE" : "CT-SIDE";
  const SideIcon = tactic.side === "t" ? Swords : Shield;
  const diff = ["EASY", "MED", "HARD"][tactic.difficulty - 1];
  const diffColor = ["#2ECC71", "#F5A623", "#D0021B"][tactic.difficulty - 1];

  return (
    <div style={{
      background: "#060606",
      border: `1px solid ${expanded ? sideColor : "#1a1a1a"}`,
      transition: "all 200ms",
    }}>
      <button onClick={onToggle} className="w-full text-left p-5 hover:bg-[#0d0d0d] transition-colors">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="cs2-mono text-[9px] tracking-widest px-1.5 py-0.5" style={{ background: sideColor, color: tactic.side === "t" ? "#fff" : "#0a0a0a" }}>
            {sideLabel}
          </span>
          <span className="cs2-mono text-[9px] tracking-widest px-1.5 py-0.5 text-[#aaa]" style={{ border: "1px solid #333" }}>
            {MAP_LABELS[tactic.map]}
          </span>
          <span className="cs2-mono text-[9px] tracking-widest px-1.5 py-0.5" style={{ border: `1px solid ${diffColor}`, color: diffColor }}>
            {diff}
          </span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="cs2-display text-xl sm:text-2xl text-white leading-tight">{tactic.name}</div>
          <ChevronDown size={16} className="text-[#666] mt-1 transition-transform flex-shrink-0" style={{ transform: expanded ? "rotate(180deg)" : "none" }} />
        </div>
        <div className="cs2-mono text-xs text-[#666] mt-2">&laquo; {tactic.shortName} &raquo;</div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-[#1a1a1a] cs2-fadeup">
          <div className="pt-4">
            <div className="cs2-mono text-[10px] tracking-[0.4em] mb-2 text-[#F5A623]">▸ UTILITY</div>
            <div className="flex flex-wrap gap-2">
              {tactic.utility.map((u, i) => (
                <span key={i} className="cs2-mono text-xs px-2 py-1 text-[#ccc]" style={{ background: "#0a0a0a", border: "1px solid #2a2a2a" }}>
                  {u}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="cs2-mono text-[10px] tracking-[0.4em] mb-2 text-[#F5A623]">▸ STEPS</div>
            <ol className="cs2-mono text-sm space-y-1.5 text-[#ddd]">
              {tactic.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 text-[10px] flex items-center justify-center font-bold"
                    style={{ background: sideColor, color: tactic.side === "t" ? "#fff" : "#0a0a0a" }}>
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div>
              <div className="cs2-mono text-[10px] tracking-[0.4em] mb-2 text-[#2ECC71]">▸ WHY IT WORKS</div>
              <div className="cs2-mono text-xs leading-relaxed text-[#aaa]">{tactic.why}</div>
            </div>
            <div>
              <div className="cs2-mono text-[10px] tracking-[0.4em] mb-2 text-[#D0021B]">▸ COUNTERED BY</div>
              <div className="cs2-mono text-xs leading-relaxed text-[#aaa]">{tactic.counterBy}</div>
            </div>
          </div>

          {tactic.proExample && (
            <div className="mt-4 pt-3 border-t border-[#222]">
              <div className="cs2-mono text-[10px] tracking-[0.4em] mb-1 text-[#666]">▸ PRO REFERENCE</div>
              <div className="cs2-mono text-xs italic text-[#ccc]">&laquo; {tactic.proExample} &raquo;</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
