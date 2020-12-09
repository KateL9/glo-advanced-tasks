/* 1) Используя class DomElement из основного задания №1, 
создать квадрат 100 на 100 пикселей. Ему необходимо задать фон(background) любого цвета и свойство position: absolute.
2) Поместить его на страницу только после выполнения события DOMContentLoaded.
Внутри тега body  должно быть только подключение скрипта.
3) Написать обработчик события для keydown, который будет принимать callback-функцию. 
Данная функция будет отлавливать нажатие на стрелки клавиатуры. В зависимости от нажатой кнопки
(Вверх - стрелка вверх, Влево - стрелка влево, Вправо - стрелка вправо, Вниз - стрелка вниз) наш квадрат будет перемещаться на 10 пикселей. */


function DomElement(selector, height, width, bg) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.createElem = function(selector) {
        document.addEventListener("DOMContentLoaded", () => {

            first = this.selector.slice(0, 1);
            let selectorName = this.selector.slice(1);
            if (first == '.') {
                //create div .block 
                document.body.insertAdjacentHTML("afterbegin", `<div class=${selectorName}></div>`);
                div = document.querySelector('div');
                div.style.cssText = `
                height: ${this.height}px;
                background-color: ${bg};
                width: ${width}px;
                position: absolute;`;
                let topPx = 0,
                    left = 0;

                document.addEventListener("keydown", function(evet) {
                    event.preventDefault();
                    let key = event.which;
                    switch (key) {
                        case 38: //arrow up
                            topPx = topPx - 10;
                            div.style.top = topPx + "px";
                            break;
                        case 40: //arrow down
                            topPx = topPx + 10;
                            div.style.top = topPx + "px";
                            break;
                        case 39: //arrow right
                            left = left + 10;
                            div.style.left = left + "px";
                            break;
                        case 37: //arrow left
                            left = left - 10;
                            div.style.left = left + "px";
                            break;
                    }
                });

            } else if (first == '#') {
                //create p #best
                document.body.insertAdjacentHTML("afterbegin", `<p id=${selectorName}></p>`);
                let p = document.querySelector('p');
                p.style.cssText = `
                height: ${this.height}px;
                background-color: ${this.bg};
                width: ${this.width}px;
                position: absolute;`;
            }

        });
    }
};

let obj = new DomElement('.', '100', '100', 'red');
obj.createElem();