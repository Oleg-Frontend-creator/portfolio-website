import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import GLightbox from 'glightbox';
import VanillaTilt from 'vanilla-tilt';
import PureCounter from '@srexi/purecounterjs';
import 'waypoints/lib/noframework.waypoints';

import {initGLightbox} from "../../page-scripts/components/libs/glightbox";
import {initPureCounter} from "../../page-scripts/components/libs/pure-counter";
import {initSkillsWaypoints} from "../../page-scripts/components/libs/waypoint";
import {initIsotope} from "../../page-scripts/components/libs/isotope";
import {initVanillaTilt} from "../../page-scripts/components/libs/vanilla-tilt";
import {initCallbackForm} from "../../page-scripts/components/page-components/callback-form";
import {initSlider} from "../../page-scripts/components/libs/keen-karousel";

function onDomReady(func) {
    document.readyState === 'loading' ?
        document.addEventListener('DOMContentLoaded', func, {once: true}) :
        func();
}

onDomReady(() => {
    initGLightbox({GLightbox});
    initPureCounter({PureCounter});
    initSkillsWaypoints({Waypoint});
    initIsotope({Isotope, imagesLoaded});
    initVanillaTilt({VanillaTilt});
    initCallbackForm({selector: '#php-form', endpoint: '../php/contact.php'});
    initSlider({
        sliderOptions: {
            slides: { perView: 5, spacing: 24 },
            breakpoints: {
                "(max-width: 993px)": { slides: { perView: 4, spacing: 16 } },
                "(max-width: 768px)": { slides: { perView: 3, spacing: 20 } }
            },
        }
    });
});
