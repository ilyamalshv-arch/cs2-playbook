import type { MetadataRoute } from "next";
import { SUPPORTED_LANGS } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cs2playbook.com";

const ROUTES = [
  "",
  "/intro",
  "/callouts",
  "/callouts/mirage",
  "/callouts/inferno",
  "/callouts/dust2",
  "/callouts/nuke",
  "/callouts/anubis",
  "/callouts/overpass",
  "/callouts/ancient",
  "/mental",
  "/mental/tilt-test",
  "/foundations",
  "/mechanics",
  "/training",
  "/tactics",
  "/history",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of SUPPORTED_LANGS) {
    for (const route of ROUTES) {
      entries.push({
        url: `${SITE_URL}/${lang}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route.startsWith("/callouts") ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
