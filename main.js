const todo_button_add = document.getElementById("todo-button-add");
const form_todo_add = document.getElementById("form-todo-add");
const form_todo_input = document.getElementById("form-todo-input");
const form_button_save = document.getElementById("form-button-save");
const form_close = document.getElementById("form-close");
const form = document.getElementById("form");
const todo_list = document.getElementById("todo-list");
const todo_input = document.getElementById("todo-input");
const todo_button_done_all = document.getElementById("todo-button-done-all");
const todo_button_all = document.getElementById("todo-button-all");

todo_button_add.addEventListener("click", () => {
  form_todo_add.classList.toggle("hidden");
});

form_close.addEventListener("click", () => {
  form_todo_add.classList.toggle("hidden");
});
let todos = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = form_todo_input.value.trim();

  if (todoText !== "" && !todos.some((todo) => todo.text === todoText)) {
    todos.push({ text: todoText, completed: false });
    form_todo_input.value = "";
    form_todo_add.classList.toggle("hidden");
    drawTodos(todos);
  }
});

const message = document.getElementById("message");
const message_text = document.getElementById("message-text");

function showMessage(text) {
  message.classList.remove("hidden");
  message_text.innerHTML = text;
}

function hideMessage() {
  message.classList.add("hidden");
}

function drawTodos(todosToDraw) {
  todo_list.innerHTML = "";
  hideMessage();

  if (todosToDraw.length > 0) {
    todosToDraw.forEach((todo, index) => {
      const todo_item = document.createElement("li");
      todo_item.classList.add("todo-item");
      if (todo.completed) {
        todo_item.classList.add("completed");
      }
      todo_item.innerHTML = `
        <span class="icon-complete material-symbols-outlined" id="icon-completed-${index}">done</span>
        <p class="text">${todo.text}</p>
        <span class="icon-delete material-symbols-outlined" id="icon-delete-${index}">close</span>
      `;

      todo_list.appendChild(todo_item);

      const todo_item_completed = document.getElementById(
        `icon-completed-${index}`
      );
      todo_item_completed.addEventListener("click", () => {
        todo.completed === true
          ? (todo.completed = false)
          : (todo.completed = true);
        saveTodos(todos);
        drawTodos(todos);
      });

      const todo_item_delete = document.getElementById(`icon-delete-${index}`);
      todo_item_delete.addEventListener("click", () => {
        deleteTodo(index);
      });
    });
  } else {
    showMessage("No hay todos para mostrar");
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos(todos);
  drawTodos(todos);
}

todo_input.addEventListener("input", handleInput);

function handleInput() {
  const todo_search = todo_input.value.toLowerCase();
  const todoSearcher = todos.filter((todo) =>
    todo.text.toLowerCase().includes(todo_search)
  );
  drawTodos(todoSearcher);
}

function saveTodos(t) {
  localStorage.setItem("todos", JSON.stringify(t));
}

function getTodos() {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
}

todo_button_done_all.addEventListener("click", () => {
  const todo_done = todos.filter((todo) => todo.completed === true);
  if (todo_done.length > 0) {
    drawTodos(todo_done);
    todo_button_done_all.classList.add("active");
    todo_button_all.classList.remove("active");
  }
});
todo_button_all.addEventListener("click", () => {
  drawTodos(todos);
  todo_button_all.classList.add("active");
  todo_button_done_all.classList.remove("active");
});
todos = getTodos();
drawTodos(todos);
