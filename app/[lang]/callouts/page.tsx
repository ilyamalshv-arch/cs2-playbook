import { getDict, type Lang } from "@/lib/i18n";
import CalloutsHubClient from "./CalloutsHubClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Map Arsenal",
    description: "Interactive callouts for all 7 CS2 Active Duty maps. Trilingual. Quiz mode included.",
    alternates: { canonical: `/${lang}/callouts` },
  };
}

export default async function CalloutsHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <CalloutsHubClient lang={lang as Lang} dict={dict} />;
}
