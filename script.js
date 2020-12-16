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

    countTimer('18 december 2020');

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
                    target.closest('li')
                ) {
                    menu.style.transform = `translate(-100%)`
                } else {
                    menu.style.transform = `translate(-100%)`
                };
            })
            // Scroll
        const menuItems = menu.querySelectorAll('ul>li>a');

        for (let anchor of menuItems) {
            anchor.addEventListener('click', function(event) {
                event.preventDefault();

                const blockID = anchor.getAttribute('href');

                document.querySelector(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            })
        }
    };
    toggleMenu();

    // Scroll button
    const scrollBtn = document.querySelector('main>a');
    const scrollFunc = (e) => {
        e.preventDefault();
        const scrollBtnId = scrollBtn.getAttribute('href');
        document.querySelector(scrollBtnId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
    scrollBtn.addEventListener('click', scrollFunc);


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
                        popupContent.style.left = timePassed / 3 + 'px';
                        if (timePassed >= 2000) {
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
});