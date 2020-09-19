const items = document.querySelectorAll('.product-box__item');
const filters = document.querySelectorAll('.select-control');
const orderButton = document.querySelector('.btn-check');

function changeCartInfo(event) {
    if (event.target.className !== 'product-box__btn') return;

    let itemAmount = +this.querySelector('.qty__item').value;
    let itemPrice = parseFloat(this.getElementsByTagName('p')[0].innerHTML);
    let [totalAmount, totalPrice] = document.querySelectorAll('.red-info');

    if (totalAmount.innerHTML === 'XXX') {
        totalAmount.innerHTML = itemAmount > 0 ? itemAmount : 0;
    } else {
        totalAmount.innerHTML = itemAmount + +totalAmount.innerHTML;
        totalAmount.innerHTML = totalAmount.innerHTML > 0 ? totalAmount.innerHTML : 0;
    }

    if (totalPrice.innerHTML === 'XXX') {
        totalPrice.innerHTML = itemAmount > 0 ? (itemPrice * itemAmount) : 0;
    } else {
        totalPrice.innerHTML = (itemPrice * itemAmount) + +totalPrice.innerHTML;
        totalPrice.innerHTML = totalPrice.innerHTML > 0 ? totalPrice.innerHTML : 0;
    }
}

function filterItems() {
    let typeFilterValue = filters[0].value;
    let priceFilterValue = filters[1].value;

    for (let item of items) {
        let itemPrice = parseFloat(item.getElementsByTagName('p')[0].innerHTML);

        if ((item.dataset.type === typeFilterValue || typeFilterValue === '0') &&
            (itemPrice <= priceFilterValue || priceFilterValue === '0')) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    }
}

function showOrderForm() {
    let [totalAmount, totalPrice] = document.querySelectorAll('.red-info');

    let cover = document.createElement('div');
    cover.className = 'form-cover';
    document.body.append(cover);

    let orderForm = document.createElement('div');
    orderForm.className = 'order-form';
    orderForm.innerHTML =
        `<p class="order-form__title">
            Количество товаров ${totalAmount.innerHTML} на сумму ${totalPrice.innerHTML} грн
        </p>
        <ul class="order-form__rows">
            <li class="form-row">
                <label for="name" class="form-row__label">Имя</label>
                <input type="text" class="form-row__field">
            </li>
            <li class="form-row">
                <label for="email" class="form-row__label">Email</label>
                <input type="text" class="form-row__field">
            </li>
            <li class="form-row">
                <button class="form-row__submit" type="submit">Заказать</button>
            </li>
        </ul>`;
    cover.append(orderForm);

    submitForm(orderForm, cover, totalAmount, totalPrice);

    document.onkeydown = function (event) {
        if (event.key === 'Escape') {
            orderForm.remove();
            cover.remove();
        }
    };
}

function submitForm(form, cover, ...cartInfo) {
    let submitButton = form.querySelector('.form-row__submit');

    submitButton.onclick = function () {
        let [customerName, customerEmail] = form.querySelectorAll('.form-row__field');

        if (customerName.value.trim() === '' || customerEmail.value.trim() === '') {
            form.remove();
            cover.remove();
            alert('Все поля должны быть заполнены!');
        } else {
            form.remove();
            cover.remove();
            alert('Спасибо! Ваш заказ принят.');
            for (let elem of cartInfo) {
                elem.innerHTML = 'XXX';
            }
        }
    }
}

for (let item of items) {
    item.addEventListener('click', changeCartInfo);
}

for (let filter of filters) {
    filter.addEventListener('change', filterItems);
}

orderButton.addEventListener('click', showOrderForm);

