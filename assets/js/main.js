import { initNavigation } from './navigation.js';
import { initPricingToggle } from './pricing-toggle.js';
import { initAnimations } from './animations.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular components
  initNavigation();
  initPricingToggle();
  initAnimations();
  initForm();
});
