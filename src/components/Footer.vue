<template>
  <footer 
    ref="footerRef"
    :class="[
      'py-4 border-t border-t-gray-700 bg-gray-800 text-center text-gray-400 transition-all duration-1000',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    ]"
  >
    <p>Sozo — Every episode, every season, every story. Anytime, anywhere.</p>
    <div class="flex justify-center gap-4 mt-4">
      <a href="#" class="w-[38px] h-[38px] flex items-center justify-center bg-black rounded-full hover:bg-gray-600">
        <i class="fa-brands fa-youtube fa-lg"></i>
      </a>
      <a href="#" class="w-[38px] h-[38px] flex items-center justify-center bg-black rounded-full hover:bg-gray-600">
        <i class="fa-brands fa-telegram fa-lg"></i>
      </a>
      <a href="#" class="w-[38px] h-[38px] flex items-center justify-center bg-black rounded-full hover:bg-gray-600">
        <i class="fa-brands fa-facebook-f fa-lg"></i>
      </a>
      <a href="#" class="w-[38px] h-[38px] flex items-center justify-center bg-black rounded-full hover:bg-gray-600">
        <i class="fa-brands fa-instagram fa-lg"></i>
      </a>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const footerRef = ref(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer.disconnect() // animatsiya faqat 1 marta ishlasin
      }
    },
    { threshold: 0.2 } // footer 20% ko‘ringanda trigger bo‘ladi
  )

  if (footerRef.value) {
    observer.observe(footerRef.value)
  }
})


</script>
