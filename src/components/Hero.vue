<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDownloads, recommendedBuild } from '../composables/useDownloads.js'
import bgUrl from '../assets/img/bg.png'

const { groups, version, recommendedBuild: recBuild } = useDownloads()

// Primary CTA -> recommended mobile build's downloadUrl, else smooth-scroll #download.
const mobileBuild = computed(() => {
  const p = groups.value?.mobile?.[0]
  return p ? (recBuild ? recBuild(p) : recommendedBuild(p)) : null
})
const primaryHref = computed(() => mobileBuild.value?.downloadUrl || '#download')
const primaryExternal = computed(() => mobileBuild.value?.external === true)

function smoothScrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onPrimary(e) {
  // If we don't have a real build link yet, fall back to smooth-scroll #download.
  if (!mobileBuild.value) {
    e.preventDefault()
    smoothScrollTo('download')
  }
  // Otherwise let the anchor navigate to the tracked downloadUrl.
}

function onSecondary(e) {
  e.preventDefault()
  smoothScrollTo('showcase')
}

// --- Scroll reveal (single local IntersectionObserver, fire-once) -----------
const root = ref(null)
let observer = null

onMounted(() => {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = root.value
    ? Array.from(root.value.querySelectorAll('[data-reveal]'))
    : []

  if (reduce || typeof IntersectionObserver === 'undefined') {
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
    { threshold: 0.2 }
  )
  targets.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section
    id="hero"
    ref="root"
    class="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 text-center"
  >
    <!-- Layer 1: blurred key-art -->
    <div
      class="hero-key absolute inset-0 -z-30 bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgUrl})` }"
      aria-hidden="true"
    ></div>
    <!-- Base darkening tint toned to palette -->
    <div class="absolute inset-0 -z-20 bg-[var(--bg)]/70" aria-hidden="true"></div>

    <!-- Layer 2: radial violet glow bloom behind headline (breathes) -->
    <div class="hero-bloom" aria-hidden="true"></div>

    <!-- Slow-drifting violet bokeh orbs (2-3) -->
    <div class="hero-orbs" aria-hidden="true">
      <span class="orb orb-1"></span>
      <span class="orb orb-2"></span>
      <span class="orb orb-3"></span>
    </div>

    <!-- Layer 3: bottom vignette -> --bg for seamless handoff into WhyUs -->
    <div class="hero-vignette absolute inset-0 -z-10" aria-hidden="true"></div>

    <!-- Content -->
    <div class="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
      <p data-reveal class="eyebrow mb-5">Stream every anime</p>

      <h1
        data-reveal
        class="font-display text-4xl leading-[1.05] tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl"
      >
        Every <span class="gradient-text hero-word">anime</span>, right in your hands.
      </h1>

      <p
        data-reveal
        class="mx-auto mt-6 max-w-[60ch] text-base text-[var(--text-muted)] sm:text-lg"
      >
        Every episode. Every season. Every story. Watch anime in the highest
        quality — anytime, anywhere, on any screen with Sozo.
      </p>

      <!-- CTAs -->
      <div
        data-reveal
        class="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <a
          :href="primaryHref"
          :target="primaryExternal ? '_blank' : undefined"
          :rel="primaryExternal ? 'noopener' : undefined"
          class="btn-accent w-full sm:w-auto"
          aria-label="Get the Sozo app"
          @click="onPrimary"
        >
          <i class="fa-solid fa-download" aria-hidden="true"></i>
          Get the app
        </a>

        <a
          href="#showcase"
          class="btn-ghost w-full sm:w-auto"
          @click="onSecondary"
        >
          <i class="fa-solid fa-play" aria-hidden="true"></i>
          Explore showcase
        </a>
      </div>

      <!-- Version chip (hidden if version null) -->
      <p
        v-if="version"
        data-reveal
        class="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 px-3 py-1 text-xs text-[var(--text-muted)] backdrop-blur"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
        v{{ version }} · now streaming
      </p>
    </div>

    <!-- Scroll cue -->
    <a
      href="#why"
      class="hero-cue absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[var(--text-muted)]"
      aria-label="Scroll to learn more"
      @click.prevent="smoothScrollTo('why')"
    >
      <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
    </a>
  </section>
</template>

<style scoped>
/* Blurred key-art: subtle scale so blur edges never show a seam. */
.hero-key {
  filter: blur(6px) saturate(1.05);
  transform: scale(1.08);
}

/* Radial violet glow bloom behind the headline — the signature breathing halo. */
.hero-bloom {
  position: absolute;
  top: 42%;
  left: 50%;
  z-index: -25;
  width: min(80vw, 720px);
  height: min(80vw, 720px);
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 55%, transparent) 0%,
    transparent 68%
  );
  filter: blur(40px);
  opacity: 0.7;
  pointer-events: none;
  animation: breathe 8s var(--ease-filmic) infinite;
}

@keyframes breathe {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Bottom vignette -> --bg for a seamless handoff into the next section. */
.hero-vignette {
  background: linear-gradient(
    to bottom,
    transparent 45%,
    color-mix(in oklab, var(--bg) 70%, transparent) 78%,
    var(--bg) 100%
  );
  pointer-events: none;
}

/* Subtle violet text-glow on the gradient keyword. */
.hero-word {
  filter: drop-shadow(0 0 26px color-mix(in oklab, var(--accent) 45%, transparent));
}

/* Slow-drifting violet bokeh orbs (blur, low opacity). */
.hero-orbs {
  position: absolute;
  inset: 0;
  z-index: -22;
  overflow: hidden;
  pointer-events: none;
}
.orb {
  position: absolute;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 50%, transparent) 0%,
    transparent 70%
  );
  filter: blur(26px);
  opacity: 0.35;
}
.orb-1 {
  width: 220px;
  height: 220px;
  top: 14%;
  left: 8%;
  animation: drift 22s var(--ease-filmic) infinite;
}
.orb-2 {
  width: 160px;
  height: 160px;
  top: 58%;
  right: 10%;
  left: auto;
  animation: drift 28s var(--ease-filmic) infinite reverse;
}
.orb-3 {
  width: 120px;
  height: 120px;
  bottom: 18%;
  left: 28%;
  animation: drift 34s var(--ease-filmic) infinite;
}

@keyframes drift {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(24px, -30px, 0);
  }
}

/* Scroll-cue chevron: soft bounce. */
.hero-cue {
  animation: bounce-cue 2.4s var(--ease-filmic) infinite;
  transition: color 0.2s var(--ease-filmic), transform 0.2s var(--ease-filmic);
}
.hero-cue:hover {
  color: var(--accent);
}
@keyframes bounce-cue {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 8px);
  }
}

/* Scroll reveals: start hidden, animate to visible once. */
[data-reveal] {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.6s var(--ease-filmic),
    transform 0.6s var(--ease-filmic);
}
[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger siblings 80ms. */
[data-reveal]:nth-child(1) { transition-delay: 0ms; }
[data-reveal]:nth-child(2) { transition-delay: 80ms; }
[data-reveal]:nth-child(3) { transition-delay: 160ms; }
[data-reveal]:nth-child(4) { transition-delay: 240ms; }
[data-reveal]:nth-child(5) { transition-delay: 320ms; }

/* Reduced motion: everything static + visible. */
@media (prefers-reduced-motion: reduce) {
  .hero-bloom,
  .orb,
  .hero-cue {
    animation: none !important;
  }
  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
