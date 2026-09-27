<template>
  <section class="py-16 bg-[#08080B] border-y border-white/[0.06] relative z-20">
    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center sm:text-left">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-col group"
        >
          <span class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-1 group-hover:text-[#7C5CFF] transition-colors duration-300">
            {{ stat.value }}
          </span>
          <span class="font-mono text-xs uppercase tracking-widest text-[#8E8E99]">
            {{ stat.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '100%', label: 'Free & Open Source' },
  { value: '6', label: 'Supported Platforms' },
  { value: '1,000+', label: 'Online Sources' },
  { value: '16+', label: 'Global Languages' },
  { value: '0', label: 'Ads, Ever' },
]
</script>
