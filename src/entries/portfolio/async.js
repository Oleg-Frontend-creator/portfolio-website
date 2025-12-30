import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/css/bundle';
import 'aos/dist/aos.css';
import '../../scss/page-styles/portfolio';

import AOS from 'aos';
import Swiper from 'swiper/bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../js/page-scripts/portfolio/portfolio-details.js';
import {initEnhancements} from '../../js/common.js';

function onDomReady(func) {
    document.readyState === 'loading' ?
        document.addEventListener('DOMContentLoaded', func, {once: true}) :
        func();
}

onDomReady(() => {
    initEnhancements({AOS, Swiper});
});