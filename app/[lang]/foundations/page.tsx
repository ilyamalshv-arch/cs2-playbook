import { getDict, type Lang } from "@/lib/i18n";
import FoundationsClient from "./FoundationsClient";

export default async function FoundationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDict(lang);
  return <FoundationsClient lang={lang as Lang} dict={dict} />;
}
