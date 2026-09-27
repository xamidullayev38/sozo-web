<template>
  <section class="py-24 bg-[#191b1f] text-center relative overflow-hidden">
    <!-- Subtle background accent glow -->
    <div
      v-parallax="{ speed: 0.15 }"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none"
    ></div>

    <div class="relative z-10 max-w-5xl mx-auto px-4">
      <h2
        class="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
        data-aos="fade-up"
      >
        Why us? ✨
      </h2>
      <p
        class="text-lg text-gray-300 mb-12 max-w-2xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Every episode. Every season. Every story. Watch anime in the highest
        quality, anytime, anywhere, with Sozo.
      </p>

      <!-- Responsive Grid with 3D Parallax Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <ParallaxCard
          v-for="(item, i) in features"
          :key="i"
          :max-tilt="14"
          :scale="1.04"
          v-parallax="{ speed: (i % 2 === 0 ? 0.08 : -0.05) }"
          custom-class="group p-6 rounded-2xl bg-[#1f2126] border border-white/5 hover:border-red-500/30 hover:bg-[#25272c] transition-colors duration-300 shadow-xl flex flex-col items-center justify-center text-center cursor-pointer"
          data-aos="fade-up"
          :data-aos-delay="i * 150"
        >
          <div class="w-20 h-20 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img
              :src="item.icon"
              :alt="item.title"
              class="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            />
          </div>
          <h3 class="font-semibold text-gray-200 text-lg group-hover:text-white transition-colors">
            {{ item.title }}
          </h3>
        </ParallaxCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import ParallaxCard from "./parallax/ParallaxCard.vue"
import img1 from "../assets/img/1.png"
import img2 from "../assets/img/2.png"
import img3 from "../assets/img/3.png"
import img4 from "../assets/img/4.png"

const features = [
  { icon: img1, title: "+1000 Anime Episodes" },
  { icon: img2, title: "Watch anytime, anywhere" },
  { icon: img3, title: "More info about casters" },
  { icon: img4, title: "All in the highest quality" },
]
</script>
