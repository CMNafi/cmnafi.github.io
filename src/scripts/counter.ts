export function rollupCounter(el: HTMLElement, targetValue: number, duration = 1000, suffix = '') {
  if (!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.textContent = targetValue.toLocaleString() + suffix;
    return;
  }

  let startTimestamp: number | null = null;
  const startValue = 0;

  function step(timestamp: number) {
    if (!startTimestamp) startTimestamp = timestamp;
    const elapsed = timestamp - startTimestamp;
    const progress = Math.min(elapsed / duration, 1);

    // Cubic ease-out: elegant, smooth deceleration with zero bounce
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + easeProgress * (targetValue - startValue));

    el.textContent = currentValue.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = targetValue.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(step);
}
