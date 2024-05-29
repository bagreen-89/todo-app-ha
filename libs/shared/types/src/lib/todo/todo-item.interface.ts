export interface TodoItem {
  id: number;
  clientId: string;

  completed: boolean;
  text: string;
}

export type TodoItemUpdate =
  | { completed: boolean }
  | { text: string }
  | { completed: boolean; text: string };
