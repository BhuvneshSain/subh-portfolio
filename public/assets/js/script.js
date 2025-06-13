// filepath: c:\Users\bhuvn\Desktop\Project\subh-portfolio\public\assets\js\script.js
(function() {
'use strict';

// Prevent multiple executions
if (window.portfolioScriptLoaded) {
  return;
}
window.portfolioScriptLoaded = true;

// Wait for DOM to be ready
function initPortfolio() {
  // Check if required elements exist
  if (!document.querySelector("[data-sidebar]") || !document.querySelector("[data-nav-link]")) {
    // Retry after a short delay if elements aren't ready
    setTimeout(initPortfolio, 50);
    return;
  }

  // element toggle function
  const elementToggleFunc = function (elem) { 
    if (elem) elem.classList.toggle("active"); 
  }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // modal variables
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    if (modalContainer) modalContainer.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
  }

  // add click event to all modal items
  if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
    for (let i = 0; i < testimonialsItem.length; i++) {
      testimonialsItem[i].addEventListener("click", function () {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        const title = this.querySelector("[data-testimonials-title]");
        const text = this.querySelector("[data-testimonials-text]");
        
        if (avatar && title && text) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt;
          modalTitle.innerHTML = title.innerHTML;
          modalText.innerHTML = text.innerHTML;
          testimonialsModalFunc();
        }
      });
    }
  }

  // add click event to modal close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }
  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }

  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");

  const filterFunc = function (selectedValue) {
    if (filterItems.length > 0) {
      for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
          filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
          filterItems[i].classList.add("active");
        } else {
          filterItems[i].classList.remove("active");
        }
      }
    }
  }

  // add event in all select items
  if (selectItems.length > 0 && selectValue) {
    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        if (select) elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    }
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  if (filterBtn.length > 0) {
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        if (lastClickedBtn) lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    }
  }

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // add event to all form input field
  if (formInputs.length > 0 && form && formBtn) {
    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    }
  }

  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // add event to all nav link
  if (navigationLinks.length > 0 && pages.length > 0) {
    for (let i = 0; i < navigationLinks.length; i++) {
      navigationLinks[i].addEventListener("click", function () {
        const targetPage = this.innerHTML.toLowerCase();
        
        for (let j = 0; j < pages.length; j++) {
          if (targetPage === pages[j].dataset.page) {
            pages[j].classList.add("active");
          } else {
            pages[j].classList.remove("active");
          }
        }
        
        for (let j = 0; j < navigationLinks.length; j++) {
          if (j === i) {
            navigationLinks[j].classList.add("active");
          } else {
            navigationLinks[j].classList.remove("active");
          }
        }
        
        window.scrollTo(0, 0);
      });
    }
  }

} // End of initPortfolio function

// Initialize when script loads
initPortfolio();

})(); // End of IIFE
