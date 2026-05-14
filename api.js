
window.apiModule = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    
    isLoading: false,
    hasError: false,
    errorMessage: '',

    categories: [
        { id: 1, name: 'Frontend', icon: '' },
        { id: 2, name: 'Backend', icon: '' },
        { id: 3, name: 'Design', icon: '' }
    ],

    async fetchCourses() {
        try {
            this.isLoading = true;
            this.hasError = false;
            this.errorMessage = '';

            const response = await fetch(`${this.baseURL}/posts?_limit=12`);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            const posts = await response.json();

            if (!posts || posts.length === 0) {
                throw new Error('Немає доступних курсів');
            }

            const courses = posts.map((post, index) => {
                const categoryIndex = index % 3; 
                const category = this.categories[categoryIndex];
                
                return {
                    id: post.id,
                    title: this.generateCourseTitle(categoryIndex),
                    description: this.generateCourseDescription(categoryIndex),
                    category: category.name,
                    categoryIcon: category.icon,
                    price: (1000 + (post.id * 500)).toLocaleString('uk-UA') + ' ₴',
                    level: ['Початковий', 'Середній', 'Просунутий'][index % 3],
                    students: Math.floor(Math.random() * 500) + 50,
                    rating: (Math.random() * 2 + 3.5).toFixed(1)
                };
            });

            this.isLoading = false;
            return courses;

        } catch (error) {
            this.isLoading = false;
            this.hasError = true;
            this.errorMessage = `Помилка при завантаженні курсів: ${error.message}`;
            console.error('API Error:', error);
            throw error;
        }
    },

    generateCourseTitle(categoryIndex) {
        const titles = [
            [
                'Основи HTML та CSS',
                'JavaScript з нуля',
                'React для веб-проєктів',
                'Vue.js: швидкий старт',
                'TypeScript для веб-розробки',
                'Веб-компоненти на практиці'
            ],
            [
                'Node.js для бекенду',
                'Python Django з прикладами',
                'Express API за 30 днів',
                'MongoDB: бази даних у практиці',
                'PostgreSQL для розробників',
                'Docker для DevOps'
            ],
            [
                'UI/UX дизайн інтерфейсів',
                'Figma: дизайн макетів',
                'Adobe XD для початківців',
                'Веб-дизайн та прототипування',
                'UX Research: від гіпотези до результату',
                'Дизайн мобільних додатків'
            ]
        ];
        
        const randomIndex = Math.floor(Math.random() * titles[categoryIndex].length);
        return titles[categoryIndex][randomIndex];
    },

    generateCourseDescription(categoryIndex) {
        const descriptions = [
            [
                'Вивчіть основи верстки та стилізації веб-сторінок.',
                'Закладемо фундамент для створення адаптивних сайтів.',
                'Розробляйте сучасні інтерфейси з HTML та CSS.',
                'Практика верстки реальних проєктів.',
                'Адаптивний дизайн для всіх пристроїв.',
                'Семантична верстка та доступність'
            ],
            [
                'Створюйте серверні додатки на Node.js.',
                'Навчіться будувати API та працювати з базою даних.',
                'Прокачайте бекенд-навички з Python і Express.',
                'Архітектура мікросервісів на практиці.',
                'Оптимізація баз даних для великих об\'ємів даних.',
                'RESTful API: від теорії до production'
            ],
            [
                'Проєктуйте зручні інтерфейси та досвід користувача.',
                'Створюйте дизайн-макети в Figma та Adobe XD.',
                'Опануйте UI/UX підхід для web-продуктів.',
                'Дизайн-системи для масштабованих проєктів.',
                'Юзабіліті-тестування та аналітика.',
                'Від ідеї до готового мобільного додатку'
            ]
        ];

        const randomIndex = Math.floor(Math.random() * descriptions[categoryIndex].length);
        return descriptions[categoryIndex][randomIndex];
    },

 
    async getCoursesByCategory(category) {
        try {
            const allCourses = await this.fetchCourses();
            return allCourses.filter(course => course.category === category);
        } catch (error) {
            console.error('Error filtering courses:', error);
            throw error;
        }
    },


    getLoadingState() {
        return {
            isLoading: this.isLoading,
            hasError: this.hasError,
            errorMessage: this.errorMessage
        };
    },

    clearError() {
        this.hasError = false;
        this.errorMessage = '';
    }
};
