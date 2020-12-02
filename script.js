function getWeekDay(date) {
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ];

  return days[date.getDay()];
}

function getHourWord(el) {
  if (el == 1 || el == 21) {
    return "час";
  } else if (
    el == 2 ||
    el == 3 ||
    el == 4 ||
    el == 22 ||
    el == 23 ||
    el == 24
  ) {
    return "часа";
  }
  return " часов ";
}

function getDateAndTime() {
  const date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();
  const today = getWeekDay(date);
  const curentMonth = date.getMonth();
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
  ];
  const hoursWord = getHourWord(hours);
  const dateEl = document.getElementById("firstDateFormat");
  const dateFullEl = document.getElementById("secondDateFormat");
  let arr = [day, month, year, hours, minutes, seconds];

  arr = arr.map(function (element) {
    return element.toString();
  });

  arr = arr.map(function (element) {
    if (element.length <= 1) {
      return (element = "0" + element);
    }
    return element;
  });

  dateEl.innerText = `${arr[0]}.${arr[1]}.${arr[2]} - ${arr[3]}:${arr[4]}:${arr[5]}`;
  dateFullEl.innerText = `Сегодня ${today} ${arr[0]} ${months[curentMonth]} ${arr[2]} год ${arr[3]} ${hoursWord}${arr[4]} минут ${arr[5]} секунд.`;
}

setInterval(getDateAndTime, 1000);
