import { getDict, type Lang } from "@/lib/i18n";
import TrainingClient from "./TrainingClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Training · 90-day battle pass",
    description: "Daily CS2 drills. 3 stages. 90 days. Checkbox progress, XP, unlockable skins. Saved locally.",
    alternates: { canonical: `/${lang}/training` },
  };
}

export default async function TrainingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <TrainingClient lang={lang as Lang} dict={dict} />;
}
