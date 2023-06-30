import type { Todo } from "./todo.ts";

/**
 * todos is an array of Todo objects.
 *
 * This is our "database" for this application.
 */
const todos: Todo[] = [];

/**
 * getTodos retrieves all todos.
 * @returns An array of todos.
 */
export function getTodos(): Todo[] {
  return todos;
}

/**
 * getTodoById retrieves a todo by its ID.
 */
export function getTodoById(id: string): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

/**
 * createTodo creates a new todo.
 */
export function createTodo(
  title: string,
  completed: boolean,
): Todo {
  const id = generateId();
  const todo: Todo = { id, title, completed };
  todos.push(todo);
  return todo;
}

/**
 * updateTodo updates the properties of a todo.
 */
export function updateTodo(
  id: string,
  title?: string,
  completed?: boolean,
): Todo | undefined {
  const todo = getTodoById(id);
  if (todo) {
    if (title) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
  }
  return todo;
}

/**
 * deleteTodo deletes a todo by its ID.
 */
export function deleteTodo(id: string): Todo | undefined {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    return todos.splice(index, 1)[0];
  }
}

/**
 * generateId generates a random ID for a todo.
 */
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
