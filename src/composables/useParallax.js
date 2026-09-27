import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook for scroll-based parallax motion using GSAP ScrollTrigger
 * @param {import('vue').Ref<HTMLElement | null>} targetRef - element to animate
 * @param {Object} options - Parallax configuration
 * @param {number} [options.speed=0.2] - Speed multiplier (negative moves opposite direction)
 * @param {'y' | 'x'} [options.direction='y'] - Axis of movement
 * @param {string} [options.start='top bottom'] - ScrollTrigger start position
 * @param {string} [options.end='bottom top'] - ScrollTrigger end position
 * @param {boolean | number} [options.scrub=1] - Smooth scrub value
 * @param {import('vue').Ref<HTMLElement | null>} [options.trigger] - Custom trigger element
 */
export function useScrollParallax(targetRef, options = {}) {
  const {
    speed = 0.2,
    direction = 'y',
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    trigger = null,
  } = options

  let tween = null

  onMounted(() => {
    const el = targetRef?.value
    if (!el) return

    const triggerEl = trigger?.value || el.parentElement || el
    const distance = 100 * speed

    const prop = direction === 'x' ? 'x' : 'y'

    tween = gsap.fromTo(
      el,
      { [prop]: -distance },
      {
        [prop]: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      }
    )
  })

  onBeforeUnmount(() => {
    if (tween) {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  })

  return { tween }
}

/**
 * Hook for 3D mouse tilt parallax on cards, badges, and interactive elements
 * @param {import('vue').Ref<HTMLElement | null>} targetRef - element to apply tilt to
 * @param {Object} options - Tilt configuration
 */
export function useMouseTilt(targetRef, options = {}) {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.03,
    speed = 300,
  } = options

  const isHovered = ref(false)

  let handleMouseMove = null
  let handleMouseEnter = null
  let handleMouseLeave = null

  onMounted(() => {
    const el = targetRef?.value
    if (!el) return

    el.style.transformStyle = 'preserve-3d'
    el.style.perspective = `${perspective}px`

    handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      gsap.to(el, {
        rotateX,
        rotateY,
        scale,
        duration: speed / 1000,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    handleMouseEnter = () => {
      isHovered.value = true
    }

    handleMouseLeave = () => {
      isHovered.value = false
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
  })

  onBeforeUnmount(() => {
    const el = targetRef?.value
    if (!el) return
    if (handleMouseMove) el.removeEventListener('mousemove', handleMouseMove)
    if (handleMouseEnter) el.removeEventListener('mouseenter', handleMouseEnter)
    if (handleMouseLeave) el.removeEventListener('mouseleave', handleMouseLeave)
  })

  return { isHovered }
}

/**
 * Creates a scoped GSAP Context for section-level timeline animations with auto cleanup
 */
export function useParallaxScope(scopeRef, animationCallback) {
  let ctx = null

  onMounted(() => {
    if (!scopeRef?.value) return
    ctx = gsap.context(() => {
      animationCallback?.()
    }, scopeRef.value)
  })

  onBeforeUnmount(() => {
    if (ctx) ctx.revert()
  })
}
