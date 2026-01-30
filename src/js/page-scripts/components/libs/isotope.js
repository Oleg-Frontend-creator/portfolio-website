export function initIsotope({Isotope, imagesLoaded} = {}) {
    if (!Isotope || !imagesLoaded) return;

    const layouts = Array.from(document.querySelectorAll('.isotope-layout'));
    if (!layouts.length) return;

    layouts.forEach(isotopeItem => {
        const container = document.querySelector('.isotope-container');
        if (!container) return;

        const layout = (isotopeItem.getAttribute('data-layout') || 'masonry').trim();
        const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let iso = null;

        imagesLoaded(container, () => {
            iso = new Isotope(container, {
                itemSelector: '.isotope-item',
                layoutMode: layout,
                filter,
                sortBy: sort
            });
        });

        Array.from(document.querySelectorAll('.isotope-filters li')).forEach(li => {
            li.addEventListener('click', () => {
                const active = document.querySelector('.isotope-filters .filter-active');
                active?.classList.remove('filter-active');
                li.classList.add('filter-active');

                if (iso) {
                    iso.arrange({filter: li.getAttribute('data-filter')});
                }
            });
        });
    });
}
