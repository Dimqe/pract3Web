(function(){
    function renderCourseCardsComponent(courses){
        const courseContainer = document.getElementById('courseContainer');
        const paginationContainer = document.getElementById('paginationContainer');
        if (!courseContainer) return;

        courseContainer.innerHTML = '';
        if (paginationContainer) paginationContainer.innerHTML = '';

        if (!courses || courses.length === 0) {
            courseContainer.innerHTML = '<p class="no-data">Курсів не знайдено</p>';
            return;
        }

        const currentPage = (typeof getApiCurrentPage === 'function') ? getApiCurrentPage() : 1;
        const perPage = (typeof getCoursesPerPage === 'function') ? getCoursesPerPage() : 6;
        const totalPages = Math.ceil(courses.length / perPage);
        const startIndex = (currentPage - 1) * perPage;
        const pageCourses = courses.slice(startIndex, startIndex + perPage);

        pageCourses.forEach(course => {
            let cardEl;
            if (typeof window.createCourseCard === 'function') {
                cardEl = window.createCourseCard(course);
            } else {
                cardEl = document.createElement('article');
                cardEl.className = 'course-card';
                cardEl.textContent = course.title || 'Курс';
            }
            courseContainer.appendChild(cardEl);
        });

        if (paginationContainer && typeof renderPaginationControls === 'function') {
            renderPaginationControls(totalPages, currentPage);
        }
    }

    window.renderCourseCardsComponent = renderCourseCardsComponent;
})();
