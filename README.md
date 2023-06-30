# api-workshop

🌐 API workshop for first-time API authors.

## Slides

<https://acmcsuf.com/api-workshop>

## Run the HTTP server

> NOTE: [Install Deno](https://github.com/denoland/deno_install#readme) if you haven't already.

```sh
deno run --allow-net --allow-read --allow-env --unstable main.ts
```

## Test the HTTP server

- Visit <https://localhost:8080/>.
- Run the following code snippets in your browser's JavaScript console.

```js
// Get all todos
todos = await getTodos();
console.log("Todos:", todos);
```

```js
// Create a new todo
const newTodo = await createTodo("New Todo", false);
console.log("New Todo:", newTodo);
```

```js
// Get a specific todo by ID
todoID = newTodo.id; // Assuming the response has an 'id' property
foundTodo = await getTodoByID(todoID);
console.log("Found Todo:", foundTodo);
```

```js
// Update a todo by ID
updatedTodo = await updateTodoByID(todoID, "Updated Todo", true);
console.log("Updated Todo:", updatedTodo);
```

```js
// Delete a todo by ID
deletedTodo = await deleteTodoByID(todoID);
console.log("Deleted Todo:", deletedTodo);
```

---

Presented with ❤️ by [**@EthanThatOneKid**](https://etok.codes/)
