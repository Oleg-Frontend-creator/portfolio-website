import {initCallbackForm} from "../../page-scripts/components/page-components/callback-form";

function onDomReady(func) {
    document.readyState === 'loading' ?
        document.addEventListener('DOMContentLoaded', func, {once: true}) :
        func();
}

onDomReady(() => {
    initCallbackForm({selector: '#php-form', endpoint: '../php/contact.php'});
});