import {
  Component,
  ElementRef,
  ViewEncapsulation,
  effect,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToDoStore } from '@todo-app-ha/todo/data-access';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'ha-todo-controls',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './todo-control-panel.component.html',
  styleUrl: './todo-control-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TodoControlPanelComponent {
  private readonly todoStore = inject(ToDoStore);
  showCompleted = this.todoStore.showCompleted;

  completeAll(): void {
    this.todoStore.completeAllTodos();
  }

  toggleShowCompleted(): void {
    this.todoStore.setShowCompleted(!this.showCompleted());
  }
}
