<template>
  <section class="py-24 bg-gray-900 overflow-hidden relative">
    <div class="max-w-6xl mx-auto flex flex-col items-center px-4">
      <!-- Title -->
      <h2 
        class="text-center text-3xl sm:text-[42px] font-bold mb-6 text-white tracking-tight"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        Our app for TV 📺
      </h2>

      <!-- Description -->
      <p 
        class="text-center text-gray-300 mb-8 text-lg sm:text-xl max-w-[690px] leading-relaxed"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        Sozo brings the world of anime to your living room. Stream thousands of anime episodes and movies in high definition — all from the comfort of your couch.
      </p>

      <!-- Button -->
      <a 
        href="https://github.com/Sozo-app/Sozo-tv"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-7 py-3 bg-gray-800 hover:bg-gray-700 border border-white/10 active:scale-95 transition-all rounded-xl mb-12 text-white font-semibold shadow-lg"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <i class="fa-brands fa-github text-xl"></i>
        <span>GitHub Repository</span>
      </a>

      <!-- Image with smooth parallax -->
      <div v-parallax="{ speed: 0.1 }" class="w-full max-w-4xl will-change-transform">
        <img 
          src="../assets/img/screen2.png" 
          alt="TV App" 
          class="rounded-2xl shadow-2xl border border-white/10 mx-auto w-full object-cover" 
          data-aos="fade-up"
          data-aos-duration="1600"
        />
      </div>
    </div>
  </section>
</template>
