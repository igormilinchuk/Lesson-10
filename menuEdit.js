const prompt = require('prompt-sync')();
const fs = require('fs')
console.clear();

let menu = chooseMenu()
function chooseMenu(){
    let selectedMenu

    let patternMenu = [
        {
            ID: '1',
            title:'california',
            price: 7000,
            category: 'sushi',
            ingredients: ['rice', 'souce', 'sea fish']
        },
        {
            ID: '2',
            title:'Philadelphia',
            price: 6000,
            category: 'sushi',
            ingredients: ['rise', 'nori', 'avokado', 'salmon']
        },
        {
            ID: '3',
            title:'Нігірі',
            price: 6500,
            category: 'sushi',
            ingredients: ['rise', 'souce', 'algae', 'tuna']
        },{
            ID: '4',
            title:'Хосомакі',
            price: 5500,
            category: 'rolls',
            ingredients: ['rise', 'freshwater fish', 'vegetables', 'algae', 'boiled chicken']
        },
        {
            ID: '5',
            title:'Футомакі',
            price: 8500,
            category: 'rolls',
            ingredients: ['rise', 'cucumbers', 'avocado', 'radish', 'avocado', 'tomatoes']
        },
        {
            ID: '6',
            title:'Спрінг-роли',
            price: 9000,
            category: 'rolls',
            ingredients: ['rise', 'egg omelette', 'souce', 'boiled chicken', 'sea fish']
        }
    ]

let chooseMenu 
do{
    chooseMenu = prompt('Якщо бажаєте працювати з шаблонним меню нажміть -- 1, якщо з теперішнім -- 2: ')
if (chooseMenu == 1) {
 selectedMenu = patternMenu
}
if (chooseMenu == 2){
    let currentMenu = JSON.parse(fs.readFileSync('menu.txt', 'utf8'));
selectedMenu = currentMenu
}
}while(chooseMenu !== '1' && chooseMenu !== '2' ) 
return selectedMenu
}

    do {
  chooseAct = prompt("Виберіть, що хочете зробити:\n1 -- змінити, 2 -- видалити,  3 -- додати, 4 -- зберегти, 5 -- переглянути меню, 6 -- вийти: ");

        if (chooseAct === '1') {
            ChangeProperties()
        }
        if (chooseAct === '2') {
            deleteProperties()
        }
        if (chooseAct === '3') {
            AddProrerties()
        }if (chooseAct === '4') {
            fs.writeFileSync('menu.txt', JSON.stringify(menu));
            console.log('Інформацію збережено у файл persons.txt');
            }if (chooseAct === '5') {
                do{
                    UserChooseID = prompt("Оберіть номер сторінки меню, для виходу нажміть f(F), всього сторінок: " + menu.length + " -- ");
              
                  const selectedMenuItem = menu.find(item => item.ID == UserChooseID);
              
                  
                    if (selectedMenuItem) {
                        console.log(selectedMenuItem);
                } }while(UserChooseID.toLowerCase() != "f")
}} while (chooseAct !== '6');

    function deleteProperties(){
        const IDToChange = prompt("Введіть ID меню, в якому плануєте працювати: ");
            const propToDelete = prompt("Введіть назву властивості, яку хочете видалити: ");

        if (IDToChange >= 1 && IDToChange <= menu.length) {
            const menuItem = menu[IDToChange - 1];
        
            if (menuItem.hasOwnProperty(propToDelete)) {
                delete menuItem[propToDelete];
                console.log(`Властивість ${propToDelete} видалено з елемента з ID ${IDToChange}.`);
            } else {
                console.log(`Властивість ${propToDelete} не існує у елемента з ID ${IDToChange}.`);
            }
        } else {
            console.log('Введений ID не є дійсним номером меню.');
        }
    }
    function ChangeProperties(){
        const IDToChange = prompt("Введіть ID меню, в якому плануєте працювати: ");
        const propToChange = prompt("Введіть назву властивості, яку хочете змінити: ");
        const newValue = prompt("Введіть нове значення для властивості: ");

        if (IDToChange >= 1 && IDToChange <= menu.length) {
            const menuItem = menu[IDToChange - 1];
        
            if (menuItem.hasOwnProperty(propToDelete)) {
                menu[IDToChange - 1][propToChange] = newValue
                console.log(`Властивість ${propToDelete} змінено в елемента з ID ${IDToChange} на ${newValue}`);
            } else {
                console.log(`Властивість ${propToDelete} не існує у елемента з ID ${IDToChange}.`);
            }
        } else {
            console.log('Введений ID не є дійсним номером меню.');
        }
    }
   function AddProrerties(){

    const existingOrNonID = prompt("Якщо плануєте додати до існуючого елементав меню нажміть -- 1, якщо створити новий елемент меню -- 2: ");

    if(existingOrNonID == 1){
        const IDToChange = prompt("Введіть ID меню, в якому плануєте працювати: ");
        const newPropertyName = prompt("Введіть назву нової властивості: ");
        const newValue = prompt("Введіть значення для нової властивості: ");

    if (IDToChange >= 1 && IDToChange <= menu.length) {
        menu[IDToChange][newPropertyName] = newValue;
    }else{
        console.log('Введений ID не є дійсним номером меню.');
    }
   }
if(existingOrNonID == 2){
    const newTitle = prompt('Введіть назву страви: ');
    const newPrice = parseFloat(prompt('Введіть ціну страви: '));
    const newCategory = prompt('Введіть категорію: ');
    const newIngredients = prompt('Введіть інграндієнти через пробіл: ').split(' ');
    
    const newID = (menu.length + 1)
    const newMenuItem = {
        ID: newID,
        title: newTitle,
        price: newPrice,
        category: newCategory,
        ingredients: newIngredients.map(ingredient => ingredient.trim()), 
    };
    menu.push(newMenuItem);
}}