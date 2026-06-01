/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

function headerToggle() {
  document.querySelector('#header').classList.toggle('header-show');
  headerToggleBtn.classList.toggle('bi-list');
  headerToggleBtn.classList.toggle('bi-x');
}

if (headerToggleBtn) {
  headerToggleBtn.addEventListener('click', headerToggle);
}

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');

  if (preloader) {
    preloader.style.display = 'none';
  }
});
  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

if (scrollTop) {
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

 new Typed(".typed", {
  strings: [
    "Siswa SMK Galajura",
    "Humas Rohis",
    "Designer Marching Band",
    "IT Memebr"
  ],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 2000,
  loop: true

});

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  

})();

document.addEventListener("DOMContentLoaded", function () {

  const tombolMenu = document.getElementById("tesmenu");
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".navmenu ul li a");

  function toggleMenu() {
    header.classList.toggle("menu-buka");

    if (header.classList.contains("menu-buka")) {
      tombolMenu.innerHTML = "✕";
    } else {
      tombolMenu.innerHTML = "☰";
    }
  }

  // tombol menu
  tombolMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // klik link → auto close menu (INI PENTING)
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      header.classList.remove("menu-buka");
      tombolMenu.innerHTML = "☰";
    });
  });

  // klik luar menu → auto close
  document.addEventListener("click", function (e) {
    if (!header.contains(e.target) && !tombolMenu.contains(e.target)) {
      header.classList.remove("menu-buka");
      tombolMenu.innerHTML = "☰";
    }
  });

});

document.addEventListener("DOMContentLoaded", function () {

  const btn = document.getElementById("tesmenu");
  const header = document.getElementById("header");
  const links = document.querySelectorAll("#navmenu a");

  if (!btn || !header) {
    console.error("Button atau header tidak ketemu!");
    return;
  }

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    header.classList.toggle("menu-buka");
    btn.textContent = header.classList.contains("menu-buka") ? "✕" : "☰";
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-buka");
      btn.textContent = "☰";
    });
  });

});

