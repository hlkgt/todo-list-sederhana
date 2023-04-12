const createButton = document.querySelector(".create-button");
const listArea = document.querySelector(".list-area");
let valueInput = document.querySelector('input[name="todos"]');

let todos = [];

function Todos(name, checked, isDelete) {
  this.name = name;
  this.checked = checked;
  this.isDelete = isDelete;
}

const removeList = (id) => {
  let listIndex = document.querySelectorAll(".list-index");
  todos.splice(listIndex[id], 1);
  listIndex[id].remove();
  return todos;
};

createButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (todos.length < 5) {
    if (valueInput.value.length < 5) {
      return alert("Input Length  cant under 5 character");
    } else {
      let getValue = valueInput.value;
      let createTodo = new Todos(getValue, false, false);
      todos.push(createTodo);
    }
  } else {
    alert("Cannot Add Task, u have 5 task in list task");
  }
  valueInput.value = "";
  let todo = "";
  todos.forEach((item, index) => {
    if (item.isDelete === false) {
      todo += `<li class="list-index">
                <div class="task-list">
                  <p>${item.name}</p>
                  <button>complete</button>
                  <button data-id="${index}" class="remove-button">remove</button>
                </div>
              </li>`;
    }
  });
  listArea.innerHTML = todo;
  let removeButton = document.querySelectorAll(".remove-button");
  for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener("click", (e) => {
      e.preventDefault();
      let getId = e.target.dataset.id;
      removeList(getId);
    });
  }
});
