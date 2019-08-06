export default class Shopping{
  constructor(){
    this.cart = [];
    this.coupon = 1;
    this.price = 0;
  }

  randomID(){
    const num = Math.floor(Math.random() * 1000 + 1);
    const sec = new Date().getSeconds();
    return `XD${num}${sec}`;
  }

  getPrice(size){
    if(size === 'small') return 0;
    else if(size === 'medium') return 1;
    else if(size === 'large') return 2;
  }

  addItem(img, title, size, prices){
    const item = {
      id : this.randomID(),
      img,
      title,
      price: prices[this.getPrice(size)]
    };

    this.cart.push(item);

    // Update local storage
    this.saveData();

    return item;
  }


  deleteItem(id){
    const index = this.cart.findIndex(el => el.id === id);
    this.cart.splice(index, 1);

    // Update local storage
    this.saveData();
  }

  totalPrice(){
    let sum = 0;
    this.cart.forEach(el => {
      sum += el.price;
    });
    return sum * this.coupon;
  }

  isExist(id){
    return this.cart.findIndex(el => el.id === id) !== -1;
    
  }

  saveData(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  readStorage(){
    // Get data from storage and update
    const storage = JSON.parse(localStorage.getItem('cart'));
    if(storage) this.cart = storage;
  }

  clearCart(){
    this.cart.length = 0;
    this.saveData();
  }

  getCartLength(){
    return this.cart.length;
  }

}