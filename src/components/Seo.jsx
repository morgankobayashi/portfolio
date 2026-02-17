import { useEffect } from "react";

/**
 * Lightweight SEO helper for a SPA.
 * It updates <title>, meta tags, canonical, and injects JSON-LD.
 * (Works best when pages are pre-rendered, but still useful for social previews and sharing.)
 */
export default function Seo({
  title,
  description,
  canonical,
  ogImage,
  robots = "index,follow",
  jsonLd,
}) {
  useEffect(() => {
    if (title) document.title = title;

    const upsertMeta = (nameOrProp, value, isProperty = false) => {
      if (!value) return;
      const selector = isProperty
        ? `meta[property="${nameOrProp}"]`
        : `meta[name="${nameOrProp}"]`;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (isProperty) el.setAttribute("property", nameOrProp);
        else el.setAttribute("name", nameOrProp);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    upsertMeta("description", description);
    upsertMeta("robots", robots);

    // Open Graph / Twitter
    upsertMeta("og:title", title, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:type", "article", true);
    if (canonical) upsertMeta("og:url", canonical, true);
    if (ogImage) upsertMeta("og:image", ogImage, true);

    upsertMeta("twitter:card", ogImage ? "summary_large_image" : "summary");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    if (ogImage) upsertMeta("twitter:image", ogImage);

    // Canonical
    if (canonical) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // JSON-LD
    const scriptId = "jsonld-primary";
    const existing = document.getElementById(scriptId);
    if (jsonLd) {
      const s = existing || document.createElement("script");
      s.id = scriptId;
      s.type = "application/ld+json";
      s.text = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(s);
    } else if (existing) {
      existing.remove();
    }

    return () => {
      // keep meta tags; only remove jsonld
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [title, description, canonical, ogImage, robots, jsonLd]);

  return null;
}
