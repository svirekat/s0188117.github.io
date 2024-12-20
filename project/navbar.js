document.addEventListener('DOMContentLoaded', () => {
    const adminButton = document.querySelector('.dropbtn1'); // Кнопка "АДМИНИСТРИРОВАНИЕ"
    const aboutButton = document.querySelector('.dropdown_list > .dropbtn'); // Кнопка "О НАС"
    const adminDropdown = document.querySelector('.dropdown_list1'); // Список для "АДМИНИСТРИРОВАНИЕ"
    const aboutDropdown = document.querySelector('.dropdown_list2'); // Список для "О НАС"

    // Скрыть дропдауны по умолчанию
    adminDropdown.style.display = 'none';
    aboutDropdown.style.display = 'none';

    // Обработчик события для кнопки "АДМИНИСТРИРОВАНИЕ"
    adminButton.addEventListener('click', () => {
        // Переключить видимость списка
        adminDropdown.style.display = adminDropdown.style.display === 'block' ? 'none' : 'block';
        aboutDropdown.style.display = 'none'; // Скрыть другой дропдаун
    });

    // Обработчик события для кнопки "О НАС"
    aboutButton.addEventListener('click', () => {
        // Переключить видимость списка
        aboutDropdown.style.display = aboutDropdown.style.display === 'block' ? 'none' : 'block';
        adminDropdown.style.display = 'none'; // Скрыть другой дропдаун
    });

    const hamburger = document.querySelector('.hamburger');
    const dropdown = document.querySelector('.dropdown');
    
    hamburger.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });
})
