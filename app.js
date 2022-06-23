// Variables
const btnAdd = document.querySelector(".button-add");
const todoList = document.querySelector(".todo-items");
const todoInput = document.querySelector(".todo-input");
const todoSelect = document.querySelector("#option-main");
const dataTodo = {
  todoItem: [],
};

// Events
btnAdd.addEventListener("click", createTodo);

// Functions

const updateStorage = () => {
  localStorage.setItem("todo", JSON.stringify(dataTodo.todoItem));
};

// Functions
function createTodo(event) {
  event.preventDefault();

  if (todoInput.value.length > 0) {
    //Todo DIV main
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");

    //CHECK MARK BUTTON
    const check = document.createElement("div");
    // const completeImg = document.createElement("img");
    // completeImg.src = './images/icon-complete.png';
    // completeButton.appendChild(completeImg);
    check.classList.add("check");

    const checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");

    check.appendChild(checkMark);
    todoDiv.appendChild(check);

    check.addEventListener("click", () => {
        completeTodoList(todoDiv);
    });

    //Todo item text
    const todoText = document.createElement("todo-text");
    todoText.innerText = todoInput.value;
    dataTodo.todoItem.push(todoInput.value);
    todoInput.value = "";
    todoText.classList.add("todo-text");
    todoDiv.appendChild(todoText);

    //DELETE TODO
    const deleteButton = document.createElement("div");
    const deleteImg = document.createElement("img");
    deleteImg.src = "./images/icon-delete.png";

    (deleteImg, deleteButton).classList.add("delete-button");

    deleteButton.appendChild(deleteImg);
    todoDiv.appendChild(deleteButton);

    todoList.addEventListener("click", deleteTodoList);

    // Add todo
    todoList.appendChild(todoDiv);

    //SELECT OPTION
    todoSelect.addEventListener("click", selectTodo);

    // Update Storage
    updateStorage();
  } else {
    alert("Não é possível vazio.");
    return;
  }
};

const selectTodo = () => {
  if (todoSelect.value === "all") {
    for (let obj = 0; obj < todoList.children.length; obj++) {
      todoList.children[obj].classList.remove("delete-todo");
    }
  }

  if (todoSelect.value === "completed") {
    for (let obj = 0; obj < todoList.children.length; obj++) {
      if (todoList.children[obj].classList.contains("completed")) {
        todoList.children[obj].classList.remove("delete-todo");
      } else {
        todoList.children[obj].classList.add("delete-todo");
      }
    }
  }

  if (todoSelect.value === "pendent") {
    for (let obj = 0; obj < todoList.children.length; obj++) {
      if (todoList.children[obj].classList.contains("completed")) {
        todoList.children[obj].classList.add("delete-todo");
      } else if (todoList.children[obj].classList.contains("delete-todo")) {
        todoList.children[obj].classList.remove("delete-todo");
      }
    }
  }
};

const completeTodoList = (todoDiv) => {
  todoDiv.classList.toggle("completed");
  selectTodo();
};

const deleteTodoList = (e) => {
  const item = e.target;

  if(item.classList[0] === "delete-button"){
    const todo = item.parentElement;
    for(let todos of todo.children){
        if(todos.classList[0] === "todo-text"){
          dataTodo.todoItem.splice(dataTodo.todoItem.indexOf(todos.innerText), 1);
        }
    }
    todo.remove();
    updateStorage(); 
  }
};

window.onload = storageLocal();

function storageLocal() {
  const data = JSON.parse(localStorage.getItem("todo"));
  if (data) {
      data.map((element) => {

      //Todo DIV
      dataTodo.todoItem.push(element);
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-item");

      //CHECK MARK BUTTON
      const check = document.createElement("div");
      // const completeImg = document.createElement("img");
      // completeImg.src = './images/icon-complete.png';
      // completeButton.appendChild(completeImg);
      check.classList.add("check");

      const checkMark = document.createElement("div");
      checkMark.classList.add("check-mark");

      check.appendChild(checkMark);
      todoDiv.appendChild(check);

      check.addEventListener("click", () => {
        completeTodoList(todoDiv);
      });

      //Todo item text
      const todoText = document.createElement("todo-text");
      todoText.innerText = element;
      todoText.classList.add("todo-text");
      todoDiv.appendChild(todoText);

      //DELETE TODO
      const deleteButton = document.createElement("div");
      const deleteImg = document.createElement("img");
      deleteImg.src = "./images/icon-delete.png";

      deleteButton.classList.add("delete-button");

      deleteButton.appendChild(deleteImg);
      todoDiv.appendChild(deleteButton);

      
      todoList.addEventListener("click", deleteTodoList);

      // Add todo
      todoList.appendChild(todoDiv);

      //SELECT OPTION
      todoSelect.addEventListener("click", selectTodo);
      
      // Update Storage
      updateStorage();
    });
  }
};
