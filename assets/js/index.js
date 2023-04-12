// Select DOM elements
const createButton = document.querySelector(".create-button");
const listArea = document.querySelector(".list-area");
const valueInput = document.querySelector('input[name="todos"]');

// Initialize empty array to hold todos
let todos = [];

// Constructor function for creating new todo objects
function TodoItem(name, checked, isDelete) {
  this.name = name;
  this.checked = checked;
  this.isDelete = isDelete;
}

// Function to remove a todo item from the list and from the todos array
const removeListItem = (id) => {
  // Select all list items
  let listItems = document.querySelectorAll(".list-index");

  // If there's only one item left, remove it
  if (listItems.length === 1 && id === "1") {
    listItems[id - 1].remove();
  } else {
    // Otherwise, remove the item at the specified index
    listItems[id].remove();
  }

  // Remove the todo item from the todos array
  todos.splice(id, 1);

  // Return the updated todos array
  return todos;
};

// Event listener for when the create button is clicked
createButton.addEventListener("click", (e) => {
  e.preventDefault();

  // If there are already 5 todos, don't allow another one to be added
  if (todos.length >= 5) {
    alert("Cannot add task, you already have 5 tasks in the list.");
    return;
  }

  // If the input value is less than 5 characters, don't allow a todo to be created
  if (valueInput.value.length < 5) {
    alert("Input length cannot be less than 5 characters.");
    return;
  }

  // Create a new todo object and add it to the todos array
  const newTodo = new TodoItem(valueInput.value, false, false);
  todos.push(newTodo);

  // Clear the input field
  valueInput.value = "";

  // Generate HTML for the todo list
  let listHTML = "";
  todos.forEach((item, index) => {
    if (!item.isDelete) {
      listHTML += `
        <li class="list-index">
          <div class="task-list">
            <p>${item.name}</p>
            <button class="complete-button">complete</button>
            <button data-id="${index}" class="remove-button">remove</button>
          </div>
        </li>
      `;
    }
  });

  // Update the list area with the new HTML
  listArea.innerHTML = listHTML;

  // Select all task list items and complete buttons
  const taskItems = document.querySelectorAll(".task-list");
  const completeButtons = document.querySelectorAll(".complete-button");

  // Add event listeners to each complete button
  completeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Prompt the user to confirm completion
      const confirmation = confirm("Complete?");

      // Add or remove the 'checked' class based on user response
      if (confirmation) {
        taskItems[index].classList.add("checked");
      } else {
        taskItems[index].classList.remove("checked");
      }
    });
  });

  // Select all remove buttons
  const removeButtons = document.querySelectorAll(".remove-button");

  // Add event listeners to each remove button
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      // Get the index of the todo to remove from the "data-id" attribute
      const id = e.target.dataset.id;
      removeListItem(id);
    });
  });
});
