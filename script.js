'use strict';
window.addEventListener('DOMContentLoaded', () => {


    // Timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            let timer = getTimeRemaining();
            if (timer.hours.toString().length <= 1) {
                timerHours.textContent = '0' + timer.hours;
            } else { timerHours.textContent = timer.hours; }
            if (timer.minutes.toString().length <= 1) {
                timerMinutes.textContent = '0' + timer.minutes;
            } else { timerMinutes.textContent = timer.minutes; }
            if (timer.seconds.toString().length <= 1) {
                timerSeconds.textContent = '0' + timer.seconds;
            } else { timerSeconds.textContent = timer.seconds; }
            if (timer.timeRemaining <= 0) {
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';

            }
        }

        const idInterval = setInterval(updateClock, 10);
    }

    countTimer('16 december 2020');

    //Menu

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');
        const handlerMenu = () => {
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                menu.style.transform = `translate(0)`;
            } else {
                menu.style.transform = `translate(-100%)`;
            }
        };

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', (event) => {
            let target = event.target;
            if (
                target.classList.contains('close-btn') ||
                target.closest('.menu') ||
                target.closest('a')
            ) {
                menu.style.transform = `translate(-100%)`;
            } else if (!target.closest('menu')) {
                menu.style.transform = `translate(-100%)`;
            }
        });
    };
    toggleMenu();
    // Popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (document.documentElement.clientWidth > 768) {
                    let start = Date.now();
                    let timer = setInterval(function() {
                        let timePassed = Date.now() - start;
                        popup.style.display = 'block';
                        popupContent.style.left = timePassed * 2 + 'px';
                        if (timePassed >= 300) {
                            clearInterval(timer);
                        }
                    }, 20);
                } else {
                    popup.style.display = 'block';
                }
            });

            popup.addEventListener('click', (event) => {
                let target = event.target;
                if (target.classList.contains('popup-close')) {
                    popup.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');
                    if (!target) {
                        popup.style.display = 'none';
                    }
                }
            });
        });
    };

    togglePopUp();

    // Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');

                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                })
            }
        })
    };

    tabs();

    //Slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let dot;
        let currentSlide = 0,
            interval;
        //  Написать скрипт, который будет на страницу добавлять точки с классом dot равному количеству слайдов
        const addDots = () => {
            for (let i = 0; i <= slide.length - 1; i++) {
                let li = document.createElement('li');
                li.classList.add('dot');
                if (i == 0) {
                    li.classList.add('dot-active');
                }
                dots.append(li);
            }
            dot = document.querySelectorAll('.dot');
        };
        addDots();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            };


            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    }
    slider();

    // Our Team
    const hoverEffect = () => {
        const container = document.querySelector('#command .row');
        container.addEventListener('mouseover', (event) => {
            if (event.target.classList.contains('command__photo')) {
                let src = event.target.src;
                event.target.src = event.target.dataset.img;
                event.target.dataset.img = src;
            }
        })
        container.addEventListener('mouseout', (event) => {
            if (event.target.classList.contains('command__photo')) {
                let datasetImg = event.target.src
                event.target.src = event.target.dataset.img;
                event.target.dataset.img = datasetImg;
            }
        })
    }
    hoverEffect();

    // Validation of the calculator 
    //ввод только цифр
    const numberValidation = () => {
        const calculatorBlock = document.querySelector('.calc-block');
        calculatorBlock.addEventListener('input', (event) => {
            if (event.target.tagName == 'INPUT') {
                event.target.value = event.target.value.replace(/\D/g, '');
            }
        })
    }
    numberValidation();

    // Calculator
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            if (total) {
                numberCounter(total, totalValue)
            }

            if (!calcType.options[calcType.selectedIndex].value) {
                calcSquare.value = '';
                calcCount.value = '';
                calcDay.value = '';
            }

        };

        const numberCounter = (number, element) => {
            const time = 300;
            const step = 50;

            function showNumbers() {
                let counter = 0,
                    seconds = Math.round(time / (number / step));
                let intervalId = setInterval(() => {
                    counter += step;
                    if (counter == number) {
                        clearInterval(intervalId);
                    }
                    element.textContent = counter;
                }, seconds);
            }
            showNumbers();
        }

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            /*
            if(target === calcType || target === calcSquare || target === calcDay || target === calcCount)
            or
            if (target.matches('.select') || target.matches('.input'))
            */
            if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {
                countSum();
            }
        })
    };
    calc(100);
});