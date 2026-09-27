<template>
  <section class="bg-white/[0.08] p-px border-b border-white/[0.08]">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/[0.08]">
      <div
        v-for="stat in telemetry"
        :key="stat.label"
        class="bg-[#09090C] p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#111116] transition-colors duration-200"
      >
        <span class="font-mono text-[10px] uppercase tracking-widest text-[#858592] mb-6 block">
          {{ stat.id }} // {{ stat.category }}
        </span>
        <div>
          <span class="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight block mb-2 group-hover:text-[#FF3B30] transition-colors">
            {{ stat.value }}
          </span>
          <span class="font-mono text-xs uppercase tracking-wider text-[#858592]">
            {{ stat.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const telemetry = [
  { id: 'PAR-01', category: 'LICENSING', value: '100%', label: 'FREE & OPEN GPL-3.0' },
  { id: 'PAR-02', category: 'COMPILER', value: '06', label: 'NATIVE ARCHITECTURES' },
  { id: 'PAR-03', category: 'INDEX', value: '1,000+', label: 'ONLINE REPOSITORIES' },
  { id: 'PAR-04', category: 'LOCALIZATION', value: '16+', label: 'GLOBAL LANGUAGES' },
  { id: 'PAR-05', category: 'MONETIZATION', value: 'ZERO', label: 'ADVERTISEMENTS, EVER' },
]
</script>
