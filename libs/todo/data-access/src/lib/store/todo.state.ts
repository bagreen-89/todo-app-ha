import { TodoItem } from '@todo-app-ha/types';

export interface ToDoState {
  showCompleted: boolean;
  data: TodoItem[];
}
export const initialState: ToDoState = {
  showCompleted: true,
  data: [],
};
