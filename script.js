document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('successMessage');
    const courseContainer = document.getElementById('courseContainer');

    const mainBtn = document.getElementById('loadMoreBtn');
    mainBtn.addEventListener('click', () => {
        const newCard = document.createElement('article');
        newCard.className = 'card';
        newCard.innerHTML = `
            <div class="card-img" style="background-color: #eeeeee;"></div>
            <div class="card-body">
                <h3>Node.js Backend</h3>
                <p class="price">5 800 грн</p>
                <button class="btn-secondary">Детальніше</button>
            </div>
        `;
        courseContainer.appendChild(newCard);
        alert('Додано новий актуальний курс');
    });

    const emailInput = document.getElementById('email');
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

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let isFormValid = true;

        const name = document.getElementById('name');
        const message = document.getElementById('message');

        document.querySelectorAll('.error-text').forEach(span => span.textContent = '');
        [name, emailInput, message].forEach(input => input.classList.remove('error-border'));

        if (name.value.trim().length < 2) {
            document.getElementById('nameError').textContent = 'Ім’я має бути не коротшим за 2 символи';
            name.classList.add('error-border');
            isFormValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            document.getElementById('emailError').textContent = 'Введіть правильний Email';
            emailInput.classList.add('error-border');
            isFormValid = false;
        }

        if (message.value.trim().length < 10) {
            document.getElementById('messageError').textContent = 'Повідомлення має бути мінімум 10 символів';
            message.classList.add('error-border');
            isFormValid = false;
        }

        if (isFormValid) {
           feedbackForm.style.display = 'none';
           successMessage.classList.add('show-msg');
           successMessage.scrollIntoView({ behavior: 'smooth' });
            
            console.log('Дані форми:', {
                name: name.value,
                email: emailInput.value,
                message: message.value
            });
        }
    });
});