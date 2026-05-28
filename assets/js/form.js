/**
 * Form Module
 * Handles client-side validations, real-time input status checks,
 * radio button visual states, and AJAX submissions with Formspree.
 */

export function initForm() {
  const form = document.getElementById('enquiry-form');
  const formCard = document.querySelector('.form-card');
  const successCard = document.getElementById('success-card');
  const submitButton = form?.querySelector('button[type="submit"]');
  
  if (!form || !successCard) return;

  const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
  const radioContainers = form.querySelectorAll('.radio-option');

  // 1. Radio styling class handler (highlights chosen options)
  radioContainers.forEach(container => {
    const radio = container.querySelector('input[type="radio"]');
    
    // Set active state on initialization
    if (radio?.checked) {
      container.classList.add('checked');
    }

    container.addEventListener('click', () => {
      // Uncheck siblings in group
      const name = radio.getAttribute('name');
      form.querySelectorAll(`input[name="${name}"]`).forEach(sibling => {
        sibling.closest('.radio-option').classList.remove('checked');
      });
      
      radio.checked = true;
      container.classList.add('checked');
      clearError(radio.closest('.form-group'));
    });
  });

  // 2. Real-time validations on input/blur
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      // Clear error immediately when typing
      const formGroup = input.closest('.form-group');
      if (formGroup?.classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  // 3. Validation Logic
  function validateField(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return true;

    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Check required
    if (input.hasAttribute('required') && value === '') {
      isValid = false;
      errorMessage = 'This field is required.';
    } else if (value !== '') {
      // Type specific checks
      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address.';
        }
      } else if (input.type === 'tel') {
        // Accepts Indian 10-digit (starting with 6-9, with optional +91/91/0 prefix) or international phone numbers
        const telRegex = /^(?:\+91|91|0)?[6-9]\d{9}$|^\+?[1-9]\d{1,14}$/;
        if (!telRegex.test(value.replace(/\s+/g, ''))) {
          isValid = false;
          errorMessage = 'Please enter a valid 10-digit WhatsApp number.';
        }
      }
    }

    if (!isValid) {
      showError(formGroup, errorMessage);
    } else {
      clearError(formGroup);
    }

    return isValid;
  }

  function validateRadios() {
    const radioGroup = form.querySelector('.radio-group');
    const formGroup = radioGroup?.closest('.form-group');
    if (!formGroup) return true;

    const checkedRadio = form.querySelector('input[name="preferred_session"]:checked');
    if (!checkedRadio) {
      showError(formGroup, 'Please select your preferred session type.');
      return false;
    } else {
      clearError(formGroup);
      return true;
    }
  }

  function showError(formGroup, message) {
    formGroup.classList.add('has-error');
    const errorEl = formGroup.querySelector('.error-message');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(formGroup) {
    if (!formGroup) return;
    formGroup.classList.remove('has-error');
    const errorEl = formGroup.querySelector('.error-message');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  // 4. Submit Interceptor with Fetch (Formspree AJAX Integration)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset general errors
    const existingAlert = form.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();

    // Validate all fields
    let formIsValid = true;
    let firstInvalidField = null;

    inputs.forEach(input => {
      const isFieldValid = validateField(input);
      if (!isFieldValid) {
        formIsValid = false;
        if (!firstInvalidField) firstInvalidField = input;
      }
    });

    const radiosValid = validateRadios();
    if (!radiosValid) {
      formIsValid = false;
    }

    if (!formIsValid) {
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    // Set Loading state on submit button
    const originalBtnText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending enquiry... <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';

    // Collect data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Success
        form.reset();
        
        // Remove checked class from radio options
        radioContainers.forEach(container => container.classList.remove('checked'));
        
        // Hide form and display success card
        form.style.display = 'none';
        successCard.style.display = 'block';
        
        // Scroll success card into view nicely
        const offsetPosition = successCard.offsetTop - 120;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Handle server error response
        const errData = await response.json();
        throw new Error(errData.error || 'Server rejected submission');
      }
    } catch (err) {
      console.error('Formspree Submission Error:', err);
      
      // Keep submit button enabled, restore state, show error notification
      submitButton.disabled = false;
      submitButton.innerHTML = originalBtnText;

      const alertBox = document.createElement('div');
      alertBox.className = 'callout-box callout-box-red form-alert';
      alertBox.style.marginTop = '0';
      alertBox.style.marginBottom = '24px';
      alertBox.style.width = '100%';
      alertBox.style.textAlign = 'left';
      alertBox.innerHTML = `
        <i class="fas fa-exclamation-triangle" aria-hidden="true" style="color: #ef4444;"></i>
        <div>
          <strong style="color: #ef4444; display: block; margin-bottom: 4px;">Submission Failed</strong>
          <span style="font-size: 0.9rem;">I'm having trouble processing this form right now. Your inputs have been kept safe! You can contact me directly on WhatsApp by clicking below.</span>
          <a href="https://wa.me/919510292044?text=Hi%20Devgna!%20I%20am%20trying%20to%20book%20a%20class%20but%20the%20form%20is%20down.%20My%20name%20is%20${encodeURIComponent(data.name || '')}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn btn-primary btn-outline" 
             style="min-height: 38px; height: 38px; padding: 0 16px; margin-top: 12px; font-size: 0.85rem; border-color: #ef4444; color: #ef4444;">
             <i class="fab fa-whatsapp" aria-hidden="true"></i> Chat on WhatsApp
          </a>
        </div>
      `;
      
      form.prepend(alertBox);
      
      // Scroll to the error alert nicely
      const offsetPosition = formCard.offsetTop - 100;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}
