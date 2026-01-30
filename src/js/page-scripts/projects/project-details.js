import {projectData} from './project-data.js';

function getProjectIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderProject(project) {
    const pageTitleEl1 = document.querySelector('[data-project-page-title-1]');
    const pageTitleEl2 = document.querySelector('[data-project-page-title-2]');
    const pageMetaDesc1 = document.querySelector('[data-project-meta-description-1]');
    const pageMetaDesc2 = document.querySelector('[data-project-meta-description-2]');
    const pageMetaUrl = document.querySelector('[data-project-meta-url]');
    const titleEl = document.querySelector('[data-project-title]');
    const categoryEl = document.querySelector('[data-project-category]');
    const dateEl = document.querySelector('[data-project-date]');
    const projectUrlEl = document.querySelector('[data-project-url]');
    const githubUrlEl = document.querySelector('[data-project-github]');
    const descEl = document.querySelector('[data-project-description]');
    const techStackEl = document.querySelector('[data-project-techstack]');
    const difficultyEl = document.querySelector('[data-project-difficulty]');
    const galleryEl = document.querySelector('[data-project-gallery]');

    if (!project) {
        titleEl.textContent = 'Проект не найден';
        descEl.textContent = 'Похоже, вы перешли по неверной ссылке.';
        return;
    }

    pageTitleEl1.textContent  = project.shortTitle + ' | Олег Галузинский';
    pageTitleEl2.textContent  = project.shortTitle;
    pageMetaDesc1.textContent = project.shortMetaDescription;
    pageMetaDesc2.textContent = project.shortMetaDescription;
    pageMetaUrl.textContent   = window.location.href;

    titleEl.textContent = project.title;
    categoryEl.textContent = project.category;
    dateEl.textContent = project.date || '—';

    if (project.projectUrl) {
        projectUrlEl.href = project.projectUrl;
    } else {
        projectUrlEl.textContent = '—';
        projectUrlEl.removeAttribute('href');
    }

    if (project.githubUrl) {
        githubUrlEl.href = project.githubUrl;
    } else {
        githubUrlEl.textContent = '—';
        githubUrlEl.removeAttribute('href');
    }

    descEl.textContent = project.description;
    difficultyEl.textContent = project.difficultyInProjectText;

    // Технологии
    techStackEl.innerHTML = '';
    (project.techStack || []).forEach((tech) => {
        const li = document.createElement('li');
        li.textContent = tech;
        techStackEl.appendChild(li);
    });

    // Галерея
    galleryEl.innerHTML = '';
    (project.images || []).forEach((src) => {
        const slideItem = document.createElement('div');
        slideItem.classList.add('keen-slider__slide');

        const img = document.createElement('img');
        img.src = src;
        img.alt = project.title;
        slideItem.appendChild(img);

        const imgLink = document.createElement('a');
        imgLink.href = src;

        galleryEl.appendChild(slideItem);

        renderPortfolioNav(project.id);
    });
}

function renderPortfolioNav(currentId) {
    const navElement = document.querySelector('[data-projects-nav]');
    if (!navElement) return;

    const index = projectData.findIndex(item => item.id === currentId);
    const prev = projectData[index - 1];
    const next = projectData[index + 1];

    let html = '';

    if (prev) {
        html += `
            <a class="nav__btn prev" href="project-details.html?id=${prev.id}">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
                 Предыдущий
            </a>`;
    }
    if (next) {
        html += `
            <a class="nav__btn next" href="project-details.html?id=${next.id}">
                Следующий
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
            </a>`;
    }

    navElement.innerHTML = html;
}

(function init() {
    const projectId = getProjectIdFromQuery();

    if (!projectId) {
        renderProject(null);
        return;
    }

    const project = projectData.find((item) => item.id === projectId);
    renderProject(project || null);
})();