import { elements } from "./base";

export const  slider = async () => {
  let i = 1;

   setInterval(() => {
    let markup = `
    <img src="./img/slider/${i % 2}.jpg" alt="picca" class="slider__img">
    `;
    elements.slider.innerHTML = markup;
    i++;
   }, 8500); 


}