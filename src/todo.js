const todoList = document.querySelector(".content-todo"),
  todoForm = document.querySelector(".content-todo__form"),
  todoInput = todoForm.querySelector("input");
const TODOS = "todos";
let todos = [];

const saveTodo = (todo) => {
  todos.push(todo);
  localStorage.setItem(TODOS, todos);
};

const handleSubmitTodo = (e) => {
  e.preventDefault();
  saveTodo(todoInput.value);
  displayTodos(todoInput.value);
  todoInput.value = "";
};

const displayTodos = (todo) => {
  const li = document.createElement("li");
  li.innerText = todo;
  todoList.appendChild(li);
};

const checkTodos = () => {
  const savedTodos = localStorage.getItem(TODOS);
  if (savedTodos) {
    todos = savedTodos.split(",");
    todos.forEach((todo) => displayTodos(todo));
  }
};

const todoInit = () => {
  todoForm.addEventListener("submit", handleSubmitTodo);
  checkTodos();
};

todoInit();
