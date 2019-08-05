import {elements} from './base';
import { pathToFileURL } from 'url';


export const renderLoader = () => {
  const markup = `
    <div class="loader">
      <img class="loader__gif" src="./img/loader.gif" alt="mobbyn">
    </div>
  `;
  elements.menu.innerHTML = markup;
}

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  loader.parentElement.removeChild(loader);
}

export const clearResults = () => {
  elements.menu.innerHTML = '';
}


const renderIngredients = (path, list) => {

  let markup = '';

  list.forEach(name => {
    markup += `
      <li class="menu__ingredient">
        <svg class="menu__svg">
          <use xlink:href="${path}${name}" />
        </svg>
      </li>
    `;
  })
  return markup;
}


const renderListItem = item => {

 const markup = `
 <li class="menu__list-item" id="${item.id}">

  <!-- Top -->
  <div class="menu__item-top">
    <img src="${item.img1}" alt="picca" class="menu__photo">
    <h3 class="menu__name">${item.title}</h3>

    <div class="menu__input-wrapper">
      
      <div class="menu__input-group">

        <input type="radio" value="small" id="small-${item.id}" name="size-${item.id}" class="menu__option">
        <label for="small-${item.id}" class="menu__label">
          <img src="${item.img2}" alt="pizza" class="menu__img-size">
          <div class="menu__size">${item.sizes[0]} cm</div>
        </label>
        <div class="menu__price">${item.prices[0]} pln</div>
        
      </div>                  
      <div class="menu__input-group">

        <input checked type="radio" value="medium" id="medium-${item.id}" name="size-${item.id}" class="menu__option">
        <label for="medium-${item.id}" class="menu__label">
          <img src="${item.img2}" alt="pizza" class="menu__img-size">
          <div class="menu__size">${item.sizes[1]} cm</div>
        </label>
        <div class="menu__price">${item.prices[1]} pln</div>

      </div>                  
      <div class="menu__input-group">

        <input type="radio" value="large" id="large-${item.id}" name="size-${item.id}" class="menu__option">
        <label for="large-${item.id}" class="menu__label">
          <img src="${item.img2}" alt="pizza" class="menu__img-size">
          <div class="menu__size">${item.sizes[2]} cm</div>
        </label>
        <div class="menu__price">${item.prices[2]} pln</div>

      </div>    

    </div>

  </div>

  <!-- Bottom -->
  <div class="menu__item-bottom">

    <ul class="menu__ingredients">
      ${renderIngredients(item.ingredientsPath, item.ingredientsList)}
    </ul>
    <a class="menu__button btn btn--primary" data-id="${item.id}">Do koszyka</a>
  </div>
</li> 
  `;

  elements.menu.insertAdjacentHTML('afterbegin', markup);

}


export const renderMenu = menu => {

   //menu.forEach(item => renderItem);

    menu.forEach(item => renderListItem(item));

}