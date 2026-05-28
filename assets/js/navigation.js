/**
 * Navigation Module
 * Handles sticky navbar behavior, active section highlighting, 
 * hamburger menu overlay controls, and mobile navigation link selections.
 */

export function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  let lastScrollTop = 0;
  const scrollThreshold = 10;
  
  if (!navbar) return;

  // 1. Sticky Nav Scroll Behavior: hide on scroll down, show on scroll up
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ignore small changes
    if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) {
      return;
    }
    
    // Scroll down and beyond navbar height -> hide navbar
    if (scrollTop > lastScrollTop && scrollTop > 80) {
      navbar.classList.add('nav-hidden');
    } else {
      // Scroll up or at top -> show navbar
      navbar.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop;
  }, { passive: true });

  // 2. Hamburger & Mobile Navigation
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('is-active');
      mobileNav.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', isActive);
      
      // Prevent body scrolling when mobile overlay is active
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when nav links are clicked
    mobileNav.querySelectorAll('.nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        mobileNav.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Active Section Highlighting in Navbar
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Trigger when section is centered
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.getAttribute('id')) {
      sectionObserver.observe(section);
    }
  });

  // 4. Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        // Accessibility focus shift
        targetElement.tabIndex = -1;
        targetElement.focus({ preventScroll: true });
        
        const offsetPosition = targetElement.offsetTop - 80; // Compensate for sticky header
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
