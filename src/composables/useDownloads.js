import { ref, computed, onMounted, onUnmounted } from 'vue'
import { apiUrl, toHttps } from '../config.js'

// ---------------------------------------------------------------------------
// Shared, fetch-once download state.
//
// All consumers (Hero, MobileApp, TvApp, Download) call useDownloads() and get
// the SAME reactive state back. The network request fires at most once; a
// module-level cached promise dedupes concurrent callers. retry()/reload()
// clears the cache and refetches.
// ---------------------------------------------------------------------------

// Fixed presentation order for the download section bands.
export const GROUP_ORDER = ['desktop', 'tv', 'mobile']

// Icon key -> FontAwesome class string (matches backend contract).
const ICON_MAP = {
  windows: 'fa-brands fa-windows',
  apple: 'fa-brands fa-apple',
  linux: 'fa-brands fa-linux',
  tv: 'fa-solid fa-tv',
  android: 'fa-brands fa-android',
}

export function iconClass(iconKey) {
  return ICON_MAP[iconKey] || 'fa-solid fa-download'
}

// Shared reactive singletons (created once for the module).
const data = ref(null)
const version = ref(null)
const platforms = ref([])
// status: 'idle' | 'loading' | 'ready' | 'empty' | 'error'
const status = ref('idle')
const loading = computed(() => status.value === 'loading')
const error = ref(null)

// Grouped platforms: { desktop: [], tv: [], mobile: [] }
const groups = computed(() => {
  const out = { desktop: [], tv: [], mobile: [] }
  for (const p of platforms.value || []) {
    const g = p && p.group
    if (out[g]) out[g].push(p)
  }
  return out
})

// Module-level dedupe: in-flight promise + abort handle.
let inflight = null
let controller = null

function resetState() {
  data.value = null
  version.value = null
  platforms.value = []
  error.value = null
}

async function runFetch() {
  status.value = 'loading'
  error.value = null

  controller = typeof AbortController !== 'undefined' ? new AbortController() : null

  try {
    const res = await fetch(apiUrl('/api/downloads'), {
      signal: controller ? controller.signal : undefined,
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`)
    }

    // Prod may 404 to an HTML page before redeploy — guard the content type
    // BEFORE parsing so an HTML body never throws an opaque SyntaxError.
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('application/json')) {
      throw new Error('Unexpected response format')
    }

    const json = await res.json()

    data.value = json
    version.value = json && json.version != null ? json.version : null

    // Normalize: upgrade http:// download links to https:// on secure pages so
    // the browser doesn't block the click as mixed content.
    const rawPlatforms = Array.isArray(json && json.platforms) ? json.platforms : []
    platforms.value = rawPlatforms.map((p) => ({
      ...p,
      builds: Array.isArray(p && p.builds)
        ? p.builds.map((b) => ({
            ...b,
            downloadUrl: toHttps(b && b.downloadUrl),
            url: toHttps(b && b.url),
          }))
        : [],
    }))

    const hasBuilds = platforms.value.some(
      (p) => Array.isArray(p && p.builds) && p.builds.length > 0
    )
    status.value = platforms.value.length && hasBuilds ? 'ready' : 'empty'
  } catch (err) {
    // AbortError from unmount is not a real failure — leave state as-is.
    if (err && err.name === 'AbortError') return
    resetState()
    error.value = (err && err.message) || 'Could not load downloads'
    status.value = 'error'
  } finally {
    controller = null
  }
}

function load() {
  // Reuse cached promise / already-resolved state so callers don't refetch.
  if (inflight) return inflight
  if (status.value === 'ready' || status.value === 'empty') {
    return Promise.resolve()
  }
  inflight = runFetch().finally(() => {
    inflight = null
  })
  return inflight
}

function reload() {
  if (controller) {
    try { controller.abort() } catch (_) { /* noop */ }
    controller = null
  }
  inflight = null
  status.value = 'idle'
  resetState()
  return load()
}

/**
 * recommendedBuild(platform): first non-beta build, else the first build.
 * Returns null when the platform has no builds.
 */
export function recommendedBuild(platform) {
  const builds = platform && Array.isArray(platform.builds) ? platform.builds : []
  if (!builds.length) return null
  return builds.find((b) => b && b.isBeta === false) || builds[0]
}

// Alias kept for the prompt's naming (primaryBuild === first build).
export function primaryBuild(platform) {
  const builds = platform && Array.isArray(platform.builds) ? platform.builds : []
  return builds.length ? builds[0] : null
}

/** Find a platform object by its `platform` id (e.g. 'android', 'windows'). */
export function platformById(id) {
  return (platforms.value || []).find((p) => p && p.platform === id) || null
}

export function useDownloads() {
  onMounted(() => {
    load()
  })

  onUnmounted(() => {
    // If THIS consumer's mount triggered the only in-flight request and the
    // component unmounts, abort it. Other mounted consumers keep state alive.
    if (controller && status.value === 'loading') {
      try { controller.abort() } catch (_) { /* noop */ }
    }
  })

  return {
    // reactive state
    data,
    version,
    platforms,
    groups,
    loading,
    error,
    status,
    // actions
    load,
    reload,
    retry: reload,
    // helpers
    iconClass,
    recommendedBuild,
    primaryBuild,
    platformById,
    groupOrder: GROUP_ORDER,
  }
}

export default useDownloads
