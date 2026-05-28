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
                if (typeof window.renderCourseCardsComponent === 'function') {
                    window.renderCourseCardsComponent(filteredCourses);
                } else {
                    renderCourseCards(filteredCourses);
                }
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

        const filtered = getFilteredApiCourses();
        if (typeof window.renderCourseCardsComponent === 'function') {
            window.renderCourseCardsComponent(filtered);
        } else {
            renderCourseCards(filtered);
        }

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
        let cardEl;
        if (typeof window.createCourseCard === 'function') {
            cardEl = window.createCourseCard(course);
        } else {
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
            cardEl = card;
        }
        courseContainer.appendChild(cardEl);
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

            if (typeof window.renderCourseCardsComponent === 'function') {
                window.renderCourseCardsComponent(filteredCourses);
            } else {
                renderCourseCards(filteredCourses);
            }
        });
    });
}

