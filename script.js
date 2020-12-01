/*Выведите на страницу текущую дату и время в 2 - х форматах:
a)
'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'
б)
'04.02.2020 - 21:05:33'
2) Для вывода в формате(а) напишите функцию, которая будет менять склонение слов в зависимости от числа, "час, часов, часа"
3) Для вывода в формате(б) напишите функцию, которая будет добавлять 0 перед значениями 
которые состоят из одной цифры(из 9: 5: 3 1.6 .2019 сделает 09: 05: 03 01.06 .2019)
4) С помощью функции setInterval, реализуйте обновление даты и времени каждую секунду*/

function getDateAndTime() {
    window.location.reload();
    let date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        arr = [day, month, year, hours, minutes, seconds];
    // меняем тип данных на string
    arr = arr.map(function(element) {
        return element.toString();
    });
    // Добавляем 0
    arr = arr.map(function(element) {
        if (element.length <= 1) {
            return element = '0' + element;
        }
        return element;
    });

    //Определяем день недели совом
    function getWeekDay(date) {
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return days[date.getDay()];
    };
    let today = getWeekDay(date);

    //Определяем месяц словом
    let curentMonth = date.getMonth(),
        months = [];
    months[0] = "Января";
    month[1] = "Февраля";
    months[2] = "Марта";
    months[3] = "Апреля";
    months[4] = "Мая";
    months[5] = "Июня";
    months[6] = "Июля";
    months[7] = "Августа";
    months[8] = "Сентября";
    months[9] = "Октября";
    months[10] = "Ноября";
    months[11] = "Декабря";

    //Определяем часы словом
    let hoursWord;

    function getHourWord(el) {
        if (el == 1 || el == 21) {
            hoursWord = 'час';
        } else if (el == 2 || el == 3 || el == 4 || el == 22 || el == 23 || el == 24) {
            hoursWord = 'часа';
        }
        hoursWord = ' часов ';
    };
    getHourWord(hours);

    //Вывод результатов
    document.write(arr[0] + '.' + arr[1] + '.' + arr[2] + ' - ' + arr[3] + ':' + arr[4] + ':' + arr[5] + '<br/>');
    document.write('Сегодня ' + today + ' ' + arr[0] + months[curentMonth] + ' ' + arr[2] + ' год ' + arr[3] + ' ' + hoursWord + arr[4] + ' минут ' + arr[5] + ' секунд.');
};


setInterval(getDateAndTime, 1000);