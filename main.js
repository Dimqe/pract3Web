
window.setupFormHandlers = function() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (!feedbackForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (emailInput) {
        emailInput.addEventListener('input', (e) => {
            const email = e.target.value;
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email.length > 0 && !emailRegex.test(email)) {
                emailError.textContent = 'Введіть коректну адресу (напр. aboba@gmail.com)';
                emailInput.classList.add('error-border');
            } else {
                emailError.textContent = '';
                emailInput.classList.remove('error-border');
            }
        });
    }

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let isFormValid = true;

        document.querySelectorAll('.error-text').forEach(span => span.textContent = '');
        [nameInput, emailInput, messageInput].forEach(input => {
            if (input) input.classList.remove('error-border');
        });

        if (!nameInput || nameInput.value.trim().length < 2) {
            if (document.getElementById('nameError')) {
                document.getElementById('nameError').textContent = `Ім'я має бути не коротшим за 2 символи`;
            }
            if (nameInput) nameInput.classList.add('error-border');
            isFormValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailRegex.test(emailInput.value)) {
            if (document.getElementById('emailError')) {
                document.getElementById('emailError').textContent = 'Введіть правильний Email';
            }
            if (emailInput) emailInput.classList.add('error-border');
            isFormValid = false;
        }

        if (!messageInput || messageInput.value.trim().length < 10) {
            if (document.getElementById('messageError')) {
                document.getElementById('messageError').textContent = 'Повідомлення має бути мінімум 10 символів';
            }
            if (messageInput) messageInput.classList.add('error-border');
            isFormValid = false;
        }

        if (isFormValid) {
            updateFormData({
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });

            updateState('formSubmitted', true);

            feedbackForm.style.display = 'none';
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.add('show-msg');
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }

            console.log('Дані форми:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });

            setTimeout(() => {
                clearFormData();
                navigateTo('home');
            }, 3000);
        }
    });
};


window.initApp = function() {
    console.log('Application initialized');
    
    initRouter();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.initApp();
    });
} else {
    window.initApp();
}
