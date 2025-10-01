<template>
  <section
    class="min-h-[600px] bg-gray-900 relative flex items-center justify-center md:justify-start py-16 px-6 md:px-[120px] overflow-hidden showcase"
  >
    <div class="max-w-[563px] text-center md:text-left z-10">
      <h2
        class="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-6 text-white leading-snug"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        Watch over 1000 exciting anime titles through Sozo! ✨
      </h2>

      <p
        class="text-gray-400 mb-8 text-base sm:text-lg leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        Sozo brings the entire world of anime directly to your pocket. From
        timeless classics to the newest simulcasts, Sozo gives you complete
        seasons and episodes in crystal-clear HD, with multi-language subtitles,
        fast streaming, and offline downloads.
      </p>

      <button
        class="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-base sm:text-lg font-semibold"
        data-aos="zoom-in"
        data-aos-delay="400"
        data-aos-duration="1000"
      >
        Download App
      </button>
    </div>
  </section>
</template>

<style>
.showcase {
  background: url(../assets/img/image.png) no-repeat center/cover;
  background-attachment: fixed;
}

.showcase::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.65;
}
</style>
