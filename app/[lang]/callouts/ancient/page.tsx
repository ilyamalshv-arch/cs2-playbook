import { getDict, type Lang } from "@/lib/i18n";
import CalloutsMapClient from "@/components/CalloutsMapClient";
import { ANCIENT_CALLOUTS } from "@/lib/callouts-ancient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Ancient Callouts",
    description: "All 21 Ancient callouts — Donut, Temple, Cave, Tree. Jungle ruins, trilingual.",
    alternates: { canonical: `/${lang}/callouts/ancient` },
  };
}

export default async function AncientPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return (
    <CalloutsMapClient
      lang={lang as Lang}
      dict={dict}
      mapName="ancient"
      mapLabel="ANCIENT"
      mapTag="// 05 · CONNECTOR · MAP 07"
      callouts={ANCIENT_CALLOUTS}
      nextUp="All 7 maps live — more features incoming"
      bgPattern="stone"
    />
  );
}
