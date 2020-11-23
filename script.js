//Создать переменную num со значением 266219(тип данных число).
let num = 266219,
    multiple = 1,
    arr = String(num).split('');

//Вывести в консоль произведение(умножение) цифр этого числа.
for (i = 0; i < arr.length; i++) {
    multiple *= arr[i];
};
console.log(multiple);

//Полученный результат возвести в степень 3.
let pow = multiple ** 3;

//Вывести на экран первые 2 цифры полученного числа.
alert(String(pow).substr(0, 2));

/*Переменная lang может принимать 2 значения: 'ru' 'en'.
Написать условия при котором в зависимости от значения lang будут выводится дни недели на русском или английском языке. Решите задачу
через if*/

let lang = prompt('Choose the language RU or EN', 'EN').toLowerCase();

if (lang == 'en') {
    console.log('\n Monday \n Tuesday \n Wednesday \n Thursday \n Friday \n Saturday \n Sunday')
} else
if (lang == 'ru') {
    console.log('\n Понедельник \n Вторник \n Среда \n Четверг \n Пятница \n Суббота \n Воскресенье')
} else {
    console.log('Something went wrong!')
}

//через switch-case 
switch (lang) {
    case 'en':
        console.log('\n Monday \n Tuesday \n Wednesday \n Thursday \n Friday \n Saturday \n Sunday');
        break;
    case 'ru':
        console.log('\n Понедельник \n Вторник \n Среда \n Четверг \n Пятница \n Суббота \n Воскресенье');
        break;
    default:
        console.log('Something went wrong!');
}

//через многомерный массив без ифов и switch.
let arrOfLangs = {
    'ru': ['Понедельник Вторник Среда Четверг Пятница Суббота Воскресенье'],
    'en': ['Monday Tuesday Wednesday Thursday Friday Saturday Sunday']
};

console.log(arrOfLangs[lang]);

/*У нас есть переменная namePerson. Если значение этой переменной “Артем” то вывести в консоль “директор”, 
если значение “Максим” то вывести в консоль “преподаватель”, с любым другим значением вывести в консоль “студент”
Решить задачу с помощью нескольких тернарных операторов, без использования if или switch*/

let namePerson = prompt('Возраст?', 'Максим');
let message = (namePerson == 'Артем') ? 'директор' :
    (namePerson == 'Максим') ? 'преподаватель' :
    'студент';

alert(message);