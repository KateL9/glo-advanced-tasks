'use strict';
/*Написать любую анимацию, используя requestAnimationFrame и кнопку, активирующую её
Кнопка должна ставить анимацию на паузу и продолжать анимацию после повторного нажатия + Добавить кнопку reset, 
которая будет возвращать анимацию в первоначальное состояние*/

const img = document.querySelector('#img'),
    start = document.querySelector('#start'),
    reset = document.querySelector('#reset');
let count = 0;
let interv;

function animation() {
    interv = requestAnimationFrame(animation)
    count++
    if (count < 300) {
        img.style.left = count + 'px';
    } else {
        cancelAnimationFrame(interv)
    }
}
let stopStart = false;
start.addEventListener('click', function() {
    if (!stopStart) {
        interv = requestAnimationFrame(animation);
        stopStart = true;
    } else {
        stopStart = false;
        cancelAnimationFrame(interv);
    }

});

reset.addEventListener('click', function() {
    count = 0;
    img.style.left = count;
    stopStart = false;
    cancelAnimationFrame(interv);
})