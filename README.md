# api-workshop

🌐 API workshop for first-time API authors.

## Slides

<https://acmcsuf.com/api-workshop>

## Event text

Event text: Join us for our API workshop where we will demonstrate the process
of creating and deploying APIs for serverless platforms.

In this workshop, we will cover the following topics:

- Introduction to serverless architecture and its benefits
- Building RESTful APIs using modern frameworks and libraries
- Exploring serverless platforms such as Cloudflare/Deno/Supabase and Vercel
- Implementing API endpoints and handling requests and responses

The workshop will be held on Friday, June 23rd from 11am to 12pm Pacific Time in
the designated workshop voice channel of our Discord server.

To participate, please join our Discord server and navigate to the workshop
voice channel at the specified time on June 23rd.

Whether you're a beginner or an experienced developer, this workshop will
provide valuable insights and practical guidance for deploying APIs to
serverless platforms. Don't miss out on this opportunity to level up your API
development skills!

We look forward to having you join us!

## Run the HTTP server

> NOTE: [Install Deno](https://github.com/denoland/deno_install#readme) if you
> haven't already.

```sh
deno task start
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
