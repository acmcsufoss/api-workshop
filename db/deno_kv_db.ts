import { DB } from "./db.ts";
import { Todo } from "../todo.ts";

export class DenoKvDB implements DB {
  constructor(
    private readonly kv: Deno.Kv,
    private readonly namespace: Deno.KvKey = [],
  ) {}

  async getTodos(): Promise<Todo[]> {
    const todos: Todo[] = [];
    const it = this.kv.list<Todo>({ prefix: [...this.namespace, "todos"] });
    for await (const { key, value } of it) {
      todos.push({
        id: String(key[1 + this.namespace.length]),
        title: value.title,
        completed: value.completed,
      });
    }

    return todos;
  }

  async getTodoByID(id: string): Promise<Todo | undefined> {
    const result = await this.kv.get<Todo>([...this.namespace, "todos", id]);
    if (result.value) {
      return {
        id,
        title: result.value.title,
        completed: result.value.completed,
      };
    }

    return undefined;
  }

  async deleteTodo(id: string): Promise<Todo | undefined> {
    const result = await this.kv.get<Todo>([...this.namespace, "todos", id]);
    if (result.value) {
      await this.kv.delete([...this.namespace, "todos", id]);
      return {
        id,
        title: result.value.title,
        completed: result.value.completed,
      };
    }

    return undefined;
  }

  async createTodo(
    title: string,
    completed: boolean,
  ): Promise<Todo> {
    const id = this.generateID();
    const todo: Todo = { id, title, completed };
    await this.kv.set([...this.namespace, "todos", id], todo);
    return todo;
  }

  async updateTodo(
    id: string,
    title?: string,
    completed?: boolean,
  ): Promise<Todo | undefined> {
    const result = await this.kv.get<Todo>([...this.namespace, "todos", id]);
    if (result.value) {
      if (title) {
        result.value.title = title;
      }

      if (completed !== undefined) {
        result.value.completed = completed;
      }

      await this.kv.set([...this.namespace, "todos", id], result.value);
      return {
        id,
        title: result.value.title,
        completed: result.value.completed,
      };
    }

    return undefined;
  }

  private generateID(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
