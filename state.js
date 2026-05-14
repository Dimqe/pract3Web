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
    formSubmitted: false,
    apiCourses: [],
    selectedCategory: 'Frontend',
    apiLoading: false,
    apiError: null,
    apiCurrentPage: 1,
    coursesPerPage: 6
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

function setApiCourses(courses) {
    state.apiCourses = courses;
}

function getApiCourses() {
    return state.apiCourses;
}

function setSelectedCategory(category) {
    state.selectedCategory = category;
}

function getSelectedCategory() {
    return state.selectedCategory;
}

function setApiLoading(isLoading) {
    state.apiLoading = isLoading;
}

function setApiError(error) {
    state.apiError = error;
}

function getApiState() {
    return {
        courses: state.apiCourses,
        isLoading: state.apiLoading,
        error: state.apiError
    };
}

function setApiCurrentPage(page) {
    state.apiCurrentPage = page;
}

function getApiCurrentPage() {
    return state.apiCurrentPage;
}

function getCoursesPerPage() {
    return state.coursesPerPage;
}