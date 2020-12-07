const color = document.querySelector('#color'),
    btn = document.querySelector('#change');

function getRandomColor() {
    color.textContent = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = color.textContent;
    btn.style.color = color.textContent;
}

btn.addEventListener('click', getRandomColor);