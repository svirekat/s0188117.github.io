document.addEventListener("DOMContentLoaded", () => {
    const quantityInput = document.getElementById("quantity");
    const productSelect = document.getElementById("product");
    const serviceTypeRadios = document.querySelectorAll('input[name="servicetype"]');
    const productOptions = document.getElementById("productOptions");
    const diameterSelect = document.getElementById("diameter");
    const lentaCheckbox = document.getElementById("lenta");
    const costElement = document.getElementById("cost");
    const errorElement = document.getElementById("error");

    const productData = {
        1: {
            price: 550,
            options: [],
            showLenta: false
        },
        2: {
            price: 500,
            options: ['15 см', '20 см', '25 см'],
            showLenta: false
        },
        3: {
            price: 620,
            options: [],
            showLenta: true 
        },
        4: {
            price: 490,
            options: ['15 см', '20 см', '25 см'],
            showLenta: true 
        }
    };
    const diameterKoef = {
        '15 см': 1, 
        '20 см': 1.5,
        '25 см': 2.5 
    };
    function calculatePrice() {
        const quantity = parseInt(quantityInput.value);   //кол-во тортов
        const productNumber = parseInt(productSelect.value);   //номер торта
        //значение выбранной услуги:
        const servicePrice = parseInt(document.querySelector('input[name="servicetype"]:checked').value);
        //строка-значение выбранной опции:
        const selectedOption = diameterSelect.value ? diameterSelect.value : null;
        const lentPrice = lentaCheckbox.checked ? 20 : 0;   //если чекбокс выбран, то значение 20

        if (isNaN(quantity) || quantity <= 0 || quantity % 1 !== 0) 
        {
            quantityInput.classList.add("error");
            errorElement.textContent = "Пожалуйста, введите целое положительное число для количества!";
            costElement.textContent = "";
            return;
        } 
        else {
            quantityInput.classList.remove("error");
            errorElement.textContent = "";
        }

        let price = productData[productNumber].price; //цена без доп.параметров
        price *= quantity;
        if (selectedOption) {   //домножаем на коэффициент, зависящий от диаметра
            price *= diameterKoef[selectedOption];
        }
        price += servicePrice;    //+цена доставки
        price += lentPrice;   //+цена ленты
        costElement.textContent = "Стоимость заказа: " + price + " руб.";
    }

    function updateForm(productNumber) {  //функция изменения вывода
        const product = productData[productNumber];
        diameterSelect.innerHTML = '';   
        //добавление опций:
        product.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.text = option;
            diameterSelect.appendChild(optionElement);
        });
        //отобразить/скрыть чекбокс
        if (product.showLenta) {
            lentaCheckbox.parentElement.style.display = 'block';
        } else {
            lentaCheckbox.parentElement.style.display = 'none';
        }

        if (product.options.length > 0) {
            productOptions.style.display = 'block';
        } else {
            productOptions.style.display = 'none';
        }

        calculatePrice();  //вывод обновлённой информации
    }

    // Обработчики событий
    quantityInput.addEventListener("input", calculatePrice);
    productSelect.addEventListener("change", () => updateForm(parseInt(productSelect.value)));
    serviceTypeRadios.forEach(radio => radio.addEventListener("change", calculatePrice));
    diameterSelect.addEventListener("change", calculatePrice);
    lentaCheckbox.addEventListener("change", calculatePrice);

    updateForm(parseInt(productSelect.value));
})