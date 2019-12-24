/**
 * This stuff is important, and will be inlined
 */

import * as SmoothScroll from 'smooth-scroll';
import style from './index.css';
import arrow from './arrow.css';

const container = document.getElementById('canvas');
container.style.height = `${window.innerHeight}px`;

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 600,
  speedAsDuration: true,
  easing: 'easeInOutCubic'
});

let tracked = false;
window.addEventListener('scroll', () => {
  const scrollPercent = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
  document.getElementById('arrow').style.opacity = 1 - scrollPercent;
  document.getElementById('content').style.opacity = scrollPercent;

  if (scrollPercent == 1 && !tracked) {
    tracked = true;
    gtag('event', 'view_item', {
      'event_category': 'engagement',
      'event_label': 'content'
    });
  }
});