const todoList = document.querySelector(".content-todo-list"),
  todoForm = document.querySelector(".content-todo__form"),
  todoInput = todoForm.querySelector("input"),
  todoHeader = document.querySelector(".content-todo__header"),
  todoHeaderIcon = todoHeader.querySelector("svg");
const TODOS = "todos";
let todos = [];

const handleClickTodoHeader = () => {
  if (todoHeaderIcon.style.transform === "rotate(180deg)") {
    todoHeaderIcon.style.transform = "";
    todoList.classList.add("hidden");
    todoHeader.style.backgroundColor = "inherit";
  } else {
    todoHeaderIcon.style.transform = "rotate(180deg)";
    todoList.classList.remove("hidden");
    todoHeader.style.backgroundColor = "#2d3436";
  }
};

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

const handelClickDelBtn = () => {};

const displayTodos = (todo) => {
  const li = document.createElement("li");
  const checkBox = document.createElement("input");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) span.style.textDecoration = "line-through";
    else span.style.textDecoration = "none";
  });
  span.innerText = todo;
  delBtn.innerText = "❌";
  delBtn.classList.add("hidden");
  delBtn.addEventListener("click", handelClickDelBtn);
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.addEventListener("mouseover", () => delBtn.classList.remove("hidden"));
  li.addEventListener("mouseout", () => delBtn.classList.add("hidden"));
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
  todoHeader.addEventListener("click", handleClickTodoHeader);
  checkTodos();
};

todoInit();
