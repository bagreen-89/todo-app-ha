import { Component, ViewEncapsulation, input } from '@angular/core';
import { TodoItem } from '@todo-app-ha/types';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ha-todo',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './todo-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TodoItemComponent {
  todo = input.required<TodoItem>();
}
