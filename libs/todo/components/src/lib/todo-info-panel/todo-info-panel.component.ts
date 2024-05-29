import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToDoStore } from '@todo-app-ha/todo/data-access';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'ha-todo-info',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './todo-info-panel.component.html',
  styleUrl: './todo-info-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TodoInfoPanelComponent {
  private readonly todoStore = inject(ToDoStore);

  completedCount = this.todoStore.completedCount;
  notCompletedCount = this.todoStore.notCompletedCount;
}
