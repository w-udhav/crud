async function addTodo() {
  const todoTitle = document.getElementById("todoTitle").value;
  if (!todoTitle) {
    alert("Please enter a todo title");
    return;
  }
  try {
    const res = await fetch("/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: todoTitle }),
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    displayTodo();
  } catch (error) {
    console.log(error);
    alert("Failed to load todos");
  }
}

async function fetchTodos() {
  try {
    const res = await fetch("/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    alert("Failed to load todos");
  }
}

async function editTodo(id) {
  const newData = prompt("Enter new todo");
  if (!newData) {
    return;
  }
  try {
    const res = await fetch(`/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: newData }),
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    displayTodo();
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    displayTodo();
  } catch (error) {
    console.log(error);
  }
}

function displayTodo() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  fetchTodos().then((data) => {
    if (data.length === 0) {
      todoList.innerHTML = `<p class="empty">No todos found</p>`;
    }
    data.forEach((todo) => {
      const { id, data: todoTitle, lastUpdated } = todo;
      const newDate = new Date(lastUpdated);
      const formatedDate =
        newDate.getDate() +
        "-" +
        (newDate.getMonth() + 1) +
        "-" +
        newDate.getFullYear();
      const todoItem = document.createElement("li");
      todoItem.innerHTML = `
      <div class="todo-title">
        <p>${todoTitle}</p>
        <p>${formatedDate}</p>
      </div>
      <div>
        <button type="button" onclick="editTodo(${id})">
          <img src="./assets/edit.svg" alt="edit" class="editIcon" />
        </button>
        <button type="button" onclick="deleteTodo(${id})">
          <img src="./assets/delete.svg" alt="delete" class="deleteIcon" />
        </button>
      </div>
      `;
      todoList.appendChild(todoItem);
    });
  });
}

displayTodo();
