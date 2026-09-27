<template>
  <div class="font-sans bg-[#08080B] text-[#F5F5F7] min-h-screen selection:bg-[#7C5CFF] selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <StatsBar />
      <DeviceStage />
      <BentoFeatures />
      <PlatformGrid />
      <CommunityCTA />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import StatsBar from './components/StatsBar.vue'
import DeviceStage from './components/DeviceStage.vue'
import BentoFeatures from './components/BentoFeatures.vue'
import PlatformGrid from './components/PlatformGrid.vue'
import CommunityCTA from './components/CommunityCTA.vue'
import Footer from './components/Footer.vue'

import { useSmoothScroll } from './composables/useSmoothScroll'

// High-framerate Lenis smooth scroll engine
useSmoothScroll({
  duration: 1.15,
  wheelMultiplier: 0.95,
  touchMultiplier: 1.5,
})
</script>
