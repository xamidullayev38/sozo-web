<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#09090C]/90 backdrop-blur-md border-b border-white/[0.08] transition-all duration-300">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-xs">
      <!-- Brand & Telemetry -->
      <a href="#" class="flex items-center gap-3 group">
        <span class="font-display font-black text-lg tracking-tighter text-white uppercase group-hover:text-[#FF3B30] transition-colors">
          SOZO
        </span>
        <span class="text-white/20">/</span>
        <span class="text-[#858592] uppercase tracking-wider text-[11px] hidden sm:inline">
          UNIFIED MEDIA CORE
        </span>
        <span class="px-2 py-0.5 bg-white/[0.05] border border-white/10 text-[10px] text-white/60 tracking-widest uppercase">
          V3.2.0
        </span>
      </a>

      <!-- Navigation Coordinates -->
      <nav class="hidden md:flex items-center gap-8 text-[#858592]">
        <a href="#overview" class="hover:text-white transition-colors">
          // 01. OVERVIEW
        </a>
        <a href="#modules" class="hover:text-white transition-colors">
          // 02. MODULES
        </a>
        <a href="#architectures" class="hover:text-white transition-colors">
          // 03. PLATFORMS
        </a>
        <a href="https://github.com/professorDeveloper/sozo" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors flex items-center gap-1.5">
          <span>// GITHUB</span>
          <svg class="w-3 h-3 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </nav>

      <!-- Terminal Trigger -->
      <div class="flex items-center gap-4">
        <a
          href="#download"
          class="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#FF3B30] hover:text-white active:scale-95 transition-all duration-200"
        >
          <span class="w-1.5 h-1.5 bg-[#FF3B30] hover:bg-white"></span>
          <span>GET SOZO</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
// Minimalist Swiss Industrial Navbar
</script>
