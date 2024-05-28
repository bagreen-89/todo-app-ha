import { TodoItem } from '@todo-app-ha/types';

export interface ToDoState {
  data: TodoItem[];
}
export const initialState: ToDoState = {
  data: [],
};
