const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");

const TODO_KEY = "todoList";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);

  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();

  const newTodo = todoInput.value;
  todoInput.value = "";
  const newToDoObj = {
    text: newTodo,
    id: Date.now(),
  };

  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodoList = localStorage.getItem(TODO_KEY);

if (savedTodoList !== null) {
  const parseToDos = JSON.parse(savedTodoList);
  toDos = parseToDos;
  toDos.forEach(paintToDo);
}

const getUser = localStorage.getItem(USERNAME_KEY);

if(getUser != null){
  console.log("user:", getUser);
  todoForm.classList.remove(HIDDEN_CLASS);
}