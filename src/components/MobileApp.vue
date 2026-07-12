<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDownloads, recommendedBuild } from '../composables/useDownloads.js'
import phonePreview from '../assets/img/scrren.png'

const { groups, status } = useDownloads()

// --- Mobile builds (android / ios) from the shared, fetch-once state -------
const mobilePlatforms = computed(() => groups.value.mobile || [])

const androidPlatform = computed(
  () => mobilePlatforms.value.find((p) => p && p.platform === 'android') || null
)
const iosPlatform = computed(
  () => mobilePlatforms.value.find((p) => p && p.platform === 'ios') || null
)

const androidBuild = computed(() =>
  androidPlatform.value ? recommendedBuild(androidPlatform.value) : null
)
const iosBuild = computed(() =>
  iosPlatform.value ? recommendedBuild(iosPlatform.value) : null
)

// Primary CTA -> Android build downloadUrl, else smooth-scroll to #download.
const androidHref = computed(() =>
  androidBuild.value ? androidBuild.value.downloadUrl : '#download'
)
const androidExternal = computed(() => !!(androidBuild.value && androidBuild.value.external))

function ctaAttrs(build, href) {
  if (build && build.external) {
    return { href, target: '_blank', rel: 'noopener' }
  }
  return { href }
}

const androidAttrs = computed(() => ctaAttrs(androidBuild.value, androidHref.value))
const iosAttrs = computed(() =>
  iosBuild.value ? ctaAttrs(iosBuild.value, iosBuild.value.downloadUrl) : null
)

// Smooth-scroll fallback when there is no android build yet.
function onAndroidClick(e) {
  if (androidHref.value === '#download') {
    e.preventDefault()
    const el = document.getElementById('download')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const benefits = [
  'Stream thousands of series and films in HD, wherever you go.',
  'Download episodes and watch offline on the train or in the sky.',
  'Pick up on your phone exactly where the big screen left off.',
  'Fresh simulcasts and seasonal hits, the moment they drop.',
]

// --- Scroll reveal (single shared IntersectionObserver) --------------------
const root = ref(null)
let observer = null

onMounted(() => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = root.value ? root.value.querySelectorAll('[data-reveal]') : []
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
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
  )

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 75, 450)}ms`
    observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section id="apps" ref="root" class="relative overflow-hidden py-24 sm:py-32">
    <!-- Slow-drifting violet bokeh orbs (ambient) -->
    <div class="orb orb--a" aria-hidden="true"></div>
    <div class="orb orb--b" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-6xl px-4">
      <div class="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <!-- LEFT: copy -->
        <div class="order-2 lg:order-1">
          <p data-reveal class="reveal eyebrow mb-4">On the go</p>

          <h2
            data-reveal
            class="reveal font-display text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]"
          >
            Your library, <span class="gradient-text">in your pocket.</span>
          </h2>

          <p
            data-reveal
            class="reveal mt-5 max-w-xl text-lg text-text-muted"
          >
            Sozo travels with you. Take the entire catalogue anywhere — the same
            watchlist, the same progress, tuned for the small screen.
          </p>

          <ul data-reveal class="reveal mt-8 space-y-4">
            <li
              v-for="benefit in benefits"
              :key="benefit"
              class="flex items-start gap-3 text-base text-text"
            >
              <span class="check-tile" aria-hidden="true">
                <i class="fa-solid fa-check"></i>
              </span>
              <span>{{ benefit }}</span>
            </li>
          </ul>

          <!-- CTAs -->
          <div data-reveal class="reveal mt-10 flex flex-wrap items-center gap-4">
            <!-- Android primary -->
            <a
              class="btn-accent"
              :href="androidAttrs.href"
              :target="androidAttrs.target"
              :rel="androidAttrs.rel"
              :aria-label="
                androidBuild
                  ? `Download Sozo for Android${androidExternal ? ' (opens store)' : ''}`
                  : 'Jump to downloads'
              "
              @click="onAndroidClick"
            >
              <i class="fa-brands fa-android" aria-hidden="true"></i>
              <span>Get it on Android</span>
              <i
                v-if="androidExternal"
                class="fa-solid fa-arrow-up-right-from-square text-xs opacity-80"
                aria-hidden="true"
              ></i>
            </a>

            <!-- iOS: real link if a build exists, else a quiet 'coming soon' chip -->
            <a
              v-if="iosBuild"
              class="btn-ghost"
              :href="iosAttrs.href"
              :target="iosAttrs.target"
              :rel="iosAttrs.rel"
              :aria-label="`Download Sozo for iOS${iosBuild.external ? ' (opens store)' : ''}`"
            >
              <i class="fa-brands fa-apple" aria-hidden="true"></i>
              <span>Download for iOS</span>
              <i
                v-if="iosBuild.external"
                class="fa-solid fa-arrow-up-right-from-square text-xs opacity-80"
                aria-hidden="true"
              ></i>
            </a>
            <span
              v-else
              class="soon-chip"
              role="status"
            >
              <i class="fa-brands fa-apple" aria-hidden="true"></i>
              iOS coming soon
            </span>

            <!-- Secondary: Telegram -->
            <a
              class="btn-ghost"
              href="https://t.me/sozoapp"
              target="_blank"
              rel="noopener"
              aria-label="Open the Sozo Telegram channel (opens in a new tab)"
            >
              <i class="fa-brands fa-telegram" aria-hidden="true"></i>
              <span>Telegram</span>
            </a>
          </div>

          <p
            v-if="status === 'error'"
            class="reveal mt-4 text-sm text-text-muted"
          >
            Downloads are momentarily unavailable —
            <a href="#download" class="text-accent underline underline-offset-2">
              see all platforms</a
            >.
          </p>
        </div>

        <!-- RIGHT: phone mockup on violet glow -->
        <div data-reveal class="reveal order-1 flex justify-center lg:order-2">
          <div class="phone-stage">
            <div class="phone-glow" aria-hidden="true"></div>
            <img
              :src="phonePreview"
              alt="The Sozo mobile app showing an anime detail screen with episode list"
              class="phone-img max-w-full"
              width="340"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---- Scroll reveal (transform/opacity only) ------------------------------ */
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

/* ---- Violet check tiles --------------------------------------------------- */
.check-tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 0.15rem;
  border-radius: 0.55rem;
  font-size: 0.7rem;
  color: var(--accent);
  background: color-mix(in oklab, var(--accent) 16%, transparent);
  border: 1px solid color-mix(in oklab, var(--accent) 40%, var(--border));
}

/* ---- iOS coming-soon chip ------------------------------------------------- */
.soon-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--text-muted);
  background: color-mix(in oklab, var(--surface) 60%, transparent);
  border: 1px dashed var(--border);
}

/* ---- Phone mockup + signature ambient glow -------------------------------- */
.phone-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.phone-glow {
  position: absolute;
  inset: -6%;
  z-index: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 45%,
    color-mix(in oklab, var(--accent) 55%, transparent) 0%,
    color-mix(in oklab, var(--accent-2) 30%, transparent) 38%,
    transparent 68%
  );
  filter: blur(46px);
  opacity: 0.8;
  animation: breathe 8s var(--ease-filmic) infinite;
}
.phone-img {
  position: relative;
  z-index: 1;
  width: 340px;
  border-radius: 1.5rem;
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.75);
  animation: float 7s var(--ease-filmic) infinite;
}

/* ---- Ambient bokeh orbs --------------------------------------------------- */
.orb {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
}
.orb--a {
  top: -6rem;
  right: -4rem;
  width: 26rem;
  height: 26rem;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 40%, transparent) 0%,
    transparent 70%
  );
  opacity: 0.5;
  animation: drift-a 26s var(--ease-filmic) infinite;
}
.orb--b {
  bottom: -8rem;
  left: -6rem;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(
    circle,
    color-mix(in oklab, var(--accent) 30%, transparent) 0%,
    transparent 70%
  );
  opacity: 0.4;
  animation: drift-b 32s var(--ease-filmic) infinite;
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
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}
@keyframes drift-a {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-2rem, 2rem);
  }
}
@keyframes drift-b {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(2rem, -1.5rem);
  }
}

/* ---- Reduced motion: start visible, kill all loops ----------------------- */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .phone-glow,
  .phone-img,
  .orb {
    animation: none !important;
  }
}
</style>
