<template>
  <section id="why-inner" class="relative overflow-hidden py-24 sm:py-28">
    <!-- Ambient slow-drifting violet bokeh orbs (decorative) -->
    <div class="orbs" aria-hidden="true">
      <span class="orb orb-1"></span>
      <span class="orb orb-2"></span>
      <span class="orb orb-3"></span>
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
      <!-- Header -->
      <header
        ref="headerRef"
        class="reveal mx-auto max-w-2xl text-center"
        :class="{ 'is-visible': headerVisible }"
      >
        <p class="eyebrow mb-3">Why Sozo</p>
        <h2 class="font-display text-3xl leading-tight text-text sm:text-4xl md:text-5xl">
          Everything your <span class="gradient-text">anime nights</span> need
        </h2>
        <p class="mt-4 text-base text-text-muted sm:text-lg">
          Every episode. Every season. Every story — streamed in top quality,
          anywhere you watch.
        </p>
      </header>

      <!-- Feature grid: 1 / 2 / 4 columns -->
      <ul
        ref="gridRef"
        class="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        <li
          v-for="(item, i) in features"
          :key="item.title"
          class="reveal feature-card surface-card flex flex-col items-start p-6 sm:p-7"
          :class="{ 'is-visible': cardsVisible }"
          :style="{ transitionDelay: cardsVisible ? i * 80 + 'ms' : '0ms' }"
        >
          <span class="icon-tile" aria-hidden="true">
            <span class="icon-halo"></span>
            <img
              :src="item.icon"
              :alt="item.alt"
              class="relative z-10 h-10 w-10 object-contain sm:h-11 sm:w-11"
              loading="lazy"
              decoding="async"
              width="44"
              height="44"
            />
          </span>

          <h3 class="mt-5 font-display text-lg leading-snug text-text">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-text-muted">
            {{ item.body }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Local icons — bundled by Vite (was: external Vercel blob URLs).
import img1 from '../assets/img/1.png'
import img2 from '../assets/img/2.png'
import img3 from '../assets/img/3.png'
import img4 from '../assets/img/4.png'

const features = [
  {
    icon: img1,
    alt: 'Stacked episode library icon',
    title: '1000+ Anime Episodes',
    body: 'A deep, always-growing catalog of series and seasons ready to stream.',
  },
  {
    icon: img2,
    alt: 'Devices for watching anywhere icon',
    title: 'Watch anytime, anywhere',
    body: 'Pick up right where you left off across mobile, desktop and TV.',
  },
  {
    icon: img3,
    alt: 'Cast and staff profile icon',
    title: 'Cast & staff info',
    body: 'Explore the voice actors, studios and creators behind every title.',
  },
  {
    icon: img4,
    alt: 'High-definition quality badge icon',
    title: 'Everything in top quality',
    body: 'Crisp, high-resolution playback tuned for whatever screen you use.',
  },
]

// --- Shared IntersectionObserver reveal (fire once, then unobserve) ---
const headerRef = ref(null)
const gridRef = ref(null)
const headerVisible = ref(false)
const cardsVisible = ref(false)

let observer = null

onMounted(() => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    headerVisible.value = true
    cardsVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        if (entry.target === headerRef.value) headerVisible.value = true
        if (entry.target === gridRef.value) cardsVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
  )

  if (headerRef.value) observer.observe(headerRef.value)
  if (gridRef.value) observer.observe(gridRef.value)
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
/* --- Reveal motion: opacity + translateY only (GPU) --- */
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.6s var(--ease-filmic),
    transform 0.6s var(--ease-filmic);
  will-change: transform, opacity;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- Feature card: hairline border warming toward accent on hover --- */
.feature-card {
  border-radius: 1.25rem;
}
.feature-card:focus-within {
  border-color: color-mix(in oklab, var(--accent) 55%, var(--border));
}

/* --- Icon tile: rounded violet-tinted glow squircle --- */
.icon-tile {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 1rem;
  background: color-mix(in oklab, var(--accent) 14%, var(--surface-2));
  border: 1px solid color-mix(in oklab, var(--accent) 32%, var(--border));
  transition:
    border-color 0.2s var(--ease-filmic),
    box-shadow 0.2s var(--ease-filmic);
}
.icon-halo {
  position: absolute;
  inset: -30%;
  border-radius: 9999px;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 55%, transparent) 0%,
    transparent 68%
  );
  filter: blur(14px);
  opacity: 0.6;
  z-index: 0;
  /* Signature ambient breathe (the only per-icon loop). */
  animation: breathe 8s ease-in-out infinite;
}
.feature-card:hover .icon-tile {
  border-color: color-mix(in oklab, var(--accent) 60%, var(--border));
  box-shadow: 0 10px 30px -12px color-mix(in oklab, var(--accent) 70%, transparent);
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

/* --- Ambient bokeh orbs (2–3 slow-drifting violet blurs) --- */
.orbs {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(60px);
  opacity: 0.22;
  background: var(--grad-accent);
  will-change: transform;
}
.orb-1 {
  width: 22rem;
  height: 22rem;
  top: -6rem;
  left: -4rem;
  animation: drift-1 26s ease-in-out infinite;
}
.orb-2 {
  width: 16rem;
  height: 16rem;
  bottom: -4rem;
  right: -2rem;
  opacity: 0.16;
  animation: drift-2 32s ease-in-out infinite;
}
.orb-3 {
  width: 14rem;
  height: 14rem;
  top: 40%;
  right: 30%;
  opacity: 0.12;
  animation: drift-3 38s ease-in-out infinite;
}

@keyframes drift-1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(3rem, 2rem);
  }
}
@keyframes drift-2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-2.5rem, -2rem);
  }
}
@keyframes drift-3 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-2rem, 2.5rem);
  }
}

/* --- Reduced motion: start visible, kill loops --- */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .icon-halo,
  .orb {
    animation: none;
  }
}
</style>
