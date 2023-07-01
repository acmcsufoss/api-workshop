/**
 * Todo is an interface representing a task with an ID, title, and completion status.
 */
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

/**
 * parseTodoID parses the ID of a todo from a URL.
 */
export function parseTodoID(pathname: string): string {
  const [, , id] = pathname.split("/");
  return id;
}
