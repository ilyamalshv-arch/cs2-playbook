"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Crosshair, Globe, Volume2, VolumeX, ChevronLeft } from "lucide-react";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";

export function HudBar({
  lang,
  muted,
  onMute,
  backHref,
  title,
  subtitle,
  dict,
  extras,
}: {
  lang: Lang;
  muted: boolean;
  onMute: () => void;
  backHref?: string;
  title?: string;
  subtitle?: string;
  dict: { back: string; audio_on: string; audio_off: string; site_name: string; hud_version: string };
  extras?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const cycleLang = () => {
    const idx = SUPPORTED_LANGS.indexOf(lang);
    const next = SUPPORTED_LANGS[(idx + 1) % SUPPORTED_LANGS.length];
    document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const segs = pathname.split("/").filter(Boolean);
    if (SUPPORTED_LANGS.includes(segs[0] as Lang)) segs[0] = next;
    else segs.unshift(next);
    router.push("/" + segs.join("/"));
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-5 py-3 text-xs tracking-widest z-[100] cs2-mono border-b border-[#1a1a1a]"
      style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(8px)" }}
    >
      <div className="flex items-center gap-3 text-[#8a8a8a]">
        {backHref && (
          <Link href={backHref} className="flex items-center gap-1 hover:text-white transition-colors">
            <ChevronLeft size={12} />
            <span>{dict.back}</span>
          </Link>
        )}
        {backHref && <span className="text-[#333]">/</span>}
        <Crosshair size={14} style={{ color: "#F5A623" }} />
        <span>{dict.site_name}</span>
        {title && (
          <>
            <span className="text-[#444]">·</span>
            <span>{title}</span>
          </>
        )}
        {subtitle && (
          <>
            <span className="text-[#444]">·</span>
            <span className="hidden sm:inline">{subtitle}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-4 text-[#8a8a8a]">
        {extras}
        <button onClick={cycleLang} className="flex items-center gap-1 hover:text-white transition-colors uppercase">
          <Globe size={14} />
          <span>{lang}</span>
        </button>
        <button onClick={onMute} className="flex items-center gap-1 hover:text-white transition-colors">
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span className="hidden sm:inline">{muted ? dict.audio_off : dict.audio_on}</span>
        </button>
      </div>
    </div>
  );
}
