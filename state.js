
window.state = {
    currentPage: 'home',
    formData: {
        name: '',
        email: '',
        message: ''
    },
    courses: [
        { id: 1, title: 'UX/UI Дизайн', price: '4 500 грн' },
        { id: 2, title: 'Frontend Розробка', price: '5 200 грн' },
        { id: 3, title: 'Digital Маркетинг', price: '3 800 грн' }
    ],
    formSubmitted: false
};

/**
 * Оновити стан
 * @param {string} key 
 * @param {*} value 
 */

function updateState(key, value) {
    state[key] = value;
    console.log('стан оновлено:', { key, value });
}

/**
 * Оновити дані форми
 * @param {Object} formValues - об'єкт з даними форми
 */
function updateFormData(formValues) {
    state.formData = { ...state.formData, ...formValues };
    console.log('форму оновлено', state.formData);
}

/**
 * Очистити дані форми
 */
function clearFormData() {
    state.formData = {
        name: '',
        email: '',
        message: ''
    };
    state.formSubmitted = false;
    console.log('ФОРМА ОЧИЩЕНА');
}

/**
 * Отримати поточний стан
 */
function getState() {
    return state;
}

/**
 * Отримати дані форми
 */
function getFormData() {
    return state.formData;
}
