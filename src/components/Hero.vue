<template>
  <section class="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center relative hero-bg">
    <div class="bg-black/10 absolute inset-0"></div>
    <div class="relative z-10 max-w-[675px] px-4 ">
      <h1 class="text-4xl md:text-6xl font-bold mb-4   " data-aos="fade-down">
        Every anime, right in your hands!
      </h1>
      <p class="text-lg text-gray-300 " data-aos="fade-up">
        Every episode. Every season. Every story. Watch anime in the highest quality, anytime, anywhere, with Sozo.
      </p>
      
    </div>
    <div class="flex justify-center gap-4 mt-6 absolute top-[-10px] right-3" data-aos="fade-left">
        <a href="#" class="w-[38px] h-[38px] flex items-center justify-center  bg-black rounded-full hover:bg-gray-600"><i class="fa-brands fa-youtube fa-lg"></i></a>
        <a href="#" class="w-[38px] h-[38px] flex items-center justify-center bg-black rounded-full hover:bg-gray-600"><i class="fa-brands fa-telegram fa-lg"></i></a>
        <a href="#" class="w-[38px] h-[38px] flex items-center justify-center bg-black rounded-full hover:bg-gray-600"><i class="fa-brands fa-facebook-f fa-lg"></i></a>
        <a href="#" class="w-[38px] h-[38px] flex items-center justify-center bg-black rounded-full hover:bg-gray-600"><i class="fa-brands fa-instagram fa-lg"></i></a>
      </div>
  </section>
</template>
<style>
    .hero-bg{
        background: url(../assets/img/bg.png);
        background-attachment: fixed;
        position: relative;
    }
    .hero-bg::before{
        content: '';
        background: url(../assets/img/Rectangle36.png);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 265px;
    }
</style>