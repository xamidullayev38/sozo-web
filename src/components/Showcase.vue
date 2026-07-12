<template>
  <section
    id="showcase"
    class="relative overflow-hidden py-20 sm:py-28"
  >
    <!-- Ambient signature glow: breathing violet halo behind the section -->
    <div class="ambient-halo" aria-hidden="true"></div>
    <div class="bokeh bokeh--a" aria-hidden="true"></div>
    <div class="bokeh bokeh--b" aria-hidden="true"></div>

    <div
      class="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16"
    >
      <!-- LEFT: copy -->
      <div ref="copyRef" class="max-w-xl">
        <p class="eyebrow reveal">The Library</p>

        <h2
          class="reveal mt-4 text-3xl font-display text-text sm:text-4xl lg:text-5xl"
        >
          Watch <span class="gradient-text">1000+ anime</span> titles on Sozo
        </h2>

        <p class="reveal mt-6 text-base leading-relaxed text-text-muted sm:text-lg">
          The entire world of anime, in your pocket. From timeless classics to
          the newest simulcasts — complete seasons in crystal-clear HD, with
          multi-language subtitles, fast streaming, and offline downloads.
        </p>

        <div class="reveal mt-8">
          <a href="#download" class="btn-accent" @click.prevent="scrollToDownload">
            <i class="fa-solid fa-download" aria-hidden="true"></i>
            Download App
          </a>
        </div>
      </div>

      <!-- RIGHT: auto-scrolling poster wall (lg+) -->
      <div
        class="poster-wall hidden lg:block"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >
        <div class="poster-wall__mask">
          <div class="poster-wall__cols" :class="{ 'is-paused': paused }">
            <div
              v-for="(col, ci) in columns"
              :key="ci"
              class="poster-col"
              :class="[ci === 3 ? 'hidden xl:flex' : '', ci % 2 === 1 ? 'poster-col--down' : '']"
              :style="{ '--dur': `${34 + ci * 6}s` }"
            >
              <!-- track (duplicated for seamless loop) -->
              <div class="poster-track">
                <a
                  v-for="(poster, pi) in col"
                  :key="`a-${ci}-${pi}`"
                  :href="'#download'"
                  class="poster"
                  @click.prevent="scrollToDownload"
                >
                  <img
                    :src="poster"
                    alt="Anime poster"
                    loading="lazy"
                    class="poster__img"
                    @error="onImgError"
                  />
                  <span class="poster__scrim" aria-hidden="true"></span>
                </a>
              </div>
              <!-- decorative duplicate -->
              <div class="poster-track" aria-hidden="true">
                <span
                  v-for="(poster, pi) in col"
                  :key="`b-${ci}-${pi}`"
                  class="poster"
                >
                  <img
                    :src="poster"
                    alt=""
                    loading="lazy"
                    class="poster__img"
                    @error="onImgError"
                  />
                  <span class="poster__scrim" aria-hidden="true"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile: native horizontal snap strip (below lg) -->
    <div class="lg:hidden">
      <ul
        class="poster-strip mt-10 flex gap-4 overflow-x-auto px-5 pb-4 sm:px-8"
        aria-label="Anime poster gallery"
      >
        <li
          v-for="(poster, i) in posters"
          :key="`m-${i}`"
          class="poster poster--strip shrink-0"
        >
          <img
            :src="poster"
            alt="Anime poster"
            loading="lazy"
            class="poster__img"
            @error="onImgError"
          />
          <span class="poster__scrim" aria-hidden="true"></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// Local posters — bundled by Vite (no CDN). Sorted numerically 1..20.
const posterModules = import.meta.glob('../assets/img/card-img/*.png', {
  eager: true,
  import: 'default',
})
const posters = Object.entries(posterModules)
  .sort(([a], [b]) => {
    const na = parseInt(a.match(/(\d+)\.png$/)?.[1] ?? '0', 10)
    const nb = parseInt(b.match(/(\d+)\.png$/)?.[1] ?? '0', 10)
    return na - nb
  })
  .map(([, src]) => src)

// Fallback used if a poster ever fails (e.g. a future remote source).
const fallback = posters[0]
function onImgError(e) {
  if (e?.target && e.target.src !== fallback) e.target.src = fallback
}

// Split posters into 4 offset columns so the wall never repeats in a row.
const COL_COUNT = 4
const columns = Array.from({ length: COL_COUNT }, (_, ci) => {
  const slice = []
  for (let i = 0; i < posters.length; i++) {
    slice.push(posters[(i + ci * 5) % posters.length])
  }
  return slice
})

const paused = ref(false)

// --- Local scroll-reveal (shared-pattern IntersectionObserver) ---
const copyRef = ref(null)
let observer = null

function scrollToDownload() {
  const el = document.getElementById('download')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  const items = copyRef.value
    ? Array.from(copyRef.value.querySelectorAll('.reveal'))
    : []

  if (prefersReduced || typeof IntersectionObserver === 'undefined') {
    items.forEach((el) => el.classList.add('is-visible'))
    return
  }

  items.forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`
  })

  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )
  items.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ---------------------------------------------------------------- Reveal */
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.6s var(--ease-filmic),
    transform 0.6s var(--ease-filmic);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --------------------------------------------------------- Ambient glow */
.ambient-halo {
  position: absolute;
  top: 50%;
  right: -10%;
  width: 42rem;
  height: 42rem;
  max-width: 90vw;
  transform: translateY(-50%);
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 40%, transparent) 0%,
    transparent 68%
  );
  filter: blur(60px);
  opacity: 0.7;
  pointer-events: none;
  animation: halo-breathe 8s ease-in-out infinite;
}
@keyframes halo-breathe {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.bokeh {
  position: absolute;
  border-radius: 9999px;
  filter: blur(48px);
  opacity: 0.28;
  pointer-events: none;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 60%, transparent) 0%,
    transparent 70%
  );
}
.bokeh--a {
  width: 16rem;
  height: 16rem;
  top: 8%;
  left: -6%;
  animation: drift-a 22s ease-in-out infinite;
}
.bokeh--b {
  width: 12rem;
  height: 12rem;
  bottom: 6%;
  left: 30%;
  animation: drift-b 26s ease-in-out infinite;
}
@keyframes drift-a {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(2rem, 1.5rem, 0); }
}
@keyframes drift-b {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-1.5rem, -2rem, 0); }
}

/* --------------------------------------------------------- Poster wall */
.poster-wall {
  position: relative;
  min-width: 0;
}
.poster-wall__mask {
  height: 32rem;
  overflow: hidden;
  /* radial + linear fade to --bg on all edges */
  -webkit-mask-image:
    radial-gradient(ellipse 100% 100% at 50% 50%, #000 55%, transparent 100%),
    linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent);
  mask-image:
    radial-gradient(ellipse 100% 100% at 50% 50%, #000 55%, transparent 100%),
    linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
.poster-wall__cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  height: 100%;
}
@media (min-width: 1280px) {
  .poster-wall__cols {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.poster-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  animation: scroll-up var(--dur, 36s) linear infinite;
  will-change: transform;
}
.poster-col--down {
  animation-name: scroll-down;
}
.poster-wall__cols.is-paused .poster-col {
  animation-play-state: paused;
}

.poster-track {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-shrink: 0;
}

@keyframes scroll-up {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, -50%, 0); }
}
@keyframes scroll-down {
  from { transform: translate3d(0, -50%, 0); }
  to { transform: translate3d(0, 0, 0); }
}

/* ------------------------------------------------------------- Poster tile */
.poster {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 0.85rem;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface-2);
  transition:
    transform 0.2s var(--ease-filmic),
    border-color 0.2s var(--ease-filmic),
    box-shadow 0.2s var(--ease-filmic);
}
.poster__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.poster__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    color-mix(in oklab, var(--bg) 78%, transparent) 0%,
    transparent 45%
  );
  opacity: 0;
  transition: opacity 0.2s var(--ease-filmic);
  pointer-events: none;
}
.poster:hover,
.poster:focus-visible {
  transform: translateY(-4px);
  border-color: color-mix(in oklab, var(--accent) 65%, var(--border));
  box-shadow: 0 16px 40px -14px color-mix(in oklab, var(--accent) 70%, transparent);
}
.poster:hover .poster__scrim,
.poster:focus-visible .poster__scrim {
  opacity: 1;
}

/* --------------------------------------------------------- Mobile strip */
.poster-strip {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.poster-strip::-webkit-scrollbar {
  display: none;
}
.poster--strip {
  width: 8.5rem;
  scroll-snap-align: start;
}
@media (min-width: 640px) {
  .poster--strip {
    width: 10rem;
  }
}

/* ------------------------------------------------ Reduced motion: static */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
  }
  .poster-col {
    animation: none;
  }
  .ambient-halo,
  .bokeh--a,
  .bokeh--b {
    animation: none;
  }
  /* Static collage: cap wall height, no infinite drift */
  .poster-wall__mask {
    height: auto;
    max-height: 32rem;
  }
}
</style>
