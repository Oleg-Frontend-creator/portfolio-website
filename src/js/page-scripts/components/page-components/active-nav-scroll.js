export function initNavActiveOnScroll() {
    const navMenuLinks = Array.from(document.querySelectorAll('#navmenu a'));
    if (!navMenuLinks.length) return;

    const navmenuScrollspy = () => {
        const position = window.scrollY + 200;
        navMenuLinks.forEach(navMenuLink => {
            const hash = navMenuLink.getAttribute('href');
            if (!hash || !hash.startsWith('#')) return;

            const section = document.querySelector(hash);
            if (!section) return;

            const active = position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;
            navMenuLink.classList.toggle('active', active);
        });
    };

    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
}