<template>
  <section id="showcase" class="py-32 md:py-48 bg-[#08080B] relative overflow-hidden">
    <!-- Ambient Backdrop Glow -->
    <div
      v-parallax="{ speed: -0.15 }"
      class="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C5CFF]/10 blur-[150px] rounded-full pointer-events-none will-change-transform"
    ></div>

    <div class="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
      <!-- Section Header -->
      <div class="max-w-3xl mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#8E8E99] uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]"></span>
          <span>Interactive 3D Stage</span>
        </div>
        <h2 class="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          The biggest update yet. <br />
          <span class="bg-gradient-to-r from-white to-[#8E8E99] bg-clip-text text-transparent">Every screen is the real app.</span>
        </h2>
        <p class="text-base sm:text-lg text-[#8E8E99] leading-relaxed">
          Switch between modes to experience how Sozo seamlessly adapts from ultra-high-definition anime streaming to tactile manga book reading.
        </p>
      </div>

      <!-- Mode Selector Tabs -->
      <div class="flex items-center gap-2 sm:gap-3 flex-wrap mb-12">
        <button
          v-for="(mode, index) in modes"
          :key="mode.id"
          @click="activeModeIndex = index"
          :class="[
            'px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-all duration-300 border flex items-center gap-2',
            activeModeIndex === index
              ? 'bg-[#7C5CFF] text-white border-[#7C5CFF] shadow-lg shadow-[#7C5CFF]/25 scale-105'
              : 'bg-[#111116] text-[#8E8E99] border-white/10 hover:text-white hover:border-white/20'
          ]"
        >
          <span class="font-mono text-xs opacity-60">0{{ index + 1 }}</span>
          <span>{{ mode.title }}</span>
        </button>
      </div>

      <!-- 3D Stage Showcase Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Left: Feature Narrative Details -->
        <div class="lg:col-span-5 space-y-6">
          <div class="p-8 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden double-bezel-inner">
            <span class="font-mono text-xs uppercase tracking-widest text-[#FF5733] font-semibold block mb-3">
              {{ currentMode.tag }}
            </span>
            <h3 class="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              {{ currentMode.headline }}
            </h3>
            <p class="text-[#8E8E99] text-base leading-relaxed mb-6">
              {{ currentMode.description }}
            </p>

            <ul class="space-y-3 pt-6 border-t border-white/10">
              <li
                v-for="bullet in currentMode.bullets"
                :key="bullet"
                class="flex items-center gap-3 text-sm text-white/80"
              >
                <div class="w-5 h-5 rounded-full bg-[#7C5CFF]/20 flex items-center justify-center text-[#7C5CFF]">
                  <svg class="w-3 h-3" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right: 3D Perspective Device Screen with GPU acceleration -->
        <div class="lg:col-span-7 perspective-1000">
          <div
            class="relative rounded-[2rem] bg-gradient-to-tr from-white/15 to-white/5 p-2 shadow-2xl transition-all duration-700 ease-out preserve-3d"
            style="transform: rotateY(-6deg) rotateX(4deg);"
          >
            <div class="rounded-[1.75rem] bg-[#08080B] border border-white/10 overflow-hidden shadow-2xl relative aspect-[16/10]">
              <!-- Mock Screen Header -->
              <div class="h-9 px-5 bg-[#111116] border-b border-white/5 flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                </div>
                <span class="font-mono text-[10px] text-white/40 tracking-wider">
                  {{ currentMode.screenUrl }}
                </span>
                <span class="font-mono text-[10px] text-[#7C5CFF] font-semibold">SOZO v3</span>
              </div>

              <!-- Screen Image Preview with smooth transition -->
              <div class="relative w-full h-full overflow-hidden">
                <img
                  :src="currentMode.image"
                  :alt="currentMode.title"
                  class="w-full h-full object-cover object-top transition-opacity duration-500 filter contrast-105"
                />
                
                <!-- Bottom Play/Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#08080B]/90 via-transparent to-transparent"></div>
                <div class="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/70">
                  <span class="font-mono">{{ currentMode.caption }}</span>
                  <span class="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white font-medium">Live Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import imgWatch from '../assets/img/image.png'
import imgSrc from '../assets/img/screen2.png'
import imgManga from '../assets/img/scrren.png'
import imgBg from '../assets/img/bg.png'

const activeModeIndex = ref(0)

const modes = [
  {
    id: 'anime',
    title: 'Anime & Movies',
    tag: 'Cinematic Player',
    headline: 'A player engineered for bingeing.',
    description: 'Anime4K real-time upscaling, picture-in-picture, and intelligent seek-bar scrubbing. Sozo automatically caches and syncs your timestamps.',
    bullets: [
      'Multi-language soft subtitles and dual audio',
      'Anime4K shader integration for crisp upscaling',
      'Instant auto-next episode buffering',
    ],
    screenUrl: 'sozo://player/anime4k',
    caption: '1080p / 4K UHD Streams',
    image: imgWatch,
  },
  {
    id: 'novels',
    title: 'Manga & Novels',
    tag: 'Book Mode Engine',
    headline: 'Pages that turn like real paper.',
    description: '284 novel sources in 16 languages. Chapters are laid out into physical pages with realistic page curl, custom paper textures, and text-to-speech.',
    bullets: [
      'Four reading papers: Dark, Black, Sepia, and Light',
      'Natural TTS read-aloud with sleep timer',
      'Offline batch downloading for uninterrupted reading',
    ],
    screenUrl: 'sozo://reader/book-mode',
    caption: '284 Sources Supported',
    image: imgManga,
  },
  {
    id: 'tv',
    title: 'Live TV & Android TV',
    tag: 'Broadcast Experience',
    headline: 'From your pocket straight to the big screen.',
    description: 'Leanback UI designed specifically for remote controls. Live TV channels with a full now/next guide that auto-reconnects seamlessly.',
    bullets: [
      'Android TV, Google TV & Apple TV casting',
      'Continuous broadcast playback without dropouts',
      'Synchronized watch history across devices',
    ],
    screenUrl: 'sozo://tv/broadcast',
    caption: 'Optimized for 4K TV screens',
    image: imgSrc,
  },
  {
    id: 'party',
    title: 'Watch Party',
    tag: 'Social Sync',
    headline: 'Watch together, miles apart.',
    description: 'Host synchronized watch rooms with real-time video sync, live text chat, and shared playback control with your friends.',
    bullets: [
      'Sub-second latency video synchronization',
      'Integrated friend activity & status feeds',
      'Zero account hassle or subscription barriers',
    ],
    screenUrl: 'sozo://party/room-live',
    caption: 'Synchronized Playback',
    image: imgBg,
  },
]

const currentMode = computed(() => modes[activeModeIndex.value])
</script>
