"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { HISTORY_EVENTS, ERA_META, CATEGORY_META, type HistoryEvent } from "@/lib/history-data";

type Filter = "all" | HistoryEvent["era"] | HistoryEvent["category"];

export default function HistoryClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [muted, setMuted] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const sorted = [...HISTORY_EVENTS].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return (a.month ?? 0) - (b.month ?? 0);
    });
    if (filter === "all") return sorted;
    return sorted.filter((e) => e.era === filter || e.category === filter);
  }, [filter]);

  const years = useMemo(() => {
    const set = new Set(filtered.map((e) => e.year));
    return Array.from(set).sort();
  }, [filtered]);

  const firstYear = 1999;
  const lastYear = 2026;
  const span = lastYear - firstYear;

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <style>{`
        @keyframes pulse-node {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .cs2-node { animation: pulse-node 2.4s ease-in-out infinite; }

        @keyframes scroll-hint {
          0%,100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(4px); opacity: 1; }
        }
        .cs2-scroll-hint { animation: scroll-hint 1.8s ease-in-out infinite; }
      `}</style>

      <HudBar
        lang={lang}
        muted={muted}
        onMute={() => setMuted((m) => !m)}
        backHref={`/${lang}`}
        title="HISTORY"
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />

      {/* HEADER */}
      <section className="relative pt-24 pb-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">// 07 · BOMBSITE · TIMELINE</div>
          <h1 className="cs2-display mt-2 text-5xl sm:text-7xl text-white" style={{ letterSpacing: "0.01em" }}>
            25 YEARS <span className="text-[#F5A623]">OF CS</span>
          </h1>
          <p className="cs2-reveal cs2-mono text-base sm:text-lg max-w-2xl mt-4 text-[#aaa]" style={{ animationDelay: "0.15s" }}>
            From a college mod to global esport. The legends, the moments, the tactics that bent the game. Scroll the timeline. Click any node.
          </p>
        </div>
      </section>

      {/* DECADE MINIMAP */}
      <section className="px-6 sm:px-10 mb-6">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#666]">▸ TIMELINE · 1999 → 2026</div>
          <div className="relative h-20" style={{ background: "#060606", border: "1px solid #1a1a1a" }}>
            {/* era backgrounds */}
            <div className="absolute inset-0 flex">
              {(["cs16", "css", "csgo", "cs2"] as const).map((era) => {
                const eventsOfEra = HISTORY_EVENTS.filter((e) => e.era === era);
                if (eventsOfEra.length === 0) return null;
                const start = Math.min(...eventsOfEra.map((e) => e.year));
                const end = Math.max(...eventsOfEra.map((e) => e.year));
                const left = ((start - firstYear) / span) * 100;
                const width = ((end - start + 1) / span) * 100;
                return (
                  <div key={era}
                    className="absolute top-0 bottom-0"
                    style={{
                      left: `${left}%`, width: `${width}%`,
                      background: `${ERA_META[era].color}08`,
                      borderLeft: `1px solid ${ERA_META[era].color}44`,
                      borderRight: `1px solid ${ERA_META[era].color}44`,
                    }}>
                    <div className="absolute top-1.5 left-2 cs2-mono text-[10px] tracking-widest" style={{ color: ERA_META[era].color }}>
                      {ERA_META[era].label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* year ticks */}
            <div className="absolute bottom-0 left-0 right-0 h-6 flex items-end">
              {Array.from({ length: span + 1 }).map((_, i) => {
                const y = firstYear + i;
                const isDecade = y % 5 === 0 || y === firstYear || y === lastYear;
                return (
                  <div key={y} className="flex-1 flex flex-col items-center" style={{ height: isDecade ? "100%" : "40%" }}>
                    <div className="w-px flex-1" style={{ background: isDecade ? "#333" : "#1a1a1a" }} />
                    {isDecade && <div className="cs2-mono text-[9px] text-[#555] pb-0.5">{y}</div>}
                  </div>
                );
              })}
            </div>

            {/* event nodes */}
            <div className="absolute inset-0 flex items-center px-1">
              {HISTORY_EVENTS.map((e) => {
                const pos = ((e.year + (e.month ?? 6) / 12 - firstYear) / (span + 1)) * 100;
                const color = CATEGORY_META[e.category].color;
                return (
                  <button key={e.id}
                    onClick={() => {
                      const el = document.getElementById(`event-${e.id}`);
                      el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      setExpandedId(e.id);
                    }}
                    className="absolute"
                    style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
                    <div className={`rounded-full transition-all ${e.iconic ? "cs2-node" : ""}`}
                      style={{
                        width: e.iconic ? 10 : 6,
                        height: e.iconic ? 10 : 6,
                        background: color,
                        boxShadow: e.iconic ? `0 0 12px ${color}` : "none",
                      }} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-6 sm:px-10 mb-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2">
          <div className="cs2-mono text-[10px] tracking-[0.4em] mr-2 text-[#666]">▸ FILTER</div>
          <FilterPill label="ALL" active={filter === "all"} onClick={() => setFilter("all")} color="#F5A623" />
          {(Object.keys(ERA_META) as (keyof typeof ERA_META)[]).map((era) => (
            <FilterPill key={era} label={ERA_META[era].label} active={filter === era} onClick={() => setFilter(era)} color={ERA_META[era].color} />
          ))}
          <div className="w-px h-5 bg-[#333] mx-2" />
          {(Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[]).map((cat) => (
            <FilterPill key={cat} label={CATEGORY_META[cat].label} active={filter === cat} onClick={() => setFilter(cat)} color={CATEGORY_META[cat].color} small />
          ))}
          <div className="ml-auto cs2-mono text-xs tracking-widest text-[#444]">
            {filtered.length} / {HISTORY_EVENTS.length} EVENTS
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-6 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto relative">
          {/* vertical spine */}
          <div className="absolute left-[140px] sm:left-[180px] top-0 bottom-0 w-px bg-[#1a1a1a] hidden md:block" />

          <div className="space-y-12">
            {filtered.map((e, i) => {
              const era = ERA_META[e.era];
              const cat = CATEGORY_META[e.category];
              const expanded = expandedId === e.id;
              return (
                <div key={e.id} id={`event-${e.id}`} className="cs2-fadeup relative" style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}>
                  <div className="grid md:grid-cols-[160px_1fr] gap-4 md:gap-6">
                    {/* YEAR / NODE */}
                    <div className="relative flex md:flex-col items-center md:items-end gap-3 md:gap-1 md:pr-6">
                      <div className="cs2-display text-3xl sm:text-4xl" style={{ color: era.color }}>{e.year}</div>
                      <div className="cs2-mono text-[10px] tracking-widest text-[#666]">
                        {e.month && MONTHS[e.month - 1]}
                      </div>
                      {/* node dot on spine */}
                      <div className="hidden md:block absolute right-[-6px] top-3 w-3 h-3 rounded-full"
                        style={{
                          background: cat.color,
                          boxShadow: e.iconic ? `0 0 12px ${cat.color}` : "none",
                        }} />
                    </div>

                    {/* CARD */}
                    <button onClick={() => setExpandedId(expanded ? null : e.id)}
                      className="text-left transition-all hover:translate-x-1"
                      style={{
                        background: "linear-gradient(180deg, rgba(15,15,15,0.95), rgba(6,6,6,0.95))",
                        border: `1px solid ${expanded ? cat.color : "#2a2a2a"}`,
                        padding: "20px 24px",
                        boxShadow: expanded ? `0 12px 30px -15px ${cat.color}66` : "none",
                      }}>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="cs2-mono text-[9px] tracking-widest px-2 py-0.5" style={{ background: era.color, color: "#0a0a0a" }}>
                          {era.label}
                        </span>
                        <span className="cs2-mono text-[9px] tracking-widest px-2 py-0.5" style={{ border: `1px solid ${cat.color}`, color: cat.color }}>
                          {cat.label}
                        </span>
                        {e.iconic && (
                          <span className="cs2-mono text-[9px] tracking-widest px-2 py-0.5" style={{ background: "#F5A623", color: "#0a0a0a" }}>
                            ★ ICONIC
                          </span>
                        )}
                      </div>
                      <div className={`cs2-display leading-tight mb-2 ${e.iconic ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`} style={{ color: expanded ? cat.color : "#fff", transition: "color 200ms" }}>
                        {e.title[lang]}
                      </div>
                      <div className="cs2-mono text-sm sm:text-base text-[#aaa] leading-relaxed">
                        {e.blurb[lang]}
                      </div>

                      {expanded && (
                        <div className="mt-5 pt-5 border-t border-[#222]">
                          <div className="cs2-mono text-base leading-relaxed text-[#ddd]">
                            {e.body[lang]}
                          </div>
                          {e.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {e.tags.map((tag) => (
                                <span key={tag} className="cs2-mono text-[10px] tracking-widest px-2 py-0.5 text-[#666]" style={{ border: "1px solid #333" }}>
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {e.links && e.links.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                              {e.links.map((link) => (
                                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                                  onClick={(ev) => ev.stopPropagation()}
                                  className="cs2-mono text-xs tracking-widest px-3 py-1.5 hover:scale-105 transition-transform"
                                  style={{ border: `1px solid ${cat.color}`, color: cat.color }}>
                                  {link.label} ↗
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {!expanded && (
                        <div className="mt-3 cs2-mono text-[11px] tracking-widest flex items-center gap-2 text-[#F5A623]">
                          <span>READ MORE</span>
                          <span className="cs2-scroll-hint">▸</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="cs2-mono text-center py-20 text-[#555]">
              <div className="text-2xl mb-2">▸ NO MATCH</div>
              <div>No events in this filter. Try another.</div>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-6 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · HISTORY · 1999 → 2026</div>
          <div>legends · moments · tactics</div>
          <Link href={`/${lang}`} className="hover:text-white transition-colors">◂ home</Link>
        </div>
      </footer>
    </div>
  );
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function FilterPill({ label, active, onClick, color, small }: { label: string; active: boolean; onClick: () => void; color: string; small?: boolean }) {
  return (
    <button onClick={onClick}
      className={`cs2-mono tracking-widest transition-all ${small ? "text-[9px] px-2 py-1" : "text-[10px] px-3 py-1.5"}`}
      style={{
        background: active ? color : "transparent",
        color: active ? "#0a0a0a" : color,
        border: `1px solid ${color}`,
      }}>
      {label}
    </button>
  );
}
