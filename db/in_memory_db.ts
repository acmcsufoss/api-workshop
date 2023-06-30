import type { Todo } from "../todo.ts";
import type { DB } from "./db.ts";

/**
 * InMemoryDB is an implementation of the DB interface
 * that stores the todos in memory.
 */
export class InMemoryDB implements DB {
  private todos: Todo[] = [];

  constructor() {}

  public getTodos(): Promise<Todo[]> {
    return Promise.resolve(this.todos);
  }

  public getTodoByID(id: string): Promise<Todo | undefined> {
    const todo = this.todos.find((todo) => todo.id === id);
    return Promise.resolve(todo);
  }

  public deleteTodo(id: string): Promise<Todo | undefined> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      return Promise.resolve(this.todos.splice(index, 1)[0]);
    }

    return Promise.resolve(undefined);
  }

  public createTodo(
    title: string,
    completed: boolean,
  ): Promise<Todo> {
    const id = this.generateID();
    const todo: Todo = { id, title, completed };
    this.todos.push(todo);
    return Promise.resolve(todo);
  }

  public updateTodo(
    id: string,
    title?: string,
    completed?: boolean,
  ): Promise<Todo | undefined> {
    return this.getTodoByID(id).then((todo) => {
      if (todo) {
        if (title) {
          todo.title = title;
        }

        if (completed !== undefined) {
          todo.completed = completed;
        }
      }

      return todo;
    });
  }

  private generateID(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
