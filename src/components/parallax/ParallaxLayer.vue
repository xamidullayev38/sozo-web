<template>
  <div ref="layerRef" :class="customClass" :style="customStyle">
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollParallax } from '../../composables/useParallax'

const props = defineProps({
  speed: {
    type: Number,
    default: 0.2,
  },
  direction: {
    type: String,
    default: 'y', // 'y' | 'x'
  },
  customClass: {
    type: [String, Object, Array],
    default: '',
  },
  customStyle: {
    type: [String, Object],
    default: () => ({}),
  },
  scrub: {
    type: [Boolean, Number],
    default: 1,
  },
})

const layerRef = ref(null)

useScrollParallax(layerRef, {
  speed: props.speed,
  direction: props.direction,
  scrub: props.scrub,
})
</script>
