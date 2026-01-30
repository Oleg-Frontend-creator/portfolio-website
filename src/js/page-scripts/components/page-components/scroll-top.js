export function initScrollToTop() {
    const scrollTop = document.querySelector('.scroll-top');
    if (!scrollTop) return;
    const toggle = () => scrollTop.classList.toggle('active', window.scrollY > 100);
    toggle();
    document.addEventListener('scroll', toggle, { passive: true });
}