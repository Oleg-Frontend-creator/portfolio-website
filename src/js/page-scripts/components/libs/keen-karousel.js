import KeenSlider from "keen-slider";

export function autoplayPlugin(interval) {
    return (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
            clearTimeout(timeout);
        }

        function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => slider.next(), interval);
        }

        slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
                mouseOver = true;
                clearNextTimeout();
            });
            slider.container.addEventListener("mouseout", () => {
                mouseOver = false;
                nextTimeout();
            });
            nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
    };
}

export function initSlider({
                               sliderOptions = {},
                               sliderSelector = "#keenSlider"
                           }) {
    const sliderHTMLElement = document.querySelector(sliderSelector);
    if (!sliderHTMLElement) return;

    const slider = new KeenSlider(sliderHTMLElement,
        {
            loop: true,
            mode: "snap",
            ...sliderOptions
        },
        [autoplayPlugin(6000)]);

    window.addEventListener("resize", () => slider.update());
}