<template>
  <section class="py-32 md:py-48 bg-[#09090C] border-b border-white/[0.08] relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Title -->
      <div class="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-16 font-mono text-xs text-[#858592] uppercase">
        <div class="flex items-center gap-2 text-white">
          <span class="w-1.5 h-1.5 bg-[#FF3B30]"></span>
          <span>[ CAPABILITY MATRIX ]</span>
        </div>
        <span>ARCH_INDEX // 06 SUBSYSTEMS</span>
      </div>

      <!-- Rigid Technical Grid (1px gap, sharp 90-degree corners) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 p-px">
        <div
          v-for="feat in capabilities"
          :key="feat.code"
          class="bg-[#09090C] p-8 sm:p-10 flex flex-col justify-between hover:bg-[#111116] transition-colors duration-200 group"
        >
          <div>
            <div class="flex items-center justify-between font-mono text-[10px] text-[#858592] uppercase tracking-widest pb-4 border-b border-white/5 mb-6">
              <span>{{ feat.code }} // {{ feat.subsystem }}</span>
              <span class="text-white/40">SYS_OK</span>
            </div>

            <h3 class="font-display font-black text-xl text-white uppercase mb-3 group-hover:text-[#FF3B30] transition-colors">
              {{ feat.title }}
            </h3>

            <p class="font-sans text-sm text-[#858592] leading-relaxed font-light mb-8">
              {{ feat.description }}
            </p>
          </div>

          <div class="pt-4 border-t border-white/5 font-mono text-[11px] text-[#858592] flex items-center justify-between">
            <span>{{ feat.specTag }}</span>
            <span class="text-white/40">[ + ]</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const capabilities = [
  {
    code: 'CAP-01',
    subsystem: 'INGESTION',
    title: '1,000+ Unified Sources',
    description: 'Direct ingestion from CloudStream 4.8, Aniyomi, Mihon, Mangayomi, LNReader, and personal Jellyfin servers. Health probe indicators alert you to server latency before stream initiation.',
    specTag: 'PROTOCOL: MULTI-EXTENSION',
  },
  {
    code: 'CAP-02',
    subsystem: 'SYNCHRONIZATION',
    title: 'Multi-Tracker Scrobbling',
    description: 'Instant bi-directional state synchronization with AniList, MyAnimeList, and Trakt. Offline queue registers and resolves tracking updates upon reconnection.',
    specTag: 'API: ANILIST / MAL / TRAKT',
  },
  {
    code: 'CAP-03',
    subsystem: 'CRYPTOGRAPHY',
    title: 'Zero-Telemetry Sandbox',
    description: 'Tokens encrypted client-side using hardware keychains. Incognito browsing mode with isolated session caches and native DNS-over-HTTPS resolution.',
    specTag: 'SECURITY: CLIENT-SIDE ENCRYPT',
  },
  {
    code: 'CAP-04',
    subsystem: 'SCHEDULER',
    title: 'Automated Feed Ingestion',
    description: 'Background cron checks query release calendars to deliver low-overhead notifications when new anime episodes or manga chapters drop.',
    specTag: 'DISPATCH: PUSH NOTIFICATIONS',
  },
  {
    code: 'CAP-05',
    subsystem: 'ACCESS CONTROL',
    title: 'Multi-Profile Architecture',
    description: 'Up to four discrete profile accounts per client instance. Discrete history, independent bookmark stores, and optional PIN security lock with kids filters.',
    specTag: 'PROFILES: QUADRUPLE DISCRETE',
  },
  {
    code: 'CAP-06',
    subsystem: 'GAMIFICATION',
    title: 'Telemetry Streak Flames',
    description: 'Cryptographically verified reading and viewing streaks ranging from 7 to 365 days. Hardware-accelerated medals tilt with kinetic physics.',
    specTag: 'MILESTONES: 7–365 DAYS',
  },
]
</script>
