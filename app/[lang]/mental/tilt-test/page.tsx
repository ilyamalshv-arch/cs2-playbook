import { getDict, type Lang } from "@/lib/i18n";
import TiltClient from "./TiltClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Tilt Interrogation",
    description: "Are you tilted? Take the 2-minute coach interrogation. 7 questions, one verdict. Share your diagnosis.",
    alternates: { canonical: `/${lang}/mental/tilt-test` },
  };
}

export default async function TiltPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <TiltClient lang={lang as Lang} dict={dict} />;
}
