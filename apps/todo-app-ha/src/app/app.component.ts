import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  NewTodoItemComponent,
  TodoItemComponent,
} from '@todo-app-ha/todo/components';
import { ToDoStore } from '@todo-app-ha/todo/data-access';

@Component({
  standalone: true,
  selector: 'ha-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [ToDoStore],
  imports: [TodoItemComponent, NewTodoItemComponent],
})
export class AppComponent {
  private readonly toDoStore = inject(ToDoStore);

  public todos = this.toDoStore.data;

  constructor() {
    this.toDoStore.getToDos();
  }
}
