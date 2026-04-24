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

function updateState(key, value) {
    state[key] = value;
}

function updateFormData(formValues) {
    state.formData = { ...state.formData, ...formValues };
}

function clearFormData() {
    state.formData = {
        name: '',
        email: '',
        message: ''
    };
    state.formSubmitted = false;

}

function getState() {
    return state;
}

function getFormData() {
    return state.formData;
}