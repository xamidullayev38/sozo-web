<template>
  <section id="overview" class="relative min-h-[100dvh] pt-32 pb-24 md:pt-40 md:pb-36 bg-[#09090C] border-b border-white/[0.08] overflow-hidden blueprint-grid flex flex-col justify-between">
    <!-- Background Watermark Parallax -->
    <div
      v-parallax="{ speed: -0.35 }"
      class="absolute top-1/4 left-0 right-0 text-center select-none pointer-events-none opacity-[0.03] leading-none will-change-transform z-0"
    >
      <span class="font-display font-black text-[25vw] tracking-tighter text-white uppercase">
        SOZO
      </span>
    </div>

    <!-- Main Editorial Chamber -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 w-full my-auto">
      <!-- Technical Telemetry Header Line -->
      <div class="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-10 font-mono text-[11px] text-[#858592] uppercase tracking-widest">
        <div class="flex items-center gap-3">
          <span class="inline-block w-2 h-2 bg-[#FF3B30]"></span>
          <span>SYS.SPEC // PUBLIC RELEASE V3.2.0</span>
        </div>
        <div class="hidden sm:flex items-center gap-6">
          <span>GPL-3.0 OPEN ARCHITECTURE</span>
          <span>ZERO TELEMETRY</span>
        </div>
      </div>

      <!-- Macro-Headline: Clean 2-Line Architectural Force -->
      <div class="max-w-6xl mb-10">
        <h1 class="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[84px] text-white tracking-[-0.04em] leading-[0.98] uppercase mb-8">
          Everything you watch and read.<br />
          <span class="text-[#FF3B30]">One application.</span>
        </h1>

        <p class="font-sans text-lg sm:text-2xl text-[#858592] max-w-3xl leading-relaxed font-light">
          Anime, cinema, serials, manga, light novels, and live television streams unified from over 1,000 independent sources. Free, open source, on every display.
        </p>
      </div>

      <!-- Tactical Action Bar -->
      <div class="flex flex-wrap items-center gap-5 pt-8 border-t border-white/[0.08] mb-16 font-mono">
        <a
          href="#download"
          class="inline-flex items-center gap-3 px-8 py-4 bg-[#FF3B30] hover:bg-[#E0352B] active:scale-95 text-white font-semibold text-xs tracking-widest uppercase transition-all duration-200"
        >
          <span>DOWNLOAD RELEASE</span>
          <span class="text-white/60">→</span>
        </a>

        <a
          href="https://github.com/professorDeveloper/sozo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-medium text-xs tracking-widest uppercase transition-all duration-200"
        >
          <span>INSPECT SOURCE CODE</span>
          <span class="text-white/40">↗</span>
        </a>

        <div class="hidden lg:flex items-center gap-4 ml-auto text-xs text-[#858592]">
          <span>STATUS: OPERATIONAL</span>
          <span class="text-white/20">|</span>
          <span>TRACKERS: 0</span>
          <span class="text-white/20">|</span>
          <span>EXTENSIONS: 1,000+</span>
        </div>
      </div>

      <!-- Layered Parallax Cinematic Stills Chamber (No Fake 3D Phones) -->
      <div class="relative w-full border border-white/10 bg-[#111116] p-4 sm:p-6 overflow-hidden">
        <!-- Frame Telemetry Meta -->
        <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-4 font-mono text-[10px] text-[#858592] uppercase tracking-widest">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-emerald-400"></span>
            <span>LIVE BUFFER // MEDIA DISPLAY MATRIX</span>
          </div>
          <span>RESOLUTION: 4K UHD NATIVE</span>
        </div>

        <!-- 3-Column Photographic Grid with Asymmetric Parallax -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Frame 01: Cinema Player -->
          <div
            v-parallax="{ speed: 0.08 }"
            class="relative aspect-[16/10] bg-[#09090C] border border-white/10 overflow-hidden group will-change-transform"
          >
            <img
              src="../assets/img/image.png"
              alt="Cinema Stream"
              class="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute bottom-2 left-2 right-2 p-2 bg-[#09090C]/90 backdrop-blur-md border border-white/10 flex justify-between items-center text-[10px] font-mono text-white/80">
              <span>01 // ANIME4K ENGINE</span>
              <span class="text-[#FF3B30]">1080P/60FPS</span>
            </div>
          </div>

          <!-- Frame 02: Reader Mode -->
          <div
            v-parallax="{ speed: -0.06 }"
            class="relative aspect-[16/10] bg-[#09090C] border border-white/10 overflow-hidden group will-change-transform"
          >
            <img
              src="../assets/img/scrren.png"
              alt="Manga Reader"
              class="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute bottom-2 left-2 right-2 p-2 bg-[#09090C]/90 backdrop-blur-md border border-white/10 flex justify-between items-center text-[10px] font-mono text-white/80">
              <span>02 // BOOK MODE (284 SOURCES)</span>
              <span class="text-emerald-400">PAGINATED</span>
            </div>
          </div>

          <!-- Frame 03: Broadcast Stage -->
          <div
            v-parallax="{ speed: 0.12 }"
            class="relative aspect-[16/10] bg-[#09090C] border border-white/10 overflow-hidden group will-change-transform"
          >
            <img
              src="../assets/img/screen2.png"
              alt="Television Display"
              class="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute bottom-2 left-2 right-2 p-2 bg-[#09090C]/90 backdrop-blur-md border border-white/10 flex justify-between items-center text-[10px] font-mono text-white/80">
              <span>03 // TELEVISION & EPG GUIDE</span>
              <span class="text-cyan-400">BROADCAST</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Supported Architectures Line -->
      <div class="pt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-[#858592]">
        <span class="text-white/40 uppercase tracking-widest text-[11px] mr-2">NATIVE TARGETS:</span>
        <span class="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-white/90">[ ANDROID ]</span>
        <span class="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-white/90">[ IOS ]</span>
        <span class="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-white/90">[ WINDOWS ]</span>
        <span class="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-white/90">[ MACOS ]</span>
        <span class="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-white/90">[ LINUX ]</span>
        <span class="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-white/90">[ ANDROID TV ]</span>
      </div>
    </div>
  </section>
</template>

<script setup>
// Hero Component: Serious Swiss Brutalist Architecture
</script>