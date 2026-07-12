<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import {
  useDownloads,
  iconClass,
  recommendedBuild,
  GROUP_ORDER,
} from '../composables/useDownloads.js'

const { groups, version, status, error, retry } = useDownloads()

// Fixed band metadata (render order desktop -> tv -> mobile).
const BAND_LABELS = {
  desktop: 'Desktop',
  tv: 'TV',
  mobile: 'Mobile',
}

// Only render bands that actually contain platforms.
const bands = computed(() =>
  GROUP_ORDER.map((key) => ({
    key,
    label: BAND_LABELS[key] || key,
    platforms: (groups.value && groups.value[key]) || [],
  })).filter((b) => b.platforms.length > 0)
)

// Graceful pre-deploy placeholder: the platforms we intend to support, so the
// empty state still looks intentional rather than broken.
const COMING_SOON = [
  { name: 'Windows', icon: 'windows', label: 'Desktop' },
  { name: 'macOS', icon: 'apple', label: 'Desktop' },
  { name: 'Linux', icon: 'linux', label: 'Desktop' },
  { name: 'Android TV', icon: 'tv', label: 'TV' },
  { name: 'Android', icon: 'android', label: 'Mobile' },
  { name: 'iOS', icon: 'apple', label: 'Mobile' },
]

// --- Per-platform "more builds" expansion state (keyed by platform id) -------
const expanded = ref({})
function toggleExpand(id) {
  expanded.value = { ...expanded.value, [id]: !expanded.value[id] }
}

// --- Build derivation helpers ------------------------------------------------
function metaText(build) {
  const parts = []
  if (build.arch) parts.push(String(build.arch).toUpperCase())
  if (build.format) parts.push('.' + String(build.format).toUpperCase())
  if (build.sizeText) parts.push(build.sizeText)
  return parts.join(' · ')
}

function ariaLabel(platform, build) {
  const parts = [`Download ${platform.name} ${build.label}`]
  if (build.arch) parts.push(String(build.arch).toUpperCase())
  if (build.format) parts.push(String(build.format).toUpperCase())
  if (build.sizeText) parts.push(build.sizeText)
  let label = parts.join(', ')
  if (build.external) label += ' (opens store)'
  return label
}

// Ordered builds with the recommended one first; collapse extras past 3.
function orderedBuilds(platform) {
  const rec = recommendedBuild(platform)
  const rest = (platform.builds || []).filter((b) => b !== rec)
  return rec ? [rec, ...rest] : rest
}

function visibleBuilds(platform) {
  const all = orderedBuilds(platform)
  if (all.length <= 3 || expanded.value[platform.platform]) return all
  return all.slice(0, 3)
}

function hasHiddenBuilds(platform) {
  return orderedBuilds(platform).length > 3
}

function isRecommended(platform, build) {
  return build === recommendedBuild(platform)
}

function showVersionChip(build) {
  return build.version && build.version !== version.value
}

// --- Scroll reveal (single local IntersectionObserver) -----------------------
const rootEl = ref(null)
let observer = null

function setupReveals() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = rootEl.value
    ? rootEl.value.querySelectorAll('[data-reveal]')
    : []

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  targets.forEach((el) => observer.observe(el))
}

function refreshReveals() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  nextTick(setupReveals)
}

onMounted(() => nextTick(setupReveals))
onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

// Re-run reveals when the state machine swaps in new DOM (loading -> ready etc).
watch(status, refreshReveals)
</script>

<template>
  <section
    id="download"
    ref="rootEl"
    class="relative overflow-hidden py-24 px-4"
    aria-labelledby="download-heading"
  >
    <!-- Ambient violet bokeh orbs (slow drift, GPU transform/opacity only) -->
    <div class="orb-field" aria-hidden="true">
      <span class="orb orb-a"></span>
      <span class="orb orb-b"></span>
      <span class="orb orb-c"></span>
    </div>

    <!-- One large centered glass panel — shared chrome across ALL states -->
    <div
      data-reveal
      class="reveal-item panel surface-card relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-10 sm:py-14"
    >
      <!-- Header row -->
      <header class="mb-10 text-center">
        <p class="eyebrow mb-3">Download Sozo</p>
        <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <h2
            id="download-heading"
            class="font-display text-4xl leading-tight sm:text-5xl"
          >
            Watch <span class="gradient-text">everywhere</span>
          </h2>
          <span v-if="version" class="version-chip font-sans">v{{ version }}</span>
        </div>
      </header>

      <!-- (1) LOADING — skeleton bands -->
      <div v-if="status === 'loading' || status === 'idle'" aria-hidden="true">
        <div v-for="n in 3" :key="'sk-band-' + n" class="mb-10 last:mb-0">
          <div class="skeleton skeleton-label mb-4"></div>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="c in 3"
              :key="'sk-card-' + n + '-' + c"
              class="platform-card p-5"
            >
              <div class="mb-5 flex items-center gap-3">
                <div class="skeleton skeleton-tile"></div>
                <div class="skeleton skeleton-title"></div>
              </div>
              <div class="skeleton skeleton-row mb-3"></div>
              <div class="skeleton skeleton-row skeleton-row-quiet"></div>
            </div>
          </div>
        </div>
        <span class="sr-only">Loading downloads…</span>
      </div>

      <!-- (2) ERROR — contained, with retry -->
      <div
        v-else-if="status === 'error'"
        class="state-panel"
        role="alert"
      >
        <i class="fa-solid fa-triangle-exclamation state-icon state-icon-warning" aria-hidden="true"></i>
        <h3 class="font-display mt-4 text-xl">Couldn't load downloads.</h3>
        <p class="mt-2 max-w-md text-[var(--text-muted)]">
          {{ error || 'The download service is unavailable right now.' }}
          Please try again in a moment.
        </p>
        <button type="button" class="btn-accent mt-6" @click="retry">
          <i class="fa-solid fa-rotate-right" aria-hidden="true"></i>
          Retry
        </button>
      </div>

      <!-- (3) EMPTY — tasteful "coming soon" that still lists our platforms -->
      <div v-else-if="status === 'empty'" class="state-panel">
        <i class="fa-solid fa-clock state-icon" aria-hidden="true"></i>
        <h3 class="font-display mt-4 text-xl">Builds are on the way</h3>
        <p class="mt-2 max-w-md text-[var(--text-muted)]">
          We're preparing downloads for every platform — check back soon.
        </p>
        <ul
          class="mt-8 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3"
        >
          <li
            v-for="p in COMING_SOON"
            :key="p.name + p.label"
            class="soon-card"
          >
            <span class="icon-tile icon-tile-sm" aria-hidden="true">
              <i :class="iconClass(p.icon)"></i>
            </span>
            <span class="min-w-0">
              <span class="block truncate text-sm text-[var(--text)]">{{ p.name }}</span>
              <span class="block text-xs text-[var(--text-muted)]">Coming soon</span>
            </span>
          </li>
        </ul>
      </div>

      <!-- READY — the dynamic hub -->
      <div v-else>
        <div
          v-for="band in bands"
          :key="band.key"
          data-reveal
          class="reveal-item mb-10 last:mb-0"
        >
          <h3 class="band-label font-display mb-4">{{ band.label }}</h3>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="platform in band.platforms"
              :key="platform.platform"
              class="platform-card p-5"
            >
              <!-- Card header -->
              <div class="mb-5 flex items-center gap-3">
                <span class="icon-tile" aria-hidden="true">
                  <i :class="iconClass(platform.icon)"></i>
                </span>
                <h4 class="font-display text-lg leading-tight">{{ platform.name }}</h4>
              </div>

              <!-- Builds list -->
              <ul class="flex flex-col gap-2.5">
                <li
                  v-for="build in visibleBuilds(platform)"
                  :key="build.id"
                >
                  <a
                    :href="build.downloadUrl"
                    :target="build.external ? '_blank' : null"
                    :rel="build.external ? 'noopener' : null"
                    :aria-label="ariaLabel(platform, build)"
                    :class="[
                      'build-row',
                      isRecommended(platform, build) ? 'build-row-primary' : 'build-row-quiet',
                    ]"
                  >
                    <span class="build-glyph" aria-hidden="true">
                      <i
                        :class="build.external
                          ? 'fa-solid fa-arrow-up-right-from-square'
                          : 'fa-solid fa-download'"
                      ></i>
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="flex flex-wrap items-center gap-2">
                        <span class="build-label truncate">{{ build.label }}</span>
                        <span
                          v-if="build.isBeta"
                          class="pill pill-beta"
                        >BETA</span>
                        <span
                          v-if="showVersionChip(build)"
                          class="pill pill-version"
                        >v{{ build.version }}</span>
                      </span>
                      <span
                        v-if="metaText(build)"
                        class="build-meta"
                      >{{ metaText(build) }}</span>
                    </span>
                    <i class="build-chevron fa-solid fa-chevron-right" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>

              <!-- More builds toggle -->
              <button
                v-if="hasHiddenBuilds(platform)"
                type="button"
                class="more-toggle"
                :aria-expanded="!!expanded[platform.platform]"
                @click="toggleExpand(platform.platform)"
              >
                <i
                  class="fa-solid fa-chevron-down transition-transform"
                  :class="{ 'rotate-180': expanded[platform.platform] }"
                  aria-hidden="true"
                ></i>
                {{ expanded[platform.platform] ? 'Fewer builds' : 'More builds' }}
              </button>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- Panel ----------------------------------------------------------------- */
.panel {
  border-radius: 1.75rem;
  background-color: color-mix(in oklab, var(--surface) 88%, transparent);
}

.version-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--accent);
  background: color-mix(in oklab, var(--accent) 16%, transparent);
  border: 1px solid color-mix(in oklab, var(--accent) 45%, transparent);
}

/* --- Band labels ----------------------------------------------------------- */
.band-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-muted);
}

/* --- Platform cards -------------------------------------------------------- */
.platform-card {
  background-color: color-mix(in oklab, var(--surface-2) 80%, transparent);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  transition:
    transform 0.2s var(--ease-filmic),
    border-color 0.2s var(--ease-filmic),
    box-shadow 0.2s var(--ease-filmic);
}
.platform-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in oklab, var(--accent) 55%, var(--border));
  box-shadow: 0 18px 50px -22px color-mix(in oklab, var(--accent) 60%, transparent);
}

/* --- Icon tile ------------------------------------------------------------- */
.icon-tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 0.85rem;
  font-size: 1.15rem;
  color: var(--accent);
  background: color-mix(in oklab, var(--accent) 14%, transparent);
  border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
}
.icon-tile-sm {
  width: 2.25rem;
  height: 2.25rem;
  font-size: 0.95rem;
  border-radius: 0.7rem;
}

/* --- Build rows ------------------------------------------------------------ */
.build-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.85rem;
  border-radius: 0.85rem;
  text-align: left;
  text-decoration: none;
  transition:
    transform 0.2s var(--ease-filmic),
    border-color 0.2s var(--ease-filmic),
    box-shadow 0.2s var(--ease-filmic),
    background-color 0.2s var(--ease-filmic);
}
.build-row:active {
  transform: scale(0.97);
}

.build-row-primary {
  color: var(--accent-contrast);
  background: var(--accent);
  border: 1px solid color-mix(in oklab, var(--accent) 70%, white 10%);
  box-shadow: 0 8px 26px -12px color-mix(in oklab, var(--accent) 80%, transparent);
}
.build-row-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px -12px color-mix(in oklab, var(--accent) 90%, transparent);
}
.build-row-primary .build-meta {
  color: color-mix(in oklab, var(--accent-contrast) 80%, transparent);
}

.build-row-quiet {
  color: var(--text);
  background: color-mix(in oklab, var(--surface) 55%, transparent);
  border: 1px solid var(--border);
}
.build-row-quiet:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklab, var(--accent) 50%, var(--border));
  box-shadow: 0 12px 30px -18px color-mix(in oklab, var(--accent) 55%, transparent);
}

.build-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  flex-shrink: 0;
  font-size: 0.9rem;
}
.build-label {
  font-weight: 600;
  font-size: 0.95rem;
}
.build-meta {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.build-chevron {
  font-size: 0.7rem;
  opacity: 0.6;
  flex-shrink: 0;
}

/* --- Pills ----------------------------------------------------------------- */
.pill {
  display: inline-flex;
  align-items: center;
  padding: 0.05rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.4;
}
.pill-beta {
  color: var(--warning);
  border: 1px solid color-mix(in oklab, var(--warning) 60%, transparent);
  background: color-mix(in oklab, var(--warning) 12%, transparent);
}
.pill-version {
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.build-row-primary .pill-version {
  color: color-mix(in oklab, var(--accent-contrast) 85%, transparent);
  border-color: color-mix(in oklab, var(--accent-contrast) 40%, transparent);
}

/* --- More toggle ----------------------------------------------------------- */
.more-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  padding: 0.35rem 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  background: transparent;
  cursor: pointer;
  transition: color 0.2s var(--ease-filmic);
}
.more-toggle:active {
  transform: scale(0.97);
}
.rotate-180 {
  transform: rotate(180deg);
}

/* --- Shared state panel (empty / error) ------------------------------------ */
.state-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 20rem;
  justify-content: center;
  padding: 2rem 1rem;
}
.state-icon {
  font-size: 2.5rem;
  color: var(--text-muted);
}
.state-icon-warning {
  color: var(--warning);
}

/* --- Coming-soon cards (empty state) --------------------------------------- */
.soon-card {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 0.85rem;
  border-radius: 0.85rem;
  background: color-mix(in oklab, var(--surface-2) 70%, transparent);
  border: 1px solid var(--border);
  text-align: left;
}

/* --- Skeletons ------------------------------------------------------------- */
.skeleton {
  border-radius: 0.5rem;
  background: linear-gradient(
    100deg,
    color-mix(in oklab, var(--surface-2) 90%, transparent) 30%,
    color-mix(in oklab, var(--border) 70%, transparent) 50%,
    color-mix(in oklab, var(--surface-2) 90%, transparent) 70%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}
.skeleton-label { height: 0.9rem; width: 8rem; }
.skeleton-tile { height: 2.75rem; width: 2.75rem; border-radius: 0.85rem; }
.skeleton-title { height: 1.1rem; width: 6.5rem; }
.skeleton-row { height: 3rem; border-radius: 0.85rem; }
.skeleton-row-quiet { opacity: 0.6; }

@keyframes skeleton-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

/* --- Ambient orbs ---------------------------------------------------------- */
.orb-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.5;
  will-change: transform, opacity;
}
.orb-a {
  width: 24rem;
  height: 24rem;
  top: -6rem;
  left: -4rem;
  background: radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent), transparent 70%);
  animation: orb-drift-a 22s var(--ease-filmic) infinite alternate, orb-breathe 8s ease-in-out infinite;
}
.orb-b {
  width: 20rem;
  height: 20rem;
  bottom: -5rem;
  right: -3rem;
  background: radial-gradient(circle, color-mix(in oklab, var(--accent-2) 45%, transparent), transparent 70%);
  animation: orb-drift-b 26s var(--ease-filmic) infinite alternate, orb-breathe 8s ease-in-out infinite 1s;
}
.orb-c {
  width: 16rem;
  height: 16rem;
  top: 40%;
  left: 55%;
  background: radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent), transparent 70%);
  animation: orb-drift-c 30s var(--ease-filmic) infinite alternate, orb-breathe 8s ease-in-out infinite 2s;
}
@keyframes orb-drift-a { to { transform: translate3d(4rem, 3rem, 0); } }
@keyframes orb-drift-b { to { transform: translate3d(-4rem, -3rem, 0); } }
@keyframes orb-drift-c { to { transform: translate3d(-3rem, 4rem, 0); } }
@keyframes orb-breathe {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* --- Reveals --------------------------------------------------------------- */
.reveal-item {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.6s var(--ease-filmic),
    transform 0.6s var(--ease-filmic);
}
.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger sibling bands. */
.reveal-item.is-visible:nth-child(2) { transition-delay: 0.06s; }
.reveal-item.is-visible:nth-child(3) { transition-delay: 0.12s; }
.reveal-item.is-visible:nth-child(4) { transition-delay: 0.18s; }

/* --- Accessibility helper --------------------------------------------------- */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* --- Reduced motion: start visible, kill ambient/skeleton loops ------------ */
@media (prefers-reduced-motion: reduce) {
  .reveal-item {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .orb {
    animation: none;
  }
  .skeleton {
    animation: none;
  }
}
</style>
