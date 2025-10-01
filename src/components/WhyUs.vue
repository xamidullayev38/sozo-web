<template>
  <section class="py-20 bg-[#191b1f] text-center">
    <h2 class="text-6xl font-bold mb-8 wow animate__animated animate__jackInTheBox" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">Why us? ✨</h2>
    <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
      Every episode. Every season. Every story. Watch anime in the highest
      quality, anytime, anywhere, with Sozo.
    </p>

    <!-- grid responsiveness -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4"
    >
      <div
        v-for="(item, i) in features"
        :key="i"
        class="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-[#1f2126] hover:bg-[#25272c] transition"
        data-aos="flip-left" data-aos-duration="800" :data-aos-delay="i * 200"
        >
        <img
          :src="item.icon + (i + 1) + '.png'"
          alt=""
          class="w-20 h-20 object-contain mb-4"
        />
        <h3 class="font-semibold text-gray-200 text-lg">
          {{ item.title }}
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { icon: "/src/assets/img/", title: "+1000 Anime Episodes" },
  { icon: "/src/assets/img/", title: "Watch anytime, anywhere" },
  { icon: "/src/assets/img/", title: "More info about casters" },
  { icon: "/src/assets/img/", title: "All in the highest quality" },
]
</script>
