/**
 * Attaches a cache-busting version parameter (?v=... or &v=...) to an image URL.
 * When the image or article updates, the version changes, forcing browsers and CDNs
 * to fetch the fresh image instead of serving a stale cached copy.
 */
export function withCacheBuster(
  url: string | undefined | null,
  version?: string | number | null
): string {
  if (!url) return "";
  let trimmed = url.trim().replace(/&amp;/g, "&");
  if (!trimmed) return "";

  // Contentful Images API (ctfassets.net) strictly rejects unexpected query parameters (like v=...) with HTTP 400 Bad Request
  if (trimmed.includes("ctfassets.net")) {
    return trimmed.replace(/([?&])v=[^&]*(&|$)/g, (m, p1, p2) => p2 ? p1 : "").replace(/[?&]$/, "");
  }

  // If already contains a version query parameter (?v= or &v=), don't duplicate
  if (/[?&]v=/.test(trimmed)) {
    return trimmed;
  }

  let v = "";
  if (version !== undefined && version !== null && version !== "") {
    if (typeof version === "number") {
      v = String(Math.floor(version));
    } else {
      const parsed = Date.parse(version);
      v = !isNaN(parsed) && parsed > 0 ? String(parsed) : String(version).replace(/[^a-zA-Z0-9_-]/g, "");
    }
  }

  // Fallback to current timestamp if version is not provided or could not be parsed
  if (!v) {
    v = String(Date.now());
  }

  const separator = trimmed.includes("?") ? "&" : "?";
  return `${trimmed}${separator}v=${v}`;
}
