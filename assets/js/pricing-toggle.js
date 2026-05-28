/**
 * Pricing Toggle Module
 * Manages the "Monthly / Semester" pricing toggle switch.
 * Swaps highlighting classes on custom grid tables without hiding structural info.
 */

export function initPricingToggle() {
  const toggleInput = document.getElementById('pricing-billing-switch');
  const labelMonthly = document.getElementById('toggle-label-monthly');
  const labelSemester = document.getElementById('toggle-label-semester');
  const pricingTables = document.querySelectorAll('.pricing-table-grid');
  
  if (!toggleInput || !pricingTables.length) return;

  function updatePricingHighlight() {
    const isSemester = toggleInput.checked;
    
    if (isSemester) {
      // Highlighting Semester Option
      if (labelMonthly) labelMonthly.classList.remove('active');
      if (labelSemester) labelSemester.classList.add('active');
      
      pricingTables.forEach(table => {
        table.classList.remove('highlight-col-monthly');
        table.classList.add('highlight-col-semester');
      });
    } else {
      // Highlighting Monthly Option
      if (labelMonthly) labelMonthly.classList.add('active');
      if (labelSemester) labelSemester.classList.remove('active');
      
      pricingTables.forEach(table => {
        table.classList.remove('highlight-col-semester');
        table.classList.add('highlight-col-monthly');
      });
    }
  }

  // Initialize correct state
  updatePricingHighlight();

  // Attach event listener
  toggleInput.addEventListener('change', updatePricingHighlight);
  
  // Make labels clickable
  if (labelMonthly && labelSemester) {
    labelMonthly.addEventListener('click', () => {
      if (toggleInput.checked) {
        toggleInput.checked = false;
        updatePricingHighlight();
      }
    });

    labelSemester.addEventListener('click', () => {
      if (!toggleInput.checked) {
        toggleInput.checked = true;
        updatePricingHighlight();
      }
    });
  }
}
