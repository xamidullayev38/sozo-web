<template>
  <footer class="bg-[#09090C] text-white py-16 font-mono text-xs border-t border-white/[0.08]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/[0.08]">
        <!-- Colophon -->
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-[#FF3B30]"></span>
            <span class="font-display font-black text-xl tracking-tight text-white uppercase">SOZO</span>
            <span class="text-white/40">// SPECIFICATION CORE</span>
          </div>
          <p class="font-sans text-[#858592] text-sm max-w-sm font-light leading-relaxed">
            Free, open-source streaming and reading client. Anime, cinema, serials, manga, light novels, and live television streams across 06 operating architectures.
          </p>
          <div class="text-[11px] text-[#858592]">
            LICENSED UNDER GNU GENERAL PUBLIC LICENSE v3.0 (GPL-3.0).
          </div>
        </div>

        <!-- Target Binaries -->
        <div>
          <span class="text-white/40 uppercase tracking-widest block mb-4">// DISTRIBUTION</span>
          <ul class="space-y-2.5 text-[#858592]">
            <li><a href="#download" class="hover:text-white transition-colors">Android Package (.apk)</a></li>
            <li><a href="#architectures" class="hover:text-white transition-colors">iOS Archive (.ipa)</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo/releases" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Windows Installer (.msi)</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo-tv/releases" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Android TV Edition</a></li>
          </ul>
        </div>

        <!-- Nodes -->
        <div>
          <span class="text-white/40 uppercase tracking-widest block mb-4">// NODES</span>
          <ul class="space-y-2.5 text-[#858592]">
            <li><a href="https://telegram.me/sozoapp" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Telegram // @sozoapp</a></li>
            <li><a href="https://discord.gg/n22URhYvMR" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Discord Community</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GitHub Repository</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo/issues" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Issue Tracker</a></li>
          </ul>
        </div>
      </div>

      <!-- Legal & System Status -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#858592] gap-4">
        <span>SOZO IS AN OPEN SOURCE CLIENT. © 2024–2026 AZAMOV. ALL RIGHTS RESERVED.</span>
        <span>LATENCY: 0MS // 60-120 FPS HARDWARE ACCELERATED</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>
