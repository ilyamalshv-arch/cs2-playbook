import { getDict, type Lang } from "@/lib/i18n";
import CalloutsMapClient from "@/components/CalloutsMapClient";
import { DUST2_CALLOUTS } from "@/lib/callouts-dust2";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Dust 2 Callouts",
    description: "All 23 Dust 2 callouts — Long, Mid, Tunnels, Xbox, Goose. Trilingual with quiz mode.",
    alternates: { canonical: `/${lang}/callouts/dust2` },
  };
}

export default async function Dust2Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return (
    <CalloutsMapClient
      lang={lang as Lang}
      dict={dict}
      mapName="dust2"
      mapLabel="DUST 2"
      mapTag="// 05 · CONNECTOR · MAP 03"
      callouts={DUST2_CALLOUTS}
      nextUp="Mirage · Inferno · Nuke · Anubis · Overpass · Ancient"
      bgPattern="sand"
    />
  );
}
