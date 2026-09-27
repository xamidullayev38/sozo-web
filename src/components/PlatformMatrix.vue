<template>
  <section id="architectures" class="py-32 md:py-48 bg-[#09090C] border-b border-white/[0.08] relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Title -->
      <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-6 mb-16 gap-4">
        <div>
          <span class="font-mono text-xs text-[#FF3B30] uppercase tracking-widest block mb-3">
            [ TARGET DISTRIBUTION ]
          </span>
          <h2 class="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            NATIVE BINARIES FOR 06 ARCHITECTURES.
          </h2>
        </div>
        <p class="font-mono text-xs text-[#858592] uppercase tracking-wider">
          UNIFIED ENGINE RUNNING COMPILED NATIVE THREADS ON DESKTOP, MOBILE, AND BIG SCREENS.
        </p>
      </div>

      <!-- 6-Target Platform Blueprint Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 p-px font-mono">
        <a
          v-for="target in targets"
          :key="target.id"
          :href="target.url"
          class="bg-[#09090C] p-8 flex flex-col justify-between hover:bg-[#111116] transition-colors duration-200 group block"
        >
          <div>
            <div class="flex items-center justify-between text-[10px] text-[#858592] pb-4 border-b border-white/5 mb-6">
              <span>TARGET // {{ target.id }}</span>
              <span class="text-white/60">{{ target.format }}</span>
            </div>

            <h3 class="font-display font-black text-2xl text-white uppercase mb-2 group-hover:text-[#FF3B30] transition-colors">
              {{ target.name }}
            </h3>

            <p class="font-sans text-xs text-[#858592] leading-relaxed mb-6 font-light">
              {{ target.specs }}
            </p>
          </div>

          <div class="pt-4 border-t border-white/5 text-xs text-white flex items-center justify-between">
            <span class="group-hover:translate-x-1 transition-transform">// {{ target.action }}</span>
            <span class="text-[#FF3B30]">→</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const targets = [
  {
    id: 'ARM64_ANDROID',
    name: 'Android Mobile',
    format: 'APPLICATION PACKAGE (.APK)',
    specs: 'Hardware decoders, PiP overlay, gesture volume/brightness, and background batch downloading.',
    action: 'DOWNLOAD APK',
    url: 'https://github.com/professorDeveloper/sozo/releases/latest',
  },
  {
    id: 'DARWIN_IOS',
    name: 'Apple iOS & iPadOS',
    format: 'IPA ARCHIVE (.IPA)',
    specs: 'Direct installation via AltStore, SideStore, or Sideloadly with full Metal graphics acceleration.',
    action: 'INSTALL GUIDE',
    url: 'https://sozo.azamov.me/download/#ios',
  },
  {
    id: 'WIN64_NT',
    name: 'Microsoft Windows',
    format: 'PORTABLE / MSI INSTALLER',
    specs: 'Direct3D 11/12 rendering, Anime4K GLSL shader pipeline, and Discord Rich Presence telemetry.',
    action: 'GET MSI INSTALLER',
    url: 'https://github.com/professorDeveloper/sozo/releases/latest',
  },
  {
    id: 'DARWIN_MACOS',
    name: 'Apple macOS',
    format: 'UNIVERSAL APPLE SILICON & INTEL',
    specs: 'Native menu bar integration, Picture-in-Picture windowing, and ProMotion 120Hz refresh rate.',
    action: 'DOWNLOAD DMG',
    url: 'https://github.com/professorDeveloper/sozo/releases/latest',
  },
  {
    id: 'ANDROID_LEANBACK',
    name: 'Android TV & Google TV',
    format: 'TELEVISION APK',
    specs: 'Directional D-Pad remote control navigation, 4K HDR playback, and automated EPG channel guide.',
    action: 'DOWNLOAD TV APK',
    url: 'https://github.com/professorDeveloper/sozo-tv/releases/latest',
  },
  {
    id: 'POSIX_LINUX',
    name: 'GNU/Linux',
    format: 'FLATPAK / APPIMAGE',
    specs: 'Wayland protocol support, VAAPI hardware acceleration, and zero telemetry collection.',
    action: 'GET APPIMAGE',
    url: 'https://github.com/professorDeveloper/sozo/releases/latest',
  },
]
</script>
