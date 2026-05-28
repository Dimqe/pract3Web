(function(){
    function renderContactPage(){
        const formData = (typeof getFormData === 'function') ? getFormData() : {};
        const formSubmitted = (typeof getState === 'function') ? getState().formSubmitted : false;

        const main = document.querySelector('main');
        main.innerHTML = `
            <section class="hero container">
                <div class="hero-content">
                    <h1>Зв'язатися з нами</h1>
                    <p>Маєте питання? Напишіть нам, і ми обов'язково відповімо!</p>
                </div>
            </section>

            <section class="contact container">
                <form id="feedbackForm" class="feedback-form" novalidate>
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Ваше ім'я" value="${formData.name || ''}">
                        <span class="error-text" id="nameError"></span>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Email" value="${formData.email || ''}">
                        <span class="error-text" id="emailError"></span>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" placeholder="Ваше повідомлення">${formData.message || ''}</textarea>
                        <span class="error-text" id="messageError"></span>
                    </div>
                    <button type="submit" class="btn-primary">Надіслати</button>
                </form>
                <div id="successMessage" class="hidden-msg ${formSubmitted ? 'show-msg' : ''}">повідомлення успішно надіслано</div>
            </section>
        `;

        setTimeout(() => {
            if (typeof window.setupFormHandlers === 'function') {
                window.setupFormHandlers();
            }
        }, 0);
    }

    window.renderContactPage = renderContactPage;
})();
