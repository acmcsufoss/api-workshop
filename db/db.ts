import type { Todo } from "../todo.ts";

/**
 * DB is the interface for a Todo resource database.
 */
export interface DB {
  /**
   * getTodos retrieves all todos.
   */
  getTodos(): Promise<Todo[]>;

  /**
   * getTodoByID retrieves a todo by its ID.
   */
  getTodoByID(id: string): Promise<Todo | undefined>;

  /**
   * deleteTodo deletes a todo by its ID.
   */
  deleteTodo(id: string): Promise<Todo | undefined>;

  /**
   * createTodo creates a new todo.
   */
  createTodo(
    title: string,
    completed: boolean,
  ): Promise<Todo>;

  /**
   * updateTodo updates the properties of a todo.
   */
  updateTodo(
    id: string,
    title?: string,
    completed?: boolean,
  ): Promise<Todo | undefined>;
}
