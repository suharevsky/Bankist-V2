'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModel = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelector('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const allSections = document.querySelectorAll('.section');
const header = document.querySelector('.header');
const allLazyImg = document.querySelectorAll('.lazy-img');

// Modal Popup
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModel.forEach(btn => {
  btn.addEventListener('click', openModal);
});

overlay.addEventListener('click', closeModal);
btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

// 1. Add event listener to common parent element
// 2. Detemine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  document
    .querySelector('.operations__content--active')
    .classList.remove('operations__content--active');

  // Remove active btn class
  document
    .querySelector('.operations__tab--active')
    .classList.remove('operations__tab--active');

  // Add active btn class
  clicked.classList.add('operations__tab--active');

  // Remove active content class
  document
    .querySelector('.operations__content--' + clicked.dataset.tab)
    .classList.add('operations__content--active');
  //e.target.classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  const link = e.target;
  const sibilings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  sibilings.forEach(el => {
    if (el !== link) {
      el.style.opacity = this;
    }
  });

  logo.style.opacity = this;
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy load images
const lazyImg = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  entry.target.src = entry.target.dataset.src;
};

const imageObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

allLazyImg.forEach(img => imageObserver.observe(img));

// Slider

const slider = function () {
  const dotContainer = document.querySelector('.dots');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const maxSlide = slides.length;

  slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button data-slide="${i}" class="dots__dot"></button>`
      );
    });
  };

  const prevSlide = function () {
    curSlide > 0 ? curSlide-- : (curSlide = maxSlide - 1);

    activateDot(curSlide);
    goToSlide(curSlide);
  };

  const nextSlide = function () {
    curSlide++;
    if (curSlide === maxSlide) curSlide = 0;
    activateDot(curSlide);
    goToSlide(curSlide);
  };

  const activateDot = function (curSlide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    dotContainer
      .querySelector(`.dots__dot[data-slide="${curSlide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (curSlide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - curSlide) * 100}%)`)
    );
  };

  document.querySelector('.dots').addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      activateDot(e.target.dataset.slide);
      goToSlide(e.target.dataset.slide);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
};

slider();
