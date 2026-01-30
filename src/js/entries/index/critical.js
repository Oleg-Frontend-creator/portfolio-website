import Typed from 'typed.js';

import {initNavActiveOnScroll} from "../../page-scripts/components/page-components/active-nav-scroll";
import {initScrollToTop} from "../../page-scripts/components/page-components/scroll-top";
import {initPreloader} from "../../page-scripts/components/page-components/preloader";
import {initHashScroll} from "../../page-scripts/components/page-components/hash-scroll";
import {initReveal} from "../../page-scripts/components/page-components/reveal-animation";
import {initTyped} from "../../page-scripts/components/libs/typed";
import {initSlider} from "../../page-scripts/components/libs/keen-karousel";


initNavActiveOnScroll();
initScrollToTop();
initPreloader();
initHashScroll();
initReveal();
initTyped({Typed});
initSlider({
    sliderOptions: {
        slides: { perView: 1, spacing: 24 },
        breakpoints: {
            "(max-width: 993px)": { slides: { perView: 4, spacing: 16 } },
            "(max-width: 768px)": { slides: { perView: 3, spacing: 20 } }
        },
    }
});