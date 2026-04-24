"use client";
import Link from "next/link";
import type { Dict, Lang } from "@/lib/i18n";
import { HudBar } from "@/components/HudBar";
import { useState } from "react";

export function ComingSoon({
  lang, dict, title, tag, blurb,
}: {
  lang: Lang; dict: Dict; title: string; tag: string; blurb: string;
}) {
  const [muted, setMuted] = useState(false);
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none">
      <HudBar lang={lang} muted={muted} onMute={() => setMuted(m => !m)}
        backHref={`/${lang}`}
        title={title.toUpperCase()}
        dict={{ back: dict.back, audio_on: dict.audio_on, audio_off: dict.audio_off, site_name: dict.site_name, hud_version: dict.hud_version }}
      />
      <section className="pt-32 pb-20 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#F5A623]">{tag}</div>
          <h1 className="cs2-display mt-2 text-5xl sm:text-7xl text-white">{title}</h1>
          <div className="cs2-reveal cs2-mono text-lg mt-6 text-[#888]" style={{ animationDelay: "0.15s" }}>{blurb}</div>

          <div className="cs2-reveal mt-12 p-8" style={{ background: "#060606", border: "1px dashed #F5A623", animationDelay: "0.3s" }}>
            <div className="cs2-mono text-[10px] tracking-[0.4em] mb-3 text-[#F5A623]">▸ BUILD STATUS</div>
            <div className="cs2-display text-3xl text-white mb-3">COMING SOON</div>
            <div className="cs2-mono text-sm leading-relaxed text-[#aaa]">
              This section is on the build plan. The PDF playbook has the full content already — the web version is being ported chapter by chapter.
              <br /><br />
              In the meantime, check out the sections that are already live:
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${lang}/callouts`} className="cs2-mono text-xs tracking-widest px-4 py-2 hover:scale-105 transition-transform" style={{ background: "#F5A623", color: "#0a0a0a" }}>
                MAP ARSENAL ▸
              </Link>
              <Link href={`/${lang}/mental/tilt-test`} className="cs2-mono text-xs tracking-widest px-4 py-2 hover:scale-105 transition-transform" style={{ background: "#D0021B", color: "#fff" }}>
                TILT TEST ▸
              </Link>
              <Link href={`/${lang}`} className="cs2-mono text-xs tracking-widest px-4 py-2 hover:text-white transition-colors text-[#888]" style={{ border: "1px solid #333" }}>
                ◂ HOME
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
