export function initVanillaTilt({VanillaTilt} = {}) {
    if (!VanillaTilt) return;
    const tiltEls = Array.from(document.querySelectorAll('[data-tilt], .tilt'));
    if (!tiltEls.length) return;
    VanillaTilt.init(tiltEls, {});
}
