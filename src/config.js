// Shared runtime configuration for the Sozo landing page.

// Public downloads API base. Override at build time with VITE_API_BASE.
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://apisozo.azamov.me'

/**
 * Build a full API URL from a path, tolerating leading/trailing slashes.
 * @param {string} path e.g. '/api/downloads' or 'api/downloads'
 * @returns {string} absolute URL
 */
export function apiUrl(path = '') {
  const base = API_BASE.replace(/\/+$/, '')
  const suffix = String(path).replace(/^\/+/, '')
  return suffix ? `${base}/${suffix}` : base
}

/**
 * Upgrade an http:// URL to https:// when the page itself is served over HTTPS.
 * The downloads API returns http:// downloadUrls (it derives the base from the
 * proxied request protocol), which a browser blocks as mixed content on an
 * HTTPS site. Left untouched in local http dev (e.g. http://localhost).
 * @param {string} url
 * @returns {string}
 */
export function toHttps(url) {
  if (typeof url !== 'string') return url
  const securePage =
    typeof location !== 'undefined' && location.protocol === 'https:'
  if (securePage && url.startsWith('http://')) {
    return 'https://' + url.slice('http://'.length)
  }
  return url
}
