import { getDict, type Lang } from "@/lib/i18n";
import CalloutsMapClient from "@/components/CalloutsMapClient";
import { MIRAGE_CALLOUTS } from "@/lib/callouts-mirage";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Mirage Callouts",
    description: "All 23 Mirage callouts in English, Russian and Spanish. Headshot Challenge quiz mode.",
    alternates: { canonical: `/${lang}/callouts/mirage` },
  };
}

export default async function MiragePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return (
    <CalloutsMapClient
      lang={lang as Lang}
      dict={dict}
      mapName="mirage"
      mapLabel="MIRAGE"
      mapTag="// 05 · CONNECTOR · MAP 01"
      callouts={MIRAGE_CALLOUTS}
      nextUp="Inferno · Dust 2 · Nuke · Anubis · Overpass · Ancient — ALL LIVE"
      bgPattern="sand"
    />
  );
}
