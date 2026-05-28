(function(){
    function createCourseCard(course){
        const card = document.createElement('article');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-header">
                <span class="course-category">${course.categoryIcon || ''} ${course.category || ''}</span>
                <span class="course-rating"> ${course.rating || ''}</span>
            </div>
            <div class="course-body">
                <h3>${course.title || ''}</h3>
                <p class="course-description">${course.description || ''}</p>
                <div class="course-meta">
                    <span class="course-level"> ${course.level || ''}</span>
                    <span class="course-students"> ${course.students || 0} студентів</span>
                </div>
                <div class="course-footer">
                    <p class="course-price">${course.price || ''}</p>
                    <button class="btn-secondary">Детальніше</button>
                </div>
            </div>
        `;
        return card;
    }

    window.createCourseCard = createCourseCard;
})();
