const btnSend = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const todoInput = document.querySelector(".todo_input");
const todoSelect = document.querySelector("#option_main");

btnSend.addEventListener("click", (event) => {
  event.preventDefault();

  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  todoInput.value = "";
  newTodo.classList.add("todo_item");
  todoDiv.appendChild(newTodo);

  //CHECK MARK BUTTON
  const completeButton = document.createElement("button");
  completeButton.innerHTML = "V";
  completeButton.classList.add("complete_btn");
  todoDiv.appendChild(completeButton);

  completeButton.addEventListener("click", () => {
    todoDiv.classList.toggle("completed");
    completeButton.style.display = "none";
  });

  //DELETE TODO
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "X";
  deleteButton.classList.add("delete_btn");
  todoDiv.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    todoDiv.remove(this);
  });

  todoList.appendChild(todoDiv);

  //SELECT OPTION
  todoSelect.addEventListener("click", () => {
    if (todoSelect.value === "all") {
      for (let obj = 0; obj < todoList.children.length; obj++) {
        todoList.children[obj].classList.remove("delete-todo");
      }
    }

    if (todoSelect.value === "completed") {
      for (let obj = 0; obj < todoList.children.length; obj++) {
        if (todoList.children[obj].classList.contains("completed")) {
          todoList.children[obj].classList.remove("delete-todo");
        }
        else {
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
  });
});
