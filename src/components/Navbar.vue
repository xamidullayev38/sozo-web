<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 pointer-events-none">
    <nav class="max-w-6xl mx-auto rounded-full bg-[#111116]/80 backdrop-blur-xl border border-white/10 px-5 sm:px-7 py-3 flex items-center justify-between shadow-2xl pointer-events-auto">
      <!-- Brand Logo -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C5CFF] to-[#FF5733] p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300">
          <div class="w-full h-full bg-[#08080B] rounded-[11px] flex items-center justify-center font-display font-extrabold text-white text-xs">
            SZ
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-display font-bold text-lg text-white tracking-tight leading-none">
            Sozo
          </span>
          <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#8E8E99]">
            v3.2.0
          </span>
        </div>
      </a>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#8E8E99]">
        <a href="#showcase" class="hover:text-white transition-colors duration-200">
          3D Showcase
        </a>
        <a href="#features" class="hover:text-white transition-colors duration-200">
          Features
        </a>
        <a href="#platforms" class="hover:text-white transition-colors duration-200">
          Platforms
        </a>
        <a href="https://github.com/professorDeveloper/sozo" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
          <span>GitHub</span>
          <svg class="w-3.5 h-3.5 text-[#8E8E99]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>

      <!-- Action Button with Button-in-Button Trailing Icon -->
      <div class="flex items-center gap-3">
        <a
          href="#download"
          class="group inline-flex items-center gap-3 pl-5 pr-2 py-1.5 rounded-full bg-[#7C5CFF] hover:bg-[#6C4CEE] active:scale-95 text-white text-xs font-semibold transition-all duration-300 shadow-lg shadow-[#7C5CFF]/20"
        >
          <span>Download</span>
          <div class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
// Navigation component
</script>
