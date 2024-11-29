document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('open-form');
    const closeModalButton = document.getElementById('close-form');
    const feedbackForm = document.getElementById('feedback-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    
    const restoreFormData = () => {
        document.getElementById('name').value = localStorage.getItem('name') || '';
        document.getElementById('email').value = localStorage.getItem('email') || '';
        document.getElementById('phone').value = localStorage.getItem('phone') || '';
        document.getElementById('organization').value = localStorage.getItem('organization') || '';
        document.getElementById('message').value = localStorage.getItem('message') || '';
        document.getElementById('checkb').checked = localStorage.getItem('checkb') === 'true';
    };

    restoreFormData();
    const saveFormData = () => {
        const fields = ['name', 'email', 'phone', 'organization', 'message', 'checkb'];
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                if (field === 'checkb') {
                    localStorage.setItem(field, element.checked);
                } else {
                    localStorage.setItem(field, element.value);
                }
            }
        });
    };

    const formElements = feedbackForm.querySelectorAll('input, textarea');
    formElements.forEach(element => {
        element.addEventListener('input', saveFormData);
    });

    // Открытие попапа
    openModalButton.addEventListener('click', () => {
        modal.classList.add('active');
        history.pushState(null, '', '#feedback');
    });

    // Закрытие попапа
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('popstate', closeModal);

    function closeModal() {
        modal.classList.remove('active');
        history.replaceState(null, '', window.location.pathname); 
    }
    
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();   // предотвращает перезагрузку страницы

        const Data = new FormData(feedbackForm);
        fetch('https://formcarry.com/s/9UriMZ1iDzx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(Data.entries()))
        })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                // Очистка данных
                feedbackForm.reset();
                localStorage.clear();
            } else {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        })
        .catch(error => {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            console.error('Ошибка:', error);
        }); 

    });
});