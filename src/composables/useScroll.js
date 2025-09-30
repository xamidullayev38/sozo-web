// src/composables/useSmoothScroll.js
import { onMounted, onBeforeUnmount } from "vue";

export function useSmoothScroll(speed = 0.2, ease = 0.08) {
  let targetScroll = window.scrollY;
  let currentScroll = window.scrollY;
  let ticking = false;

  function onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY;
    targetScroll += delta * speed;

    targetScroll = Math.max(
      0,
      Math.min(
        targetScroll,
        document.documentElement.scrollHeight - window.innerHeight
      )
    );

    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    currentScroll += (targetScroll - currentScroll) * ease;
    if (Math.abs(targetScroll - currentScroll) < 0.5) {
      currentScroll = targetScroll;
      ticking = false;
    } else {
      requestAnimationFrame(update);
    }
    window.scrollTo(0, Math.round(currentScroll));
  }

  onMounted(() => {
    window.addEventListener("wheel", onWheel, { passive: false });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("wheel", onWheel);
  });
}
