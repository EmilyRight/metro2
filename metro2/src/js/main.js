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
  handleReaction();
});

/**
 * @param {HTMLImageElement} element
 * @param {Animation} animation
 */

function removeAnimation(element, animation) {
  animation.finished.then(() => {
    element.remove();
  });
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function createRandomTranslate(min, max) {
  const number = Math.random() * (max - min) + min;
  return number;
}

/**
 *
 * @param {HTMLElement} element
 * @returns {Animation}
 */
function createAnimation(element) {
  const animation = new KeyframeEffect(
    element,
    [
      { transform: 'translateX(0%) translateY(0%)', offset: 0 },

      { transform: `translateX(${createRandomTranslate(-50, 50)}%) translateY(-100%)`, offset: 0.4 },
      {
        transform: `translateX(${createRandomTranslate(-50, 50)}%) translateY(-150%)`, offset: 0.8,
      },
      {
        transform: `translateX(${createRandomTranslate(-50, 50)}%) translateY(-200%)`, opacity: 0, offset: 1,
      },
    ],
    {
      duration: 1500,
      fill: 'forwards',
      easing: 'linear',
      iterations: 1,
      direction: 'normal',
    }, // keyframe options
  );

  return new Animation(animation, document.timeline);
}

/**
 * @param {string} imageSrc
 * @returns {HTMLImageElement}
 */

function createNode(imageSrc) {
  const image = document.createElement('img');
  image.src = imageSrc;
  image.alt = '';
  image.classList.add('reactions-item__image_invisible');
  const animation = createAnimation(image);
  animation.play();
  removeAnimation(image, animation);
  return image;
}

function removeClickedClass(list, element) {
  const newArray = [...Array.from(list)].filter((el) => el !== element);
  newArray.forEach((reaction) => {
    if (reaction.classList.contains('clicked')) {
      reaction.classList.remove('clicked');
    }
  });
}

function handleReaction() {
  const reactionsList = document.querySelectorAll('.reactions-item');
  reactionsList.forEach((reaction) => {
    const reactionImageBlock = reaction.querySelector('.reactions-item__image');
    const reactionImage = reaction.querySelector('.reactions-item__image_visible');
    const { src } = reactionImage;
    reaction.addEventListener('click', () => {
      const reactionAnimated = createNode(src);
      removeClickedClass(reactionsList, reaction);
      reaction.classList.toggle('clicked');
      reactionImageBlock.append(reactionAnimated);
    });
  });
}

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
