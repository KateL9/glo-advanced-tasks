const start = document.getElementById('start'),
    checkbox = document.querySelector('.deposit-checkmark'),
    budgetMonthVal = document.querySelector('.budget_month-value'),
    budgetDayVal = document.querySelector('.budget_day-value'),
    expensesMonthVal = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodVal = document.querySelector('.income_period-value'),
    targetMonth = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.querySelector('#cancel');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomePlus = document.querySelector('.income_add'),
    expensesPlus = document.querySelector('.expenses_add'),
    additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item');

class AppData {
    constructor() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }
    isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }
    start = function() {
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddIncExp();
        //this.getExpenses();
        //this.getIncome();
        //this.getIncomeMonth();

        //this.getAddExpenses();
        //this.getAddIncome();
        this.getBudget();

        this.showResult();
        this.disableinputs();
    }
    showResult = function() {
            const _this = this;
            budgetMonthVal.value = this.budgetMonth;
            budgetDayVal.value = this.budgetDay;
            expensesMonthVal.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonth.value = this.getTargetMonth();
            incomePeriodVal.value = this.calcPeriod();
            periodSelect.addEventListener('input', function() {
                incomePeriodVal.value = _this.calcPeriod();
            });
        }
        //addExpensesBlock/addIncomeBlock

    // addExpensesBlock = function() {

    //     const cloneExpensesItem = expensesItems[0].cloneNode(true);

    //     expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    //     expensesItems = document.querySelectorAll('.expenses-items');
    //     if (expensesItems.length == 3) {
    //         expensesPlus.style.display = 'none';
    //     }
    // }
    // btn_plus income_add, btn_plus expenses_add
    // income-items, expenses-items
    // expensesPlus.addEventListener('click', appData.addExpIncBlocks);
    // incomePlus.addEventListener('click', appData.addExpIncBlocks);
    // incomeItems = document.querySelectorAll('.income-items'),
    // expensesItems = document.querySelectorAll('.expenses-items'),

    addExpIncBlocks = function() {
        const incomePlusClassName = 'btn_plus income_add';
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemBlock = document.querySelectorAll(`.${startStr}-items`)[0],
                itemBlocks = document.querySelectorAll(`.${startStr}-items`),
                itemPlus = document.querySelector(`.${startStr}_add`);

            const cloneItem = itemBlock.cloneNode(true);
            cloneItem.childNodes[1].value = '';
            cloneItem.childNodes[3].value = '';
            itemBlock.parentNode.insertBefore(cloneItem, itemPlus);
            if (itemBlocks.length == 2) {
                itemPlus.style.display = 'none';
            }
        };
        if (this.className == incomePlusClassName) {
            incomeItems.forEach(count);
        } else expensesItems.forEach(count);
    }

    /*     addIncomeBlock = function() {

            const cloneIncomeItem = incomeItems[0].cloneNode(true);
            cloneIncomeItem.childNodes[1].value = '';
            cloneIncomeItem.childNodes[3].value = '';
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length == 3) {
                incomePlus.style.display = 'none';
            }
        } */

    getExpInc = function() {
            const count = item => {
                const startStr = item.className.split('-')[0];
                const itemTitle = item.querySelector(`.${startStr}-title`).value;
                const itemAmount = item.querySelector(`.${startStr}-amount`).value;
                if (itemTitle !== '' && itemAmount !== '') {
                    this[startStr][itemTitle] = Number(itemAmount);
                }
            }

            incomeItems.forEach(count);
            expensesItems.forEach(count);

            for (let key in this.income) {
                this.incomeMonth += this.income[key];
            }
        }
        // getAddIncome/getAddExpenses

    /* getAddExpenses = function() {
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    } */
    getAddIncExp = function() {
        // additional_expenses-item
        // additional_income-item - 2
        // additionalExpensesItem = document.querySelectorAll('.additional_expenses-item')
        // additionalIncomeItems = document.querySelectorAll('.additional_income-item')
        const incomeClassName = "additional_income-item";
        const count = item => {
            const startStr = item.className.split('_')[1];
            let addItem = document.querySelector(`.additional_${startStr}`);
            if (addItem.className.indexOf(incomeClassName) >= 0) {
                //addItem = addItem.value.split(',');
                addItem = addItem.value;
                this.addIncome.push(addItem);
            } else {
                addItem = addItem.value.trim();
                this.addExpenses.push(addItem);
            }
        }
        additionalIncomeItems.forEach(count);
        additionalExpensesItem.forEach(count);
    };

    /*     getAddIncome = function() {
            const _this = this;
            additionalIncomeItems.forEach(function(item) {
                const itemValue = item.value.trim();
                if (itemValue !== '') {
                    _this.addIncome.push(itemValue);
                }
            })
        } */
    getExpensesMonth = function() {

        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getBudget = function() {
        this.budgetMonth = +this.budget + Number(this.incomeMonth) - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth = function() {
        let res = Math.round(targetAmount.value / this.budgetMonth);
        if (!isFinite(res) || res < 0) {
            alert('Неверный ввод!');
            return res = 0;
        } else {
            return res;
        }
    }
    changeRange = function() {
        periodAmount.innerHTML = periodSelect.value;
    }
    calcPeriod = function() {
        return this.budgetMonth * periodSelect.value;
    }
    disableinputs = function() {
        if (salaryAmount.value) {
            start.hidden = true;
            cancel.style.display = 'block';
            [...document.querySelectorAll('section.main input[type=text]')].forEach(function(el) {
                el.disabled = true;
            });
        }
    }
    reset = function() {
        [...document.querySelectorAll('section.main input[type=text]')].forEach(function(el) {
            el.value = ''
            el.disabled = false;
        });
        cancel.style.display = 'none'
        start.hidden = false;

        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        periodSelect.value = 1;
        periodAmount.innerHTML = 1;
    }
    addEventListeners = function() {
        start.addEventListener('click', appData.start.bind(appData));
        cancel.addEventListener('click', appData.reset.bind(appData));
        expensesPlus.addEventListener('click', this.addExpIncBlocks);
        incomePlus.addEventListener('click', this.addExpIncBlocks);
        periodSelect.addEventListener('input', appData.changeRange);

        const main = document.querySelector('.main');
        main.addEventListener('input', function(e) {
            if (e.target.placeholder === "Наименование") {
                e.target.value = e.target.value.replace(/[^а-яё\s,.!:;'-]/i, '');
            } else if (e.target.placeholder === "Сумма") {
                e.target.value = e.target.value.replace(/[^\d]/g, '');
            }
        });
    }
};

const appData = new AppData;
appData.addEventListeners();