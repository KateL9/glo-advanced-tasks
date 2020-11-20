//Создать переменную num со значением 266219(тип данных число).
let num = 266219;
let multiple = 1;
let arr = String(num).split('');

//Вывести в консоль произведение(умножение) цифр этого числа.
for (i = 0; i < arr.length; i++) {
    multiple *= arr[i];
};
console.log(multiple);

//Полученный результат возвести в степень 3.
let pow = multiple ** 3;

//Вывести на экран первые 2 цифры полученного числа.
alert(String(pow).substr(0, 2));