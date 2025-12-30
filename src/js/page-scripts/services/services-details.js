import {servicesData} from './services-data.js';

function getServiceIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderService(service) {
    const titleEl           = document.querySelector('[data-service-title]');
    const pageTitleEl       = document.querySelector('[data-service-short-title-1]');
    const pageTitleMetaEl   = document.querySelector('[data-service-short-title-2]');
    const pillNumberEl      = document.querySelector('[data-service-pill-number]');
    const pillCategoryEl    = document.querySelector('[data-service-pill-category]');
    const subtitleEl        = document.querySelector('[data-service-subtitle]');
    const descEl            = document.querySelector('[data-service-description]');
    const descMetaEl1       = document.querySelector('[data-service-meta-description-1]');
    const descMetaEl2       = document.querySelector('[data-service-meta-description-2]');
    const urlMetaEl2        = document.querySelector('[data-service-meta-url]');

    const fitIntroEl        = document.querySelector('[data-service-fit-intro]');
    const fitCardsEl        = document.querySelector('[data-service-fit-cards]');

    const includedEl        = document.querySelector('[data-service-included]');
    const stepsEl           = document.querySelector('[data-service-steps]');

    const timelineTextEl    = document.querySelector('[data-service-timeline]');
    const faqEl             = document.querySelector('[data-service-faq]');

    if (!service) {
        if (titleEl) titleEl.textContent = 'Услуга не найдена';
        if (descEl) descEl.textContent = 'Похоже, вы перешли по неверной ссылке.';
        return;
    }

    // Основные заголовки
    if (pageTitleEl)     pageTitleEl.textContent     = service.shortTitle + ' | Олег Галузинский';
    if (pageTitleMetaEl) pageTitleMetaEl.textContent = service.shortTitle;
    if (titleEl)         titleEl.textContent         = service.title;
    if (pillNumberEl)    pillNumberEl.textContent    = pillNumberEl.textContent + service.serviceNumber;
    if (pillCategoryEl)  pillCategoryEl.textContent  = service.category;
    if (subtitleEl)      subtitleEl.textContent      = service.subtitle;
    if (descEl)          descEl.innerHTML            = service.description;
    if (descMetaEl1)     descMetaEl1.textContent     = service.subtitle;
    if (descMetaEl2)     descMetaEl2.textContent     = service.subtitle;
    if (urlMetaEl2)      urlMetaEl2.textContent      = window.location.href;

    // "Подойдёт вам, если..."
    if (fitIntroEl) fitIntroEl.textContent = service.fitIntro ?? '';

    if (fitCardsEl) {
        fitCardsEl.innerHTML = '';
        (service.fitCards || []).forEach((card) => {
            const cardEl = document.createElement('div');
            cardEl.classList.add('when-useful-card');
            cardEl.innerHTML = `
        <h4 class="card-title">${card.title}</h4>
        <p class="card-description">${card.description}</p>`;
            fitCardsEl.appendChild(cardEl);
        });
    }

    // Что включено в услугу
    if (includedEl) {
        includedEl.innerHTML = '';
        (service.included || []).forEach((block) => {
            const blockEl = document.createElement('div');
            blockEl.classList.add('include-item');
            blockEl.innerHTML = `
                    <h4 class="include-item-title">${block.title}</h4>
                    <ul class="list-unstyled">
                        ${(block.points || []).map((p) => `
                            <li class="ms-3 mb-1">
                                <i aria-hidden="true" class="bi bi-check-circle"></i><span>${p}</span>
                            </li>`).join('')}
                    </ul>`;
            includedEl.appendChild(blockEl);
        });
    }

    // Этапы создания продукта
    if (stepsEl) {
        stepsEl.innerHTML = '<h3 class="step-title">Этапы создания продукта</h3>';
        (service.steps || []).forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.classList.add('step-item');
            stepEl.innerHTML = `
          <h4>${step.title}</h4>
          <p>${step.description}</p>`;
            stepsEl.appendChild(stepEl);
        });
    }

    // Сроки
    if (timelineTextEl) {
        timelineTextEl.textContent = service.timelineText ?? '';
    }

    // FAQ
    if (faqEl) {
        faqEl.innerHTML = '<header class="box"><label for="acc-close" class="box-title">FAQ</label></header>';

        // Вопросы/ответы
        (service.faq || []).forEach((item, index) => {
            const inputId = `cb-${index}`;

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'accordion';
            input.id = inputId;
            if (index === 0) {
                input.checked = true; // первый открыт по умолчанию
            }

            const box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML = `
        <label class="box-title" for="${inputId}">${item.question}</label>
        <label class="box-close" for="acc-close"></label>
        <div class="box-content">
          <div>${item.answer}</div>
        </div>
      `;

            faqEl.appendChild(input);
            faqEl.appendChild(box);
        });

        const closeInput = document.createElement('input');
        closeInput.type = 'radio';
        closeInput.name = 'accordion';
        closeInput.id = 'acc-close';
        faqEl.appendChild(closeInput);

        renderServiceNav(service.id);
    }

    document.getElementById('cta-link').addEventListener('click', () => {
        setTimeout(() => document.querySelector('#name')?.focus(), 500);
    })
}

function renderServiceNav(currentId) {
    const navElement = document.querySelector('[data-service-nav]');
    if (!navElement) return;

    const index = servicesData.findIndex(item => item.id === currentId);
    const prev = servicesData[index - 1];
    const next = servicesData[index + 1];

    let html = '';

    if (prev) {
        html += `
            <a class="nav__btn prev" href="service-details.html?id=${prev.id}">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
                 Предыдущая
            </a>`;
    }
    if (next) {
        html += `
            <a class="nav__btn next" href="service-details.html?id=${next.id}">
                Следующая 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
            </a>`;
    }

    navElement.innerHTML = html;
}

// IIFE, как в прошлый раз
(function init() {
    const serviceId = getServiceIdFromQuery();

    if (!serviceId) {
        renderService(null);
        return;
    }

    const service = servicesData.find((item) => item.id === serviceId);
    renderService(service || null);
})();