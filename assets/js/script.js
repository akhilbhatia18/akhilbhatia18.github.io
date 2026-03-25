'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

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

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
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



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// ===== THEME TOGGLE FUNCTIONALITY =====

const themeToggleBtn = document.getElementById("themeToggleBtn");
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem("theme") || "dark-theme";
htmlElement.style.colorScheme = currentTheme === "light-theme" ? "light" : "dark";
if (currentTheme === "light-theme") {
  document.body.classList.add("light-theme");
  themeToggleBtn.innerHTML = '<ion-icon name="sunny"></ion-icon>';
}

// Theme toggle button click event
themeToggleBtn.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");
  
  // Update icon
  if (document.body.classList.contains("light-theme")) {
    themeToggleBtn.innerHTML = '<ion-icon name="sunny"></ion-icon>';
    localStorage.setItem("theme", "light-theme");
    htmlElement.style.colorScheme = "light";
  } else {
    themeToggleBtn.innerHTML = '<ion-icon name="moon"></ion-icon>';
    localStorage.setItem("theme", "dark-theme");
    htmlElement.style.colorScheme = "dark";
  }
});



// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

// Options for Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

// Create Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation class when element enters viewport
      entry.target.style.animation = entry.target.dataset.animation || "slideInUp 0.6s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(".service-item, .timeline-item, .testimonials-item, .project-item, .clients-item, .skills-item");
animatedElements.forEach((el) => {
  // Reset animation initially
  el.style.opacity = "0";
  el.style.animation = "none";
  observer.observe(el);
});



// ===== PLAYFUL SEND BUTTON EFFECT =====

const sendButton = document.querySelector("[data-form-btn]");

sendButton.addEventListener("mouseenter", function () {
  // Random direction: left or right
  const randomDirection = Math.random() > 0.5 ? 1 : -1;
  const randomDistance = Math.random() * 100 + 50; // 50px to 150px
  
  // Apply smooth transition and transform
  this.style.transition = "transform 0.3s ease";
  this.style.transform = `translateX(${randomDirection * randomDistance}px)`;
});

sendButton.addEventListener("mouseleave", function () {
  // Reset position when mouse leaves
  this.style.transform = "translateX(0)";
});

// Also move on click attempt
sendButton.addEventListener("click", function (e) {
  // Only prevent if it's disabled (form not valid)
  if (this.hasAttribute("disabled")) {
    e.preventDefault();
    
    // Fun movement on click
    const randomX = Math.random() * 200 - 100; // -100 to 100
    const randomY = Math.random() * 100 - 50;  // -50 to 50
    
    this.style.transition = "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    this.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Reset after animation
    setTimeout(() => {
      this.style.transform = "translate(0, 0)";
    }, 400);
  }
});