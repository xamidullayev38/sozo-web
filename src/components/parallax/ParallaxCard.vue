<template>
  <div
    ref="cardRef"
    class="relative transition-shadow duration-300 will-change-transform"
    :class="customClass"
  >
    <slot :isHovered="isHovered" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMouseTilt } from '../../composables/useParallax'

const props = defineProps({
  maxTilt: {
    type: Number,
    default: 12,
  },
  perspective: {
    type: Number,
    default: 1000,
  },
  scale: {
    type: Number,
    default: 1.03,
  },
  customClass: {
    type: [String, Object, Array],
    default: '',
  },
})

const cardRef = ref(null)
const { isHovered } = useMouseTilt(cardRef, {
  maxTilt: props.maxTilt,
  perspective: props.perspective,
  scale: props.scale,
})
</script>
