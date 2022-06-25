// Variables
const btnSetting = document.querySelector(".setting");
const btnSettingMenu = document.querySelector(".menu-setting");
const btnAdd = document.querySelector(".button-add");
const todoList = document.querySelector(".todo-items");
const todoInput = document.querySelector(".todo-input");
const todoSelect = document.querySelector("#option-main");
const dataTodo = {
  todoItem: [],
};

delete

// Events
btnAdd.addEventListener("click", createTodo);
btnSetting.addEventListener("click", settingButton);

// Functions
function updateStorage (){
  localStorage.setItem("todo", JSON.stringify(dataTodo.todoItem));
};

function createTodo(event) {
  event.preventDefault();

  if (todoInput.value.length > 0) {
    //Todo DIV main
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");

    //CHECK MARK BUTTON
    const check = document.createElement("div");
    check.classList.add("check");

    const checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");

    check.appendChild(checkMark);
    todoDiv.appendChild(check);
    
    check.addEventListener("click", () => {
        completeTodoList(todoDiv, checkMark);
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

function selectTodo() {
  if (todoSelect.value === "all") {
    for (let obj = 0; obj < todoList.children.length; obj++) {
      todoList.children[obj].classList.remove("delete");
    }
  }

  if (todoSelect.value === "completed") {
    for (let obj = 0; obj < todoList.children.length; obj++) {
      if (todoList.children[obj].classList.contains("completed")) {
        todoList.children[obj].classList.remove("delete");
      } else {
        todoList.children[obj].classList.add("delete");
      }
    }
  }

  if (todoSelect.value === "pendent") {
    for (let obj = 0; obj < todoList.children.length; obj++) {
      if (todoList.children[obj].classList.contains("completed")) {
        todoList.children[obj].classList.add("delete");
      } else if (todoList.children[obj].classList.contains("delete")) {
        todoList.children[obj].classList.remove("delete");
      }
    }
  }
};

function completeTodoList(todoDiv, checkMark) {
  todoDiv.classList.toggle("completed");
  checkMark.classList.toggle("completed-check");

  selectTodo();
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
        completeTodoList(todoDiv, checkMark);
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

function deleteTodoList(e) {
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

// Setting button
function settingButton() {
  const setting = btnSetting.children[0];

  setting.classList.toggle("active-setting");
  btnSettingMenu.classList.toggle("delete");

  if(!setting.classList.contains("active-setting")){
    setting.classList.add("active-setting-out");
  } 
  else {
    setting.classList.remove("active-setting-out");
  }
}