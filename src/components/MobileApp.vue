<template>
  <section class="py-20 bg-gray-800 overflow-hidden relative">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
      <!-- Left image with smooth parallax floating effect -->
      <div v-parallax="{ speed: 0.12 }" class="will-change-transform flex justify-center">
        <img 
          src="../assets/img/scrren.png" 
          alt="App preview" 
          class="rounded-2xl shadow-2xl border border-white/10 max-h-[540px] object-contain" 
          data-aos="fade-right"
          data-aos-duration="1000"
        />
      </div>

      <!-- Right text content -->
      <div data-aos="fade-left" data-aos-duration="1000">
        <h2 class="max-w-[560px] text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
          Download our app to your phone, and join the adventure 
        </h2>
        <p class="text-gray-300 mb-8 text-lg sm:text-xl leading-relaxed">
          Sozo is your ultimate anime streaming app, designed for fans by fans. Dive into a massive library of anime series and movies — from iconic classics to the latest seasonal hits — all in one place.
        </p>
        <a class="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all rounded-xl text-lg font-semibold shadow-lg shadow-blue-600/30" href="https://t.me/+pgYjGEUfRQtiZWYy">
          <i class="fa-brands fa-telegram text-xl"></i>
          <span>Visit Telegram</span>
        </a>
      </div>
    </div>
  </section>
</template>
