/*
Записывать пользователя в массив в виде объекта
Данные: Имя и Фамилия в одном prompt
Логин и пароль два отдельных prompt
Выводить на страницу всех пользователей в виде списка
На странице должны быть Имя, Фамилия, Дата регистрации в формате “20 июня 2020 г., 19:58:47”
Данные записывать в localStorage и при обновлении страницы данные снова выводятся на страницу.
*/




let usernameBtn = document.querySelector('#username'),
    registerBtn = document.querySelector('#registerUser'),
    loginBtn = document.querySelector('#login'),
    list = document.querySelector('#list'),
    names,
    login,
    passw,
    data,
    arr = JSON.parse(localStorage.getItem('arr'));
if (arr) {
    console.log(arr)
    render();
} else {
    arr = []
};

registerBtn.addEventListener('click', function() {
    names = prompt('Введите свое имя и фамилию', '');
    login = prompt('Введите логин', '');
    passw = prompt('Введите пароль', '');
    let d = new Date;
    let date = new Date(Date.UTC(2012, 11, 20, d.getHours() - 1, d.getMinutes(), d.getSeconds()));
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let registerDate = date.toLocaleDateString('ru-RU', options);
    data = {
        names,
        login,
        passw,
        registerDate
    };
    arr.push(data);
    localStorage.setItem('arr', JSON.stringify(arr));
    render();
});

function render() {
    let li = document.createElement('li');
    arr.forEach((item) => {
        li.innerHTML = item.names + ': ' + item.registerDate;
        list.prepend(li);
    })
};