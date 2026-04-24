import { notFound } from "next/navigation";
import { SUPPORTED_LANGS } from "@/lib/i18n";

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang as any)) notFound();
  return (
    <div className="cs2-scan cs2-flicker min-h-screen">
      {children}
    </div>
  );
}
