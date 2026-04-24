import { getDict, type Lang } from "@/lib/i18n";
import TacticsClient from "./TacticsClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Tactics",
    description: "T-side and CT-side playbooks for all 7 Active Duty maps. 21 tactics. Full utility & steps.",
    alternates: { canonical: `/${lang}/tactics` },
  };
}

export default async function TacticsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <TacticsClient lang={lang as Lang} dict={dict} />;
}
