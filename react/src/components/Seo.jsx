import { useEffect } from "react";

function upsertMeta(selector, attr, value) {
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr.split("=")[0], attr.split("=")[1]);
    document.head.appendChild(meta);
  }
  meta.setAttribute(attr.split("=")[0], value);
}

export default function Seo({ title, description, jsonLd }) {
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', "name", description);
    upsertMeta('meta[property="og:title"]', "property", title);
    upsertMeta('meta[property="og:description"]', "property", description);

    const old = document.getElementById("seo-jsonld");
    if (old) old.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "seo-jsonld";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, jsonLd]);

  return null;
}