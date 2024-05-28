import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ToDoState, initialState } from './store/todo.state';
import { ToDoService } from './todo.service';
import { inject } from '@angular/core';
import { first } from 'rxjs';

export const ToDoStore = signalStore(
  { providedIn: 'root' },
  withState<ToDoState>(initialState),
  withMethods((store, toDoSvc = inject(ToDoService)) => ({
    getToDos(): void {
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
            next: (a) => {
              console.log(a);
              this.getToDos();
              resolve();
            },
            error: () => {
              reject();
            },
          })
      );
    },
  }))
);
