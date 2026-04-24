import { getDict, type Lang } from "@/lib/i18n";
import CalloutsMapClient from "@/components/CalloutsMapClient";
import { NUKE_CALLOUTS } from "@/lib/callouts-nuke";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Nuke Callouts",
    description: "All 25 Nuke callouts — two floors, outside, vents, ramp. Heaven, Hut, Squeaky. Trilingual.",
    alternates: { canonical: `/${lang}/callouts/nuke` },
  };
}

export default async function NukePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return (
    <CalloutsMapClient
      lang={lang as Lang}
      dict={dict}
      mapName="nuke"
      mapLabel="NUKE"
      mapTag="// 05 · CONNECTOR · MAP 04"
      callouts={NUKE_CALLOUTS}
      nextUp="Mirage · Inferno · Dust 2 · Anubis · Overpass · Ancient"
      bgPattern="stone"
      floorDivider={{ y: 420, upperLabel: "▲ UPPER · A", lowerLabel: "▼ LOWER · B" }}
    />
  );
}
