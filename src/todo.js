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
  const todoObj = {
    todo,
    id: todos.length + 1,
  };
  todos.push(todoObj);
  localStorage.setItem(TODOS, JSON.stringify(todos));
};

const handleSubmitTodo = (e) => {
  e.preventDefault();
  if (todoInput.value) {
    saveTodo(todoInput.value);
    displayTodos(todoInput.value);
    todoInput.value = "";
    if (todoList.classList.contains("hidden")) {
      todoHeaderIcon.style.transform = "rotate(180deg)";
      todoList.classList.remove("hidden");
      todoHeader.style.backgroundColor = "#2d3436";
    }
  }
};

const handelClickDelBtn = (e) => {
  const delTodo = e.target.parentNode;
  const cleanTodos = todos.filter((el) => parseInt(delTodo.id, 10) !== el.id);
  todos.length = 0;
  todoList.innerHTML = "";
  if (cleanTodos.length !== 0) {
    cleanTodos.forEach((el) => {
      saveTodo(el.todo);
      displayTodos(el.todo);
    });
  } else {
    localStorage.removeItem(TODOS);
  }
};

const displayTodos = (todo) => {
  const li = document.createElement("li");
  const checkBox = document.createElement("input");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  li.id = todos[todos.length - 1].id;
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
    const parsedTodos = JSON.parse(savedTodos);
    parsedTodos.forEach((el) => {
      saveTodo(el.todo);
      displayTodos(el.todo);
    });
  }
};

const todoInit = () => {
  todoForm.addEventListener("submit", handleSubmitTodo);
  todoHeader.addEventListener("click", handleClickTodoHeader);
  checkTodos();
};

todoInit();
