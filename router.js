const routes = {
    home: {
        path: '/',
        title: 'ОсвітаPro - Головна',
        render: renderHomePage
    },
    about: {
        path: '/about',
        title: 'ОсвітаPro - Про нас',
        render: renderAboutPage
    },
    contact: {
        path: '/contact',
        title: 'ОсвітаPro - Контакти',
        render: renderContactPage
    }
};

function initRouter() {
    window.addEventListener('popstate', (event) => {
        const page = event.state?.page || 'home';
        renderPage(page, false);
    });

    setupNavigation();

    const currentPath = window.location.pathname;
    
    const initialPage = Object.keys(routes).find(key => routes[key].path === currentPath) || 'home';

    renderPage(initialPage, false);
}

function setupNavigation() {
    document.addEventListener('click', (e) => {
        const navLink = e.target.closest('.nav-link');
        const logoLink = e.target.closest('.logo-link');

        if (navLink || logoLink) {
            e.preventDefault();
            const pageName = navLink ? navLink.dataset.page : 'home';
            navigateTo(pageName);
        }

        if (e.target.id === 'loadMoreBtn') {
            e.preventDefault();
            addNewCourse();
        }
    });
}

function navigateTo(pageName) {
    const route = routes[pageName];
    
    if (!route) {
        console.error(`Route "${pageName}" not found`);
        return;
    }

    window.history.pushState(
        { page: pageName },
        route.title,
        route.path
    );

    renderPage(pageName, true);
}

function renderPage(pageName, updateTitle = true) {
    const route = routes[pageName];
    
    if (!route) {
        console.error(`Route "${pageName}" not found`);
        return;
    }

    if (updateTitle) {
        document.title = route.title;
    }

    updateState('currentPage', pageName);

    route.render();

    window.scrollTo(0, 0);
}

function addNewCourse() {
    const courseContainer = document.getElementById('courseContainer');
    if (courseContainer) {
        const newCard = document.createElement('article');
        newCard.className = 'card';
        newCard.innerHTML = `
            <div class="card-img" style="background-color: #eeeeee;"></div>
            <div class="card-body">
                <h3>Node.js Backend</h3>
                <p class="price">5 800 грн</p>
                <button class="btn-secondary">Детальніше</button>
            </div>
        `;
        courseContainer.appendChild(newCard);
        alert('Додано новий актуальний курс');
    }
}

function renderHomePage() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="hero container">
            <div class="hero-content">
                <h1>Опануй нову професію з нуля</h1>
                <p>Блок з описом переваг платформи. Навчайся у зручний час з найкращими викладачами.</p>
                <button class="btn-primary" id="mainCTA">Обрати курс</button>
            </div>
            <div class="hero-image">
                <div class="placeholder-img"></div>
            </div>
        </section>

        <section class="courses container">
            <h2>Популярні курси</h2>
            <div class="course-grid" id="courseContainer">
                <article class="card">
                    <div class="card-img"></div>
                    <div class="card-body">
                        <h3>UX/UI Дизайн</h3>
                        <p class="price">4 500 грн</p>
                        <button class="btn-secondary">Детальніше</button>
                    </div>
                </article>

                <article class="card">
                    <div class="card-img"></div>
                    <div class="card-body">
                        <h3>Frontend Розробка</h3>
                        <p class="price">5 200 грн</p>
                        <button class="btn-secondary">Детальніше</button>
                    </div>
                </article>

                <article class="card">
                    <div class="card-img"></div>
                    <div class="card-body">
                        <h3>Digital Маркетинг</h3>
                        <p class="price">3 800 грн</p>
                        <button class="btn-secondary">Детальніше</button>
                    </div>
                </article>
            </div>
            <div class="load-more-container">
                <button id="loadMoreBtn" class="btn-secondary">Показати ще</button>
            </div>
        </section>
    `;
}

function renderAboutPage() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="hero container">
            <div class="hero-content">
                <h1>Про ОсвітаPro</h1>
                <p>Ми - провідна освітня платформа, яка допомагає тисячам людей змінити своє життя через якісну освіту.</p>
            </div>
            <div class="hero-image">
                <div class="placeholder-img"></div>
            </div>
        </section>

        <section class="about-section container">
            <h2>Наша місія</h2>
            <p>Зробити якісну освіту доступною для кожного. Ми вірим, що знання - це найбільша інвестиція.</p>
            
            <h2 style="margin-top: 40px;">Чому ми?</h2>
            <div class="features">
                <div class="feature-card">
                    <h3> Досвідчені викладачі</h3>
                    <p>Наші викладачі - це професіонали з реальним досвідом роботи в галузі.</p>
                </div>
                <div class="feature-card">
                    <h3> Практичне навчання</h3>
                    <p>Всі курси побудовані на основі реальних проектів та завдань.</p>
                </div>
                <div class="feature-card">
                    <h3> Швидкі результати</h3>
                    <p>Студенти отримують навички, які потрібні роботодавцям вже сьогодні.</p>
                </div>
            </div>
        </section>
    `;
}

function renderContactPage() {
    const formData = getFormData();
    const formSubmitted = getState().formSubmitted;

    const main = document.querySelector('main');
    main.innerHTML = `
        <section class="hero container">
            <div class="hero-content">
                <h1>Зв'язатися з нами</h1>
                <p>Маєте питання? Напишіть нам, і ми обов'язково відповімо!</p>
            </div>
        </section>

        <section class="contact container">
            <form id="feedbackForm" class="feedback-form" novalidate>
                <div class="form-group">
                    <input type="text" id="name" name="name" placeholder="Ваше ім'я" value="${formData.name || ''}">
                    <span class="error-text" id="nameError"></span>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="Email" value="${formData.email || ''}">
                    <span class="error-text" id="emailError"></span>
                </div>
                <div class="form-group">
                    <textarea id="message" name="message" placeholder="Ваше повідомлення">${formData.message || ''}</textarea>
                    <span class="error-text" id="messageError"></span>
                </div>
                <button type="submit" class="btn-primary">Надіслати</button>
            </form>
            <div id="successMessage" class="hidden-msg ${formSubmitted ? 'show-msg' : ''}">повідомлення успішно надіслано</div>
        </section>
    `;

    setTimeout(() => {
        if (typeof window.setupFormHandlers === 'function') {
            window.setupFormHandlers();
        }
    }, 0);
}