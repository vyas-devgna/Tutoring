/**
 * Animations Module
 * Uses IntersectionObserver to trigger fade-in animations on scroll.
 * Gracefully bypassed if user specifies prefers-reduced-motion.
 */

export function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-section');
  
  // Exit early if reduced motion is requested or IntersectionObserver isn't supported
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', // Trigger slightly before element enters viewport completely
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animate once, then stop tracking
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });
}
