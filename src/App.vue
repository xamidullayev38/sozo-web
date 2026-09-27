<template>
  <div class="font-sans bg-gray-900 text-white min-h-screen selection:bg-red-500 selection:text-white">
    <Hero />
    <WhyUs />
    <Showcase />
    <MobileApp />
    <TvApp />
    <Footer />
  </div>
</template>

<script setup>
import Hero from "./components/Hero.vue"
import WhyUs from "./components/WhyUs.vue"
import Showcase from "./components/Showcase.vue"
import MobileApp from "./components/MobileApp.vue"
import TvApp from "./components/TvApp.vue"
import Footer from "./components/Footer.vue"

import { useSmoothScroll } from './composables/useSmoothScroll'

// Initialize modern Lenis smooth scrolling engine
useSmoothScroll()
</script>
