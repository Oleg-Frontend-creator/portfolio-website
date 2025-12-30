import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'swiper/css/bundle';
import '../../scss/page-styles/index';
import 'aos/dist/aos.css';

import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import AOS from 'aos';
import GLightbox from 'glightbox';
import Swiper from 'swiper/bundle';
import VanillaTilt from 'vanilla-tilt';
import PureCounter from '@srexi/purecounterjs';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'waypoints/lib/noframework.waypoints';

import {initCallbackForm, initEnhancements} from "../../js/common";

function onDomReady(func) {
    document.readyState === 'loading' ?
        document.addEventListener('DOMContentLoaded', func, {once: true}) :
        func();
}

onDomReady(() => {
    initEnhancements({
        AOS,
        Swiper,
        imagesLoaded,
        GLightbox,
        Isotope,
        VanillaTilt,
        PureCounter,
        Waypoint
    });
    initCallbackForm({selector: '#php-form', endpoint: '../forms/contact.php'});
});
