// Helper function to make HTTP requests using Fetch API
async function makeRequest(pathname, method, body) {
  const response = await fetch(`http://localhost:8080${pathname}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return { status: response.status, data };
}

// Function to get all todos
export async function getTodos() {
  const response = await makeRequest("/todos", "GET");
  return response.data;
}

// Function to create a new todo
export async function createTodo(title, completed) {
  const todo = { title, completed };
  const response = await makeRequest("/todos", "POST", todo);
  return response.data;
}

// Function to get a todo by ID
export async function getTodoByID(id) {
  const response = await makeRequest(`/todos/${id}`, "GET");
  return response.data;
}

// Function to update a todo by ID
export async function updateTodoByID(id, title, completed) {
  const todo = { title, completed };
  const response = await makeRequest(`/todos/${id}`, "PUT", todo);
  return response.data;
}

// Function to delete a todo by ID
export async function deleteTodoByID(id) {
  const response = await makeRequest(`/todos/${id}`, "DELETE");
  return response.data;
}
