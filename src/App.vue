<template>
  <div class="font-sans bg-gray-900 text-white">
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

import { useSmoothScroll } from './composables/useScroll'

  useSmoothScroll(0.25,0.05)
</script>
