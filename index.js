const todoListEl = document.querySelector('.todo-list');
const inputEl = document.querySelector('.input-group__input');
const addButtonEl = document.querySelector('.input-group__add-button');
const API_URL = 'http://localhost:3000';

let count = 0;
let todos = [
  {
    title: 'React 공부',
    complete: false
  }
]

// 할 일 추가 (엔터키를 눌렀을 때)
inputEl.addEventListener('keypress', async e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    await addTodo(inputEl.textContent);
    inputEl.textContent = '';
    refreshTodoList();
  }
});

// 할 일 추가 (`+` 버튼을 클릭했을 때)
addButtonEl.addEventListener('click', async e => {
  await addTodo(inputEl.textContent);
  inputEl.textContent = '';
  refreshTodoList();
});

async function addTodo(title) {
  todos.push({
    id: count++,
    title,
    complete: false
  });
}

async function removeTodo(todoId) {
  todos = todos.filter(t => t.id !== todoId);
}

async function updateTodo(todoId, complete) {
  for (let todo of todos) {
    if (todo.id === todoId) {
      todo.complete = complete;
    }
  }
}

async function refreshTodoList() {
  // 현재 화면의 할 일 목록 삭제
  todoListEl.innerHTML = '';

  // 할 일 목록 새로 표시하기
  for (let {id, title, complete} of todos) {
    const todoEl = document.createElement('div');
    todoEl.classList.add('todo-list__item');

    const todoTitleEl = document.createElement('div');
    todoTitleEl.classList.add('todo-list__title');
    todoTitleEl.textContent = title;
    if (complete) {
      todoTitleEl.classList.add('todo-list__title--complete');
    }
    todoTitleEl.addEventListener('click', async e => {
      await updateTodo(id, !complete);
      return refreshTodoList();
    });
    todoEl.appendChild(todoTitleEl);

    const todoRemoveEl = document.createElement('div');
    todoRemoveEl.classList.add('todo-list__remove-button');
    todoRemoveEl.addEventListener('click', async e => {
      await removeTodo(id);
      return refreshTodoList();
    })
    todoEl.appendChild(todoRemoveEl);

    todoListEl.appendChild(todoEl);
  }
}

refreshTodoList();
