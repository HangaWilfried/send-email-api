import type { Response } from "express";
import { BASE_URL } from "../../utils/constants";

function escape(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type OgData = {
  url: string;
  title?: string;
  image?: string;
  description?: string;
};

export const sendOgHtmlResponse = ({
  data,
  res,
}: {
  res: Response;
  data: OgData;
}) => {
  const title = data.title ?? "FastRelays";
  const description =
    data.description ?? "FastRelays delivery and business management platform";

  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">

  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:image" content="${data.image}">
  <meta property="og:url" content="${data.url}">
  <meta property="og:site_name" content="Mon Site">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(title)}">
  <meta name="twitter:description" content="${escape(description)}">
  <meta name="twitter:image" content="${data.image}">
</head>
<body>
  <p>Chargement...</p>
</body>
</html>`);
};

export function getImageUrl(
  dict: Record<string, string>,
  value: string | number,
): string {
  let rawUrl: string | undefined;

  if (typeof value === "string") {
    rawUrl = dict[value];
  } else if (typeof value === "number") {
    const values = Object.values(dict);
    rawUrl = values[value];
  }

  if (!rawUrl) {
    return `${BASE_URL}/icons/pwa/icon-192x192.png`;
  }

  try {
    const urlObj = new URL(rawUrl);
    const minioBase = process.env.MINIO_BASE_URL;

    if (!minioBase) {
      console.warn("MINIO_BASE_URL non défini, retour de l'URL d'origine");
      return rawUrl;
    }

    return rawUrl.replace(urlObj.origin, minioBase);
  } catch {
    console.error("URL invalide dans le dictionnaire:", rawUrl);
    return `${BASE_URL}/icons/pwa/icon-192x192.png`;
  }
}
