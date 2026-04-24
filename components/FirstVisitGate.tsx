"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function FirstVisitGate({ lang }: { lang: string }) {
  const router = useRouter();
  useEffect(() => {
    try {
      const seen = localStorage.getItem("cs2_intro_seen");
      if (!seen) {
        router.replace(`/${lang}/intro`);
      }
    } catch {
      // SSR / privacy mode — skip gate, show home
    }
  }, [lang, router]);
  return null;
}
