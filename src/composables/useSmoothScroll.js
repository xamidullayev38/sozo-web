import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onBeforeUnmount, ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null
let tickerListener = null

export function useSmoothScroll(options = {}) {
  const lenis = ref(null)

  onMounted(() => {
    if (!lenisInstance) {
      const instance = new Lenis({
        duration: options.duration ?? 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: options.wheelMultiplier ?? 1,
        touchMultiplier: 1.5,
        ...options,
      })

      lenisInstance = instance

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      instance.on('scroll', ScrollTrigger.update)

      tickerListener = (time) => {
        instance.raf(time * 1000)
      }
      gsap.ticker.add(tickerListener)
      gsap.ticker.lagSmoothing(0)
    }

    lenis.value = lenisInstance
  })

  onBeforeUnmount(() => {
    // If component is unmounted, keep or clean up if needed
  })

  return {
    lenis,
    scrollTo: (target, opts) => lenisInstance?.scrollTo(target, opts),
  }
}

export function getLenis() {
  return lenisInstance
}
