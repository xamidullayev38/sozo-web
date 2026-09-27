<template>
  <footer class="bg-[#08080B] text-white pt-24 pb-16 border-t border-white/[0.06] relative z-20">
    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-white/10">
        <!-- Brand Info -->
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C5CFF] to-[#FF5733] p-[1px] shadow-sm">
              <div class="w-full h-full bg-[#08080B] rounded-[11px] flex items-center justify-center font-display font-extrabold text-white text-xs">
                SZ
              </div>
            </div>
            <span class="font-display font-bold text-2xl tracking-tight text-white">Sozo</span>
          </div>
          <p class="text-[#8E8E99] text-sm max-w-sm leading-relaxed">
            Free, open-source streaming and reading client for anime, movies, series, manga, light novels, and live TV across every screen.
          </p>
          <div class="flex items-center gap-2 text-xs font-mono text-[#8E8E99] pt-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Version 3.2.0 · Public Release</span>
          </div>
        </div>

        <!-- Get Sozo -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
            Get Sozo
          </h4>
          <ul class="space-y-2.5 text-sm text-[#8E8E99]">
            <li><a href="#download" class="hover:text-white transition-colors">Download App</a></li>
            <li><a href="#platforms" class="hover:text-white transition-colors">Install on iOS</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo/releases" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">All Releases</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo-tv/releases" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Sozo TV Edition</a></li>
          </ul>
        </div>

        <!-- Community -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
            Community
          </h4>
          <ul class="space-y-2.5 text-sm text-[#8E8E99]">
            <li><a href="https://telegram.me/sozoapp" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Telegram Channel</a></li>
            <li><a href="https://discord.gg/n22URhYvMR" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Discord Server</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GitHub Repository</a></li>
            <li><a href="https://www.buymeacoffee.com/chihaku" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Buy Me a Coffee</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
            Open Source
          </h4>
          <ul class="space-y-2.5 text-sm text-[#8E8E99]">
            <li><a href="https://github.com/professorDeveloper/sozo/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GPL-3.0 License</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo/issues" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Report an Issue</a></li>
            <li><a href="https://github.com/professorDeveloper/sozo/releases/latest" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Release Notes</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8E99] gap-4">
        <p>Sozo is open source under the GPL. © 2024–2026 Azamov.</p>
        <p class="font-mono text-[11px]">Designed for high-framerate 3D scroll</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>
