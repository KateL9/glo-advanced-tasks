/*
Записывать пользователя в массив в виде объекта
Данные: Имя и Фамилия в одном prompt
Логин и пароль два отдельных prompt
Выводить на страницу всех пользователей в виде списка
На странице должны быть Имя, Фамилия, Дата регистрации в формате “20 июня 2020 г., 19:58:47”
Данные записывать в localStorage и при обновлении страницы данные снова выводятся на страницу
*/

let username = document.querySelector('#username'),
    register = document.querySelector('#registerUser'),
    login = document.querySelector('#login'),
    list = document.querySelector('#list');

register.addEventListener('click', function() {
    names = prompt('Введите свое имя и фамилию', '');

})