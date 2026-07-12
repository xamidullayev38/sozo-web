<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDownloads } from '../composables/useDownloads.js'
import screen2 from '../assets/img/screen2.png'

const { groups, recommendedBuild, iconClass } = useDownloads()

// ---------------------------------------------------------------------------
// CTA wiring — group === 'tv' (androidtv) is the headline; desktop platforms
// (windows / mac / linux) are secondary chips. Each reads recommendedBuild()
// and falls back to a smooth scroll to #download when the build is absent.
// ---------------------------------------------------------------------------

function ctaFor(platform, fallbackIcon) {
  const build = platform ? recommendedBuild(platform) : null
  return {
    id: platform ? platform.platform : fallbackIcon,
    name: platform ? platform.name : null,
    icon: platform ? iconClass(platform.icon) : fallbackIcon,
    href: build ? build.downloadUrl : '#download',
    external: !!(build && build.external),
    hasBuild: !!build,
    label: build ? build.label : null,
    sizeText: build ? build.sizeText : null,
  }
}

// Primary CTA: the Android TV build.
const tvCta = computed(() => {
  const p = (groups.value.tv || [])[0] || null
  return ctaFor(p, 'fa-solid fa-tv')
})

// Secondary CTAs: desktop platforms (windows / mac / linux) in a stable order.
const desktopCtas = computed(() => {
  const list = groups.value.desktop || []
  return list.map((p) => ctaFor(p)).filter((c) => c.hasBuild)
})

function accessibleName(cta) {
  if (!cta.hasBuild) return 'Scroll to download options'
  const parts = ['Download', cta.name, cta.label].filter(Boolean)
  if (cta.sizeText) parts.push(cta.sizeText)
  let name = parts.join(' ')
  if (cta.external) name += ' (opens store)'
  return name
}

function onCtaClick(cta, event) {
  // Local anchor fallback — smooth-scroll instead of a hard jump.
  if (cta.href === '#download') {
    event.preventDefault()
    const el = document.getElementById('download')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// ---------------------------------------------------------------------------
// Scroll reveal — one shared IntersectionObserver, staggered, fires once.
// ---------------------------------------------------------------------------
const root = ref(null)
let observer = null

onMounted(() => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = root.value
    ? Array.from(root.value.querySelectorAll('[data-reveal]'))
    : []

  if (prefersReduced || typeof IntersectionObserver === 'undefined') {
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }

  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const delay = Number(el.dataset.revealDelay || 0)
        el.style.transitionDelay = `${delay}ms`
        el.classList.add('is-visible')
        obs.unobserve(el)
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )

  targets.forEach((el, i) => {
    el.dataset.revealDelay = String((i % 6) * 80)
    observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  observer = null
})
</script>

<template>
  <section
    id="tv-app"
    ref="root"
    class="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    aria-labelledby="tv-app-heading"
  >
    <!-- Ambient violet bokeh — slow drift, decorative only -->
    <div class="orbs" aria-hidden="true">
      <span class="orb orb-a"></span>
      <span class="orb orb-b"></span>
      <span class="orb orb-c"></span>
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
      <!-- Mirror-reversed: image left, copy right (reverses to top-stacked on mobile) -->
      <div
        class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        <!-- Big-screen framing -->
        <div class="relative order-2 lg:order-1" data-reveal>
          <div class="tv-frame">
            <div class="tv-glow" aria-hidden="true"></div>
            <div class="tv-screen">
              <img
                :src="screen2"
                alt="Sozo streaming anime on a living-room television"
                class="tv-img"
                loading="lazy"
                decoding="async"
                width="1280"
                height="720"
              />
            </div>
          </div>
        </div>

        <!-- Copy + CTAs -->
        <div class="order-1 lg:order-2">
          <p class="eyebrow" data-reveal>THE BIG SCREEN</p>

          <h2
            id="tv-app-heading"
            class="font-display mt-4 text-4xl leading-tight sm:text-5xl"
            data-reveal
          >
            Your living room,
            <span class="gradient-text">upgraded</span>
          </h2>

          <p
            class="mt-5 max-w-[60ch] text-base text-text-muted sm:text-lg"
            data-reveal
          >
            Sozo brings the full anime library to the biggest screen in your
            home. Stream thousands of episodes and movies in crisp high
            definition, pick up right where you left off, and lean back — the
            couch is the best seat in the house.
          </p>

          <!-- Primary: Android TV -->
          <div class="mt-8 flex flex-wrap items-center gap-3" data-reveal>
            <a
              :href="tvCta.href"
              class="btn-accent"
              :target="tvCta.external ? '_blank' : undefined"
              :rel="tvCta.external ? 'noopener' : undefined"
              :aria-label="accessibleName(tvCta)"
              @click="onCtaClick(tvCta, $event)"
            >
              <i :class="tvCta.icon" aria-hidden="true"></i>
              <span>Get Sozo for TV</span>
              <i
                v-if="tvCta.external"
                class="fa-solid fa-arrow-up-right-from-square text-xs opacity-80"
                aria-hidden="true"
              ></i>
            </a>
          </div>

          <!-- Secondary: desktop builds -->
          <div
            v-if="desktopCtas.length"
            class="mt-6 border-t border-border/70 pt-6"
            data-reveal
          >
            <p class="font-display text-xs uppercase tracking-[0.14em] text-text-muted">
              Also on desktop
            </p>
            <div class="mt-3 flex flex-wrap gap-2.5">
              <a
                v-for="cta in desktopCtas"
                :key="cta.id"
                :href="cta.href"
                class="btn-ghost btn-ghost--sm"
                :target="cta.external ? '_blank' : undefined"
                :rel="cta.external ? 'noopener' : undefined"
                :aria-label="accessibleName(cta)"
                @click="onCtaClick(cta, $event)"
              >
                <i :class="cta.icon" aria-hidden="true"></i>
                <span>{{ cta.name }}</span>
                <i
                  v-if="cta.external"
                  class="fa-solid fa-arrow-up-right-from-square text-[0.65rem] opacity-70"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================================================
   Big-screen framing — cinematic glow + letterbox + gentle tilt
   ========================================================================== */
.tv-frame {
  position: relative;
  width: 100%;
  max-width: 640px;
  margin-inline: auto;
  transform: perspective(1400px) rotateY(4deg) rotateX(1.5deg);
  transition: transform 0.5s var(--ease-filmic);
}
.tv-frame:hover {
  transform: perspective(1400px) rotateY(0deg) rotateX(0deg) translateY(-4px);
}

.tv-glow {
  position: absolute;
  inset: -18% -12% -22%;
  z-index: 0;
  background: radial-gradient(
    60% 55% at 50% 45%,
    color-mix(in oklab, var(--accent) 55%, transparent) 0%,
    color-mix(in oklab, var(--accent-2) 30%, transparent) 45%,
    transparent 72%
  );
  filter: blur(48px);
  opacity: 0.7;
  animation: breathe 8s ease-in-out infinite;
}

.tv-screen {
  position: relative;
  z-index: 1;
  border-radius: 1.1rem;
  padding: clamp(6px, 1.4vw, 12px);
  background: linear-gradient(
    160deg,
    color-mix(in oklab, var(--surface-2) 92%, var(--accent) 8%),
    var(--bg)
  );
  border: 1px solid var(--border);
  box-shadow:
    0 40px 90px -40px color-mix(in oklab, var(--accent) 60%, transparent),
    inset 0 1px 0 color-mix(in oklab, white 8%, transparent);
}

.tv-img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 0.7rem;
  /* Letterboxed cinematic feel */
  box-shadow:
    inset 0 0 0 1px color-mix(in oklab, white 6%, transparent),
    inset 0 24px 60px -40px rgba(0, 0, 0, 0.9);
}

/* Compact ghost chips for the desktop platforms */
.btn-ghost--sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

/* ==========================================================================
   Ambient bokeh orbs — slow drift, decorative
   ========================================================================== */
.orbs {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
  opacity: 0.28;
}
.orb-a {
  width: 22rem;
  height: 22rem;
  top: -6rem;
  right: -4rem;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  animation: drift-a 26s ease-in-out infinite;
}
.orb-b {
  width: 18rem;
  height: 18rem;
  bottom: -5rem;
  left: -3rem;
  background: radial-gradient(circle, var(--accent-2), transparent 70%);
  opacity: 0.2;
  animation: drift-b 32s ease-in-out infinite;
}
.orb-c {
  width: 14rem;
  height: 14rem;
  top: 40%;
  left: 45%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.16;
  animation: drift-a 38s ease-in-out infinite reverse;
}

/* ==========================================================================
   Reveal — start hidden, animate on intersection
   ========================================================================== */
[data-reveal] {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.6s var(--ease-filmic),
    transform 0.6s var(--ease-filmic);
  will-change: opacity, transform;
}
[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes breathe {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes drift-a {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-2rem, 2.5rem); }
}
@keyframes drift-b {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(2.5rem, -2rem); }
}

/* ==========================================================================
   Reduced motion — reveals visible, no drift / breathe / tilt animation
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .tv-glow,
  .orb {
    animation: none;
  }
  .tv-frame,
  .tv-frame:hover {
    transform: none;
    transition: none;
  }
}
</style>
