import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import '../../scss/page-styles/service';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import {initCallbackForm, initEnhancements} from '../../js/common.js';

function onDomReady(func) {
    document.readyState === 'loading' ?
        document.addEventListener('DOMContentLoaded', func, {once: true}) :
        func();
}

onDomReady(() => {
    initEnhancements({AOS});

    initCallbackForm({selector: '#php-form', endpoint: '../forms/contact.php'});
});