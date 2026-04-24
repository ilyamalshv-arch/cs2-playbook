"use client";
import { useState, useEffect, useMemo } from "react";
import { CheckCircle2, Lock, Trophy, Zap, RotateCcw } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { TRAINING_DAYS, STAGES, type TrainingDay } from "@/lib/training-data";

const STORAGE_KEY = "cs2_training_progress_v1";

type Progress = {
  completed: Record<number, boolean>; // dayNum -> true
  taskStates: Record<string, boolean>; // `${day}-${idx}` -> true
};

const EMPTY: Progress = { completed: {}, taskStates: {} };

export default function TrainingClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [filter, setFilter] = useState<0 | 1 | 2 | 3>(0);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  // persist
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  }, [progress, loaded]);

  const totalXp = useMemo(() => {
    return TRAINING_DAYS.reduce((sum, d) => progress.completed[d.day] ? sum + d.xp : sum, 0);
  }, [progress]);

  const completedCount = useMemo(() =>
    Object.values(progress.completed).filter(Boolean).length,
  [progress]);

  const currentStage = (() => {
    if (completedCount < 30) return 1;
    if (completedCount < 60) return 2;
    return 3;
  })();

  const toggleTask = (dayNum: number, taskIdx: number) => {
    setProgress((p) => {
      const key = `${dayNum}-${taskIdx}`;
      const newStates = { ...p.taskStates, [key]: !p.taskStates[key] };
      // if all tasks of day done → mark day completed
      const day = TRAINING_DAYS.find((d) => d.day === dayNum)!;
      const allDone = day.tasks.every((_, i) => newStates[`${dayNum}-${i}`]);
      const newCompleted = { ...p.completed };
      if (allDone) newCompleted[dayNum] = true;
      else delete newCompleted[dayNum];
      return { completed: newCompleted, taskStates: newStates };
    });
  };

  const resetAll = () => {
    if (!confirm("Reset all training progress? This can't be undone.")) return;
    setProgress(EMPTY);
  };

  const filtered = filter === 0 ? TRAINING_DAYS : TRAINING_DAYS.filter((d) => d.stage === filter);
  const stageMeta = STAGES[currentStage - 1];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <HudBar
        lang={lang} muted={muted} onMute={() => setMuted((m) => !m)}
        backHref={`/${lang}`}
        title="TRAINING"
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />

      <section className="pt-24 pb-8 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">// 03 · T SPAWN · 90-DAY PLAN</div>
          <h1 className="cs2-display mt-2 text-4xl sm:text-5xl md:text-7xl text-white" style={{ letterSpacing: "0.01em" }}>
            BATTLE <span className="text-[#F5A623]">PASS</span>
          </h1>
          <p className="cs2-reveal cs2-mono text-base sm:text-lg max-w-2xl mt-4 text-[#aaa]" style={{ animationDelay: "0.15s" }}>
            Three 30-day stages. Daily drills. Check the tasks as you do them. Progress saved locally — no account, no tracking, just you and the grind.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="px-4 sm:px-10 mb-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-4 gap-3">
          <StatBox label="DAYS DONE" value={`${completedCount}/90`} color="#F5A623" />
          <StatBox label="TOTAL XP" value={totalXp.toLocaleString()} color="#F5A623" />
          <StatBox label="CURRENT STAGE" value={stageMeta.name.split(" ")[0]} color={stageMeta.color} />
          <StatBox label="COMPLETION" value={`${Math.round((completedCount / 90) * 100)}%`} color="#2ECC71" />
        </div>
      </section>

      {/* STAGE TRACK */}
      <section className="px-4 sm:px-10 mb-6">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#666]">▸ PROGRESSION · UNLOCKABLE REWARDS</div>
          <div className="grid sm:grid-cols-3 gap-3">
            {STAGES.map((s) => {
              const stageDays = TRAINING_DAYS.filter((d) => d.stage === s.num);
              const done = stageDays.filter((d) => progress.completed[d.day]).length;
              const pct = Math.round((done / stageDays.length) * 100);
              const unlocked = done === stageDays.length;
              return (
                <div key={s.num}
                  style={{
                    background: "#060606",
                    border: `1px solid ${unlocked ? s.color : currentStage === s.num ? s.color : "#1a1a1a"}`,
                    padding: 16,
                    boxShadow: unlocked ? `0 0 25px ${s.color}44` : "none",
                  }}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="cs2-display text-lg" style={{ color: s.color }}>STAGE {s.num}</div>
                    <div className="cs2-mono text-[10px] tracking-widest text-[#666]">{s.range}</div>
                  </div>
                  <div className="cs2-mono text-sm mb-3 text-[#ddd]">{s.name}</div>
                  <div className="cs2-mono text-xs mb-3 text-[#888]">{s.focus}</div>
                  <div className="h-1 bg-[#1a1a1a] mb-2">
                    <div className="h-full transition-all" style={{ width: `${pct}%`, background: s.color }} />
                  </div>
                  <div className="cs2-mono text-[10px] text-[#666] mb-3">{done}/{stageDays.length} days · {pct}%</div>
                  <div className="cs2-mono text-xs flex items-center gap-2 pt-3 border-t border-[#222]"
                    style={{ color: unlocked ? s.color : "#555" }}>
                    {unlocked ? <Trophy size={14} /> : <Lock size={14} />}
                    <span>{s.skin}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FILTER + RESET */}
      <section className="px-4 sm:px-10 mb-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2">
          <div className="cs2-mono text-[10px] tracking-[0.4em] mr-2 text-[#666]">▸ FILTER</div>
          <FilterPill label="ALL 90 DAYS" active={filter === 0} onClick={() => setFilter(0)} color="#F5A623" />
          {STAGES.map((s) => (
            <FilterPill key={s.num} label={`STAGE ${s.num}`} active={filter === s.num} onClick={() => setFilter(s.num as any)} color={s.color} />
          ))}
          <button onClick={resetAll}
            className="ml-auto cs2-mono text-[10px] tracking-widest px-3 py-2 hover:text-white transition-colors flex items-center gap-1 text-[#888]"
            style={{ border: "1px solid #333" }}>
            <RotateCcw size={11} /> RESET
          </button>
        </div>
      </section>

      {/* DAYS GRID */}
      <section className="px-4 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((day) => {
            const stage = STAGES[day.stage - 1];
            const done = progress.completed[day.day];
            const taskDone = day.tasks.filter((_, i) => progress.taskStates[`${day.day}-${i}`]).length;
            const expanded = activeDay === day.day;
            return (
              <div key={day.day}
                style={{
                  background: "#060606",
                  border: `1px solid ${done ? stage.color : expanded ? "#F5A623" : "#1a1a1a"}`,
                  padding: 0,
                  boxShadow: done ? `0 0 15px ${stage.color}22` : "none",
                }}>
                <button onClick={() => setActiveDay(expanded ? null : day.day)}
                  className="w-full text-left p-4 transition-colors hover:bg-[#0d0d0d]">
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="cs2-mono text-[10px] tracking-widest px-1.5 py-0.5"
                        style={{ background: stage.color, color: "#0a0a0a" }}>S{day.stage}</span>
                      <span className="cs2-display text-2xl text-white">DAY {day.day}</span>
                      {done && <CheckCircle2 size={18} style={{ color: stage.color }} />}
                    </div>
                    <div className="cs2-mono text-[10px] text-[#666]">+{day.xp} XP</div>
                  </div>
                  <div className="cs2-mono text-sm text-[#ddd] mb-2">{day.title}</div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 bg-[#1a1a1a] flex-1 rounded">
                      <div className="h-full rounded transition-all" style={{ width: `${(taskDone / day.tasks.length) * 100}%`, background: done ? stage.color : "#F5A623" }} />
                    </div>
                    <div className="cs2-mono text-[10px] text-[#666]">{taskDone}/{day.tasks.length}</div>
                  </div>
                </button>
                {expanded && (
                  <div className="px-4 pb-4 border-t border-[#1a1a1a] pt-3 cs2-fadeup">
                    {day.tasks.map((task, i) => {
                      const key = `${day.day}-${i}`;
                      const isDone = !!progress.taskStates[key];
                      return (
                        <label key={i} className="flex items-start gap-3 py-2.5 sm:py-1.5 cursor-pointer group">
                          <div className="mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center"
                            style={{
                              background: isDone ? stage.color : "transparent",
                              border: `1px solid ${isDone ? stage.color : "#444"}`,
                            }}>
                            {isDone && <CheckCircle2 size={12} style={{ color: "#0a0a0a" }} />}
                          </div>
                          <input type="checkbox" checked={isDone} onChange={() => toggleTask(day.day, i)} className="sr-only" />
                          <span className="cs2-mono text-sm leading-relaxed"
                            style={{ color: isDone ? "#666" : "#ddd", textDecoration: isDone ? "line-through" : "none" }}>
                            {task}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-4 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · TRAINING · 90-DAY PLAN</div>
          <div className="flex items-center gap-2">
            <Zap size={11} style={{ color: "#F5A623" }} />
            <span>progress saved locally · no account</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: "#060606", border: "1px solid #1a1a1a", padding: 16 }}>
      <div className="cs2-mono text-[10px] tracking-[0.4em] text-[#666]">{label}</div>
      <div className="cs2-display text-2xl mt-1" style={{ color }}>{value}</div>
    </div>
  );
}

function FilterPill({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color: string }) {
  return (
    <button onClick={onClick}
      className="cs2-mono text-[10px] tracking-widest px-3 py-2 transition-all"
      style={{
        background: active ? color : "transparent",
        color: active ? "#0a0a0a" : color,
        border: `1px solid ${color}`,
      }}>
      {label}
    </button>
  );
}
