<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// --- Social links: real destinations only (open in a new tab). ---
const socials = [
  { label: 'Sozo on Telegram', icon: 'fa-brands fa-telegram', href: 'https://t.me/sozoapp' },
]

// --- Slim anchor column mirroring the nav ---
const links = [
  { label: 'Why us', href: '#why' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Download', href: '#download' },
]

// --- Local IntersectionObserver reveal (no shared composable available) ---
const rootEl = ref(null)
let observer = null

onMounted(() => {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = rootEl.value
    ? Array.from(rootEl.value.querySelectorAll('[data-reveal]'))
    : []

  if (reduce || typeof IntersectionObserver === 'undefined') {
    // Reduced motion / no IO support -> start visible.
    targets.forEach((el) => el.classList.add('is-in'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  targets.forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${i * 80}ms`)
    observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <footer
    ref="rootEl"
    class="footer relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]"
  >
    <!-- Faint violet top-glow closing the theatre + slow-drifting bokeh orbs -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="top-glow absolute inset-x-0 top-0 h-40"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
    </div>

    <div
      class="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-14 md:py-16"
    >
      <div
        class="flex flex-col gap-12 md:flex-row md:items-start md:justify-between"
      >
        <!-- Left: wordmark + tagline -->
        <div data-reveal class="reveal max-w-sm">
          <span class="font-display text-3xl tracking-tight text-[var(--text)]"
            >SOZO</span
          >
          <p class="mt-3 text-[var(--text-muted)]">
            Every episode, every season, every story. Anytime, anywhere.
          </p>
        </div>

        <!-- Center: relocated social links, uniform glass circles -->
        <div data-reveal class="reveal">
          <h2
            class="eyebrow mb-4 md:text-center"
          >
            Follow Sozo
          </h2>
          <ul class="flex flex-wrap gap-3 md:justify-center">
            <li v-for="s in socials" :key="s.label">
              <a
                :href="s.href"
                :aria-label="s.label"
                target="_blank"
                rel="noopener"
                class="social-circle"
              >
                <i :class="s.icon" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- Right: slim anchor column mirroring the nav -->
        <nav data-reveal class="reveal" aria-label="Footer">
          <h2 class="eyebrow mb-4">Explore</h2>
          <ul class="flex flex-col gap-2.5">
            <li v-for="l in links" :key="l.href">
              <a :href="l.href" class="foot-link">{{ l.label }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Copyright -->
      <div
        data-reveal
        class="reveal flex flex-col items-center gap-2 border-t border-[var(--border)] pt-8 text-center"
      >
        <p class="text-sm text-[var(--text-muted)]">
          © 2026 Sozo. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* --- Reveal: children start hidden, animate to visible once. --- */
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity 0.6s var(--ease-filmic),
    transform 0.6s var(--ease-filmic);
  transition-delay: var(--reveal-delay, 0ms);
}
.reveal.is-in {
  opacity: 1;
  transform: translateY(0);
}

/* --- Top-glow closing the theatre. --- */
.top-glow {
  background: radial-gradient(
    60% 100% at 50% 0%,
    color-mix(in oklab, var(--accent) 22%, transparent) 0%,
    transparent 70%
  );
}

/* --- Ambient breathing bokeh orbs (the only loop). --- */
.orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
  opacity: 0.5;
  will-change: transform, opacity;
  animation: breathe 8s var(--ease-filmic) infinite;
}
.orb-1 {
  top: -3rem;
  left: 8%;
  width: 16rem;
  height: 16rem;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 60%, transparent),
    transparent 70%
  );
}
.orb-2 {
  bottom: -4rem;
  right: 6%;
  width: 20rem;
  height: 20rem;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 40%, transparent),
    transparent 70%
  );
  animation-delay: -4s;
}

@keyframes breathe {
  0%,
  100% {
    opacity: 0.6;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-8px);
  }
}

/* --- Uniform social circles: ONE hover (violet glow + lift), no brand tint. --- */
.social-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  color: var(--text-muted);
  background: color-mix(in oklab, var(--surface) 70%, transparent);
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-size: 1.05rem;
  transition:
    transform 0.2s var(--ease-filmic),
    color 0.2s var(--ease-filmic),
    border-color 0.2s var(--ease-filmic),
    box-shadow 0.2s var(--ease-filmic);
}
.social-circle:hover {
  transform: translateY(-4px);
  color: var(--text);
  border-color: color-mix(in oklab, var(--accent) 65%, var(--border));
  box-shadow: 0 14px 34px -14px color-mix(in oklab, var(--accent) 75%, transparent);
}
.social-circle:active {
  transform: scale(0.97);
}

/* --- Anchor links: quiet, accent on hover. --- */
.foot-link {
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: color 0.2s var(--ease-filmic);
}
.foot-link:hover {
  color: var(--accent);
}

/* --- Reduced motion: start visible, kill ambient loop. --- */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .orb {
    animation: none;
  }
}
</style>
