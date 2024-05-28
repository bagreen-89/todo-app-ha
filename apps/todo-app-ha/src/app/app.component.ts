import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ToDoStore } from '@todo-app-ha/todo/data-access';

@Component({
  standalone: true,
  selector: 'ha-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ToDoStore],
})
export class AppComponent {
  private readonly toDoStore = inject(ToDoStore);

  public todos = this.toDoStore.data;

  constructor() {
    this.toDoStore.getToDos();
  }
}
