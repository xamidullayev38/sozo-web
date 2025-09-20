<template>
  <section class="h-[600px] bg-gray-900 relative flex items-center justify-start py-[90px] pl-[120px] overflow-hidden">
    <div class="max-w-[563px] text-left">
      <h2 class="text-[40px] md:text-4xl font-bold mb-6">
        Watch over 1000 exciting anime titles through Sozo! ✨
      </h2>
      <p class="text-gray-400 my-[40px] text-left text-lg leading-[150%]">
        Sozo brings the entire world of anime directly to your pocket. From timeless classics to the newest simulcasts, Sozo gives you complete seasons and episodes in crystal-clear HD, with multi-language subtitles, fast streaming, and offline downloads.
      </p>
      <button class="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-lg font-semibold">
        Download App
      </button>
    </div>

    <!-- Ong taraf -->
    <div class="absolute rotate-[-15deg] right-0 grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 showcase">
      <!-- Har bir ustun uchun -->
      <div
        v-for="(col, idx) in 5"
        :key="idx"
        :class="[
          'flex flex-col gap-4',
          idx % 2 === 0 ? 'animate-scrollDown' : 'animate-scrollUp'
        ]"
        :style="{ animationDuration: `${30 + idx * 10}s` }"
      >
        <div
          v-for="(img, i) in [...images, ...images]"
          :key="idx + '-' + i"
          class="w-[140px] h-[200px] bg-gray-700 rounded-lg shadow-lg flex-shrink-0 overflow-hidden"
        >
          <img :src="img" alt="anime" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import img1 from "../assets/img/sp1.png"
import img2 from "../assets/img/sp2.png"
import img3 from "../assets/img/sp3.png"
import img4 from "../assets/img/sp4.png"

const images = [img1, img2, img3, img4];
</script>

<style>
.showcase::after {
  content: '';
  position: absolute;
  top: 180px;
  right: 55%;
  width: 1px;
  height: 1px;
  background: #ff1818;
  box-shadow: 0px 0px 250px 380px #ff18181a;
  transform: rotate(15deg);
  z-index: 1;
}

/* Tepaga scroll */
@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

/* Pastga scroll */
@keyframes scrollDown {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-scrollUp {
  animation: scrollUp linear infinite;
}
.animate-scrollDown {
  animation: scrollDown linear infinite;
}
</style>
