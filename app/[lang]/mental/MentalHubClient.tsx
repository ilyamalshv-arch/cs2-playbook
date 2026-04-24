"use client";
import { useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { MENTAL_ARTICLES } from "@/lib/mental-data";

export default function MentalHubClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [muted, setMuted] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <HudBar
        lang={lang} muted={muted} onMute={() => setMuted((m) => !m)}
        backHref={`/${lang}`}
        title="MENTAL"
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />

      <section className="pt-24 pb-8 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">// 06 · CT SPAWN · MENTAL</div>
          <h1 className="cs2-display mt-2 text-5xl sm:text-7xl text-white" style={{ letterSpacing: "0.01em" }}>
            ANTI-TILT <span className="text-[#F5A623]">PROTOCOL</span>
          </h1>
          <p className="cs2-reveal cs2-mono text-base sm:text-lg max-w-2xl mt-4 text-[#aaa]" style={{ animationDelay: "0.15s" }}>
            Tilt is a physiological state, not a character flaw. It has triggers, it has patterns, it has protocols that work. Here they are — and a diagnostic if you're not sure where you stand.
          </p>
        </div>
      </section>

      {/* TILT TEST FEATURE */}
      <section className="px-6 sm:px-10 mb-12">
        <div className="max-w-6xl mx-auto">
          <Link href={`/${lang}/mental/tilt-test`}
            className="block group transition-all hover:scale-[1.005]"
            style={{ background: "linear-gradient(135deg, #1a0404, #0a0a0a)", border: "1px solid #D0021B" }}>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle size={20} style={{ color: "#D0021B" }} />
                <div className="cs2-mono text-xs tracking-[0.4em] text-[#D0021B]">▸ DIAGNOSTIC · INTERACTIVE</div>
              </div>
              <div className="cs2-display text-3xl sm:text-5xl mb-2 text-white group-hover:text-[#D0021B] transition-colors">
                THE TILT INTERROGATION
              </div>
              <div className="cs2-mono text-base sm:text-lg max-w-2xl text-[#ccc]">
                Seven questions. The coach is in the room and already knows you tilted — he just wants to hear you say it. Diagnosis in 2 minutes. No account, no tracking.
              </div>
              <div className="cs2-mono text-xs tracking-widest mt-5 flex items-center gap-2 text-[#D0021B]">
                <span>ENTER THE ROOM</span>
                <span>▸</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="px-6 sm:px-10 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="cs2-mono text-[10px] tracking-[0.4em] mb-5 text-[#666]">▸ THE PROTOCOL · 5 RULES</div>
          <div className="space-y-3">
            {MENTAL_ARTICLES.map((a) => {
              const open = openId === a.id;
              return (
                <div key={a.id}
                  style={{
                    background: "#060606",
                    border: `1px solid ${open ? a.color : "#1a1a1a"}`,
                    transition: "all 200ms",
                  }}>
                  <button onClick={() => setOpenId(open ? null : a.id)}
                    className="w-full text-left p-5 hover:bg-[#0d0d0d] transition-colors flex items-start gap-4">
                    <div className="cs2-display text-3xl flex-shrink-0" style={{ color: a.color, width: 40 }}>
                      {a.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="cs2-display text-xl sm:text-2xl text-white leading-tight mb-1"
                        style={{ color: open ? a.color : "#fff", transition: "color 200ms" }}>
                        {a.title[lang]}
                      </div>
                      <div className="cs2-mono text-xs sm:text-sm text-[#888]">{a.subtitle[lang]}</div>
                    </div>
                    <div className="cs2-mono text-xs text-[#666] flex-shrink-0 mt-1"
                      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 200ms" }}>
                      ▸
                    </div>
                  </button>

                  {open && (
                    <div className="px-5 pb-5 border-t border-[#1a1a1a] pt-4 cs2-fadeup">
                      <div className="space-y-3 ml-0 sm:ml-[56px]">
                        {a.body[lang].map((p, i) => (
                          <p key={i} className="cs2-mono text-sm sm:text-base leading-relaxed text-[#ddd]">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1a1a1a] px-6 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 cs2-mono text-xs text-[#555]">
          <div>{dict.site_name} · MENTAL · ANTI-TILT PROTOCOL</div>
          <div>if this is weekly — talk to someone who doesn't play CS</div>
        </div>
      </footer>
    </div>
  );
}
