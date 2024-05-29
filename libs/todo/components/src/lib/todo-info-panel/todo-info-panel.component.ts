import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ToDoStore } from '@todo-app-ha/todo/data-access';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ha-todo-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './todo-info-panel.component.html',
  styleUrl: './todo-info-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TodoInfoPanelComponent {
  private readonly todoStore = inject(ToDoStore);

  completedCount = this.todoStore.completedCount;
  notCompletedCount = this.todoStore.notCompletedCount;
}
