<template>
  <section class="relative min-h-[100dvh] pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden flex flex-col justify-between bg-[#08080B] perspective-1400">
    <!-- Ambient Background Radial Lighting -->
    <div
      v-parallax="{ speed: -0.2 }"
      class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#7C5CFF]/15 to-[#FF5733]/15 blur-[140px] rounded-full pointer-events-none will-change-transform z-0"
    ></div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full my-auto text-center flex flex-col items-center">
      <!-- Eyebrow Badge -->
      <div
        v-parallax="{ speed: 0.05 }"
        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-8 backdrop-blur-md will-change-transform"
      >
        <span class="w-2 h-2 rounded-full bg-[#FF5733] animate-pulse"></span>
        <span class="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#8E8E99]">
          Version 3.2.0 is out
        </span>
      </div>

      <!-- Main Headline: Ultra-wide, 2 lines max guaranteed -->
      <h1
        v-parallax="{ speed: 0.08 }"
        class="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-white tracking-[-0.04em] leading-[1.05] max-w-5xl mb-8 will-change-transform"
      >
        Everything you watch <span class="bg-gradient-to-r from-[#FF5733] to-[#FF8C66] bg-clip-text text-transparent">and read.</span><br />
        One app.
      </h1>

      <!-- Lead paragraph -->
      <p
        v-parallax="{ speed: 0.12 }"
        class="text-lg sm:text-xl text-[#8E8E99] max-w-2xl leading-relaxed mb-10 will-change-transform"
      >
        Anime, movies, series, manga, light novels and live TV from over a thousand sources — free, open source, and on every screen you own.
      </p>

      <!-- Actions -->
      <div
        v-parallax="{ speed: 0.15 }"
        class="flex flex-wrap items-center justify-center gap-4 mb-16 will-change-transform"
      >
        <a
          href="#download"
          class="group inline-flex items-center gap-3 pl-8 pr-3 py-3.5 rounded-full bg-[#7C5CFF] hover:bg-[#6C4CEE] active:scale-95 text-white text-base font-semibold transition-all duration-300 shadow-xl shadow-[#7C5CFF]/25"
        >
          <span>Download Sozo</span>
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V11M8 11L4.5 7.5M8 11L11.5 7.5M3 14H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </a>

        <a
          href="#platforms"
          class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.04] text-white text-base font-medium border border-white/10 hover:bg-white/[0.08] active:scale-95 transition-all duration-200"
        >
          <span>All 6 platforms</span>
          <svg class="w-4 h-4 text-[#8E8E99]" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <!-- 3D Hardware Display Stage -->
      <div class="relative w-full max-w-4xl mx-auto pt-4 preserve-3d">
        <!-- Floating 3D Depth Card 1: 1,000+ Sources -->
        <div
          v-parallax="{ speed: 0.28 }"
          class="hidden sm:flex absolute -left-6 top-16 z-20 items-center gap-3 p-4 rounded-2xl bg-[#111116]/90 border border-white/10 backdrop-blur-xl shadow-2xl double-bezel will-change-transform"
        >
          <div class="w-10 h-10 rounded-xl bg-[#FF5733]/15 flex items-center justify-center text-[#FF5733] font-bold text-sm">
            1K+
          </div>
          <div class="text-left">
            <span class="block font-display font-bold text-sm text-white">Online Sources</span>
            <span class="font-mono text-[11px] text-[#8E8E99]">Anime, Manga & TV</span>
          </div>
        </div>

        <!-- Floating 3D Depth Card 2: 0 Ads Forever -->
        <div
          v-parallax="{ speed: -0.15 }"
          class="hidden sm:flex absolute -right-6 top-24 z-20 items-center gap-3 p-4 rounded-2xl bg-[#111116]/90 border border-white/10 backdrop-blur-xl shadow-2xl double-bezel will-change-transform"
        >
          <div class="w-10 h-10 rounded-xl bg-[#7C5CFF]/15 flex items-center justify-center text-[#7C5CFF] font-bold text-sm">
            0
          </div>
          <div class="text-left">
            <span class="block font-display font-bold text-sm text-white">Zero Ads. Ever.</span>
            <span class="font-mono text-[11px] text-[#8E8E99]">100% Free & Open Source</span>
          </div>
        </div>

        <!-- Centered 3D Machined Device Frame (Double-Bezel) -->
        <div
          ref="deviceRef"
          class="relative mx-auto max-w-3xl rounded-[2.5rem] bg-gradient-to-b from-white/15 to-white/5 p-2 shadow-2xl glow-violet will-change-transform transition-transform duration-500"
          style="transform: rotateX(8deg) rotateY(-2deg);"
        >
          <div class="rounded-[2.25rem] bg-[#08080B] border border-white/10 overflow-hidden shadow-inner relative aspect-[16/10]">
            <!-- Top App Bar -->
            <div class="h-10 px-6 bg-[#111116] border-b border-white/5 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#FF5F56]/80"></span>
                <span class="w-3 h-3 rounded-full bg-[#FFBD2E]/80"></span>
                <span class="w-3 h-3 rounded-full bg-[#27C93F]/80"></span>
              </div>
              <span class="font-mono text-[11px] text-white/40 tracking-wider">sozo.stream / v3.2.0</span>
              <div class="w-12"></div>
            </div>

            <!-- Showcase Preview Image -->
            <img
              src="../assets/img/screen2.png"
              alt="Sozo App interface"
              class="w-full h-full object-cover object-top filter contrast-105"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const deviceRef = ref(null)

let handleMouseMove = null

onMounted(() => {
  const el = deviceRef.value
  if (!el) return

  handleMouseMove = (e) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = ((y - centerY) / centerY) * -10 + 6
    const rotY = ((x - centerX) / centerX) * 10 - 2

    el.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
  }

  window.addEventListener('mousemove', handleMouseMove, { passive: true })
})

onBeforeUnmount(() => {
  if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove)
})
</script>