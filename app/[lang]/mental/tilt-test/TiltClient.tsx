"use client";
import { useState, useEffect } from "react";
import { AlertTriangle, RotateCcw, Share2 } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { useSynth } from "@/lib/synth";
import { QUESTIONS, getDiagnosis } from "@/lib/tilt-data";

type Phase = "landing" | "intro" | "quiz" | "results";

export default function TiltClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const t = dict.tilt;
  const [muted, setMuted] = useState(false);
  const [phase, setPhase] = useState<Phase>("landing");
  const [introStep, setIntroStep] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<{ weight: number; tags: string[] }[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [useTTS, setUseTTS] = useState(false);
  const { ensure, play } = useSynth(muted);
  const questions = QUESTIONS[lang];

  const speak = (text: string) => {
    if (!useTTS || typeof window === "undefined") return;
    try {
      window.speechSynthesis?.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95; u.pitch = 0.75; u.volume = muted ? 0 : 0.7;
      u.lang = lang === "en" ? "en-US" : lang === "ru" ? "ru-RU" : "es-AR";
      window.speechSynthesis?.speak(u);
    } catch {}
  };

  const begin = async () => {
    await ensure();
    play("door");
    setPhase("intro");
    setIntroStep(0);
  };

  useEffect(() => {
    if (phase !== "intro") return;
    const lines = t.intro_lines;
    if (introStep >= lines.length) {
      const id = setTimeout(() => setPhase("quiz"), 1200);
      return () => clearTimeout(id);
    }
    const delay = introStep === 0 ? 400 : 2300;
    const id = setTimeout(() => {
      play("type");
      speak(lines[introStep]);
      setIntroStep(s => s + 1);
    }, delay);
    return () => clearTimeout(id);
    // eslint-disable-next-line
  }, [phase, introStep, lang]);

  useEffect(() => {
    if (phase !== "quiz") return;
    play("type");
    speak(questions[qIdx].q);
    setSelectedOption(null);
    // eslint-disable-next-line
  }, [phase, qIdx, lang]);

  const onPick = (optIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    play("select");
    const opt = questions[qIdx].options[optIdx];
    const newAnswers = [...answers, { weight: opt.weight, tags: opt.tags }];
    setAnswers(newAnswers);
    setTimeout(() => {
      play("confirm");
      if (qIdx + 1 >= questions.length) { play("verdict"); setPhase("results"); }
      else setQIdx(qIdx + 1);
    }, 700);
  };

  const retake = () => {
    setPhase("landing"); setAnswers([]); setQIdx(0);
    setIntroStep(0); setSelectedOption(null);
  };

  const maxWeight = questions.length * 3;
  const totalWeight = answers.reduce((s, a) => s + a.weight, 0);
  const pct = Math.round((totalWeight / maxWeight) * 100);
  const diagnosis = phase === "results" ? getDiagnosis(pct, lang) : null;

  const dominantTags = (() => {
    if (phase !== "results") return [];
    const counts: Record<string, number> = {};
    answers.forEach(a => a.tags.forEach(tag => { counts[tag] = (counts[tag] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).filter(([tag]) => tag !== "mature").slice(0, 3).map(([tag]) => tag);
  })();

  const share = async () => {
    if (!diagnosis) return;
    const text = t.share_text.replace("{title}", diagnosis.tag).replace("{pct}", String(pct));
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <style>{`
        @keyframes type-in { from{opacity:0;transform:translateX(-12px);} to{opacity:1;transform:translateX(0);} }
        .cs2-typein { animation: type-in 0.35s ease-out both; }
        @keyframes light-flicker {
          0%,100% { opacity: 0.85; }
          3% { opacity: 0.4; } 6% { opacity: 0.9; }
          45% { opacity: 0.85; } 48% { opacity: 0.5; } 51% { opacity: 0.85; }
        }
        .cs2-light { animation: light-flicker 6s infinite; }
        @keyframes meter-shake { 0%,100%{transform:translate(0,0);} 25%{transform:translate(-1px,1px);} 75%{transform:translate(1px,-1px);} }
        .cs2-metershake { animation: meter-shake 0.1s infinite; }
        @keyframes bulb-pulse { 0%,100%{filter: drop-shadow(0 0 10px rgba(245,166,35,0.4));} 50%{filter: drop-shadow(0 0 25px rgba(245,166,35,0.8));} }
        .cs2-bulb { animation: bulb-pulse 2.5s ease-in-out infinite; }
        .cs2-opt { background: rgba(20,20,20,0.7); border: 1px solid #222; transition: all 180ms; cursor: pointer; position: relative; overflow: hidden; }
        .cs2-opt:hover:not(.selected):not(.disabled) { border-color: #F5A623; background: rgba(245,166,35,0.06); transform: translateX(4px); }
        .cs2-opt.selected { border-color: #F5A623; background: rgba(245,166,35,0.12); }
        .cs2-opt.disabled { opacity: 0.3; cursor: not-allowed; }
        .cs2-opt::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: #333; transition: background 180ms; }
        .cs2-opt:hover::before { background: #F5A623; }
        .cs2-opt.selected::before { background: #F5A623; }
      `}</style>

      <HudBar lang={lang} muted={muted} onMute={() => setMuted(m => !m)} backHref={`/${lang}`}
        title="MENTAL" subtitle="TILT TEST"
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
        extras={<button onClick={() => setUseTTS(v => !v)} className="hidden sm:flex items-center gap-1 hover:text-white transition-colors text-[10px]"><span>VOICE {useTTS ? "ON" : "OFF"}</span></button>}
      />

      {phase === "landing" && (
        <section className="relative pt-24 pb-20 px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">{t.section}</div>
            <h1 className="cs2-display mt-2 leading-[0.9]" style={{ fontSize: "clamp(56px, 10vw, 130px)" }}>
              <span className="cs2-reveal block text-white">{t.title1}</span>
              <span className="cs2-reveal block text-[#D0021B]" style={{ animationDelay: "0.15s" }}>{t.title2}</span>
            </h1>
            <div className="cs2-reveal cs2-mono text-base mt-3 tracking-widest text-[#888]" style={{ animationDelay: "0.3s" }}>{t.subtitle}</div>
            <p className="cs2-reveal cs2-mono text-lg sm:text-xl leading-relaxed max-w-2xl mt-10 text-[#bbb]" style={{ animationDelay: "0.45s" }}>{t.desc}</p>

            <div className="cs2-reveal mt-12" style={{ animationDelay: "0.6s" }}>
              <button onClick={begin} className="cs2-display text-2xl sm:text-3xl px-10 py-5 hover:scale-105 transition-transform flex items-center gap-3" style={{ background: "#D0021B", color: "#fff", letterSpacing: "0.08em" }}>
                <AlertTriangle size={20} />{t.begin}
              </button>
            </div>

            <div className="cs2-reveal mt-8 cs2-mono text-xs max-w-xl text-[#555]" style={{ animationDelay: "0.75s" }}>
              7 questions · ~2 minutes · no data saved · no account · just you and the coach in a room with one lightbulb
            </div>
          </div>

          <div className="hidden md:block absolute top-32 right-10 opacity-30">
            <svg width="200" height="300" viewBox="0 0 200 300">
              <circle cx="100" cy="40" r="10" fill="#F5A623" className="cs2-bulb" />
              <line x1="100" y1="0" x2="100" y2="30" stroke="#333" strokeWidth="1.5" />
              <path d="M 60 250 L 100 60 L 140 250 Z" fill="rgba(245,166,35,0.08)" stroke="#333" strokeWidth="1" strokeDasharray="2 2" />
              <rect x="70" y="250" width="60" height="40" fill="none" stroke="#444" strokeWidth="1" />
              <rect x="80" y="260" width="40" height="20" fill="none" stroke="#555" strokeWidth="1" />
            </svg>
          </div>
        </section>
      )}

      {phase === "intro" && (
        <section className="relative pt-24 pb-20 px-6 sm:px-10 min-h-screen">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <svg width="80" height="140" viewBox="0 0 80 140" className="cs2-light">
                <line x1="40" y1="0" x2="40" y2="40" stroke="#444" strokeWidth="1.5" />
                <circle cx="40" cy="55" r="18" fill="#F5A623" opacity="0.3" />
                <circle cx="40" cy="55" r="12" fill="#F5A623" className="cs2-bulb" />
                <rect x="36" y="40" width="8" height="8" fill="#333" />
                <path d="M 10 140 L 40 70 L 70 140 Z" fill="rgba(245,166,35,0.04)" />
              </svg>
            </div>

            <div style={{ background: "#060606", border: "1px solid #222", padding: "28px 32px", minHeight: 280 }}>
              <div className="cs2-mono text-[10px] tracking-[0.4em] mb-4 text-[#F5A623]">▸ {t.coach}</div>
              <div className="space-y-3">
                {t.intro_lines.slice(0, introStep).map((line, i) => (
                  <div key={i} className="cs2-typein cs2-mono text-xl sm:text-2xl leading-relaxed" style={{ color: i === introStep - 1 ? "#fff" : "#666" }}>{line}</div>
                ))}
                {introStep < t.intro_lines.length && <span className="cs2-caret cs2-mono text-2xl text-[#F5A623]">▌</span>}
              </div>
            </div>

            <div className="mt-6 text-center">
              <button onClick={() => setPhase("quiz")} className="cs2-mono text-xs tracking-widest hover:text-white transition-colors text-[#555]">{t.skip_intro} ▸</button>
            </div>
          </div>
        </section>
      )}

      {phase === "quiz" && (
        <section className="relative pt-24 pb-20 px-6 sm:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <div className="cs2-mono text-xs tracking-widest text-[#666]">{t.q_of} {String(qIdx + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</div>
              <div className="flex-1 h-[2px] bg-[#1a1a1a] relative">
                <div className="absolute inset-y-0 left-0 transition-all duration-500" style={{ width: `${((qIdx + (selectedOption !== null ? 1 : 0)) / questions.length) * 100}%`, background: "#F5A623" }} />
              </div>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < qIdx ? "#F5A623" : i === qIdx ? "#fff" : "#333" }} />
                ))}
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <svg width="40" height="50" viewBox="0 0 40 50" className="cs2-light">
                <line x1="20" y1="0" x2="20" y2="18" stroke="#444" strokeWidth="1" />
                <circle cx="20" cy="26" r="8" fill="#F5A623" className="cs2-bulb" />
              </svg>
            </div>

            <div key={qIdx} className="cs2-fadeup" style={{ background: "#060606", border: "1px solid #222", padding: "24px 28px" }}>
              <div className="flex items-start gap-3 mb-4">
                <span className="cs2-mono text-[10px] tracking-[0.4em] mt-1 text-[#F5A623]">▸ {t.coach}</span>
              </div>
              <div className="cs2-mono text-xl sm:text-2xl leading-relaxed text-white">{questions[qIdx].q}</div>
            </div>

            <div className="mt-6">
              <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#666]">▸ {t.you} · {t.answer_prompt}</div>
              <div className="space-y-2">
                {questions[qIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => onPick(i)} disabled={selectedOption !== null}
                    className={`cs2-opt w-full text-left pl-6 pr-5 py-4 cs2-mono text-base sm:text-lg leading-relaxed ${selectedOption === i ? "selected" : ""} ${selectedOption !== null ? "disabled" : ""}`}>
                    <span style={{ color: selectedOption === i ? "#F5A623" : selectedOption !== null ? "#555" : "#ddd" }}>{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {phase === "results" && diagnosis && (
        <section className="relative pt-24 pb-20 px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="cs2-popin" style={{ background: "#060606", border: `2px solid ${diagnosis.color}`, padding: "32px 32px" }}>
              <div className="cs2-mono text-xs tracking-[0.4em]" style={{ color: diagnosis.color }}>▸ {t.verdict}</div>
              <div className="cs2-display mt-2 leading-none" style={{ color: diagnosis.color, fontSize: "clamp(48px, 9vw, 96px)" }}>{diagnosis.tag}</div>

              <div className="mt-10">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="cs2-mono text-[10px] tracking-[0.4em] text-[#666]">▸ {t.severity}</div>
                  <div className={`cs2-display text-4xl sm:text-5xl ${pct > 60 ? "cs2-metershake" : ""}`} style={{ color: diagnosis.color }}>{pct}{t.score_suffix}</div>
                </div>
                <div className="relative h-4 bg-[#1a1a1a] overflow-hidden">
                  {[15, 35, 60, 80].map(x => <div key={x} className="absolute top-0 bottom-0 w-px bg-[#333]" style={{ left: `${x}%` }} />)}
                  <div className="absolute inset-y-0 left-0 transition-all duration-1000" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #2ECC71 0%, #F5A623 50%, #D0021B 100%)" }} />
                  <div className="absolute top-0 bottom-0 w-[3px] bg-white" style={{ left: `${pct}%`, transform: "translateX(-50%)", boxShadow: `0 0 12px ${diagnosis.color}` }} />
                </div>
                <div className="flex justify-between mt-1 cs2-mono text-[10px] text-[#444]">
                  <span>0</span><span>15</span><span>35</span><span>60</span><span>80</span><span>100</span>
                </div>
                <div className="flex justify-between mt-1 cs2-mono text-[9px] tracking-widest text-[#555]">
                  <span>ZEN</span><span>MILD</span><span>ACTIVE</span><span>CODE RED</span><span>CYKA</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="cs2-fadeup" style={{ background: "#060606", border: "1px solid #222", padding: 24, animationDelay: "0.2s" }}>
                <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#D0021B]">▸ {t.diagnosis}</div>
                <div className="cs2-mono text-lg leading-relaxed text-[#ddd]">{diagnosis.diag}</div>
              </div>
              <div className="cs2-fadeup" style={{ background: "#060606", border: "1px solid #222", padding: 24, animationDelay: "0.3s" }}>
                <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#2ECC71]">▸ {t.prescription}</div>
                <div className="cs2-mono text-lg leading-relaxed text-[#ddd]">{diagnosis.presc}</div>
                <div className="cs2-mono text-xs tracking-widest mt-4 text-[#F5A623]">{t.read_chapter}</div>
              </div>
            </div>

            {dominantTags.length > 0 && (
              <div className="cs2-fadeup mt-4" style={{ background: "#060606", border: "1px solid #222", padding: "20px 24px", animationDelay: "0.4s" }}>
                <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#666]">▸ PATTERNS DETECTED</div>
                <div className="flex flex-wrap gap-2">
                  {dominantTags.map(tag => (
                    <span key={tag} className="cs2-mono text-xs tracking-widest px-3 py-1" style={{ background: "rgba(208,2,27,0.1)", border: "1px solid #D0021B", color: "#D0021B" }}>
                      {tag.toUpperCase().replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={retake} className="cs2-mono text-sm tracking-widest px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform" style={{ background: "#F5A623", color: "#0a0a0a" }}>
                <RotateCcw size={14} />{t.restart}
              </button>
              <button onClick={share} className="cs2-mono text-sm tracking-widest px-6 py-3 flex items-center gap-2 hover:text-white transition-colors text-[#888]" style={{ background: "transparent", border: "1px solid #333" }}>
                <Share2 size={14} />{copied ? t.copied : t.share}
              </button>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-[#1a1a1a] px-6 sm:px-10 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · MENTAL · TILT TEST</div>
          <div>if this is weekly — talk to someone who doesn't play CS</div>
        </div>
      </footer>
    </div>
  );
}
