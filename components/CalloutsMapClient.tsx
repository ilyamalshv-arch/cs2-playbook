"use client";
import { useState, useEffect, useRef } from "react";
import { Target, Eye, RotateCcw } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { useSynth } from "@/lib/synth";
import { centroid, pointInPolygon, type Callout } from "@/lib/callouts-mirage";

const QUIZ_TIME_MS = 4000;
const QUIZ_ROUNDS = 12;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

type Mode = "explore" | "quiz" | "results";
type Hit = { x: number; y: number; kind: "hit" | "miss"; id: string };

const localizedDesc = (c: Callout, lang: Lang) =>
  lang === "ru" ? c.desc_ru : lang === "es" ? c.desc_es : c.desc_en;

export default function CalloutsMapClient({
  lang,
  dict,
  mapName,
  mapLabel,
  mapTag,
  callouts,
  nextUp,
  bgPattern,
  floorDivider,
}: {
  lang: Lang;
  dict: Dict;
  mapName: string;
  mapLabel: string;
  mapTag: string;
  callouts: Callout[];
  nextUp: string;
  bgPattern?: "sand" | "stone";
  floorDivider?: { y: number; upperLabel: string; lowerLabel: string };
}) {
  const t = dict.callouts;
  const [muted, setMuted] = useState(false);
  const [mode, setMode] = useState<Mode>("explore");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [hits, setHits] = useState<Hit[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { ensure, play } = useSynth(muted);

  const [quiz, setQuiz] = useState({
    order: [] as string[],
    idx: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    best: 0,
    timeLeft: QUIZ_TIME_MS,
    feedback: null as null | "hit" | "miss" | "timeout" | "skip",
  });
  const tickRef = useRef<number | null>(null);

  const startQuiz = async () => {
    await ensure();
    const order = shuffle(callouts.map((c) => c.id)).slice(0, QUIZ_ROUNDS);
    setQuiz({ order, idx: 0, correct: 0, wrong: 0, streak: 0, best: quiz.best, timeLeft: QUIZ_TIME_MS, feedback: null });
    setHits([]); setHoverId(null); setFocusId(null);
    setMode("quiz");
  };

  const resetAll = () => {
    if (tickRef.current) cancelAnimationFrame(tickRef.current);
    setMode("explore"); setHits([]); setFocusId(null);
    setQuiz({ order: [], idx: 0, correct: 0, wrong: 0, streak: 0, best: quiz.best, timeLeft: QUIZ_TIME_MS, feedback: null });
  };

  useEffect(() => {
    if (mode !== "quiz" || quiz.feedback) return;
    const start = performance.now();
    let lastTick = QUIZ_TIME_MS;
    const loop = (now: number) => {
      const elapsed = now - start;
      const left = Math.max(0, QUIZ_TIME_MS - elapsed);
      setQuiz((q) => ({ ...q, timeLeft: left }));
      if (left < 2000 && Math.floor(left / 500) !== Math.floor(lastTick / 500)) play("tick");
      lastTick = left;
      if (left > 0) tickRef.current = requestAnimationFrame(loop);
      else handleTimeout();
    };
    tickRef.current = requestAnimationFrame(loop);
    return () => { if (tickRef.current) cancelAnimationFrame(tickRef.current); };
    // eslint-disable-next-line
  }, [mode, quiz.idx, quiz.feedback]);

  const advance = (nq: typeof quiz) => {
    setTimeout(() => {
      if (nq.idx >= QUIZ_ROUNDS) { play("done"); setMode("results"); setQuiz((q) => ({ ...q, best: Math.max(q.best, q.streak) })); }
      else { play("nextq"); setQuiz({ ...nq, timeLeft: QUIZ_TIME_MS, feedback: null }); }
    }, 900);
  };

  const handleTimeout = () => {
    setQuiz((q) => {
      const nq = { ...q, wrong: q.wrong + 1, streak: 0, best: Math.max(q.best, q.streak), feedback: "timeout" as const, idx: q.idx + 1 };
      advance(nq); return nq;
    });
    play("miss");
  };

  const handleSkip = () => {
    if (mode !== "quiz" || quiz.feedback) return;
    setQuiz((q) => { const nq = { ...q, wrong: q.wrong + 1, streak: 0, best: Math.max(q.best, q.streak), feedback: "skip" as const, idx: q.idx + 1 }; advance(nq); return nq; });
  };

  const onZoneMove = (e: React.MouseEvent, id: string) => {
    setHoverId(id);
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const onSvgClick = async (e: React.MouseEvent) => {
    if (mode !== "quiz" || quiz.feedback) return;
    await ensure();
    if (!svgRef.current) return;
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const loc = pt.matrixTransform(svgRef.current.getScreenCTM()!.inverse());
    const target = quiz.order[quiz.idx];
    const targetCallout = callouts.find((c) => c.id === target)!;
    const isHit = pointInPolygon(loc.x, loc.y, targetCallout.poly);
    setHits((p) => [...p, { x: loc.x, y: loc.y, kind: isHit ? "hit" : "miss", id: target }]);
    if (isHit) {
      play("hit");
      setQuiz((q) => { const ns = q.streak + 1; const nq = { ...q, correct: q.correct + 1, streak: ns, best: Math.max(q.best, ns), feedback: "hit" as const, idx: q.idx + 1 }; advance(nq); return nq; });
    } else {
      play("miss");
      setQuiz((q) => { const nq = { ...q, wrong: q.wrong + 1, streak: 0, best: Math.max(q.best, q.streak), feedback: "miss" as const, idx: q.idx + 1 }; advance(nq); return nq; });
    }
  };

  const currentTarget = mode === "quiz" ? callouts.find((c) => c.id === quiz.order[quiz.idx]) : null;
  const timePct = (quiz.timeLeft / QUIZ_TIME_MS) * 100;
  const timeCritical = quiz.timeLeft < 1500;
  const focusCallout = focusId ? callouts.find((c) => c.id === focusId) : null;
  const hoverCallout = hoverId ? callouts.find((c) => c.id === hoverId) : null;
  const accuracy = quiz.correct + quiz.wrong > 0 ? Math.round((quiz.correct / (quiz.correct + quiz.wrong)) * 100) : 0;

  const rank = (() => {
    if (accuracy >= 90) return { tag: "GLOBAL ELITE",    color: "#F5A623", quip: "are you faceit level 10? be honest." };
    if (accuracy >= 75) return { tag: "SUPREME",         color: "#F5A623", quip: "solid. you could actually IGL." };
    if (accuracy >= 55) return { tag: "LEGENDARY EAGLE", color: "#fff",    quip: "respectable. keep grinding." };
    if (accuracy >= 35) return { tag: "GOLD NOVA",       color: "#aaa",    quip: "decent. now do it again without tilting." };
    return                    { tag: "SILVER ELITE",     color: "#888",    quip: "bro... did you just open csgo?" };
  })();

  const pattern = bgPattern ?? "sand";

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <style>{`
        .cs2-zone { fill: rgba(245,166,35,0.04); stroke: rgba(245,166,35,0.25); stroke-width: 1; transition: fill 180ms, stroke 180ms, filter 180ms; cursor: crosshair; }
        .cs2-zone.hov { fill: rgba(245,166,35,0.22); stroke: #F5A623; stroke-width: 2; filter: drop-shadow(0 0 14px rgba(245,166,35,0.55)); }
        .cs2-zone.sel { fill: rgba(245,166,35,0.35); stroke: #F5A623; stroke-width: 2.5; }
        @keyframes hit-flash { 0%{opacity:0;} 10%{opacity:1;} 100%{opacity:0;} }
        .cs2-hitflash { animation: hit-flash 0.5s ease-out forwards; }
        @keyframes miss-shake { 0%,100%{transform:translate(0,0);} 20%{transform:translate(-8px,3px);} 40%{transform:translate(7px,-3px);} 60%{transform:translate(-5px,2px);} 80%{transform:translate(4px,-1px);} }
        .cs2-missshake { animation: miss-shake 0.3s linear; }
        @keyframes target-pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.05);opacity:0.8;} }
        .cs2-targetpulse { animation: target-pulse 1.2s ease-in-out infinite; }
        @keyframes bar-crit { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        .cs2-barcrit { animation: bar-crit 0.4s infinite; }
      `}</style>

      <HudBar
        lang={lang} muted={muted} onMute={() => setMuted((m) => !m)}
        backHref={`/${lang}/callouts`}
        title="CALLOUTS"
        subtitle={mapLabel}
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />

      <section className="relative pt-24 pb-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">{mapTag}</div>
          <h1 className="cs2-display mt-2 text-5xl sm:text-6xl text-white" style={{ letterSpacing: "0.01em" }}>
            {mapLabel} <span className="text-[#F5A623]">CALLOUTS</span>
          </h1>
          <div className="cs2-mono text-base mt-2 text-[#888]">de_{mapName} · {lang === "ru" ? "коллауты" : lang === "es" ? "llamadas" : "callouts"}</div>
          <p className="cs2-mono text-base sm:text-lg max-w-2xl mt-4 text-[#aaa]">{t.desc}</p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button onClick={resetAll} className={`cs2-mono text-xs tracking-widest px-4 py-2 flex items-center gap-2 transition-colors ${mode === "explore" ? "" : "hover:text-white"}`}
              style={{ background: mode === "explore" ? "#F5A623" : "transparent", color: mode === "explore" ? "#0a0a0a" : "#666", border: `1px solid ${mode === "explore" ? "#F5A623" : "#333"}` }}>
              <Eye size={12} />{t.mode_explore}
            </button>
            <button onClick={startQuiz} className={`cs2-mono text-xs tracking-widest px-4 py-2 flex items-center gap-2 transition-colors ${mode !== "explore" ? "" : "hover:text-white"}`}
              style={{ background: mode !== "explore" ? "#D0021B" : "transparent", color: mode !== "explore" ? "#fff" : "#666", border: `1px solid ${mode !== "explore" ? "#D0021B" : "#333"}` }}>
              <Target size={12} />{t.mode_quiz}
            </button>
            <div className="ml-auto cs2-mono text-xs tracking-widest text-[#444]">
              {callouts.length} {t.legend_zones} · {t.legend_en_es}
            </div>
          </div>
        </div>
      </section>

      {mode === "quiz" && currentTarget && !quiz.feedback && (
        <section className="px-6 sm:px-10 mb-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative" style={{ background: "#060606", border: "1px solid #D0021B", padding: "20px 24px" }}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="cs2-mono text-[10px] tracking-[0.4em] mb-2 text-[#D0021B]">▸ TARGET · {String(quiz.idx + 1).padStart(2, "0")} / {QUIZ_ROUNDS}</div>
                  <div className="cs2-mono text-xs tracking-widest text-[#888]">{t.quiz_find}</div>
                  <div key={currentTarget.id} className="cs2-popin cs2-display text-4xl sm:text-5xl mt-1 cs2-targetpulse text-white">{currentTarget.en}</div>
                  <div className="cs2-mono text-sm mt-1 text-[#666]">· {currentTarget.ru} · {currentTarget.es}</div>
                  <div className="cs2-mono text-xs mt-3 text-[#666]">▸ {t.quiz_in}</div>
                </div>
                <div className="flex gap-3 sm:gap-6 items-center">
                  <Stat label={t.streak} value={quiz.streak} color={quiz.streak > 3 ? "#F5A623" : "#fff"} />
                  <Stat label={t.best} value={quiz.best} color="#888" />
                  <button onClick={handleSkip} className="cs2-mono text-xs tracking-widest px-3 py-2 hover:text-white transition-colors text-[#666]" style={{ border: "1px solid #333" }}>{t.skip}</button>
                </div>
              </div>
              <div className="mt-4 h-1 bg-[#1a1a1a] relative overflow-hidden">
                <div className={`absolute inset-y-0 left-0 ${timeCritical ? "cs2-barcrit" : ""}`} style={{ width: `${timePct}%`, background: timeCritical ? "#D0021B" : "#F5A623", transition: "width 80ms linear" }} />
              </div>
              <div className="flex justify-between cs2-mono text-[10px] mt-1 text-[#555]">
                <span>{(quiz.timeLeft / 1000).toFixed(1)}s</span>
                <span>HIT {quiz.correct} · MISS {quiz.wrong}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === "quiz" && quiz.feedback && (
        <section className="px-6 sm:px-10 mb-6">
          <div className="max-w-6xl mx-auto">
            <div className={`cs2-popin relative ${quiz.feedback === "miss" || quiz.feedback === "timeout" ? "cs2-missshake" : ""}`}
              style={{ background: quiz.feedback === "hit" ? "rgba(245,166,35,0.1)" : "rgba(208,2,27,0.1)", border: `2px solid ${quiz.feedback === "hit" ? "#F5A623" : "#D0021B"}`, padding: 24 }}>
              <div className="cs2-display text-5xl sm:text-6xl" style={{ color: quiz.feedback === "hit" ? "#F5A623" : "#D0021B" }}>
                {quiz.feedback === "hit" ? t.quiz_hit : quiz.feedback === "timeout" ? t.quiz_timeout : t.quiz_miss}
              </div>
              <div className="cs2-mono text-sm mt-2 text-[#aaa]">
                it was <span className="text-[#F5A623]">{callouts.find((c) => c.id === quiz.order[quiz.idx - 1])?.en}</span> — {localizedDesc(callouts.find((c) => c.id === quiz.order[quiz.idx - 1])!, lang)}
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === "results" && (
        <section className="px-6 sm:px-10 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="cs2-popin relative" style={{ background: "#060606", border: "1px solid #F5A623", padding: "40px 32px" }}>
              <div className="cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">▸ {t.results_title}</div>
              <div className="cs2-display text-5xl sm:text-7xl mt-2 text-white">
                {quiz.correct} <span className="text-[#555]">/</span> {QUIZ_ROUNDS}
              </div>
              <div className="cs2-mono text-lg mt-2 text-[#aaa]">
                {accuracy}% {t.accuracy.toLowerCase()} · {t.best.toLowerCase()} {quiz.best} {t.streak.toLowerCase()}
              </div>
              <div className="mt-8 cs2-mono text-xs tracking-[0.4em] text-[#666]">▸ RANK</div>
              <div className="cs2-display text-4xl sm:text-5xl mt-2" style={{ color: rank.color }}>{rank.tag}</div>
              <div className="cs2-mono text-base mt-2 text-[#888]">« {rank.quip} »</div>
              <div className="flex gap-3 mt-10 flex-wrap">
                <button onClick={startQuiz} className="cs2-mono text-sm tracking-widest px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform" style={{ background: "#F5A623", color: "#0a0a0a" }}>
                  <RotateCcw size={14} />{t.again}
                </button>
                <button onClick={resetAll} className="cs2-mono text-sm tracking-widest px-6 py-3 flex items-center gap-2 hover:text-white transition-colors text-[#888]" style={{ background: "transparent", border: "1px solid #333" }}>
                  <Eye size={14} />{t.review}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {mode !== "results" && (
        <section className="px-6 sm:px-10 pb-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            <div className="relative">
              <div className="cs2-mono text-xs tracking-[0.3em] mb-3 text-[#555]">▸ DE_{mapName.toUpperCase()} · OVERHEAD</div>
              <div className="relative" style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 12 }}>
                <svg ref={svgRef} viewBox="0 0 800 800" className="w-full h-auto cs2-fadeup" onClick={onSvgClick} onMouseLeave={() => setHoverId(null)} style={{ cursor: mode === "quiz" ? "crosshair" : "default" }}>
                  <defs>
                    <pattern id={`pattern-${mapName}`} width="4" height="4" patternUnits="userSpaceOnUse">
                      <rect width="4" height="4" fill="#151515" />
                      <circle cx="1" cy="1" r="0.3" fill="#1f1f1f" />
                      <circle cx="3" cy="3" r="0.3" fill="#1a1a1a" />
                    </pattern>
                    <linearGradient id={`overlay-${mapName}`} x1="0" y1="0" x2="1" y2="1">
                      {pattern === "sand" ? (
                        <>
                          <stop offset="0%" stopColor="#2a1f10" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#1a1310" stopOpacity="0.3" />
                        </>
                      ) : (
                        <>
                          <stop offset="0%" stopColor="#1f1a15" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#12100d" stopOpacity="0.3" />
                        </>
                      )}
                    </linearGradient>
                  </defs>
                  <rect width="800" height="800" fill={`url(#pattern-${mapName})`} />
                  <rect width="800" height="800" fill={`url(#overlay-${mapName})`} />
                  {Array.from({ length: 17 }).map((_, i) => (
                    <g key={i}>
                      <line x1={i * 50} y1="0" x2={i * 50} y2="800" stroke="rgba(245,166,35,0.04)" strokeWidth="1" />
                      <line x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="rgba(245,166,35,0.04)" strokeWidth="1" />
                    </g>
                  ))}
                  <text x="140" y="28" className="cs2-mono" fontSize="11" fill="#D0021B" letterSpacing="3">T SIDE</text>
                  <text x="700" y="785" className="cs2-mono" fontSize="11" fill="#5dade2" textAnchor="end" letterSpacing="3">CT SIDE</text>
                  <line x1="400" y1="0" x2="400" y2="800" stroke="rgba(245,166,35,0.06)" strokeWidth="1" />
                  <line x1="0" y1="400" x2="800" y2="400" stroke="rgba(245,166,35,0.06)" strokeWidth="1" />

                  {floorDivider && (
                    <g>
                      <line x1="0" y1={floorDivider.y} x2="800" y2={floorDivider.y}
                        stroke="#F5A623" strokeWidth="2" strokeDasharray="10 8" opacity="0.5" />
                      <rect x="20" y={floorDivider.y - 24} width="130" height="20"
                        fill="#0a0a0a" stroke="#F5A623" strokeWidth="1" />
                      <text x="85" y={floorDivider.y - 10} textAnchor="middle"
                        className="cs2-mono" fontSize="11" fill="#F5A623" letterSpacing="2">
                        {floorDivider.upperLabel}
                      </text>
                      <rect x="20" y={floorDivider.y + 4} width="130" height="20"
                        fill="#0a0a0a" stroke="#F5A623" strokeWidth="1" />
                      <text x="85" y={floorDivider.y + 18} textAnchor="middle"
                        className="cs2-mono" fontSize="11" fill="#F5A623" letterSpacing="2">
                        {floorDivider.lowerLabel}
                      </text>
                    </g>
                  )}

                  {callouts.map((c) => {
                    const [cx, cy] = centroid(c.poly);
                    const isHover = hoverId === c.id;
                    const isSel = focusId === c.id;
                    return (
                      <g key={c.id}
                        onMouseEnter={() => { setHoverId(c.id); play("hover"); }}
                        onMouseMove={(e) => onZoneMove(e, c.id)}
                        onClick={(e) => { if (mode === "explore") { e.stopPropagation(); ensure(); play("hover"); setFocusId((f) => f === c.id ? null : c.id); } }}
                      >
                        <polygon points={c.poly} className={`cs2-zone ${isHover ? "hov" : ""} ${isSel ? "sel" : ""}`} />
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" className="cs2-mono pointer-events-none" fontSize="11"
                          fill={isHover || isSel ? "#fff" : "rgba(245,166,35,0.55)"} letterSpacing="1.5">
                          {c.en.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}

                  {mode === "quiz" && currentTarget && timeCritical && !quiz.feedback && (
                    <circle cx={centroid(currentTarget.poly)[0]} cy={centroid(currentTarget.poly)[1]} r="60" fill="none" stroke="#D0021B" strokeWidth="2" opacity="0.4">
                      <animate attributeName="r" values="60;30;60" dur="0.6s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {hits.map((h, i) => (
                    <g key={i} transform={`translate(${h.x} ${h.y})`}>
                      {h.kind === "hit" ? (
                        <>
                          <circle r="18" fill="none" stroke="#F5A623" strokeWidth="2" className="cs2-hitflash" />
                          <line x1="-8" y1="-8" x2="8" y2="8" stroke="#F5A623" strokeWidth="2" />
                          <line x1="8" y1="-8" x2="-8" y2="8" stroke="#F5A623" strokeWidth="2" />
                          <circle r="3" fill="#F5A623" />
                        </>
                      ) : (
                        <>
                          <circle r="4" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                          <circle r="1.5" fill="#000" />
                          {Array.from({ length: 5 }).map((_, j) => {
                            const a = (j / 5) * Math.PI * 2;
                            return <line key={j} x1={Math.cos(a) * 4} y1={Math.sin(a) * 4} x2={Math.cos(a) * 8} y2={Math.sin(a) * 8} stroke="#444" strokeWidth="0.5" />;
                          })}
                        </>
                      )}
                    </g>
                  ))}

                  {[[12, 12], [788, 12], [12, 788], [788, 788]].map(([x, y], i) => (
                    <g key={i} stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.5">
                      <line x1={x + (x < 100 ? 0 : -14)} y1={y} x2={x + (x < 100 ? 14 : 0)} y2={y} />
                      <line x1={x} y1={y + (y < 100 ? 0 : -14)} x2={x} y2={y + (y < 100 ? 14 : 0)} />
                    </g>
                  ))}
                </svg>

                {mode === "explore" && hoverCallout && (
                  <div className="absolute pointer-events-none cs2-fadeup"
                    style={{ left: Math.min(tooltipPos.x + 20, 500), top: tooltipPos.y + 12, background: "rgba(5,5,5,0.96)", border: "1px solid #F5A623", padding: "10px 14px", zIndex: 10, minWidth: 200 }}>
                    <div className="cs2-mono text-[10px] tracking-widest text-[#F5A623]">EN</div>
                    <div className="cs2-display text-lg text-white">{hoverCallout.en}</div>
                    <div className="cs2-mono text-[10px] tracking-widest mt-2 text-[#888]">RU</div>
                    <div className="cs2-mono text-sm text-[#ddd]">{hoverCallout.ru}</div>
                    <div className="cs2-mono text-[10px] tracking-widest mt-2 text-[#888]">ES</div>
                    <div className="cs2-mono text-sm text-[#ddd]">{hoverCallout.es}</div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-3 cs2-mono text-[11px] text-[#555]">
                <span>▸ {mode === "quiz" ? t.tip_click : t.tip_hover}</span>
                <span className="ml-auto">SCALE 1:100 · N ↑</span>
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-20">
              {mode === "explore" && (
                <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 20, minHeight: 280 }}>
                  <div className="cs2-mono text-[10px] tracking-widest mb-3 text-[#F5A623]">▸ CALLOUT INFO</div>
                  {focusCallout ? (
                    <div className="cs2-fadeup" key={focusId}>
                      <div className="cs2-mono text-[10px] tracking-widest mb-1 text-[#666]">{t.label_en}</div>
                      <div className="cs2-display text-2xl mb-3 text-white">{focusCallout.en}</div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="cs2-mono text-[10px] tracking-widest text-[#666]">{t.label_ru}</div>
                          <div className="cs2-mono text-base text-[#ddd]">{focusCallout.ru}</div>
                        </div>
                        <div>
                          <div className="cs2-mono text-[10px] tracking-widest text-[#666]">{t.label_es}</div>
                          <div className="cs2-mono text-base text-[#ddd]">{focusCallout.es}</div>
                        </div>
                      </div>
                      <div className="cs2-mono text-sm leading-relaxed pt-3 border-t border-[#222] text-[#aaa]">{localizedDesc(focusCallout, lang)}</div>
                    </div>
                  ) : (
                    <div className="cs2-mono text-sm text-[#555]">
                      <div>▸ select a zone on the map.</div>
                      <div className="mt-2">click a polygon to read its full name and role in executes.</div>
                    </div>
                  )}
                </div>
              )}

              <div style={{ background: "#060606", border: "1px solid #1a1a1a" }}>
                <div className="px-4 py-2 border-b border-[#1a1a1a] cs2-mono text-[10px] tracking-widest text-[#666]">
                  ▸ ALL ZONES ({callouts.length})
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  {callouts.map((c) => (
                    <button key={c.id}
                      onClick={() => { if (mode === "explore") { setFocusId(c.id); setHoverId(c.id); } }}
                      onMouseEnter={() => setHoverId(c.id)}
                      onMouseLeave={() => setHoverId(null)}
                      className="w-full text-left px-3 py-1.5 cs2-mono text-sm hover:bg-[#111] flex justify-between items-center transition-colors"
                      style={{ color: focusId === c.id ? "#F5A623" : hoverId === c.id ? "#fff" : "#888", background: focusId === c.id ? "rgba(245,166,35,0.06)" : "transparent" }}>
                      <span>{c.en}</span>
                      <span className="text-[10px] text-[#444]">{lang === "ru" ? c.ru : lang === "es" ? c.es : c.ru}</span>
                    </button>
                  ))}
                </div>
              </div>

              {mode === "quiz" && (
                <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 16 }}>
                  <div className="cs2-mono text-[10px] tracking-widest mb-3 text-[#666]">▸ LIVE STATS</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><div className="cs2-mono text-[10px] text-[#666]">HIT</div><div className="cs2-display text-2xl text-[#F5A623]">{quiz.correct}</div></div>
                    <div><div className="cs2-mono text-[10px] text-[#666]">MISS</div><div className="cs2-display text-2xl text-[#D0021B]">{quiz.wrong}</div></div>
                    <div><div className="cs2-mono text-[10px] text-[#666]">{t.streak}</div><div className="cs2-display text-2xl" style={{ color: quiz.streak > 3 ? "#F5A623" : "#fff" }}>{quiz.streak}</div></div>
                    <div><div className="cs2-mono text-[10px] text-[#666]">{t.accuracy}</div><div className="cs2-display text-2xl text-white">{accuracy}%</div></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-[#1a1a1a] px-6 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · CALLOUTS · {mapLabel}</div>
          <div>next up: <span className="text-[#F5A623]">{nextUp}</span></div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="cs2-mono text-[10px] tracking-widest text-[#666]">{label}</div>
      <div className="cs2-display text-3xl" style={{ color }}>{value}</div>
    </div>
  );
}
