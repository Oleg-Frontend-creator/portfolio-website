export function initTyped({Typed} = {}) {
    if (!Typed) return;
    const el = document.querySelector('.typed');
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