<template>
  <section class="py-20 bg-[#191b1f] text-center">
    <h2 class="text-3xl font-bold mb-8">Why us? ✨</h2>
    <p class="text-lg text-gray-300 mb-8">
        Every episode. Every season. Every story. Watch anime in the highest quality, anytime, anywhere, with Sozo.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto ">
      <div v-for="(item, i) in features" :key="i" class="w-[224px] flex flex-col items-center justify-center ">
        <img :src="item.icon + (i + 1) + '.png'" alt="" >
        <h3 class="font-semibold">{{ item.title }}</h3>
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