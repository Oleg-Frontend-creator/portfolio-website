export function initPureCounter({PureCounter} = {}) {
    if (!PureCounter) return;
    if (!Array.from(document.querySelectorAll('[data-purecounter-start], .purecounter')).length) return;
    new PureCounter();
}