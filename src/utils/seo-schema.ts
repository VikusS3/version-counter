import type { BreadcrumbItem } from "./seo";
import { getSiteUrl, SITE_NAME } from "./seo";

export const ORGANIZATION_ID = "https://gachacountdown.online/#organization";
export const WEBSITE_ID = "https://gachacountdown.online/#website";

export function buildOrganizationSchema(site: URL | string | undefined) {
  const siteUrl = getSiteUrl(site);

  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: siteUrl.href,
    logo: {
      "@type": "ImageObject",
      url: new URL("/logo.webp", siteUrl).href,
    },
    sameAs: ["https://github.com/VikusS3/version-counter"],
  };
}

export function buildWebSiteSchema(site: URL | string | undefined) {
  const siteUrl = getSiteUrl(site);

  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: siteUrl.href,
    inLanguage: ["en", "es"],
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function buildBreadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> | undefined {
  if (items.length < 2) return undefined;

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}
