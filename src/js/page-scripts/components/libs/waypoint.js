export function initSkillsWaypoints({Waypoint} = {}) {
    if (!Waypoint) return;
    const blocks = Array.from(document.querySelectorAll('.skills-content'));
    if (!blocks.length) return;

    blocks.forEach(item => {
        new Waypoint({
            element: item,
            offset: '80%',
            handler: () => {
                Array.from(document.querySelectorAll('.progress .progress-bar')).forEach(bar => {
                    const val = bar.getAttribute('aria-valuenow') || '0';
                    bar.style.width = `${val}%`;
                });
            }
        });
    });
}