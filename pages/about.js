(function(){
    function renderAboutPage(){
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

    window.renderAboutPage = renderAboutPage;
})();
