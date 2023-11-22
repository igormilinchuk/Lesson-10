//npm i prompt-sync
const prompt = require('prompt-sync')();
const fs = require('fs')

const person = {
  name: '',
  email: '',
  phone: '',
 }
 
 const delivery = {
     delivery_price: 500,
     from: "вул.Чорновола 15",
     to: '',
 }
 
 
 const order = {
     ...person,
     ...delivery,
     dishes: [],
     finalPrice: '',
     status: 'В обробці', 
   };


   chooseRole();
function chooseRole() {
  let enterAs;

  do {
    enterAs = prompt('Оберіть 1 -- вхід для користувача, 2 -- вхід для адміна, 3 -- вийти з програми: ');

    if (enterAs === '1') {
      Usermain();
    } 
    if (enterAs === '2') {
      adminMain();
    } 
    if (enterAs === '3') {
      console.log('Гарного дня');
    } else {
      console.log();('Невірний вибір. Будь ласка, оберіть 1, 2 або 3.');
    }
  } while (enterAs !== '3');
}

  function Usermain() {

    let menu = JSON.parse(fs.readFileSync('menu.txt', 'utf8'));
    let UserChooseID

    do{
      UserChooseID = prompt("Оберіть номер сторінки меню, для виходу нажміть f(F), всього сторінок: " + menu.length + " -- ");

    const selectedMenuItem = menu.find(item => item.ID == UserChooseID);

    
      if (selectedMenuItem) {
          console.log(`\nID: ${selectedMenuItem.ID}`);
          console.log(`Title: ${selectedMenuItem.title}`);
          console.log(`Price: ${selectedMenuItem.price}`);
          console.log(`Category: ${selectedMenuItem.category}`);
          console.log(`Ingredients: ${selectedMenuItem.ingredients.join(', ')}`);
          console.log('\n');
  } }while(UserChooseID.toLowerCase() !== "f")

  function chooseDishes() {
    let userInputdish;
    let words;
    let anotherOrder = '1';
    do {
      userInputdish = prompt('Оберіть ID вашого замовлення. Для декількох замовлень введіть ID через пробіл. Щоб обрати одне блюдо декілька разів, просто введіть ID більше одного разу: ');
      words = userInputdish.split(' ');
  
      for (const word of words) {
        let found = false;
  
        for (const item of menu) {
          if (item.ID === word) {
            console.log(`Ви замовили ${item.title}`);
            order.dishes.push(item);
            found = true;
          }
        }
  
        if (!found) {
          console.log(`Помилка: товар з ID ${word} не знайдений у меню.`);
        }
      }
      anotherOrder = prompt('Бажаєте додати ще страви до замовлення? Введіть 1 -- якщо так або 2 -- якщо ні ');
    } while (anotherOrder === '1');
  }
  
  function enterPersonalInfo() {
    const userInputName = prompt("Уведіть ваше прізвище та ім'я через пробіл: ");
    const userInputemail = prompt("Уведіть вашу електонну пошту: ");
    const userInputadress = prompt("Уведіть вашу адресу доставки: ");
  
    const [lastName, firstName] = userInputName.split(' ');
    person.name = `${firstName} ${lastName}`;
    person.email = userInputemail;
    delivery.to = userInputadress;
        let userInputNumber = prompt("Уведіть ваш номер, типу (+380956471834): ");
  
    
    person.phone = userInputNumber;
    Object.assign(order, person, delivery);
  }
  
  function pricecalculator(){
    let totalcost = 0
    for (const dish of order.dishes){
      totalcost += dish.price;
    }
    order.price = totalcost + delivery.delivery_price;
  }
   
  chooseDishes();
  enterPersonalInfo();
  pricecalculator()
  console.clear();
  showOrderSummary();

}

function showOrderSummary(){
  console.log("\nВаше прізвище та ім'я: " + order.name);
  console.log("Ваша електонна пошта: " + order.email);
  console.log("Ваш номер: " + order.phone);
  console.log("Адреса відправки: " + order.from);
  console.log("Ваша адреса доставки: " + order.to);
  
  console.log("Ваші блюда: ");
  for (const dish of order.dishes) {
    console.log(`Назва: ${dish.title}`);
  }

  console.log('Ціна замовлення: ' + order.price);
  console.log("Статус замовлення: " + order.status);
}
function adminMain(){

  function appealToAdministrator(){
    let chooseaction;

    do {
      chooseaction = prompt('Якщо бажаєте переглянути замовлення нажміть -- 1, якщо бажаєте змінити стасус замовлення -- 2, якщо бажаєте вийти з ролі адміністратора -- 3: ');
    
      if (chooseaction == '1') {
        showOrderSummary();
      } 
      if (chooseaction == '2') {
        changeOrderStatus();
      }
    } while (chooseaction !== '3' );
    
  }

  function changeOrderStatus() {
    const newStatus = prompt("Обновіть статус замовлення: 1 -- замовлення готується, 2 -- замовлення в дорозі, 3 -- замовлення доставлено, 4 -- схоже щось пішло не там, \n5 -- нічого не міняти: ");
   
 do{
    if (newStatus == '1') {
      order.status = 'замовлення готується';
    }
    if (newStatus == '2') {
      order.status = 'замовлення в дорозі';
    }
    if (newStatus == '3') {
      order.status = 'замовлення доставлено';
    }
    if (newStatus == '4') {
      order.status = 'схоже щось пішло не там';
    }
  } while (newStatus !== '5');
  console.log('Теперішній статус замовлення на:' + order.status);
  
}
appealToAdministrator()
}
