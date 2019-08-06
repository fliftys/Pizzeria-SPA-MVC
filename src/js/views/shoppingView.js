import {elements} from './base';

export const clearResults = () => {
  elements.shoppingCart.innerHTML = '';
}

export const getSize = id => {
  const size = document.querySelector(`input[name="size-${id}"]:checked`).value;
  return size;
}

export const getKey = () => elements.key.value;

export const renderItem = (item) => {
  const markup = `
  <li class="shopping-cart__list-item">
    <div class="shopping-cart__pizza-info">
      <img src="${item.img}" alt="picca#1" class="shopping-cart__img">
      <span class="shopping-cart__name">${item.title}</span>
    </div>
    <div class="shopping-cart__price">
      Cena:
      <span id="price">${item.price} pln</span>
    </div>
    <div class="shopping-cart__delete" data-id="${item.id}">
      &times;
    </div>

</li>
  `;

  elements.shoppingCart.insertAdjacentHTML('beforeend', markup);

}

export const renderCart = cart => {
  cart.forEach(el => renderItem(el));
}

export const showPrice = (price, discount = false) => {
  const el = document.querySelector('.shopping-cart__order-value');
  
  el.innerText = price ? `${price} pln` : `0 pln`;
}

export const showAlert = (status) => {

  if(status === 'success'){
    elements.discount.classList.remove('shopping-cart__discount--error');
    elements.discount.classList.add('shopping-cart__discount--success');
    elements.discount.textContent = 'Aktywowano zniżkę -25%';
  }
  else{
    elements.discount.classList.remove('shopping-cart__discount--success');
    elements.discount.classList.add('shopping-cart__discount--error');
    elements.discount.textContent = 'Błędny kod';
  }
}

export const toggleBtn = (count) => {
  elements.cartCount.textContent = count;

  if(count > 0){
    elements.cartCount.classList.add('shop__count--visible');
  }
  else{
    elements.cartCount.classList.remove('shop__count--visible');
  }
}

export const showInfoAlert = () => {
  elements.infoAlert.textContent = 'Dodano do koszyka!';

  if(!document.querySelector('menu__info-alert--visible')){
    elements.infoAlert.classList.add('menu__info-alert--visible');
    setTimeout(() => {
      elements.infoAlert.classList.remove('menu__info-alert--visible');
      elements.infoAlert.textContent = '';
    }, 2500);
  }
}