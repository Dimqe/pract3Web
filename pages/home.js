(function(){
    function renderHomePage(){
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
                <div class="category-filter">
                    <button class="category-btn active" data-category="Frontend"> Frontend</button>
                    <button class="category-btn" data-category="Backend"> Backend</button>
                    <button class="category-btn" data-category="Design"> Design</button>
                </div>

                <div id="loadingState" class="loading-state">
                    <div class="spinner"></div>
                    <p>Завантажуємо курси...</p>
                </div>

                <div id="errorState" class="error-state" style="display: none;"></div>

                <div id="courseContainer" class="course-grid"></div>
                <div id="paginationContainer" class="pagination"></div>
            </section>
        `;

        if (typeof loadAndRenderCourses === 'function') {
            loadAndRenderCourses();
        }
    }

    window.renderHomePage = renderHomePage;
})();
