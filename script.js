/*Создать массив week и записать в него дни недели в виде строк
·        Вывести на экран все дни недели
·        Каждый из них с новой строчки
·        Выходные дни - курсивом
·        Текущий день - жирным шрифтом(использовать объект даты)*/

let arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    toDay = new Date().getDay() - 1;
arr.forEach((item, i, array) => {
    if (i == 5 || i == 6) {
        document.write(`<div><i>${item}</i></div>`)
    } else if (i == toDay) {
        document.write(`<div><b>${item}</b></div>`)
    } else {
        document.write(`<div>${item}</div>`)
    }
});