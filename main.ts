import { logger, parseBoolean } from "./deps.ts";
import { PORT } from "./env.ts";
import { parseTodoID } from "./todo.ts";
import { InMemoryDB } from "./db/in_memory_db.ts";

const db = new InMemoryDB();

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
      logger.info("Found index.html");
      return new Response(body, {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    }

    case request.method === "GET" && url.pathname === "/db.js": {
      const body = Deno.readTextFileSync("static/db.js");
      logger.info("Found db.js");
      return new Response(body, {
        status: 200,
        headers: { "Content-Type": "application/javascript" },
      });
    }

    case request.method === "GET" && url.pathname === "/todos": {
      const todos = await db.getTodos();
      logger.info(`Found todos: ${JSON.stringify(todos)}`);
      return new Response(JSON.stringify(todos), { status: 200 });
    }

    case request.method === "GET" && url.pathname.startsWith("/todos/"): {
      const id = parseTodoID(url.pathname);
      const todo = await db.getTodoByID(id);
      if (!todo) {
        return new Response("Not Found", { status: 404 });
      }

      logger.info(`Found todo: ${JSON.stringify(todo)}`);
      return new Response(JSON.stringify(todo), { status: 200 });
    }

    case request.method === "POST" && url.pathname === "/todos": {
      const body = await request.formData();
      const formData = Object.fromEntries(body.entries());
      if (!formData.title) {
        return new Response("Bad Request", { status: 400 });
      }

      const todo = await db.createTodo(
        String(formData.title),
        parseBoolean(formData.completed as string) || false,
      );
      logger.info(`Created todo: ${JSON.stringify(todo)}`);
      return Response.redirect(url.origin);
    }

    case request.method === "POST" &&
      url.pathname.startsWith("/todos/") &&
      url.pathname.endsWith("/delete"): {
      const id = parseTodoID(url.pathname);
      const todo = await db.deleteTodo(id);
      if (!todo) {
        return new Response("Not Found", { status: 404 });
      }

      logger.info(`Deleted todo: ${JSON.stringify(todo)}`);
      return Response.redirect(url.origin);
    }

    case request.method === "POST" && url.pathname.startsWith("/todos/"): {
      const id = parseTodoID(url.pathname);
      const formData = Object.fromEntries((await request.formData()).entries());
      const title = String(formData.title);
      const completed = parseBoolean(formData.completed as string) || false;
      const todo = await db.updateTodo(id, title, completed);
      if (!todo) {
        return new Response("Not Found", { status: 404 });
      }

      logger.info(`Updated todo: ${JSON.stringify(todo)}`);
      return Response.redirect(url.origin);
    }

    default: {
      return new Response("Not Found", { status: 404 });
    }
  }
}
