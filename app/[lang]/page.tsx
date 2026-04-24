import { getDict, type Lang } from "@/lib/i18n";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return {
    title: dict.site_name,
    description: dict.home.hero_desc,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ru: "/ru", es: "/es" },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <HomeClient lang={lang as Lang} dict={dict} />;
}
