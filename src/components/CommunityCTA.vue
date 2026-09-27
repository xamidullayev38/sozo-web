<template>
  <section id="download" class="py-32 md:py-48 bg-[#08080B] relative overflow-hidden border-t border-white/[0.06]">
    <!-- Ambient Radial Glow -->
    <div
      v-parallax="{ speed: -0.2 }"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#7C5CFF]/20 to-[#FF5733]/20 blur-[160px] rounded-full pointer-events-none will-change-transform z-0"
    ></div>

    <div class="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
      <!-- Main Download Card -->
      <div class="p-12 sm:p-20 rounded-[3rem] bg-gradient-to-b from-[#111116] to-[#0D0D12] border border-white/10 shadow-2xl relative overflow-hidden double-bezel-inner">
        <span class="font-mono text-xs uppercase tracking-widest text-[#FF5733] font-semibold block mb-4">
          Latest Release v3.2.0
        </span>

        <h2 class="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 max-w-3xl mx-auto">
          Ready when you are.
        </h2>

        <p class="text-[#8E8E99] text-base sm:text-xl max-w-xl mx-auto leading-relaxed mb-10">
          Free, open source, zero advertisements, and on every screen you own. Your next favorite series is one tap away.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="https://github.com/professorDeveloper/sozo/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-3 pl-8 pr-3 py-4 rounded-full bg-[#7C5CFF] hover:bg-[#6C4CEE] active:scale-95 text-white text-base font-semibold transition-all duration-300 shadow-xl shadow-[#7C5CFF]/25"
          >
            <span>Download Latest Release</span>
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V11M8 11L4.5 7.5M8 11L11.5 7.5M3 14H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </a>

          <a
            href="https://telegram.me/sozoapp"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.04] text-white text-base font-medium border border-white/10 hover:bg-white/[0.08] active:scale-95 transition-all duration-200"
          >
            <svg class="w-5 h-5 text-[#2AABEE]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.9 4.6 18.8 19.3c-.2 1-.8 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.7 13.2l-4.7-1.5c-1-.3-1-1 .2-1.5L20.5 3.1c.9-.3 1.6.2 1.4 1.5Z"/>
            </svg>
            <span>Join Telegram</span>
          </a>
        </div>

        <!-- Community Links Hub -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/10 text-left">
          <a
            href="https://telegram.me/sozoapp"
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors group flex items-center gap-3"
          >
            <div class="w-10 h-10 rounded-xl bg-[#2AABEE]/15 flex items-center justify-center text-[#2AABEE]">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.9 4.6 18.8 19.3c-.2 1-.8 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.7 13.2l-4.7-1.5c-1-.3-1-1 .2-1.5L20.5 3.1c.9-.3 1.6.2 1.4 1.5Z"/>
              </svg>
            </div>
            <div>
              <span class="block font-display font-semibold text-sm text-white group-hover:text-[#2AABEE] transition-colors">Telegram</span>
              <span class="font-mono text-xs text-[#8E8E99]">@sozoapp · News first</span>
            </div>
          </a>

          <a
            href="https://discord.gg/n22URhYvMR"
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors group flex items-center gap-3"
          >
            <div class="w-10 h-10 rounded-xl bg-[#5865F2]/15 flex items-center justify-center text-[#5865F2]">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.6 5.3A17 17 0 0 0 15.4 4l-.5 1a15.8 15.8 0 0 0-5.8 0L8.6 4a17 17 0 0 0-4.2 1.3C1.7 9.3 1 13.2 1.3 17a17.2 17.2 0 0 0 5.2 2.6l1.1-1.8c-.6-.2-1.2-.5-1.7-.9l.4-.3a12.2 12.2 0 0 0 11.4 0l.4.3c-.5.4-1.1.7-1.7.9l1.1 1.8a17.1 17.1 0 0 0 5.2-2.6c.4-4.4-.7-8.3-3.1-11.7ZM8.7 14.7c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2Zm6.6 0c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2Z"/>
              </svg>
            </div>
            <div>
              <span class="block font-display font-semibold text-sm text-white group-hover:text-[#5865F2] transition-colors">Discord</span>
              <span class="font-mono text-xs text-[#8E8E99]">Ideas & bug reports</span>
            </div>
          </a>

          <a
            href="https://github.com/professorDeveloper/sozo"
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors group flex items-center gap-3"
          >
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>
              </svg>
            </div>
            <div>
              <span class="block font-display font-semibold text-sm text-white group-hover:text-white transition-colors">GitHub</span>
              <span class="font-mono text-xs text-[#8E8E99]">Open source code</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// CommunityCTA component
</script>
