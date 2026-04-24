import { getDict, type Lang } from "@/lib/i18n";
import MentalHubClient from "./MentalHubClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Mental Protocol",
    description: "Anti-tilt protocol. The 10-second rule, the 3-loss rule, handling toxic teammates. Plus the tilt interrogation.",
    alternates: { canonical: `/${lang}/mental` },
  };
}

export default async function MentalHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <MentalHubClient lang={lang as Lang} dict={dict} />;
}
