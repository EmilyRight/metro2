import $ from 'jquery';
import { WOW } from './vendor/wow.min';
import detectDevice from './components/detectDevice';

import GTMEvents from './components/gtmEvents';
import handleTooltip from './components/tooltip';
import videoTeaser from './components/videoTeaser';

const GTM = new GTMEvents();

window.jQuery = window.$ = $;
/// /////// DocReady //////////
window.addEventListener('load', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();
  handleTooltip();
  GTM.addEventListeners();
  goNextSection();
  scrollTeaser(document.querySelector('.section-about'));
  videoTeaser();
});

function goNextSection() {
  const goNextBtns = document.querySelectorAll('.js-go-next');
  const sectionsList = document.querySelectorAll('section');

  goNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnParentNode = btn.closest('section');
      let sectionToScrollTo;
      sectionsList.forEach((el, index) => {
        if (el === btnParentNode) {
          sectionToScrollTo = sectionsList[index + 1];
          scrollToElement(sectionToScrollTo);
        }
      });
    });
  });
}

function scrollToElement(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

// scroll to next if URL contains #about

function scrollTeaser(el) {
  if (window.location.hash === '#about') {
    scrollToElement(el);
  }
}

// function handleTooltip() {
//   const tooltipIcon = document.querySelector('.tooltip__icon');
//   const tooltip = document.querySelector('.tooltip');
//   tooltipIcon.addEventListener('click', () => {
//     tooltip.classList.add('opened');
//   });
// }
