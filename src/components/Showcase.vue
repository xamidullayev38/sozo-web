<template>
  <section
    class="min-h-[600px] relative flex items-center justify-center md:justify-start py-20 px-6 md:px-[120px] overflow-hidden bg-gray-950"
  >
    <!-- Smooth GPU Parallax Background Image -->
    <div
      v-parallax="{ speed: -0.2 }"
      class="absolute -inset-16 bg-cover bg-center pointer-events-none will-change-transform showcase-bg"
    ></div>

    <!-- Dark Overlay with Gradient -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>

    <div
      v-parallax="{ speed: 0.08 }"
      class="max-w-[580px] text-center md:text-left relative z-10 will-change-transform"
    >
      <h2
        class="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 text-white leading-snug tracking-tight"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        Watch over 1000 exciting anime titles through Sozo! ✨
      </h2>

      <p
        class="text-gray-300 mb-8 text-base sm:text-lg leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        Sozo brings the entire world of anime directly to your pocket. From
        timeless classics to the newest simulcasts, Sozo gives you complete
        seasons and episodes in crystal-clear HD, with multi-language subtitles,
        fast streaming, and offline downloads.
      </p>

      <a
        class="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 transition-all rounded-xl text-base sm:text-lg font-semibold shadow-lg shadow-red-600/30"
        data-aos="zoom-in"
        data-aos-delay="400"
        data-aos-duration="1000"
        href="https://t.me/sozoapp"
      >
        <span>Download App</span>
        <i class="fa-solid fa-arrow-right text-sm"></i>
      </a>
    </div>
  </section>
</template>

<style scoped>
.showcase-bg {
  background-image: url(../assets/img/image.png);
}
</style>
