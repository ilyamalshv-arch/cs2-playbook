import { getDict, type Lang } from "@/lib/i18n";
import CalloutsMapClient from "@/components/CalloutsMapClient";
import { INFERNO_CALLOUTS } from "@/lib/callouts-inferno";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Inferno Callouts",
    description: "All 24 Inferno callouts — Banana, Pit, Arch, Apps. Trilingual with quiz mode.",
    alternates: { canonical: `/${lang}/callouts/inferno` },
  };
}

export default async function InfernoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return (
    <CalloutsMapClient
      lang={lang as Lang}
      dict={dict}
      mapName="inferno"
      mapLabel="INFERNO"
      mapTag="// 05 · CONNECTOR · MAP 02"
      callouts={INFERNO_CALLOUTS}
      nextUp="Mirage · Dust 2 · Nuke · Anubis · Overpass · Ancient"
      bgPattern="stone"
    />
  );
}
