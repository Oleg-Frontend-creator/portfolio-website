export const portfolioData = [
    {
        id: 'plants-angular-shop',
        title: 'Интернет-магазин растений',
        shortTitle: 'Home Decor',
        shortMetaDescription: 'Полноценный интернет-магазин на Angular с корзиной, избранным, фильтрами и личным кабинетом.',
        category: 'SPA on Angular',
        date: 'ноябрь 2025 г.',
        projectUrl: 'https://frontend-12sk.onrender.com',
        githubUrl: 'https://github.com/Oleg-Frontend-creator/plans-shop',
        images: [
            './assets/img/portfolio-carousels/plants-store/1.webp',
            './assets/img/portfolio-carousels/plants-store/2.webp',
            './assets/img/portfolio-carousels/plants-store/3.webp'
        ],
        description: `
        Полнофункциональный интернет-магазин растений, разработанный как современное 
        высокопроизводительное SPA-приложение. Проект включает динамический каталог с 
        многоуровневыми фильтрами, корзину, избранное, оформление заказов и личный кабинет 
        пользователя. Особое внимание уделено удобству работы с продуктами: благодаря 
        гибким фильтрам и мгновенной подгрузке данных пользователь может быстро находить 
        нужные товары, сравнивать их и формировать заказ без перезагрузки страницы.
        Frontend реализован на Angular 14 с модульной архитектурой и lazy loading.
        Backend — Node.js + Express + MongoDB (Mongo Atlas), деплой выполнен на Render.
  `.trim(),
        techStack: [
            'Angular 14',
            'TypeScript',
            'RxJS',
            'Angular Router (lazy loading)',
            'Route Guards / Auth Guard / Forward Guard',
            'HTTP Interceptor',
            'Reactive Forms',
            'SCSS / BEM',
            'REST API',
            'Node.js + Express',
            'MongoDB (Mongo Atlas)',
            'JWT Authentication',
            'Render Deployment'
        ],
        difficultyInProjectText: `
Самым сложным этапом стала реализация многоуровневой фильтрации каталога, которая
работает одновременно по нескольким параметрам и корректно обновляет состояние
в зависимости от query-параметров.  
Дополнительно пришлось проработать многоуровневую архитектуру роутинга с lazy loading
и guard-ами, а также реализовать перехват запросов через Interceptor для автоматического
добавления токена и обработки ошибок.  
Отдельной задачей было создание LOADER-системы: сервис плюс компонент, которые
глобально реагируют на любые API-запросы и управляют отображением состояния загрузки.
  `.trim()
    },
    {
        id: 'digital-agency-blog',
        title: 'Digital-агентство с блог-платформой',
        shortTitle: 'АйтиШторм',
        shortMetaDescription: 'Корпоративный сайт с динамическим блогом, фильтрацией статей и системой комментариев',
        category: 'SPA on Angular',
        date: 'декабрь 2025 г.',
        projectUrl: 'https://frontend-v0k7.onrender.com',
        githubUrl: 'https://github.com/Oleg-Frontend-creator/web-studio',
        images: [
            './assets/img/portfolio-carousels/digital-agency/1.webp',
            './assets/img/portfolio-carousels/digital-agency/2.webp',
            './assets/img/portfolio-carousels/digital-agency/3.webp',
            './assets/img/portfolio-carousels/digital-agency/4.webp'
        ],
        description: `
            Корпоративный сайт digital-агентства, включающий главную страницу с 
            фрагментами «Услуги», «О компании», «Отзывы», «Команда», «Контакты», 
            а также полноценную блог-платформу.  
            Реализована авторизация пользователей, комментирование статей, система 
            реакций, сохранение заявок на услуги и гибкая фильтрация публикаций.  
            Весь контент и пользовательская активность сохраняются в MongoDB.  
            Проект построен с модульной архитектурой, использует Angular 14, lazy loading
            и оптимизированные API-запросы.
        `,
        techStack: [
            'Angular 14',
            'TypeScript',
            'RxJS',
            'Angular Router (Lazy Loading)',
            'Route Guards (Auth Guard, Forward Guard)',
            'HTTP Interceptor',
            'Reactive Forms',
            'SCSS / BEM',
            'REST API',
            'Node.js + Express',
            'MongoDB (Mongo Atlas)',
            'JWT Authentication',
            'Render Deployment'
        ],
        difficultyInProjectText: `
          Главная сложность — реализация функционального блога: фильтрация статей по 
          категориям, пагинация, загрузка данных по API и корректное обновление 
          состояния при переходах по маршрутам.  
          Отдельной задачей стало создание системы комментариев: только 
          авторизованные пользователи могут оставлять комментарии и реакции, 
          все данные валидации и сохранения проходят через backend.  
          Также был реализован механизм сохранения заявок из двух форм на главной 
          странице, что потребовало продумать структуру API и ревью бизнес-логики.  
          Проект построен на модульной архитектуре и lazy loading, что потребовало 
          грамотной организации роутинга и сервисов.`
    },
    {
        id: 'lumincoin-finance',
        title: 'LuminCoin Finance — приложение для учёта финансов',
        shortTitle: 'LuminCoin Finance',
        shortMetaDescription: 'SPA на TypeScript для учёта доходов и расходов с дашбордами и аналитикой.',
        category: 'SPA on JavaScript',
        date: 'март 2025 г.',
        projectUrl: 'https://lumin-coin-finance.onrender.com',
        githubUrl: 'https://github.com/Oleg-Frontend-creator/LuminCoin',
        images: [
            './assets/img/portfolio-carousels/lumin-coin/1.webp',
            './assets/img/portfolio-carousels/lumin-coin/2.webp',
            './assets/img/portfolio-carousels/lumin-coin/3.webp',
            './assets/img/portfolio-carousels/lumin-coin/4.webp',
        ],
        description: `LuminCoin Finance — одностраничное приложение для учёта личных финансов. 
        Пользователь регистрируется, авторизуется и ведёт свои доходы и расходы в удобном интерфейсе: 
        добавляет операции, распределяет их по категориям, отслеживает текущий баланс и анализирует 
        структуру трат на наглядных диаграммах. Главный экран — это дашборд с круговыми диаграммами 
        по доходам и расходам, а также фильтрами по периодам, что позволяет быстро увидеть, куда 
        уходят деньги. В разделе “Доходы и расходы” доступны таблица всех операций, создание и 
        редактирование записей, а отдельный модуль категорий помогает настроить структуру бюджета 
        под конкретные задачи пользователя или малого бизнеса.`,
        techStack: [
            'TypeScript',
            'Custom SPA architecture',
            'Custom Router',
            'REST API',
            'Node.js backend with JSON storage',
            'Token-based authentication',
            'Form validation',
            'CSS / BEM',
            'Modular components & utilities',
            'Charts & data visualisation'
        ],
        difficultyInProjectText: 'Самым сложным этапом стала реализация приложения без использования ' +
            'фреймворков: пришлось спроектировать собственную SPA-архитектуру и роутер, ' +
            'типизировать все сущности и ответы от сервера, а также продумать единый HTTP-слой для работы ' +
            'с API. Дополнительно сложность добавила бизнес-логика: фильтрация операций по периодам, ' +
            'пересчёт агрегированных значений для диаграмм и синхронизация их состояния с таблицей ' +
            'транзакций. Отдельным вызовом стала серверная часть на Node.js с хранением данных в ' +
            'JSON-файлах, обработкой ошибок и валидацией данных при авторизации и работе с операциями.'
    },
    {
        id: 'freelance-studio',
        title: 'Freelance Studio — админ-панель для управления заказами и фрилансерами',
        shortTitle: 'Freelance Studio',
        shortMetaDescription: 'SPA на JavaScript для работы с заказами и фрилансерами',
        category: 'SPA on JavaScript',
        date: 'февраль 2025 г.',
        projectUrl: 'https://freelance-studio-frontend.onrender.com',
        githubUrl: 'https://github.com/Oleg-Frontend-creator/FreelanceStudio',

        images: [
            './assets/img/portfolio-carousels/freelance-studio/1.webp',
            './assets/img/portfolio-carousels/freelance-studio/2.webp',
            './assets/img/portfolio-carousels/freelance-studio/3.webp',
            './assets/img/portfolio-carousels/freelance-studio/4.webp',
            './assets/img/portfolio-carousels/freelance-studio/5.webp'
        ],

        description: `
        Freelance Studio — одностраничная админ-панель для руководителей команд фрилансеров. 
        Приложение позволяет авторизованному пользователю управлять заказами, вести учёт фрилансеров, 
        просматривать календарь задач, создавать и редактировать карточки заказов и исполнителей. 
        Фронтенд реализован на чистом JavaScript в архитектуре SPA c роутингом и динамической подгрузкой 
        шаблонов. Интерфейс построен на базе AdminLTE и адаптирован под удобную работу в браузере. 
        Бэкенд на Node.js использует файловое хранилище JSON для CRUD-операций и сохраняет состояние приложения.`,

        techStack: [
            'JavaScript (ES6+)',
            'SPA Routing',
            'AdminLTE UI Framework',
            'SCSS',
            'REST API',
            'Node.js',
            'Express',
            'JSON Storage Backend',
            'Templating via HTML partials',
            'Form validation & input sanitizing'
        ],

        difficultyInProjectText: `
        Самым сложным этапом стала реализация полноценного SPA без фреймворков: пришлось разработать 
        собственный роутинг, механизм подгрузки страниц и обновления состояния без перезагрузки. 
        Дополнительную сложность создала архитектура CRUD-операций: управление заказами и фрилансерами 
        требовало точной синхронизации данных и корректного формирования JSON-ответов. Отдельным вызовом 
        стала серверная часть с файловым хранилищем: обработка ошибок, валидация данных, обновление записей 
        и предотвращение конфликтов при одновременных операциях.`
    },
    {
        id: 'itlogia-quiz',
        title: 'АйтилогияQuiz — сайт-квиз для проверки знаний JavaScript',
        shortTitle: 'АйтилогияQuiz',
        shortMetaDescription: 'Многостраничный JS-квиз с прогресс-баром, таймером и экраном результатов',
        category: 'Landing / JavaScript app',
        date: 'июль 2025 г.',
        projectUrl: 'https://oleg-frontend-creator.github.io/Itlogia-quiz/',
        githubUrl: 'https://github.com/Oleg-Frontend-creator/Itlogia-quiz',

        images: [
            './assets/img/portfolio-carousels/quiz-itlogia/1.webp',
            './assets/img/portfolio-carousels/quiz-itlogia/2.webp',
            './assets/img/portfolio-carousels/quiz-itlogia/3.webp'
        ],

        description: `
ItlogiaQuiz — многостраничный сайт-квиз для проверки знаний JavaScript. 
Пользователь выбирает тему теста, заполняет регистрационную форму и переходит 
к вопросам. Каждый вопрос отображается на отдельном экране с прогресс-баром, 
таймером и управлением навигацией: «Далее», «Пропустить вопрос», «Завершить тест».

После прохождения теста приложение показывает итоговый результат, 
а также отдельную страницу с правильными ответами для саморазбора. 
Все данные — список тестов, вопросы, варианты и правильные ответы — 
хранятся в JSON-файлах и подгружаются на клиенте с помощью JavaScript, 
поэтому новые тесты можно добавлять без изменений в вёрстке.`,

        techStack: [
            'HTML5 / семантическая разметка',
            'CSS3',
            'JavaScript (ES6+)',
            'Работа с JSON на клиенте',
            'Многостраничная архитектура',
            'Custom progress bar',
            'Таймер для прохождения теста',
            'Модульная структура скриптов'
        ],

        difficultyInProjectText: `
Самым сложным этапом стала организация логики тестирования целиком на фронтенде. 
Необходимо было связать между собой несколько страниц (welcome, выбор теста, 
вопросы, результаты, ответы), при этом корректно передавать состояние — 
текущий вопрос, выбранные варианты, оставшееся время и итоговый результат.

Отдельным вызовом стала разработка структуры JSON-файлов: нужно было так 
описать вопросы, варианты и правильные ответы, чтобы скрипты могли универсально 
обрабатывать любые тесты без переписывания кода. Также пришлось аккуратно 
проработать логику таймера и прогресс-бара, чтобы интерфейс оставался 
интуитивным и не «ломался» при быстрых кликах пользователя.`
    },
    {
        id: 'sushi-landing',
        title: 'SushiBu — лендинг доставки суши',
        shortTitle: 'SushiBu',
        shortMetaDescription: 'Адаптивный лендинг службы доставки суши',
        category: 'Landing page',
        date: 'октябрь 2025 г.',
        projectUrl: 'https://oleg-frontend-creator.github.io/Sushi-small-lending/',
        githubUrl: 'https://github.com/Oleg-Frontend-creator/Sushi-small-lending',
        images: [
            './assets/img/portfolio-carousels/sushi-landing/1.webp',
            './assets/img/portfolio-carousels/sushi-landing/2.webp',
            './assets/img/portfolio-carousels/sushi-landing/3.webp',
            './assets/img/portfolio-carousels/sushi-landing/4.webp',
            './assets/img/portfolio-carousels/sushi-landing/5.webp'
        ],
        description:
            'Одностраничный лендинг службы доставки суши с тёмной атмосферной визуализацией и акцентом на вкусные ховеры и анимации. ' +
            'Страница адаптирована под десктоп, планшеты и мобильные устройства, использует гибкую сетку и переработанные блоки для разных разрешений. ' +
            'Навигация реализована через бургер-меню с плавной прокруткой к ключевым секциям: преимущества сервиса, меню и форма оформления заказа.',

        techStack: [
            'HTML5',
            'CSS3 / SCSS',
            'Flexbox / CSS Grid',
            'Адаптивная верстка',
            'JavaScript (бургер-меню, анимации, ховеры)',
            'Webpack'
        ],

        difficultyInProjectText:
            'Основной сложностью стала pixel-perfect верстка насыщенного тёмного макета с большим количеством фото и декоративных элементов. ' +
            'Нужно было сохранить читаемость текста и контраст на всех разрешениях, аккуратно проработать состояния наведения и анимации. ' +
            'Отдельный вызов — адаптация сложных блоков (меню, преимущества, форма заказа) под мобильные экраны так, чтобы верстка не разваливалась, ' +
            'а структура оставалась интуитивной для пользователя.',
    },
    {
        id: 'cappadocia-tour',
        title: 'Cappadocia Tour — адаптивный лендинг туристической программы',
        shortTitle: 'Cappadocia Tour',
        shortMetaDescription: 'Адаптивный лендинг с кастомными каруселями и яркой визуальной частью',
        category: 'Landing Page',
        date: 'март 2025 г.',
        projectUrl: 'https://oleg-frontend-creator.github.io/Cappadocia-tour/',
        githubUrl: 'https://github.com/Oleg-Frontend-creator/Cappadocia-tour',
        images: [
            './assets/img/portfolio-carousels/cappadocia-landing/1.webp',
            './assets/img/portfolio-carousels/cappadocia-landing/2.webp',
            './assets/img/portfolio-carousels/cappadocia-landing/3.webp',
            './assets/img/portfolio-carousels/cappadocia-landing/4.webp',
            './assets/img/portfolio-carousels/cappadocia-landing/5.webp'
        ],
        description: `
    Cappadocia Tour — это эмоциональный промо-лендинг для туристической программы, 
    в котором акцент сделан на визуальной подаче и комфортной адаптивности. 
    Основные секции перестраиваются под любое устройство, а графика, включая воздушные шары, 
    сохраняет композицию и динамику даже на маленьких экранах. 
    В проекте реализованы интерактивные формы и кастомные карусели, созданные вручную 
    без использования сторонних библиотек. Лендинг передаёт атмосферу путешествия 
    и служит удобным инструментом для продвижения туров.`,
        techStack: [
            'HTML5',
            'CSS3',
            'JavaScript',
            'Кастомные JS-карусели',
            'Адаптивная верстка'
        ],
        difficultyInProjectText: `
    Наиболее сложной частью стала работа с крупными графическими элементами и их поведением 
    в адаптиве: воздушные шары требовали точной настройки, чтобы не выходить за пределы макета. 
    Дополнительным вызовом стало создание собственных каруселей с нуля, 
    включая логику перелистывания и эффекты на разных устройствах. 
    Также требовалась аккуратная работа с большим количеством секций, 
    чтобы лендинг оставался цельным и удобным на любом экране.`
    }
]