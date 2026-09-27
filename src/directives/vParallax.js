import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const parallaxMap = new WeakMap()

export const vParallax = {
  mounted(el, binding) {
    const options = typeof binding.value === 'object' ? binding.value : { speed: binding.value || 0.2 }
    const speed = options.speed ?? 0.2
    const direction = options.direction || 'y'
    const scrub = options.scrub ?? 1
    const start = options.start || 'top bottom'
    const end = options.end || 'bottom top'
    const trigger = options.trigger ? document.querySelector(options.trigger) : (el.parentElement || el)

    const distance = 100 * speed
    const prop = direction === 'x' ? 'x' : 'y'

    const tween = gsap.fromTo(
      el,
      { [prop]: -distance },
      {
        [prop]: distance,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      }
    )

    parallaxMap.set(el, tween)
  },

  unmounted(el) {
    const tween = parallaxMap.get(el)
    if (tween) {
      tween.scrollTrigger?.kill()
      tween.kill()
      parallaxMap.delete(el)
    }
  },
}

export default vParallax
