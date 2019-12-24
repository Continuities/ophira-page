/**
 * This stuff is important, and will be inlined
 */

import * as SmoothScroll from 'smooth-scroll';
import style from './index.css';
import arrow from './arrow.css';

const container = document.getElementById('canvas');
container.style.height = `${window.innerHeight}px`;

const scroll = new SmoothScroll('a[href*="#"]');