import { getDict, type Lang } from "@/lib/i18n";
import MechanicsClient from "./MechanicsClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Mechanics",
    description: "Crosshair placement, peek types, spray patterns, counter-strafe. Interactive fundamentals.",
    alternates: { canonical: `/${lang}/mechanics` },
  };
}

export default async function MechanicsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <MechanicsClient lang={lang as Lang} dict={dict} />;
}
