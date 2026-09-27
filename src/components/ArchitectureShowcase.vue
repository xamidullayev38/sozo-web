<template>
  <section id="modules" class="py-32 md:py-48 bg-[#09090C] border-b border-white/[0.08] relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-8 mb-16 gap-6">
        <div>
          <div class="flex items-center gap-2 font-mono text-xs text-[#FF3B30] uppercase tracking-widest mb-3">
            <span>[ SYSTEM MODULES ]</span>
            <span class="text-white/20">/</span>
            <span>SPECIFICATION SPEC_v3.2</span>
          </div>
          <h2 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            ENGINEERING SPECIFICATION.
          </h2>
        </div>
        <p class="font-mono text-xs text-[#858592] uppercase max-w-sm tracking-wider">
          UNIFIED CLIENT ARCHITECTURE FOR PLAYBACK, LOCAL DOCUMENT STORAGE, AND CONTINUOUS EPG SYNCHRONIZATION.
        </p>
      </div>

      <!-- Module Selector Tab Bar -->
      <div class="flex flex-wrap gap-px bg-white/10 p-px mb-12">
        <button
          v-for="(mod, i) in modules"
          :key="mod.id"
          @click="activeIndex = i"
          :class="[
            'px-6 py-4 font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-3',
            activeIndex === i
              ? 'bg-[#FF3B30] text-white font-bold'
              : 'bg-[#111116] text-[#858592] hover:text-white hover:bg-[#16161D]'
          ]"
        >
          <span>{{ mod.code }}</span>
          <span>// {{ mod.name }}</span>
        </button>
      </div>

      <!-- Active Module Technical Viewport -->
      <div class="border border-white/10 bg-[#111116] grid grid-cols-1 lg:grid-cols-12">
        <!-- Technical Telemetry Column (5 Cols) -->
        <div class="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-[10px] text-[#858592] uppercase">
              <span>MODULE ID: {{ currentMod.id }}</span>
              <span class="text-emerald-400">STATUS: COMPILED</span>
            </div>

            <h3 class="font-display font-black text-2xl sm:text-3xl text-white uppercase mb-4 leading-tight">
              {{ currentMod.title }}
            </h3>

            <p class="font-sans text-[#858592] text-base leading-relaxed mb-8 font-light">
              {{ currentMod.description }}
            </p>

            <!-- Technical Specification Table -->
            <dl class="space-y-3 pt-6 border-t border-white/10 font-mono text-xs">
              <div v-for="item in currentMod.specs" :key="item.key" class="flex justify-between py-1 border-b border-white/5">
                <dt class="text-[#858592] uppercase">{{ item.key }}</dt>
                <dd class="text-white font-medium">{{ item.val }}</dd>
              </div>
            </dl>
          </div>

          <div class="pt-8 mt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#858592]">
            <span>SUB-ROUTINE: ACTIVE</span>
            <span class="text-white">v3.2.0</span>
          </div>
        </div>

        <!-- Visual Chamber Column (7 Cols) -->
        <div class="lg:col-span-7 bg-[#09090C] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-6 font-mono text-[10px] text-[#858592] uppercase">
            <span>BUFFER PREVIEW // {{ currentMod.code }}</span>
            <span>PIPELINE: HARDWARE ACCELERATED</span>
          </div>

          <!-- Technical Still Frame -->
          <div class="relative aspect-[16/10] bg-[#111116] border border-white/10 overflow-hidden">
            <img
              :src="currentMod.image"
              :alt="currentMod.name"
              class="w-full h-full object-cover filter contrast-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#09090C] via-transparent to-transparent opacity-80"></div>
            
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/90">
              <span class="px-2 py-1 bg-black/80 border border-white/10">{{ currentMod.caption }}</span>
              <span class="text-[#FF3B30]">REAL APPLICATION STILL</span>
            </div>
          </div>

          <div class="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#858592]">
            <span>RENDER CONTEXT: EGL_WINDOW_SURFACE</span>
            <span>LATENCY: &lt;16MS</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import imgWatch from '../assets/img/image.png'
import imgReader from '../assets/img/scrren.png'
import imgTv from '../assets/img/screen2.png'
import imgBg from '../assets/img/bg.png'

const activeIndex = ref(0)

const modules = [
  {
    id: 'MOD_ANIME4K',
    code: '01',
    name: 'CINEMA CORE',
    title: 'Anime4K Real-Time Shader Pipeline',
    description: 'High-performance rendering engine with custom GLSL shaders for real-time edge reconstruction and upscaling. Includes picture-in-picture, soft-sub parsing, and seek-bar chapter previews.',
    specs: [
      { key: 'UPSCALER', val: 'ANIME4K v4.0.1 GLSL' },
      { key: 'CODECS', val: 'AV1, HEVC, H.264, VP9' },
      { key: 'SUBTITLES', val: 'ASS / SSA / SRT (LIBASS)' },
      { key: 'BUFFERING', val: 'ASYNC DUAL-THREAD' },
    ],
    image: imgWatch,
    caption: '1080P/4K UHD PLAYBACK BUFFER',
  },
  {
    id: 'MOD_READER',
    code: '02',
    name: 'MANGA & NOVELS',
    title: 'Paginated Document Book Engine',
    description: 'Converts raw chapters into paginated book layouts with realistic physics curls. Integrated with 284 novel repositories across 16 languages from LNReader and Mangayomi.',
    specs: [
      { key: 'REPOSITORIES', val: '284 NOVEL ENGINES' },
      { key: 'PAPERS', val: 'DARK, BLACK, SEPIA, LIGHT' },
      { key: 'SYNTHESIS', val: 'LOCAL TTS READ-ALOUD' },
      { key: 'STORAGE', val: 'SQLITE LOCAL CACHE' },
    ],
    image: imgReader,
    caption: 'BOOK MODE WITH REALISTIC PAGINATION',
  },
  {
    id: 'MOD_BROADCAST',
    code: '03',
    name: 'LIVE TELEVISION',
    title: 'Continuous Broadcast & EPG Engine',
    description: 'Ten-foot user interface architected for television remote navigation. Continuous IPTV stream playback with an automated now/next electronic program schedule.',
    specs: [
      { key: 'REMOTE CONTROL', val: 'DPAD DIRECTIONAL NAV' },
      { key: 'STREAM PROTOCOL', val: 'HLS / MPEG-DASH / RTSP' },
      { key: 'EPG GUIDE', val: 'XMLTV AUTO-PARSER' },
      { key: 'DISPLAY TARGET', val: 'ANDROID TV / FIRE TV / SHIELD' },
    ],
    image: imgTv,
    caption: 'TELEVISION LEANBACK INTERFACE',
  },
  {
    id: 'MOD_REPOSITORIES',
    code: '04',
    name: 'SOURCE MATRIX',
    title: 'Independent Extension Indexing',
    description: 'Decentralized source architecture. Load extensions and repositories from CloudStream, Aniyomi, Mihon, Mangayomi, or connect your private Jellyfin server with zero third-party dependencies.',
    specs: [
      { key: 'SUPPORTED EXT', val: 'CLOUDSTREAM, MIHON, JELLYFIN' },
      { key: 'INTEGRITY', val: 'SHA-256 PARITY VERIFIED' },
      { key: 'HEALTH MONITOR', val: 'REAL-TIME PROBE STATUS' },
      { key: 'ENCRYPTION', val: 'LOCAL TOKENS ONLY' },
    ],
    image: imgBg,
    caption: '1,000+ DECENTRALIZED SOURCES',
  },
]

const currentMod = computed(() => modules[activeIndex.value])
</script>
