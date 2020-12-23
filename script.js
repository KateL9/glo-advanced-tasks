'use strict';
class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }
    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.input.value = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `<span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
        <button class="todo-edit"></button>
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`);

        if (todo.completed) {
            this.todoCompleted.append(li)
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            }
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            alert('Пустой ввод!');
        }

    }
    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(a) {
        this.todoData.delete(a);
        this.render();
    }

    completedItem(a) {
        const todoData = this.todoData;
        let val = todoData.values()
        for (let el of val) {
            if (el.key == a) {
                el.completed ? el.completed = false : el.completed = true;
            }
        }
        this.render();
        // this.todoData.get(a).completed ? this.todoData.get(a).completed = false : this.todoData.get(a).completed = true;
        // this.render();
    }

    animation(a) {
        a = a.closest('.todo-item');

        const anim = a.animate(
            [{
                transform: 'translate(0)',
                opacity: 0.3,
                width: '600px'
            }, {
                transform: 'translate(200px)',
                opacity: 0.9,
                width: '400px'
            }, {
                transform: 'translate(250px, 300px)',
                opacity: 0.8,
                width: '200px'
            }], {
                duration: 1000
            });
    }

    editItem = (el) => {
        let text = el.querySelector('.text-todo');
        text.contentEditable = "true";
        text.style.border = "1px solid #000";
        text.style.padding = "5px 15px";
        alert('Нажмите Enter после редактирования');
        el.addEventListener('keydown', (e) => {
            text.contentEditable = "true";
            if (e.keyCode === 13) {
                if (text.textContent == null || text.textContent == '') {
                    alert('Пустой ввод!');
                } else {
                    text.contentEditable = "false";;
                    this.todoData.get(el.key).value = text.textContent;
                    this.render();
                }
            }
        })

    }

    handler() {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('todo-remove')) {
                this.animation(event.target);
                this.deleteItem(event.target.closest('.todo-item').key);
            } else if (event.target.classList.contains('todo-complete')) {
                this.animation(event.target);
                this.completedItem(event.target.closest('.todo-item').key)
            } else if (event.target.classList.contains('todo-edit')) {
                this.editItem(event.target.closest('.todo-item'));
            }
        })
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();