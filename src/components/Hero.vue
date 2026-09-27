<template>
  <section class="h-screen overflow-hidden flex flex-col justify-center items-center text-center relative">
    <!-- Parallax Background Layer -->
    <div
      v-parallax="{ speed: -0.25 }"
      class="absolute -inset-16 bg-cover bg-center pointer-events-none will-change-transform hero-bg"
    ></div>

    <div class="bg-black/45 absolute inset-0"></div>

    <!-- Parallax Content Layer -->
    <div
      v-parallax="{ speed: 0.12 }"
      class="relative z-10 max-w-[700px] px-4 will-change-transform"
    >
      <div
        class="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider"
        data-aos="fade-down"
      >
        <span>Sozo v3 Preview</span>
        <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
      </div>

      <h1 class="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight" data-aos="fade-down">
        Every anime, right in your hands!
      </h1>
      <p class="text-lg text-gray-300 max-w-xl mx-auto" data-aos="fade-up">
        Every episode. Every season. Every story. Watch anime in the highest quality, anytime, anywhere, with Sozo.
      </p>
    </div>

    <!-- Social links -->
    <div class="flex justify-center gap-3 absolute top-6 right-6 z-20" data-aos="fade-left">
      <a href="#" aria-label="YouTube" class="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full hover:bg-red-600 transition"><i class="fa-brands fa-youtube fa-lg"></i></a>
      <a href="https://t.me/sozoapp" aria-label="Telegram" class="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full hover:bg-blue-500 transition"><i class="fa-brands fa-telegram fa-lg"></i></a>
      <a href="#" aria-label="Facebook" class="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full hover:bg-blue-600 transition"><i class="fa-brands fa-facebook-f fa-lg"></i></a>
      <a href="#" aria-label="Instagram" class="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full hover:bg-pink-600 transition"><i class="fa-brands fa-instagram fa-lg"></i></a>
    </div>

    <!-- Bottom gradient mask -->
    <div class="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-[#191b1f] to-transparent pointer-events-none z-10"></div>
  </section>
</template>

<style scoped>
.hero-bg {
  background-image: url(../assets/img/bg.png);
}
</style>