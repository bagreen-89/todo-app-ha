import {
  Component,
  ViewEncapsulation,
  inject,
  input,
  signal,
} from '@angular/core';
import { TodoItem } from '@todo-app-ha/types';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoStore } from '@todo-app-ha/todo/data-access';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ha-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TodoItemComponent {
  private readonly todoStore = inject(ToDoStore);

  readonly todo = input.required<TodoItem>();
  todoFormControl = new FormControl<string>('', [Validators.required]);
  isInEditMode = signal(false);

  confirmChanges(): void {
    if (!this.todoFormControl.value) {
      return;
    }
    this.todoStore
      .updateTodo(this.todo().id, {
        text: this.todoFormControl.value,
      })
      .finally(() => this.isInEditMode.set(false));
  }

  removeTodo(): void {
    this.todoStore.removeTodo(this.todo().id);
  }

  toggleEdit(): void {
    this.todoFormControl.reset();
    this.todoFormControl.setValue(this.todo().text);
    this.isInEditMode.set(true);
  }

  cancelEdit(): void {
    this.isInEditMode.set(false);
  }
}
