<template>
  <section id="features" class="py-32 md:py-48 bg-[#08080B] relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <!-- Section Header -->
      <div class="max-w-3xl mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#8E8E99] uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-[#FF5733]"></span>
          <span>Architectural Suite</span>
        </div>
        <h2 class="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Built for the way you watch — and read.
        </h2>
        <p class="text-base sm:text-lg text-[#8E8E99] leading-relaxed">
          Every capability in Sozo is designed without compromise: open protocols, client-side encryption, and seamless platform synchronization.
        </p>
      </div>

      <!-- Gapless Bento Grid Matrix (12-column mathematically interlocking) -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 grid-flow-dense">
        <!-- Tile 1: 1,000+ Sources (Span 8) -->
        <div class="md:col-span-8 p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden double-bezel-inner flex flex-col justify-between group hover:border-[#7C5CFF]/40 transition-colors duration-300">
          <div>
            <div class="flex items-center justify-between mb-8">
              <span class="font-mono text-xs uppercase tracking-widest text-[#7C5CFF] font-semibold">Integrations</span>
              <span class="px-3 py-1 rounded-full bg-[#7C5CFF]/10 text-[#7C5CFF] text-xs font-mono">Multi-Ecosystem</span>
            </div>
            <h3 class="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              1,000+ sources. CloudStream, Aniyomi, Mihon, Mangayomi & Jellyfin.
            </h3>
            <p class="text-[#8E8E99] text-base leading-relaxed max-w-xl mb-8">
              Switch in a single tap. Browse any extension or personal server before you stream. Equipped with live health badges that verify uptime.
            </p>
          </div>

          <!-- Extension chips -->
          <div class="flex flex-wrap gap-2.5 pt-6 border-t border-white/10 text-xs font-mono text-white/70">
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5">CloudStream 4.8</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5">Aniyomi Core</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5">Mihon Extensions</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5">LNReader Engines</span>
            <span class="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5">Self-Hosted Jellyfin</span>
          </div>
        </div>

        <!-- Tile 2: Track Everywhere (Span 4) -->
        <div class="md:col-span-4 p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden double-bezel-inner flex flex-col justify-between group hover:border-[#FF5733]/40 transition-colors duration-300">
          <div>
            <div class="flex items-center justify-between mb-8">
              <span class="font-mono text-xs uppercase tracking-widest text-[#FF5733] font-semibold">Sync</span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#FF5733]"></span>
            </div>
            <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-3">
              Tracks everywhere.
            </h3>
            <p class="text-[#8E8E99] text-sm leading-relaxed mb-6">
              Instant scrobbling with AniList, MyAnimeList, and Trakt — with automatic retry queues when offline.
            </p>
          </div>
          <div class="pt-6 border-t border-white/10 text-xs font-mono text-[#8E8E99]">
            Full history & library import
          </div>
        </div>

        <!-- Tile 3: Private by Design (Span 4) -->
        <div class="md:col-span-4 p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden double-bezel-inner flex flex-col justify-between group hover:border-white/20 transition-colors duration-300">
          <div>
            <div class="flex items-center justify-between mb-8">
              <span class="font-mono text-xs uppercase tracking-widest text-[#8E8E99] font-semibold">Security</span>
              <svg class="w-4 h-4 text-[#8E8E99]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-3">
              Private by design.
            </h3>
            <p class="text-[#8E8E99] text-sm leading-relaxed mb-6">
              Encrypted tokens, hardware biometric app lock, incognito browsing, and native DNS-over-HTTPS.
            </p>
          </div>
          <div class="pt-6 border-t border-white/10 text-xs font-mono text-[#8E8E99]">
            Zero telemetry trackers
          </div>
        </div>

        <!-- Tile 4: Smart Notifications (Span 4) -->
        <div class="md:col-span-4 p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden double-bezel-inner flex flex-col justify-between group hover:border-white/20 transition-colors duration-300">
          <div>
            <div class="flex items-center justify-between mb-8">
              <span class="font-mono text-xs uppercase tracking-widest text-[#8E8E99] font-semibold">Feed</span>
              <svg class="w-4 h-4 text-[#8E8E99]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-3">
              Never miss an episode.
            </h3>
            <p class="text-[#8E8E99] text-sm leading-relaxed mb-6">
              Follow anime and manga series for rich release notifications and optional background auto-downloading.
            </p>
          </div>
          <div class="pt-6 border-t border-white/10 text-xs font-mono text-[#8E8E99]">
            Custom schedule notifications
          </div>
        </div>

        <!-- Tile 5: Multi-Profile & Kids Mode (Span 4) -->
        <div class="md:col-span-4 p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden double-bezel-inner flex flex-col justify-between group hover:border-white/20 transition-colors duration-300">
          <div>
            <div class="flex items-center justify-between mb-8">
              <span class="font-mono text-xs uppercase tracking-widest text-[#8E8E99] font-semibold">Profiles</span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]"></span>
            </div>
            <h3 class="font-display text-xl sm:text-2xl font-bold text-white mb-3">
              Up to four profiles.
            </h3>
            <p class="text-[#8E8E99] text-sm leading-relaxed mb-6">
              Everyone gets their own history, custom list, and Home. Protected with optional PIN codes and Kids mode.
            </p>
          </div>
          <div class="pt-6 border-t border-white/10 text-xs font-mono text-[#8E8E99]">
            Distinct bookmarks & lists
          </div>
        </div>

        <!-- Tile 6: Achievements & Medals (Span 6) -->
        <div class="md:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden double-bezel-inner flex flex-col justify-between group hover:border-[#FF5733]/40 transition-colors duration-300">
          <div>
            <div class="flex items-center justify-between mb-8">
              <span class="font-mono text-xs uppercase tracking-widest text-[#FF5733] font-semibold">Gamification</span>
              <span class="font-mono text-xs text-white/50">Bronze to Ember</span>
            </div>
            <h3 class="font-display text-2xl font-bold text-white mb-4">
              Every day, a new medal.
            </h3>
            <p class="text-[#8E8E99] text-base leading-relaxed mb-6">
              Streak flames tracked from 7 to 365 days. Tilt your 3D medals with mouse physics, or double-tap to flip like a physical coin.
            </p>
          </div>
          <div class="pt-6 border-t border-white/10 text-xs font-mono text-[#8E8E99]">
            Interactive 3D metal medals & streak counter
          </div>
        </div>

        <!-- Tile 7: Live TV broadcast (Span 6) -->
        <div class="md:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/10 relative overflow-hidden double-bezel-inner flex flex-col justify-between group hover:border-[#7C5CFF]/40 transition-colors duration-300">
          <div>
            <div class="flex items-center justify-between mb-8">
              <span class="font-mono text-xs uppercase tracking-widest text-[#7C5CFF] font-semibold">Broadcasting</span>
              <span class="font-mono text-xs text-white/50">Electronic Program Guide</span>
            </div>
            <h3 class="font-display text-2xl font-bold text-white mb-4">
              Continuous live TV streaming.
            </h3>
            <p class="text-[#8E8E99] text-base leading-relaxed mb-6">
              Channels equipped with a live now/next guide. Smart auto-reconnection ensures broadcast playback never stutters.
            </p>
          </div>
          <div class="pt-6 border-t border-white/10 text-xs font-mono text-[#8E8E99]">
            Auto-reconnecting HLS / DASH stream pipeline
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// BentoFeatures component
</script>
