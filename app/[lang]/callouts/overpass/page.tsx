import { getDict, type Lang } from "@/lib/i18n";
import CalloutsMapClient from "@/components/CalloutsMapClient";
import { OVERPASS_CALLOUTS } from "@/lib/callouts-overpass";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Overpass Callouts",
    description: "All 22 Overpass callouts — Long, Bathrooms (where olofboost happened), Heaven. Trilingual.",
    alternates: { canonical: `/${lang}/callouts/overpass` },
  };
}

export default async function OverpassPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return (
    <CalloutsMapClient
      lang={lang as Lang}
      dict={dict}
      mapName="overpass"
      mapLabel="OVERPASS"
      mapTag="// 05 · CONNECTOR · MAP 06"
      callouts={OVERPASS_CALLOUTS}
      nextUp="Ancient"
      bgPattern="stone"
    />
  );
}
