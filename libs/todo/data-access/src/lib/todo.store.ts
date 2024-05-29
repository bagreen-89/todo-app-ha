import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ToDoState, initialState } from './store/todo.state';
import { ToDoService } from './todo.service';
import { computed, inject } from '@angular/core';
import { first } from 'rxjs';
import { TodoItem, TodoItemUpdate } from '@todo-app-ha/types';

export const ToDoStore = signalStore(
  { providedIn: 'root' },
  withState<ToDoState>(initialState),

  withComputed(({ data, showCompleted }) => ({
    visibleTodos: computed(() =>
      showCompleted() ? data() : data().filter((item) => !item.completed)
    ),
    completedCount: computed(() =>
      data().reduce((result, item) => {
        if (item.completed) {
          result++;
        }
        return result;
      }, 0)
    ),
    notCompletedCount: computed(() =>
      data().reduce((result, item) => {
        if (!item.completed) {
          result++;
        }
        return result;
      }, 0)
    ),
  })),

  withMethods((store, toDoSvc = inject(ToDoService)) => ({
    getToDos(): void {
      patchState(store, (state) => ({ ...state }));
      toDoSvc
        .getTodos()
        .pipe(first())
        .subscribe((data) => {
          patchState(store, () => ({ data }));
        });
    },

    createTodo(text: string): Promise<void> {
      return new Promise((resolve, reject) =>
        toDoSvc
          .postTodo(text)
          .pipe(first())
          .subscribe({
            next: (newItem) => {
              patchState(store, (state) => ({
                ...state,
                data: [newItem, ...state.data],
              }));
              resolve();
            },
            error: () => {
              reject();
            },
          })
      );
    },

    removeTodo(id: number): void {
      toDoSvc
        .deleteTodo(id)
        .pipe(first())
        .subscribe((deletedCount: number) => {
          if (deletedCount > 0) {
            patchState(store, (state) => ({
              ...state,
              data: store.data().filter((item) => item.id !== id),
            }));
          }
        });
    },

    updateTodo(id: number, updates: TodoItemUpdate): Promise<void> {
      return new Promise((resolve, reject) =>
        toDoSvc
          .putTodo(id, updates)
          .pipe(first())
          .subscribe({
            next: (newItem: TodoItem) => {
              patchState(store, (state) => ({
                ...state,
                data: store
                  .data()
                  .map((item) =>
                    item.id === id ? { ...item, ...newItem } : item
                  ),
              }));
              resolve();
            },
            error: () => {
              reject();
            },
          })
      );
    },

    completeAllTodos(): void {
      toDoSvc
        .patchAllTodosToCompleted()
        .pipe(first())
        .subscribe(() => this.getToDos());
    },

    setShowCompleted(showCompleted: boolean): void {
      patchState(store, (state) => ({ ...state, showCompleted }));
    },
  }))
);
