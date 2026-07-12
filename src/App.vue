<template>
  <div class="font-sans min-h-screen bg-[var(--bg)] text-[var(--text)]">
    <Nav />
    <main>
      <Hero />
      <div id="why"><WhyUs /></div>
      <Showcase />
      <MobileApp />
      <TvApp />
      <Download />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Nav from "./components/Nav.vue"
import Hero from "./components/Hero.vue"
import WhyUs from "./components/WhyUs.vue"
import Showcase from "./components/Showcase.vue"
import MobileApp from "./components/MobileApp.vue"
import TvApp from "./components/TvApp.vue"
import Footer from "./components/Footer.vue"
import Download from "./components/Download.vue";
</script>
