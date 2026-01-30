export function initGLightbox({GLightbox} = {}) {
    if (!GLightbox) return;
    if (!Array.from(document.querySelectorAll('.glightbox')).length) return;
    GLightbox({selector: '.glightbox'});
}