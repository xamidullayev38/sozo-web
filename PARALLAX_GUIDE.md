# Sozo v3 - Parallax & Smooth Scroll Boilerplate Guide

Ushbu repozitoriy Sozo v3 uchun zamonaviy, apparat darajasida tezlashtirilgan (GPU-accelerated) **Parallax** va **Smooth Scroll** arxitekturasi bilan boyitildi.

---

## 🚀 O'rnatilgan Texnologiyalar
1. **Lenis**: Zamonaviy, tabiiy sensorli va sichqoncha inertsiyasini saqlovchi smooth scrolling dvigateli.
2. **GSAP + ScrollTrigger**: Silliq transformatsiyalar, scroll-based scrub va ko'p qatlamli (multi-layer) harakatlar uchun.
3. **Vue 3 Directives & Composables**: Istalgan komponent yoki elementga 1 qatorda parallax effektini ulash imkoniyati.

---

## 🛠 Ishlatish Bo'yicha Qo'llanma

### 1. `v-parallax` Direktivi (Eng oson usul)
Template ichida istalgan rasm, matn yoki blokga `v-parallax` qo'shish kifoya:

```vue
<!-- Oddiy sekinlashtirilgan yoki tezlashtirilgan harakat -->
<img v-parallax="{ speed: 0.2 }" src="/path/to/image.png" />

<!-- Orqaga (teskari) harakatlanuvchi fon qatlami -->
<div v-parallax="{ speed: -0.25 }" class="hero-bg"></div>

<!-- Gorizontal (X o'qi) bo'yicha harakat -->
<div v-parallax="{ speed: 0.3, direction: 'x' }"></div>
```

**Parametrlar:**
- `speed` *(number)*: Harakat tezligi koeffitsiyenti (default: `0.2`). Manfiy son teskari yo'nalishda siljitadi.
- `direction` *(string)*: `'y'` yoki `'x'` (default: `'y'`).
- `scrub` *(number | boolean)*: Silliqlash darajasi (default: `1`).

---

### 2. `ParallaxCard.vue` (3D Mouse Tilt Karta)
Sichqoncha yurgazilganda 3D fazoda aylanuvchi va burchak oluvchi interaktiv kartalar:

```vue
<template>
  <ParallaxCard
    :max-tilt="15"
    :scale="1.04"
    custom-class="p-6 rounded-2xl bg-gray-800"
  >
    <template #default="{ isHovered }">
      <h3>Sarlavha</h3>
      <p>Matn</p>
    </template>
  </ParallaxCard>
</template>

<script setup>
import ParallaxCard from './components/parallax/ParallaxCard.vue'
</script>
```

---

### 3. `ParallaxLayer.vue` (Multi-layer Parallax Qatlamlari)
Ko'p qatlamli sahnalar uchun qulay komponent:

```vue
<template>
  <section class="relative h-screen overflow-hidden">
    <!-- Fon qatlam (sekinroq harakatlanadi) -->
    <ParallaxLayer :speed="-0.3" custom-class="absolute inset-0">
      <img src="bg.png" class="w-full h-full object-cover" />
    </ParallaxLayer>

    <!-- O'rta qatlam (personaj yoki element) -->
    <ParallaxLayer :speed="0.1" custom-class="relative z-10">
      <h1>Sozo Anime</h1>
    </ParallaxLayer>
  </section>
</template>

<script setup>
import ParallaxLayer from './components/parallax/ParallaxLayer.vue'
</script>
```

---

### 4. Composables (`useParallax.js` & `useSmoothScroll.js`)

#### `useScrollParallax(elementRef, options)`
Elementga dasturiy ravishda GSAP ScrollTrigger tween bog'lash.

#### `useMouseTilt(elementRef, options)`
Elementga sichqoncha koordinatalari asosida silliq 3D burilish effektini berish.

#### `useSmoothScroll()`
Lenis va GSAP ScrollTrigger'ni global sinxronlashtiruvchi kompozable (`App.vue` da allaqachon sozlangan).
