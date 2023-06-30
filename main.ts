import { PORT } from "./env.ts";
import { parseTodoID } from "./todo.ts";
import * as db from "./db.ts";

if (import.meta.main) {
  main();
}

/**
 * main is the entrypoint of the application.
 */
function main() {
  Deno.serve({ port: PORT }, handle);
}

async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);

  switch (true) {
    case request.method === "GET" && url.pathname === "/": {
      const body = Deno.readTextFileSync("static/index.html");
      return new Response(body, {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    }

    case request.method === "GET" && url.pathname === "/todos": {
      const todos = db.getTodos();
      return new Response(JSON.stringify(todos), { status: 200 });
    }

    case request.method === "POST" && url.pathname === "/todos": {
      const body = await request.formData();
      const formData = Object.fromEntries(body.entries());
      console.log({ formData });
      // const todo = db.createTodo(
      //   String(formData.title),
      //   Boolean(formData.completed),
      // );
      return new Response(JSON.stringify({}), { status: 201 });
    }

    case request.method === "PUT" && url.pathname.startsWith("/todos/"): {
      const id = parseTodoID(url.pathname);
      const body = await request.text();
      const { title, completed } = JSON.parse(body);
      const todo = db.updateTodo(id, title, completed);
      if (todo) {
        return new Response(JSON.stringify(todo), { status: 200 });
      }

      return new Response("Not Found", { status: 404 });
    }

    case request.method === "DELETE" && url.pathname.startsWith("/todos/"): {
      const id = parseTodoID(url.pathname);
      const todo = db.deleteTodo(id);
      if (todo) {
        return new Response(JSON.stringify(todo), { status: 200 });
      }

      return new Response("Not Found", { status: 404 });
    }

    default: {
      return new Response("Not Found", { status: 404 });
    }
  }
}
