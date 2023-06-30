# api-workshop

🌐 API workshop for first-time API authors.

## Run the HTTP server

> NOTE: [Install Deno](https://github.com/denoland/deno_install#readme) if you haven't already.

```sh
deno run --allow-net --allow-env --unstable main.ts
```

### Test the HTTP server

```js
// Helper function to make HTTP requests using Fetch API
async function makeRequest(url, method, body) {
  const response = await fetch(url, {
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
async function getTodos() {
  const response = await makeRequest("/todos", "GET");
  return response.data;
}

// Function to create a new todo
async function createTodo(title, completed) {
  const todo = { title, completed };
  const response = await makeRequest("/todos", "POST", todo);
  return response.data;
}

// Function to get a todo by ID
async function getTodoById(id) {
  const response = await makeRequest(`/todos/${id}`, "GET");
  return response.data;
}

// Function to update a todo by ID
async function updateTodoById(id, title, completed) {
  const todo = { title, completed };
  const response = await makeRequest(`/todos/${id}`, "PUT", todo);
  return response.data;
}

// Function to delete a todo by ID
async function deleteTodoById(id) {
  const response = await makeRequest(`/todos/${id}`, "DELETE");
  return response.data;
}

// Example usage:
async function testAPI() {
  try {
    // Get all todos
    const todos = await getTodos();
    console.log("Todos:", todos);

    // Create a new todo
    const newTodo = await createTodo("New Todo", false);
    console.log("New Todo:", newTodo);

    // Get a specific todo by ID
    const todoId = newTodo.id; // Assuming the response has an 'id' property
    const foundTodo = await getTodoById(todoId);
    console.log("Found Todo:", foundTodo);

    // Update a todo by ID
    const updatedTodo = await updateTodoById(todoId, "Updated Todo", true);
    console.log("Updated Todo:", updatedTodo);

    // Delete a todo by ID
    const deletedTodo = await deleteTodoById(todoId);
    console.log("Deleted Todo:", deletedTodo);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the testAPI function to initiate the API testing
testAPI();
```
