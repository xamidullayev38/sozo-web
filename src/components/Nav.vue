<template>
  <header
    role="navigation"
    aria-label="Primary"
    class="fixed top-0 inset-x-0 z-50 transition-all duration-200"
    :class="scrolled
      ? 'bg-[var(--bg)]/70 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]'
      : 'bg-transparent border-b border-transparent'"
  >
    <div class="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
      <!-- Wordmark -->
      <a href="#hero" class="flex items-center gap-2 group" aria-label="Sozo home">
        <span class="font-display text-xl tracking-tight text-[var(--text)]">SOZO</span>
        <span
          class="w-2 h-2 rounded-full bg-[var(--accent)]"
          style="box-shadow: 0 0 10px 2px var(--accent);"
          aria-hidden="true"
        ></span>
      </a>

      <!-- Desktop links -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
        >{{ link.label }}</a>
      </nav>

      <!-- Right cluster -->
      <div class="flex items-center gap-3">
        <span
          v-if="version"
          class="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-display text-[var(--accent)] border border-[var(--border)] bg-[var(--surface)]/60"
        >v{{ version }}</span>

        <a href="#download" class="hidden md:inline-flex btn-accent !px-5 !py-2 !text-sm">
          <i class="fa-solid fa-download" aria-hidden="true"></i>
          Download
        </a>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text)] border border-[var(--border)] bg-[var(--surface)]/60"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="toggle"
        >
          <i :class="open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <!-- Mobile sheet -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        id="mobile-menu"
        class="md:hidden fixed inset-0 top-16 bg-[var(--bg)]/95 backdrop-blur-xl"
        @keydown.esc="close"
      >
        <nav class="flex flex-col px-5 py-6 gap-1">
          <a
            v-for="(link, i) in links"
            :key="link.href"
            :ref="el => setLinkRef(el, i)"
            :href="link.href"
            class="py-4 text-lg text-[var(--text)] border-b border-[var(--border)]"
            @click="close"
          >{{ link.label }}</a>
          <a href="#download" class="btn-accent mt-6" @click="close">
            <i class="fa-solid fa-download" aria-hidden="true"></i>
            Download
          </a>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useDownloads } from '../composables/useDownloads.js'

const { version } = useDownloads()

const links = [
  { href: '#why', label: 'Why Sozo' },
  { href: '#showcase', label: 'Showcase' },
  { href: '#download', label: 'Download' },
]

const scrolled = ref(false)
const open = ref(false)
const linkRefs = []

function setLinkRef(el, i) {
  if (el) linkRefs[i] = el
}

function onScroll() {
  scrolled.value = window.scrollY > 40
}

function toggle() {
  open.value = !open.value
  if (open.value) {
    nextTick(() => {
      if (linkRefs[0] && linkRefs[0].focus) linkRefs[0].focus()
    })
  }
}

function close() {
  open.value = false
}

function onKeydown(e) {
  if (e.key === 'Escape' && open.value) close()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>
