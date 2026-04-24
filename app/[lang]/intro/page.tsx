import { getDict, type Lang } from "@/lib/i18n";
import IntroClient from "./IntroClient";

export default async function IntroPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <IntroClient lang={lang as Lang} dict={dict} />;
}
