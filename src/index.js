import './scss/main.scss';

import Menu from './js/models/Menu';
import Shopping from './js/models/Shopping';

import { elements } from './js/views/base';
import * as menuView from './js/views/menuView';
import * as shoppingView from './js/views/shoppingView';


/* 
  Global state:
  * Menu object

*/

const state = {};



/* ------------------------------------------- */
/* MENU CONTROLLER */
/* ------------------------------------------- */

const controlMenu = async () => {

  // Add Menu object to state
  state.Menu = new Menu();

  // Prepare UI
  menuView.clearResults();
  menuView.renderLoader();

  // Dummy fetch data
  await state.Menu.getData();

  // Clear loader
  menuView.clearLoader();

  // Render menu items in UI
  menuView.renderMenu(state.Menu.menuData);


  console.log(state.Menu.menuData);

}

const events = ['hashchange', 'load'];

events.forEach(event => {
  window.addEventListener(event, (e) => {
    const hash = window.location.hash.replace('#', '');
    switch(hash){
      case "menu": {
        controlMenu();
      }
    }
  });
});

window.addEventListener('load', () => {
  window.location.hash = '#home';
})



/* ------------------------------------------- */
/* SHOPPING CART CONTROLLER */
/* ------------------------------------------- */

const controlCart = (id) => {
  // Get size from UI
  const size = shoppingView.getSize(id);
  
  if(!state.Shopping) state.Shopping = new Shopping();

  // Get index of selected item - from state
  const index = state.Menu.menuData.findIndex(el => el.id === id);
  const item = state.Menu.menuData[index];


  // Add item to array
  const itemState = state.Shopping.addItem(
    item.img1,
    item.title,
    size,
    item.prices
  );

  // Prepare UI
    shoppingView.clearResults();

  // Add to UI
  shoppingView.renderCart(state.Shopping.cart);
  window.mobbyn = state.Shopping.cart;
  console.log(window.mobbyn);

  // Show total price
  const price = state.Shopping.totalPrice();
  shoppingView.showPrice(price);


}


elements.menu.addEventListener('click', e => {
  if(e.target.classList.contains('menu__button')){
    const id = e.target.dataset.id;
    controlCart(id);
  }
});

elements.shoppingCart.addEventListener('click', e => {
  if(e.target.classList.contains('shopping-cart__delete')){

    // Get ID from selected item
    const id = e.target.dataset.id;
    // Delete item
    state.Shopping.deleteItem(id);
    // Prepare UI
    shoppingView.clearResults();
    // Render UI
    shoppingView.renderCart(state.Shopping.cart);
    // Show total price
    const price = state.Shopping.totalPrice();
    shoppingView.showPrice(price);
  }
});
elements.shoppingCartBtn.addEventListener('click', e => {
  const key = shoppingView.getKey();

  // ATRAPA XD
  if(key === 'mobbyn'){
    state.Shopping.coupon = 0.75;

    // Update price
    const price = state.Shopping.totalPrice();
    shoppingView.showPrice(price, true);

    // Show alert
    shoppingView.showAlert('success');
  } 
  else{
    state.Shopping.coupon = 1;

    // Update price
    const price = state.Shopping.totalPrice();
    shoppingView.showPrice(price, true);

    // Show alert
    shoppingView.showAlert('error');
  }
});

