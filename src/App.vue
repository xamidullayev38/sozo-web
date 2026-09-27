<template>
  <div class="bg-[#09090C] text-[#F4F4F6] min-h-screen selection:bg-[#FF3B30] selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <StatsBar />
      <ArchitectureShowcase />
      <FeaturesMatrix />
      <PlatformMatrix />
      <CommunityTerminal />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import StatsBar from './components/StatsBar.vue'
import ArchitectureShowcase from './components/ArchitectureShowcase.vue'
import FeaturesMatrix from './components/FeaturesMatrix.vue'
import PlatformMatrix from './components/PlatformMatrix.vue'
import CommunityTerminal from './components/CommunityTerminal.vue'
import Footer from './components/Footer.vue'

import { useSmoothScroll } from './composables/useSmoothScroll'

// Hardware-accelerated smooth scrolling engine
useSmoothScroll({
  duration: 1.15,
  wheelMultiplier: 0.95,
  touchMultiplier: 1.5,
})
</script>
