document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.question');
    const answer = item.querySelector('.answer');

    question.addEventListener('click', () => {
        // Переключаем видимость ответа
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        // Переключаем цвет текста вопроса
        question.style.color = question.style.color === 'orangered' ? 'black' : 'orangered';
        // Переключаем рамку
        item.style.border = item.style.border === '1px solid orangered' ? '1px solid transparent' : '1px solid orangered';
    });
});
