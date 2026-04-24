import { getDict, type Lang } from "@/lib/i18n";
import CalloutsMapClient from "@/components/CalloutsMapClient";
import { ANUBIS_CALLOUTS } from "@/lib/callouts-anubis";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Anubis Callouts",
    description: "All 21 Anubis callouts — Palm, Bridge, Water, Pharmacy. Trilingual with quiz mode.",
    alternates: { canonical: `/${lang}/callouts/anubis` },
  };
}

export default async function AnubisPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return (
    <CalloutsMapClient
      lang={lang as Lang}
      dict={dict}
      mapName="anubis"
      mapLabel="ANUBIS"
      mapTag="// 05 · CONNECTOR · MAP 05"
      callouts={ANUBIS_CALLOUTS}
      nextUp="Overpass · Ancient"
      bgPattern="sand"
    />
  );
}
