import text from './data.json';

export default class Menu{
  constructor(){
    
  }

 async getData(){

    try{
      const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(text);
        }, 2000);
      });

      this.menuData = data;

    }
    catch( error ){
      console.log(`Menu.js ${error}`);
    }
    

  }
}