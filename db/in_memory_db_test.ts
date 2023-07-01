import { assertEquals } from "../deps.ts";
import { InMemoryDB } from "./in_memory_db.ts";

Deno.test("getTodos should return an empty array initially", async () => {
  const db = new InMemoryDB();
  const todos = await db.getTodos();
  assertEquals(todos, []);
});

Deno.test("getTodoByID should return undefined if the todo does not exist", async () => {
  const db = new InMemoryDB();
  const todo = await db.getTodoByID("nonexistent-id");
  assertEquals(todo, undefined);
});

Deno.test("deleteTodo should remove and return the deleted todo if it exists", async () => {
  const db = new InMemoryDB();
  const todo = await db.createTodo("Test Todo", false);
  const deletedTodo = await db.deleteTodo(todo.id);
  assertEquals(deletedTodo, todo);
});

Deno.test("deleteTodo should return undefined if the todo does not exist", async () => {
  const db = new InMemoryDB();
  const deletedTodo = await db.deleteTodo("nonexistent-id");
  assertEquals(deletedTodo, undefined);
});

Deno.test("createTodo should create and return a new todo", async () => {
  const db = new InMemoryDB();
  const todo = await db.createTodo("New Todo", false);
  assertEquals(todo.title, "New Todo");
  assertEquals(todo.completed, false);
});

Deno.test("updateTodo should update the todo's title and completed status", async () => {
  const db = new InMemoryDB();
  const todo = await db.createTodo("Old Todo", false);
  const updatedTodo = await db.updateTodo(todo.id, "Updated Todo", true);
  assertEquals(updatedTodo?.title, "Updated Todo");
  assertEquals(updatedTodo?.completed, true);
});

Deno.test("updateTodo should return undefined if the todo does not exist", async () => {
  const db = new InMemoryDB();
  const updatedTodo = await db.updateTodo(
    "nonexistent-id",
    "Updated Todo",
    true,
  );
  assertEquals(updatedTodo, undefined);
});
