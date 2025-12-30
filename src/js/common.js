'use strict';

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

// all = true => добавляет обработчики событий для всех элементов внутри
// all = false => только одному
function on(eventType, selector, eventHandler, all = false) {
    const elements = all ? qsa(selector) : [qs(selector)].filter(Boolean); // если qs не найдет selector, то вернет null, а [null].filter(Boolean) = [], поэтому код ниже - безопасен
    elements.forEach(element => element.addEventListener(eventType, eventHandler));
}

export function initCommon() {
    initHeaderToggle();
    initNavActiveOnScroll();
    initScrollToTop();
    initPreloader();
    initInputBlur();
    initScrollHashFix();
}

export function initEnhancements(deps = {}) {
    initGLightbox(deps);
    initSwiper(deps);
    initPureCounter(deps);
    initSkillsWaypoints(deps);
    initIsotope(deps);
    initVanillaTilt(deps);
    initTyped(deps);
    initAOS(deps);
}

function initHeaderToggle() {
    const headerToggleBtn = qs('.header-toggle');
    if (!headerToggleBtn) return;

    on('click', '.header-toggle', () => {
        qs('#header')?.classList.toggle('header-show');
        headerToggleBtn.classList.toggle('bi-list');
        headerToggleBtn.classList.toggle('bi-x');
    });

    on(
        'click',
        '#navmenu a',
        () => {
            const header = qs('#header');
            if (!header?.classList.contains('header-show')) return;

            header.classList.remove('header-show');
            headerToggleBtn.classList.add('bi-list');
            headerToggleBtn.classList.remove('bi-x');
        },
        true
    );
}

function initNavActiveOnScroll() {
    const navMenuLinks = qsa('#navmenu a');
    if (!navMenuLinks.length) return;

    const navmenuScrollspy = () => {
        const position = window.scrollY + 200;
        navMenuLinks.forEach(navMenuLink => {
            const hash = navMenuLink.getAttribute('href');
            if (!hash || !hash.startsWith('#')) return;

            const section = qs(hash);
            if (!section) return;

            const active = position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;

            navMenuLink.classList.toggle('active', active);
        });
    };

    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
}

function initScrollToTop() {
    const scrollTop = qs('.scroll-top');
    if (!scrollTop) return;

    const toggle = () => {
        scrollTop.classList.toggle('active', window.scrollY > 100);
    };

    scrollTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    window.addEventListener('load', toggle);
    document.addEventListener('scroll', toggle);
}

function initPreloader() {
    const preloader = qs('#preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        preloader.remove();
    });
}

function initScrollHashFix() {
    window.addEventListener('load', () => {
        if (!window.location.hash) return;
        const el = qs(window.location.hash);
        if (!el) return;

        setTimeout(() => {
            el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 80);
    });
}

function initInputBlur() {
    const inputs = qsa('input.form-control, textarea.form-control');
    if (!inputs.length) return;

    const normalize = (v) => (v ?? '').replace(/\s+/g, ' ').trim();

    inputs.forEach((input) => input.addEventListener('blur', () => input.value = normalize(input.value)));
}

export function initCallbackForm({selector, endpoint} = {}) {
    if (!selector || !endpoint) return;

    const form = qs(selector);
    if (!form) return;

    const loadingEl = qs(`${selector} .loading`);
    const errorEl = qs(`${selector} .error-message`);
    const successEl = qs(`${selector} .sent-message`);

    const setState = (state) => {
        loadingEl && (loadingEl.style.display = state === 'loading' ? 'block' : 'none');
        errorEl && (errorEl.style.display = state === 'error' ? 'block' : 'none');
        successEl && (successEl.style.display = state === 'success' ? 'block' : 'none');
    };

    const normalize = (v) => v.replace(/\s+/g, ' ').trim();
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        setState(null);
        errorEl && (errorEl.textContent = '');

        // Bootstrap validation
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        form.classList.add('was-validated');
        setState('loading');

        try {
            const formData = new FormData(form);
            for (const [key, value] in formData.entries()) {
                if (typeof value === 'string') formData.set(key, normalize(value));
            }

            form.classList.add('was-validated');
            if (!form.checkValidity()) return;

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network error');
            }

            const text = await response.text();
            console.log('PHP:', text);

            // PHP может вернуть 'OK' или любой текст
            if (text.trim().toLowerCase() !== 'ok') {
                throw new Error(text);
            }

            setState('success');
            form.reset();
            form.classList.remove('was-validated');
        } catch (err) {
            console.error(err);
            setState('error');
            if (errorEl) {
                errorEl.textContent = 'Ошибка отправки. Попробуйте позже.';
            }
        }
    });
}

function initAOS({AOS} = {}) {
    if (!AOS) return;
    if (!qsa('[data-aos]').length) return;

    const aosInit = () => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    };

    AOS.refreshHard();
    setTimeout(() => AOS.refreshHard(), 200);
    setTimeout(() => AOS.refreshHard(), 600);
    document.readyState === 'complete' ? aosInit() : window.addEventListener('load', aosInit, {once: true});
}

function initGLightbox({GLightbox} = {}) {
    if (!GLightbox) return;
    // если на странице вообще нет ссылок под лайтбокс — не инициализируем
    if (!qsa('.glightbox').length) return;

    // GLightbox сам найдёт элементы по selector
    GLightbox({selector: '.glightbox'});
}

function initSwiper({Swiper} = {}) {
    if (!Swiper) return;

    const swiperBlocks = qsa('.init-swiper');
    if (!swiperBlocks.length) return;

    swiperBlocks.forEach(swiperEl => {
        const configEl = qs('.swiper-config', swiperEl);
        if (!configEl) return;

        let config = {};
        try {
            config = JSON.parse(configEl.textContent.trim());
        } catch (e) {
            console.warn('Invalid swiper config JSON', e);
            return;
        }

        // если нужен “кастомный pagination” — подключай свою функцию отдельно
        // тут делаем безопасно: просто обычный Swiper
        try {
            // eslint-disable-next-line no-new
            new Swiper(swiperEl, config);
        } catch (e) {
            console.warn('Swiper init failed:', e);
        }
    });
}

function initTyped({Typed} = {}) {
    if (!Typed) return;
    const el = qs('.typed');
    if (!el) return;

    if (el.dataset.typedInited === '1') return;
    el.dataset.typedInited = '1';

    const itemsRaw = el.getAttribute('data-typed-items');
    if (!itemsRaw) return;

    const strings = itemsRaw.split(',').map(s => s.trim()).filter(Boolean);
    if (!strings.length) return;

    new Typed('.typed', {
        strings,
        loop: true,
        typeSpeed: 60,
        backSpeed: 60,
        backDelay: 5000
    });
}

function initPureCounter({PureCounter} = {}) {
    if (!PureCounter) return;
    if (!qsa('[data-purecounter-start], .purecounter').length) return;

    try {
        new PureCounter();
    } catch (e) {
        console.warn('PureCounter init failed:', e);
    }
}

function initSkillsWaypoints({Waypoint} = {}) {
    if (!Waypoint) return;
    const blocks = qsa('.skills-animation');
    if (!blocks.length) return;

    blocks.forEach(item => {
        new Waypoint({
            element: item,
            offset: '80%',
            handler: () => {
                qsa('.progress .progress-bar', item).forEach(bar => {
                    const val = bar.getAttribute('aria-valuenow') || '0';
                    bar.style.width = `${val}%`;
                });
            }
        });
    });
}

function initIsotope({Isotope, imagesLoaded, AOS} = {}) {
    if (!Isotope || !imagesLoaded) return;

    const layouts = qsa('.isotope-layout');
    if (!layouts.length) return;

    layouts.forEach(isotopeItem => {
        const container = qs('.isotope-container', isotopeItem);
        if (!container) return;

        const layout = (isotopeItem.getAttribute('data-layout') || 'masonry').trim();
        const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let iso = null;
        const refreshAOS = () => AOS?.refreshHard?.();

        imagesLoaded(container, () => {
            iso = new Isotope(container, {
                itemSelector: '.isotope-item',
                layoutMode: layout,
                filter,
                sortBy: sort
            });
            iso.on('layoutComplete', refreshAOS);
            iso.on('arrangeComplete', refreshAOS);
        });

        qsa('.isotope-filters li', isotopeItem).forEach(li => {
            li.addEventListener('click', () => {
                const active = qs('.isotope-filters .filter-active', isotopeItem);
                active?.classList.remove('filter-active');
                li.classList.add('filter-active');

                if (iso) {
                    iso.arrange({filter: li.getAttribute('data-filter')});
                }
            });
        });
        refreshAOS();
    });
}

function initVanillaTilt({VanillaTilt} = {}) {
    if (!VanillaTilt) return;
    const tiltEls = qsa('[data-tilt], .tilt');
    if (!tiltEls.length) return;

    try {
        VanillaTilt.init(tiltEls, {});
    } catch (e) {
        console.warn('VanillaTilt init failed:', e);
    }
}