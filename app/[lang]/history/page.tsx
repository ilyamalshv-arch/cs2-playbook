import { getDict, type Lang } from "@/lib/i18n";
import HistoryClient from "./HistoryClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "History · 1999 → now",
    description: "25+ years of Counter-Strike. NiP 87-0, olofboost, coldzera jumping AWP, Astralis era, donk. An interactive timeline.",
    alternates: { canonical: `/${lang}/history` },
  };
}

export default async function HistoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <HistoryClient lang={lang as Lang} dict={dict} />;
}
