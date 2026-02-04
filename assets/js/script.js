'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector("[data-navbar]");
  const overlay = document.querySelector("[data-overlay]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navbarLinks = document.querySelectorAll("[data-nav-link]");

  // Null safety check - only proceed if elements exist
  if (!navbar || !overlay) {
    console.warn('Navbar or overlay not found');
    return;
  }

  const navElemArr = [overlay, navCloseBtn, navOpenBtn].filter(el => el !== null);

  /**
   * Handle navbar link clicks - differentiate between dropdowns and regular links
   */
  if (navbarLinks && navbarLinks.length > 0) {
    for (let i = 0; i < navbarLinks.length; i++) {
      navbarLinks[i].addEventListener("click", function (e) {
        // Check if this is a dropdown parent link
        const parentLi = this.closest('li');
        const hasDropdown = parentLi && parentLi.classList.contains('dropdown');

        // If it's a dropdown parent, don't close the menu (let dropdowns work)
        // If it's a regular link (Services, Contact, Home), close the menu
        if (!hasDropdown) {
          // Close the mobile menu
          if (navbar) elemToggleFunc(navbar);
          if (overlay) elemToggleFunc(overlay);
          // Let the browser navigate to the href (don't prevent default)
        }
      });
    }
  }

  /**
   * Toggle navbar when clicking overlay, close button, or open button
   */
  for (let i = 0; i < navElemArr.length; i++) {
    if (navElemArr[i]) {
      navElemArr[i].addEventListener("click", function () {
        if (navbar) elemToggleFunc(navbar);
        if (overlay) elemToggleFunc(overlay);
      });
    }
  }
});



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
});



/**
 * Stats Counter Animation
 */

const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k';
  }
  return num.toString();
}

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuad = progress * (2 - progress);
    const currentValue = Math.floor(easeOutQuad * target);

    counter.textContent = formatNumber(currentValue);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = formatNumber(target);
    }
  }

  requestAnimationFrame(updateCounter);
}

function startCounters() {
  if (countersStarted) return;

  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Start when stats section is 80% visible
  if (rect.top <= windowHeight * 0.8) {
    countersStarted = true;
    counters.forEach(counter => animateCounter(counter));
  }
}

window.addEventListener('scroll', startCounters);
window.addEventListener('load', startCounters);

/**
 * Sticky Contact Button Injection
 */
document.addEventListener("DOMContentLoaded", function () {
  // Check if button already exists to prevent duplicates
  if (document.querySelector('.sticky-contact-bar')) return;

  const contactBar = document.createElement("div");
  contactBar.className = "sticky-contact-bar";
  contactBar.innerHTML = `
    <a href="https://wa.me/919876543210" target="_blank" class="sticky-btn whatsapp">
      <ion-icon name="logo-whatsapp"></ion-icon>
      <span class="tooltip">Chat +91 9876543210</span>
    </a>
    <a href="tel:04422436272" class="sticky-btn phone">
      <ion-icon name="call"></ion-icon>
      <span class="tooltip">Call +91 9876543210</span>
    </a>
  `;
  document.body.appendChild(contactBar);
});

/**
 * Hero Slider Initialization
 */
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector('.hero-slider')) {
    const swiper = new Swiper('.hero-slider', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  }
});
/**
 * Scroll Progress Bar
 */

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  header.appendChild(progressBar);

  // Update progress on scroll
  window.addEventListener('scroll', function () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
});

/**
 * Active Page Tracker
 */

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;
  // Handle root/index correctly
  const pageName = currentPath.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');

    // Check if link matches current page
    // Simple check: if href matches pageName
    if (linkHref === pageName) {
      link.classList.add('active');
    }
    // Handle home page specifically if pageName is 'index.html' and href is './' or 'index.html'
    else if ((pageName === 'index.html' || pageName === '') && (linkHref === './' || linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
});

/**
 * Active Page Tracker (Updated)
 */

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  // Remove active class from ALL links first to prevent duplicates
  navLinks.forEach(link => link.classList.remove('active'));

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');

    if (linkHref === pageName) {
      link.classList.add('active');
    }
    else if ((pageName === 'index.html' || pageName === '') && (linkHref === './' || linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
});
