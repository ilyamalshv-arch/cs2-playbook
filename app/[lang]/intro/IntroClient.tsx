"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Volume2, VolumeX, Crosshair, Globe } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { SUPPORTED_LANGS } from "@/lib/i18n";
import { useSynth } from "@/lib/synth";

type Phase = "press" | "boot" | "yell" | "yell2" | "whisper" | "soft" | "zoom" | "logo" | "done";

export default function IntroClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [phase, setPhase] = useState<Phase>("press");
  const [muted, setMuted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [currentLang, setCurrentLang] = useState<Lang>(lang);
  const router = useRouter();
  const { ensure, play } = useSynth(muted);

  const t = dict.splash;

  const cycleLang = () => {
    const idx = SUPPORTED_LANGS.indexOf(currentLang);
    const next = SUPPORTED_LANGS[(idx + 1) % SUPPORTED_LANGS.length];
    document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setCurrentLang(next);
    router.refresh();
    router.push(`/${next}/intro`);
  };

  const start = async () => {
    await ensure();
    setPhase("boot");
  };

  const goHome = () => {
    try { localStorage.setItem("cs2_intro_seen", "1"); } catch {}
    router.push(`/${lang}`);
  };

  const skip = () => setPhase("done");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (phase === "boot") {
      setBootLines([]);
      t.boot.forEach((line, i) => {
        timers.push(setTimeout(() => {
          setBootLines((p) => [...p, line]);
          play("beep");
        }, 220 + i * 240));
      });
      timers.push(setTimeout(() => setPhase("yell"), 220 + t.boot.length * 240 + 500));
    }
    if (phase === "yell") {
      play("yell"); setShake(true);
      timers.push(setTimeout(() => setShake(false), 700));
      timers.push(setTimeout(() => setPhase("yell2"), 2400));
    }
    if (phase === "yell2") {
      play("yell"); setShake(true);
      timers.push(setTimeout(() => setShake(false), 700));
      timers.push(setTimeout(() => setPhase("whisper"), 2800));
    }
    if (phase === "whisper") timers.push(setTimeout(() => setPhase("soft"), 2800));
    if (phase === "soft") timers.push(setTimeout(() => setPhase("zoom"), 2600));
    if (phase === "zoom") timers.push(setTimeout(() => { play("shot"); setPhase("logo"); }, 1600));
    if (phase === "logo") timers.push(setTimeout(() => setPhase("done"), 2400));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line
  }, [phase, muted, currentLang]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === "press" && (e.key === " " || e.key === "Enter")) { e.preventDefault(); start(); }
      if (e.key === "Escape" && phase !== "press" && phase !== "done") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, [phase]);

  const redTint = phase === "yell" || phase === "yell2";
  const dim = phase === "whisper" || phase === "soft";

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden select-none ${shake ? "cs2-shake" : ""}`}
      style={{
        background: redTint ? "#180404" : dim ? "#060606" : "#0a0a0a",
        transition: "background 180ms",
      }}
      onClick={phase === "press" ? start : undefined}
    >
      <style>{`
        @keyframes slide-scan { 0%{transform:translateY(-10%);opacity:0;} 30%{opacity:1;} 100%{transform:translateY(110vh);opacity:0;} }
        .cs2-slidescan { position: absolute; left: 0; right: 0; height: 80px; pointer-events: none; background: linear-gradient(to bottom, transparent, rgba(245,166,35,0.08), transparent); animation: slide-scan 5s linear infinite; z-index: 52; }
        @keyframes shake { 0%,100%{transform:translate(0,0);} 20%{transform:translate(-6px,2px);} 40%{transform:translate(5px,-3px);} 60%{transform:translate(-4px,-2px);} 80%{transform:translate(3px,3px);} }
        .cs2-shake > * { animation: shake 0.35s linear; }
        @keyframes yell-text-in { 0%{transform:scale(0.4) rotate(-8deg);opacity:0;letter-spacing:-20px;filter:blur(20px);} 60%{transform:scale(1.15) rotate(1deg);opacity:1;letter-spacing:0;filter:blur(0);} 100%{transform:scale(1) rotate(0);opacity:1;letter-spacing:0;} }
        .cs2-yell-in { animation: yell-text-in 0.55s cubic-bezier(.2,1.6,.4,1) both; }
        @keyframes tremor { 0%,100%{transform:translate(0,0) rotate(0);} 25%{transform:translate(-1px,1px) rotate(-0.4deg);} 50%{transform:translate(1px,-1px) rotate(0.4deg);} 75%{transform:translate(-1px,-1px) rotate(-0.2deg);} }
        .cs2-tremor { animation: tremor 0.09s infinite; display: inline-block; }
        @keyframes scene-in { from{opacity:0;transform:scale(0.94);} to{opacity:1;transform:scale(1);} }
        .cs2-scenein { animation: scene-in 0.35s ease-out both; }
        @keyframes zoom-eye { 0%{transform:scale(1);filter:blur(0);} 50%{transform:scale(8);filter:blur(0);} 100%{transform:scale(60);filter:blur(18px);opacity:0;} }
        .cs2-zoomeye { animation: zoom-eye 1.4s ease-in both; transform-origin: 50% 42%; }
        @keyframes particle { 0%{transform:translate(0,0) scale(1);opacity:1;} 100%{transform:translate(var(--tx), var(--ty)) scale(0.2);opacity:0;} }
        .cs2-particle { animation: particle 1.2s ease-out forwards; }
        @keyframes logo-glitch { 0%{clip-path:inset(0 0 100% 0);opacity:0;transform:translateX(-20px);} 30%{clip-path:inset(0 0 0 0);opacity:1;transform:translateX(2px);} 35%{transform:translateX(-3px);} 40%{transform:translateX(1px);} 100%{clip-path:inset(0 0 0 0);opacity:1;transform:translateX(0);} }
        .cs2-logo-in { animation: logo-glitch 1s steps(12,end) both; }
        @keyframes logo-subtle { from{opacity:0;letter-spacing:1em;} to{opacity:1;letter-spacing:0.3em;} }
        .cs2-logo-sub { animation: logo-subtle 1.1s 0.8s ease-out both; }
        @keyframes flash-kf { 0%{background:rgba(255,255,255,0);} 3%{background:rgba(255,255,255,0.9);} 100%{background:rgba(255,255,255,0);} }
        .cs2-flash { animation: flash-kf 0.8s ease-out forwards; position: absolute; inset: 0; pointer-events: none; z-index: 60; }
        @keyframes pulse-ring { 0%{box-shadow: 0 0 0 0 rgba(245,166,35,0.7);} 100%{box-shadow: 0 0 0 30px rgba(245,166,35,0);} }
        .cs2-pulse { animation: pulse-ring 1.6s infinite; }
      `}</style>

      <div className="cs2-slidescan" />

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3 text-xs tracking-widest z-[70] cs2-mono text-[#8a8a8a]">
        <div className="flex items-center gap-2">
          <Crosshair size={14} style={{ color: "#F5A623" }} />
          <span>{dict.site_name}</span>
          <span className="text-[#444]">·</span>
          <span>INTRO</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={(e) => { e.stopPropagation(); cycleLang(); }} className="flex items-center gap-1 hover:text-white transition-colors uppercase">
            <Globe size={14} />
            <span>{currentLang}</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }} className="flex items-center gap-1 hover:text-white transition-colors">
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span className="hidden sm:inline">{muted ? dict.audio_off : dict.audio_on}</span>
          </button>
          {phase !== "press" && phase !== "done" && (
            <button onClick={(e) => { e.stopPropagation(); skip(); }} className="hover:text-white transition-colors text-[#F5A623]">
              {t.skip}
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 text-xs z-[70] cs2-mono text-[#555]">
        <span>DE_PLAYBOOK · CT SPAWN</span>
        <span className="cs2-blink text-[#D0021B]">● REC</span>
      </div>

      {phase === "press" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 cursor-pointer">
          <div className="cs2-mono text-[10px] tracking-[0.5em] text-[#666]">{t.insert_coin}</div>
          <div className="cs2-display text-5xl sm:text-7xl cs2-blink" style={{ color: "#F5A623", letterSpacing: "0.05em" }}>{t.press}</div>
          <div className="cs2-mono text-lg text-[#888]">{t.press_sub}</div>
          <div className="mt-8 flex flex-wrap justify-center gap-3 cs2-mono text-xs px-4 text-center text-[#444]">
            {t.tips.map((tip, i) => <span key={i}>{tip}</span>)}
          </div>
        </div>
      )}

      {phase === "boot" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 cs2-mono text-xl sm:text-2xl px-6">
          <div className="w-full max-w-2xl">
            {bootLines.map((line, i) => (
              <div key={i} className="cs2-fadeup" style={{
                color: line.includes("kidding") || line.includes("шутка") || line.includes("mentira") ? "#D0021B"
                  : line.includes("✓") ? "#2ECC71" : "#d0d0d0",
                animationDelay: `${i * 0.05}s`,
              }}>{line}</div>
            ))}
            <span className="cs2-blink">▌</span>
          </div>
        </div>
      )}

      {(phase === "yell" || phase === "yell2" || phase === "whisper" || phase === "soft") && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div key={phase} className="cs2-scenein w-full max-w-xl mb-2 sm:mb-6">
            <SceneSVG phase={phase} coach={t.coach} green={t.green} />
          </div>
          <div className="text-center px-4" style={{ minHeight: 160 }}>
            {phase === "yell" && (
              <div key="y1" className="cs2-yell-in cs2-display text-4xl sm:text-6xl md:text-7xl"
                style={{ color: "#F5A623", letterSpacing: "0.02em", textShadow: "0 0 30px rgba(245,166,35,0.5), 4px 4px 0 #D0021B" }}>
                <span className="cs2-tremor">{t.yell1}</span>
              </div>
            )}
            {phase === "yell2" && (
              <div key="y2" className="cs2-yell-in cs2-display text-3xl sm:text-5xl md:text-6xl"
                style={{ color: "#ff4242", letterSpacing: "0.02em", textShadow: "0 0 30px rgba(208,2,27,0.5), 3px 3px 0 #000" }}>
                <span className="cs2-tremor">{t.yell2_l1}</span><br />
                <span className="cs2-tremor">{t.yell2_l2}</span>
              </div>
            )}
            {phase === "whisper" && (
              <div key="w" className="cs2-fadeup">
                <div className="cs2-mono text-xs tracking-widest mb-3 text-[#555]">{t.label_green}</div>
                <div className="cs2-mono text-2xl sm:text-3xl italic text-[#9acd9a]">{t.whisper}</div>
              </div>
            )}
            {phase === "soft" && (
              <div key="s" className="cs2-fadeup">
                <div className="cs2-mono text-xs tracking-widest mb-3 text-[#555]">{t.label_coach}</div>
                <div className="cs2-mono text-2xl sm:text-3xl text-[#e8e8e8]">{t.soft}</div>
              </div>
            )}
          </div>
          {(phase === "yell" || phase === "yell2") && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 cs2-mono text-xs tracking-[0.3em] cs2-blink text-center px-4 text-[#D0021B]">
              {t.warn}
            </div>
          )}
        </div>
      )}

      {phase === "zoom" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
          <div className="cs2-zoomeye">
            <svg viewBox="0 0 200 200" width="240" height="240">
              <ellipse cx="100" cy="100" rx="80" ry="40" fill="#ffffff" stroke="#000" strokeWidth="3" />
              <circle cx="100" cy="100" r="30" fill="#2a5d2a" />
              <circle cx="100" cy="100" r="14" fill="#0a0a0a" />
              <circle cx="94" cy="95" r="4" fill="#fff" />
              <line x1="100" y1="80" x2="100" y2="120" stroke="#F5A623" strokeWidth="1.5" />
              <line x1="80" y1="100" x2="120" y2="100" stroke="#F5A623" strokeWidth="1.5" />
            </svg>
          </div>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const dist = 300 + Math.random() * 250;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            return (
              <div key={i} className="absolute cs2-particle" style={{
                width: 6 + Math.random() * 8, height: 6 + Math.random() * 8,
                background: ["#F5A623", "#D0021B", "#2ECC71", "#fff"][i % 4],
                left: "50%", top: "50%",
                ["--tx" as any]: `${tx}px`, ["--ty" as any]: `${ty}px`,
                animationDelay: `${0.3 + i * 0.02}s`,
              }} />
            );
          })}
        </div>
      )}

      {phase === "logo" && (
        <>
          <div className="cs2-flash" />
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
            <div className="cs2-logo-in cs2-display text-6xl sm:text-8xl md:text-9xl text-white" style={{ letterSpacing: "0.03em" }}>CS2</div>
            <div className="cs2-logo-in cs2-display text-5xl sm:text-7xl md:text-8xl" style={{ color: "#F5A623", letterSpacing: "0.03em", animationDelay: "0.2s" }}>PLAYBOOK</div>
            <div className="cs2-logo-sub cs2-mono text-sm sm:text-base mt-6 text-[#888]">{t.logo_sub}</div>
          </div>
        </>
      )}

      {phase === "done" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div className="cs2-fadeup cs2-display text-5xl sm:text-7xl md:text-8xl mb-2 text-white">CS2</div>
          <div className="cs2-fadeup cs2-display text-4xl sm:text-6xl md:text-7xl" style={{ color: "#F5A623", animationDelay: "0.1s" }}>PLAYBOOK</div>
          <div className="cs2-fadeup cs2-mono text-sm sm:text-base mt-3 mb-10 text-[#888]" style={{ animationDelay: "0.2s" }}>{t.subtitle}</div>

          <button onClick={goHome} className="cs2-fadeup cs2-pulse cs2-display text-2xl sm:text-3xl px-10 py-4 border-2 transition-all hover:scale-105"
            style={{ color: "#0a0a0a", background: "#F5A623", borderColor: "#F5A623", letterSpacing: "0.1em", animationDelay: "0.4s", borderRadius: 2 }}>
            {t.cta}
          </button>

          <button onClick={() => { setBootLines([]); setPhase("press"); }}
            className="cs2-fadeup cs2-mono text-xs mt-6 hover:text-white transition-colors text-[#555]" style={{ animationDelay: "0.6s" }}>
            {t.replay}
          </button>

          <div className="cs2-fadeup absolute bottom-12 cs2-mono text-xs text-center px-4 text-[#333]" style={{ animationDelay: "0.8s" }}>
            <div>{t.tip_console.replace("[~]", "")}<span className="text-[#F5A623]">[~]</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function SceneSVG({ phase, coach, green }: { phase: Phase; coach: string; green: string }) {
  const yelling = phase === "yell" || phase === "yell2";
  const soft = phase === "soft";
  const whisper = phase === "whisper";
  return (
    <svg viewBox="0 0 600 340" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shaky" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2" />
        </filter>
      </defs>
      <line x1="0" y1="310" x2="600" y2="310" stroke="#333" strokeWidth="2" strokeDasharray="4 4" />
      <g filter="url(#shaky)">
        {/* COACH */}
        <g transform={whisper ? "translate(40 0) scale(0.85)" : soft ? "translate(60 0)" : "translate(0 0)"}>
          <path d="M 100 180 L 80 280 L 130 280 L 130 220 L 160 220 L 160 280 L 210 280 L 190 180 Z" fill="#1a1a28" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 143 180 L 138 220 L 145 240 L 152 220 L 147 180 Z" fill="#D0021B" stroke="#fff" strokeWidth="2" />
          <rect x="135" y="170" width="20" height="18" fill="#f0c9a4" stroke="#fff" strokeWidth="3" />
          <circle cx="145" cy="140" r="34" fill="#f0c9a4" stroke="#fff" strokeWidth="3" />
          <path d="M 112 128 Q 145 100 178 128 Q 175 118 145 112 Q 115 118 112 128 Z" fill="#2a2a2a" stroke="#fff" strokeWidth="2" />
          <circle cx="133" cy="140" r="7" fill="none" stroke="#000" strokeWidth="2.5" />
          <circle cx="157" cy="140" r="7" fill="none" stroke="#000" strokeWidth="2.5" />
          <line x1="140" y1="140" x2="150" y2="140" stroke="#000" strokeWidth="2" />
          <circle cx="133" cy="140" r="1.5" fill="#000" />
          <circle cx="157" cy="140" r="1.5" fill="#000" />
          {yelling ? (
            <><line x1="124" y1="128" x2="139" y2="134" stroke="#000" strokeWidth="3" /><line x1="166" y1="128" x2="151" y2="134" stroke="#000" strokeWidth="3" /></>
          ) : (
            <><line x1="124" y1="130" x2="139" y2="129" stroke="#000" strokeWidth="2.5" /><line x1="166" y1="130" x2="151" y2="129" stroke="#000" strokeWidth="2.5" /></>
          )}
          {yelling ? (
            <ellipse cx="145" cy="158" rx="14" ry="10" fill="#2a0000" stroke="#000" strokeWidth="2.5" />
          ) : soft ? (
            <path d="M 132 156 Q 145 160 158 156" fill="none" stroke="#000" strokeWidth="2.5" />
          ) : (
            <line x1="134" y1="158" x2="156" y2="158" stroke="#000" strokeWidth="2.5" />
          )}
          {yelling ? (
            <>
              <path d="M 100 190 L 60 130 L 55 120" stroke="#fff" strokeWidth="3" fill="none" />
              <path d="M 60 130 L 52 125 L 48 118 L 55 116 L 60 124" fill="#f0c9a4" stroke="#fff" strokeWidth="2" />
              <path d="M 190 190 L 230 220" stroke="#fff" strokeWidth="3" fill="none" />
              <circle cx="232" cy="222" r="8" fill="#f0c9a4" stroke="#fff" strokeWidth="2" />
            </>
          ) : soft ? (
            <>
              <path d="M 200 210 Q 260 210 290 190" stroke="#fff" strokeWidth="3" fill="none" />
              <circle cx="292" cy="188" r="9" fill="#f0c9a4" stroke="#fff" strokeWidth="2" />
              <path d="M 100 200 L 75 250" stroke="#fff" strokeWidth="3" fill="none" />
              <circle cx="73" cy="252" r="8" fill="#f0c9a4" stroke="#fff" strokeWidth="2" />
            </>
          ) : (
            <>
              <path d="M 100 200 L 75 250" stroke="#fff" strokeWidth="3" fill="none" />
              <circle cx="73" cy="252" r="8" fill="#f0c9a4" stroke="#fff" strokeWidth="2" />
              <path d="M 200 210 L 225 250" stroke="#fff" strokeWidth="3" fill="none" />
              <circle cx="227" cy="252" r="8" fill="#f0c9a4" stroke="#fff" strokeWidth="2" />
            </>
          )}
          <text x="145" y="305" textAnchor="middle" fill="#999" fontSize="10" fontFamily="VT323, monospace" letterSpacing="2">{coach}</text>
        </g>
        {/* GREEN */}
        <g transform={whisper ? "translate(0 0) scale(1.1)" : soft ? "translate(-30 0)" : "translate(0 0)"}>
          <path d="M 420 190 L 400 280 L 450 280 L 455 230 L 480 230 L 485 280 L 530 280 L 510 190 Z" fill="#2ECC71" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
          <rect x="455" y="176" width="20" height="18" fill="#f0c9a4" stroke="#fff" strokeWidth="3" />
          <circle cx="465" cy="148" r="32" fill="#f0c9a4" stroke="#fff" strokeWidth="3" />
          <path d="M 436 128 Q 445 108 465 120 Q 485 108 494 128 Q 490 120 465 116 Q 440 120 436 128 Z" fill="#6b4423" stroke="#fff" strokeWidth="2" />
          {yelling ? (
            <>
              <circle cx="455" cy="148" r="5" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <circle cx="475" cy="148" r="5" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <circle cx="455" cy="149" r="2" fill="#000" />
              <circle cx="475" cy="149" r="2" fill="#000" />
              <path d="M 490 135 Q 488 142 492 146 Q 496 142 494 135 Z" fill="#5dade2" stroke="#fff" strokeWidth="1.5" />
            </>
          ) : (
            <>
              <path d="M 450 152 Q 455 148 460 152" fill="none" stroke="#000" strokeWidth="2.5" />
              <path d="M 470 152 Q 475 148 480 152" fill="none" stroke="#000" strokeWidth="2.5" />
            </>
          )}
          <line x1="446" y1="138" x2="460" y2="142" stroke="#000" strokeWidth="2.5" />
          <line x1="484" y1="138" x2="470" y2="142" stroke="#000" strokeWidth="2.5" />
          {whisper ? <path d="M 455 165 Q 465 163 475 165" fill="none" stroke="#000" strokeWidth="2.5" />
            : soft ? <path d="M 455 165 Q 465 168 475 165" fill="none" stroke="#000" strokeWidth="2.5" />
            : <line x1="457" y1="165" x2="473" y2="165" stroke="#000" strokeWidth="2.5" />}
          <path d="M 420 200 L 410 265" stroke="#fff" strokeWidth="3" fill="none" />
          <circle cx="408" cy="267" r="8" fill="#f0c9a4" stroke="#fff" strokeWidth="2" />
          <path d="M 510 200 L 525 265" stroke="#fff" strokeWidth="3" fill="none" />
          <circle cx="527" cy="267" r="8" fill="#f0c9a4" stroke="#fff" strokeWidth="2" />
          {yelling && (
            <g transform="translate(380 260) rotate(-15)">
              <rect x="0" y="0" width="40" height="8" fill="#4a2c12" stroke="#fff" strokeWidth="1.5" />
              <rect x="10" y="-6" width="20" height="6" fill="#2a2a2a" stroke="#fff" strokeWidth="1.5" />
              <rect x="40" y="-2" width="18" height="12" fill="#2a2a2a" stroke="#fff" strokeWidth="1.5" />
            </g>
          )}
          <text x="465" y="305" textAnchor="middle" fill="#2ECC71" fontSize="10" fontFamily="VT323, monospace" letterSpacing="2">{green}</text>
        </g>
        {yelling && (
          <g>
            <path d="M 250 120 Q 340 100 400 140" stroke="#F5A623" strokeWidth="2" fill="none" strokeDasharray="4 3" />
            <path d="M 395 135 L 402 142 L 392 144 Z" fill="#F5A623" />
          </g>
        )}
        {soft && <text x="300" y="120" textAnchor="middle" fontSize="26" fill="#F5A623">♥</text>}
      </g>
    </svg>
  );
}
