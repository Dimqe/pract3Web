const routes = {
    home: {
        path: '/',
        title: 'ОсвітаPro - Головна',
        render: renderHomePage
    },
    about: {
        path: '#/about',
        title: 'ОсвітаPro - Про нас',
        render: renderAboutPage
    },
    contact: {
        path: '#/contact',
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

        const paginationButton = e.target.closest('.pagination-btn');
        if (paginationButton) {
            e.preventDefault();
            const page = parseInt(paginationButton.dataset.page, 10);
            const filteredCourses = getFilteredApiCourses();
            const totalPages = Math.ceil(filteredCourses.length / getCoursesPerPage());

            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                setApiCurrentPage(page);
                renderCourseCards(filteredCourses);
                window.scrollTo({ top: document.getElementById('courseContainer').offsetTop - 20, behavior: 'smooth' });
            }
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
                <h3>Node.js для бекенду</h3>
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
                <h1>Опануй нову професію з нуля </h1>
                <p>Вивчайте IT з найкращими курсами. Практика, проекти та реальні навички від індустріальних експертів.</p>
                <button class="btn-primary" id="mainCTA">Обрати курс</button>
            </div>
            <div class="hero-image">
                <div class="placeholder-img"></div>
            </div>
        </section>

        <section class="courses container">
            <h2> Наші IT Курси</h2>
            
            <!-- Фільтр по категоріям -->
            <div class="category-filter">
                <button class="category-btn active" data-category="Frontend"> Frontend</button>
                <button class="category-btn" data-category="Backend"> Backend</button>
                <button class="category-btn" data-category="Design"> Design</button>
            </div>

            <!-- Спінер завантаження -->
            <div id="loadingState" class="loading-state">
                <div class="spinner"></div>
                <p>Завантажуємо курси...</p>
            </div>

            <!-- Помилка -->
            <div id="errorState" class="error-state" style="display: none;"></div>

            <!-- Сітка курсів -->
            <div id="courseContainer" class="course-grid"></div>
            <div id="paginationContainer" class="pagination"></div>
        </section>
    `;

    loadAndRenderCourses();
}

async function loadAndRenderCourses() {
    try {
        setApiLoading(true);
        setApiError(null);

        const courses = await window.apiModule.fetchCourses();

        setApiCourses(courses);
        setApiLoading(false);
        setApiCurrentPage(1);

        const loadingState = document.getElementById('loadingState');
        if (loadingState) {
            loadingState.style.display = 'none';
        }

        renderCourseCards(getFilteredApiCourses());

        setupCategoryFilters(courses);

    } catch (error) {
        setApiLoading(false);
        const errorMessage = error.message || 'Не вдалось завантажити курси. Спробуйте ще раз.';
        setApiError(errorMessage);

        const errorState = document.getElementById('errorState');
        if (errorState) {
            errorState.style.display = 'block';
            errorState.innerHTML = `
                <div class="error-container">
                    <h3> Помилка завантаження</h3>
                    <p>${errorMessage}</p>
                    <button class="btn-primary" onclick="loadAndRenderCourses()">Спробувати ще раз</button>
                </div>
            `;
        }

        const loadingState = document.getElementById('loadingState');
        if (loadingState) {
            loadingState.style.display = 'none';
        }

        console.error('Error loading courses:', error);
    }
}

function renderCourseCards(courses) {
    const courseContainer = document.getElementById('courseContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    
    if (!courseContainer) return;

    courseContainer.innerHTML = '';
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
    }

    if (!courses || courses.length === 0) {
        courseContainer.innerHTML = '<p class="no-data">Курсів не знайдено</p>';
        return;
    }

    const currentPage = getApiCurrentPage();
    const perPage = getCoursesPerPage();
    const totalPages = Math.ceil(courses.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const pageCourses = courses.slice(startIndex, startIndex + perPage);

    pageCourses.forEach(course => {
        const card = document.createElement('article');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-header">
                <span class="course-category">${course.categoryIcon} ${course.category}</span>
                <span class="course-rating"> ${course.rating}</span>
            </div>
            <div class="course-body">
                <h3>${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-level"> ${course.level}</span>
                    <span class="course-students"> ${course.students} студентів</span>
                </div>
                <div class="course-footer">
                    <p class="course-price">${course.price}</p>
                    <button class="btn-secondary">Детальніше</button>
                </div>
            </div>
        `;
        courseContainer.appendChild(card);
    });

    if (paginationContainer) {
        renderPaginationControls(totalPages, currentPage);
    }
}

function renderPaginationControls(totalPages, currentPage) {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let html = '';
    html += `<button class="pagination-btn" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''}>Попередня</button>`;

    for (let page = 1; page <= totalPages; page += 1) {
        html += `<button class="pagination-btn ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
    }

    html += `<button class="pagination-btn" data-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''}>Наступна</button>`;
    paginationContainer.innerHTML = html;
}

function getFilteredApiCourses() {
    const allCourses = getApiCourses();
    const selectedCategory = getSelectedCategory();

    if (!allCourses || allCourses.length === 0) {
        return [];
    }

    if (!selectedCategory) {
        return allCourses;
    }

    return allCourses.filter(course => course.category === selectedCategory);
}

function setupCategoryFilters(allCourses) {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const courseContainer = document.getElementById('courseContainer');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.dataset.category;
            setSelectedCategory(selectedCategory);
            setApiCurrentPage(1);

            const filteredCourses = allCourses.filter(course => 
                course.category === selectedCategory
            );

            renderCourseCards(filteredCourses);
        });
    });
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