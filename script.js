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
const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   threshhold: [0, 0.2, 0.7],
// };
// const observer = new IntersectionObserver(obsCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry.isIntersecting);
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
