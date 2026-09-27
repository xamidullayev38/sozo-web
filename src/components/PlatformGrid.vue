<template>
  <section id="platforms" class="py-32 md:py-48 bg-[#08080B] border-t border-white/[0.06] relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <!-- Section Header -->
      <div class="max-w-3xl mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#8E8E99] uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-[#7C5CFF]"></span>
          <span>Multi-Device Ecosystem</span>
        </div>
        <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Start on your phone. Finish on the TV.
        </h2>
        <p class="text-base sm:text-lg text-[#8E8E99] leading-relaxed">
          Watch history, read lists, bookmarks and custom progress follow you seamlessly across every device you sign in on.
        </p>
      </div>

      <!-- 6 Native Platforms Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ParallaxCard
          v-for="plat in platforms"
          :key="plat.name"
          :max-tilt="12"
          :scale="1.03"
          custom-class="p-8 rounded-3xl bg-[#111116] border border-white/10 hover:border-[#7C5CFF]/50 transition-all duration-300 shadow-xl double-bezel-inner flex flex-col justify-between group cursor-pointer"
        >
          <div>
            <div class="flex items-center justify-between mb-8">
              <div class="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#7C5CFF]/15 group-hover:text-[#7C5CFF] transition-all duration-300">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" v-html="plat.svgPath"></svg>
              </div>
              <span class="font-mono text-xs uppercase tracking-widest text-[#8E8E99] group-hover:text-white transition-colors">
                {{ plat.tag }}
              </span>
            </div>

            <h3 class="font-display font-bold text-2xl text-white mb-2 group-hover:text-[#7C5CFF] transition-colors">
              {{ plat.name }}
            </h3>
            <p class="text-[#8E8E99] text-sm leading-relaxed mb-6">
              {{ plat.desc }}
            </p>
          </div>

          <div class="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white/90">
            <span>{{ plat.action }}</span>
            <svg class="w-4 h-4 text-[#8E8E99] group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </ParallaxCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import ParallaxCard from './parallax/ParallaxCard.vue'

const platforms = [
  {
    name: 'Android',
    tag: 'Mobile & Tablet',
    desc: 'Native performance, gesture controls, picture-in-picture, and background downloads.',
    action: 'Download APK',
    svgPath: '<path d="M17.6 9.48l1.84-3.18a.38.38 0 0 0-.66-.38l-1.87 3.23A11.5 11.5 0 0 0 12 8.1c-1.77 0-3.43.39-4.91 1.05L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"/>',
  },
  {
    name: 'iOS & iPadOS',
    tag: 'iPhone & iPad',
    desc: 'Install via AltStore, SideStore, or Sideloadly IPA with full hardware acceleration.',
    action: 'Install Guide',
    svgPath: '<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.61-.74 1.04-1.78.92-2.87-.97.04-2.1.65-2.73 1.39-.56.65-1.05 1.71-.92 2.76 1.08.08 2.13-.57 2.73-1.28Z"/>',
  },
  {
    name: 'Windows',
    tag: 'x64 & ARM64',
    desc: 'Desktop windowed player, keyboard shortcuts, Discord Rich Presence, and Anime4K.',
    action: 'Download MSI / EXE',
    svgPath: '<path d="M3 5.1 10.4 4v7.2H3V5.1Zm0 13.8 7.4 1.1v-7.1H3v6Zm8.2 1.2L21 21.5V12.9h-9.8v7.2Zm0-16.2v7.3H21V2.5l-9.8 1.4Z"/>',
  },
  {
    name: 'macOS',
    tag: 'Apple Silicon & Intel',
    desc: 'Universal macOS build with native menu bar, Picture-in-Picture, and ProMotion 120Hz.',
    action: 'Download DMG',
    svgPath: '<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5l1 2h2v1.5H6V20h2l1-2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v10h16V6H4Z"/>',
  },
  {
    name: 'Android TV',
    tag: 'Google TV & FireOS',
    desc: '10-foot remote interface, automatic EPG channel switcher, and 4K HDR playback.',
    action: 'Download TV APK',
    svgPath: '<path d="M21 3H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h5l-1 2v1h10v-1l-1-2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 13H3V5h18v11Z"/>',
  },
  {
    name: 'Linux',
    tag: 'Flatpak & AppImage',
    desc: 'Lightweight desktop client with Wayland support, hardware decoding, and zero telemetry.',
    action: 'Get AppImage',
    svgPath: '<path d="M12 2c-2.2 0-3.5 1.9-3.5 4.6 0 1.3.2 2.2-.6 3.6-.9 1.5-2.6 3.3-2.6 5.8 0 .8.2 1.5.5 2.1-.7.4-1.8.6-1.8 1.6 0 1.1 1.6 1 2.7 1.4 1 .4 1.7 1 2.6.9.8-.1 1.2-.7 1.3-1.2h2.8c.1.5.5 1.1 1.3 1.2.9.1 1.6-.5 2.6-.9 1.1-.4 2.7-.3 2.7-1.4 0-1-1.1-1.2-1.8-1.6.3-.6.5-1.3.5-2.1 0-2.5-1.7-4.3-2.6-5.8-.8-1.4-.6-2.3-.6-3.6C15.5 3.9 14.2 2 12 2Z"/>',
  },
]
</script>
