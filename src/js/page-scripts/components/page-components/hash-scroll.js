export function initHashScroll() {
    window.addEventListener('load', () => {
        if (!window.location.hash) return;
        const el = document.querySelector(window.location.hash);
        if (!el) return;

        setTimeout(() => {
            el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 80);
    });
}